from fastapi import APIRouter, HTTPException, Request, Header
from pydantic import BaseModel, Field
from typing import Optional, Dict
from motor.motor_asyncio import AsyncIOMotorClient
from emergentintegrations.payments.stripe.checkout import (
    StripeCheckout,
    CheckoutSessionResponse,
    CheckoutStatusResponse,
    CheckoutSessionRequest
)
import os
from dotenv import load_dotenv
from datetime import datetime
import logging

load_dotenv()

# Initialize router
payment_router = APIRouter(prefix="/api/payments", tags=["payments"])

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL')
db_name = os.environ.get('DB_NAME')
client = AsyncIOMotorClient(mongo_url)
db = client[db_name]
payment_transactions = db['payment_transactions']

# Stripe API Key
STRIPE_API_KEY = os.environ.get('STRIPE_API_KEY')

logger = logging.getLogger(__name__)


# Request/Response Models
class PaymentRequest(BaseModel):
    cart_items: list
    customer_email: str
    customer_name: str
    shipping_address: Dict[str, str]
    billing_address: Dict[str, str]
    host_url: str
    subtotal: float
    tax: float
    shipping: float
    total: float
    currency: str = "cad"


class PaymentMethodRequest(BaseModel):
    payment_method: str = Field(..., description="Payment method: 'stripe' or 'paypal'")


@payment_router.post("/create-checkout-session")
async def create_checkout_session(payment_request: PaymentRequest):
    """Create a Stripe checkout session for the cart"""
    try:
        # Use the total amount provided by frontend (includes tax and shipping)
        total_amount = payment_request.total
        
        # Initialize Stripe Checkout
        host_url = payment_request.host_url
        webhook_url = f"{host_url}/api/webhook/stripe"
        stripe_checkout = StripeCheckout(api_key=STRIPE_API_KEY, webhook_url=webhook_url)
        
        # Create success and cancel URLs
        success_url = f"{host_url}/order-confirmation?session_id={{CHECKOUT_SESSION_ID}}"
        cancel_url = f"{host_url}/checkout"
        
        # Prepare metadata
        metadata = {
            "customer_email": payment_request.customer_email,
            "customer_name": payment_request.customer_name,
            "order_items": str(len(payment_request.cart_items)),
            "subtotal": str(payment_request.subtotal),
            "tax": str(payment_request.tax),
            "shipping": str(payment_request.shipping),
            "currency": payment_request.currency.upper(),
            "timestamp": datetime.utcnow().isoformat()
        }
        
        # Create checkout session request with correct currency
        checkout_request = CheckoutSessionRequest(
            amount=total_amount,
            currency=payment_request.currency.lower(),
            success_url=success_url,
            cancel_url=cancel_url,
            metadata=metadata
        )
        
        # Create session
        session: CheckoutSessionResponse = await stripe_checkout.create_checkout_session(checkout_request)
        
        # Store transaction in database
        transaction_data = {
            "session_id": session.session_id,
            "payment_status": "initiated",
            "status": "pending",
            "amount": total_amount,
            "currency": "CAD",
            "customer_email": payment_request.customer_email,
            "customer_name": payment_request.customer_name,
            "cart_items": payment_request.cart_items,
            "shipping_address": payment_request.shipping_address,
            "billing_address": payment_request.billing_address,
            "metadata": metadata,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
        
        await payment_transactions.insert_one(transaction_data)
        
        logger.info(f"✅ Created checkout session: {session.session_id}")
        
        return {
            "url": session.url,
            "session_id": session.session_id
        }
        
    except Exception as e:
        logger.error(f"❌ Error creating checkout session: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@payment_router.get("/checkout-status/{session_id}")
async def get_checkout_status(session_id: str, request: Request):
    """Get the status of a checkout session"""
    try:
        # Initialize Stripe Checkout
        host_url = str(request.base_url).rstrip('/')
        webhook_url = f"{host_url}/api/webhook/stripe"
        stripe_checkout = StripeCheckout(api_key=STRIPE_API_KEY, webhook_url=webhook_url)
        
        # Get checkout status from Stripe
        checkout_status: CheckoutStatusResponse = await stripe_checkout.get_checkout_status(session_id)
        
        # Update transaction in database
        existing_transaction = await payment_transactions.find_one({"session_id": session_id})
        
        if existing_transaction:
            # Only update if payment_status has changed to avoid duplicate processing
            if existing_transaction.get('payment_status') != checkout_status.payment_status:
                update_data = {
                    "payment_status": checkout_status.payment_status,
                    "status": checkout_status.status,
                    "updated_at": datetime.utcnow()
                }
                
                await payment_transactions.update_one(
                    {"session_id": session_id},
                    {"$set": update_data}
                )
                
                logger.info(f"✅ Updated payment status for session {session_id}: {checkout_status.payment_status}")
        
        return {
            "status": checkout_status.status,
            "payment_status": checkout_status.payment_status,
            "amount_total": checkout_status.amount_total,
            "currency": checkout_status.currency,
            "metadata": checkout_status.metadata
        }
        
    except Exception as e:
        logger.error(f"❌ Error getting checkout status: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@payment_router.post("/webhook/stripe")
async def stripe_webhook(request: Request):
    """Handle Stripe webhook events"""
    try:
        # Get raw body and signature
        body = await request.body()
        signature = request.headers.get("Stripe-Signature")
        
        # Initialize Stripe Checkout
        host_url = str(request.base_url).rstrip('/')
        webhook_url = f"{host_url}/api/webhook/stripe"
        stripe_checkout = StripeCheckout(api_key=STRIPE_API_KEY, webhook_url=webhook_url)
        
        # Handle webhook
        webhook_response = await stripe_checkout.handle_webhook(body, signature)
        
        # Update transaction based on webhook event
        if webhook_response.event_type == "checkout.session.completed":
            await payment_transactions.update_one(
                {"session_id": webhook_response.session_id},
                {
                    "$set": {
                        "payment_status": webhook_response.payment_status,
                        "updated_at": datetime.utcnow()
                    }
                }
            )
            logger.info(f"✅ Webhook processed for session {webhook_response.session_id}")
        
        return {"status": "success"}
        
    except Exception as e:
        logger.error(f"❌ Error processing webhook: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))


@payment_router.get("/order/{session_id}")
async def get_order_details(session_id: str):
    """Get order details by session ID"""
    try:
        transaction = await payment_transactions.find_one({"session_id": session_id})
        
        if not transaction:
            raise HTTPException(status_code=404, detail="Order not found")
        
        # Convert MongoDB _id to string
        transaction['_id'] = str(transaction['_id'])
        
        return transaction
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Error getting order details: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
