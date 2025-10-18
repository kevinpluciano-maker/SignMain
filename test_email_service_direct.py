#!/usr/bin/env python3
"""
Direct test of the email service to see the full email content
"""

import sys
sys.path.append('/app/backend')

from email_service import email_service

# Test data
order_data = {
    "order_id": "ABS-TEST-003",
    "customer_name": "John Doe",
    "customer_email": "johndoe@example.com",
    "customer_phone": "+1 (555) 123-4567",
    "shipping_address": {
        "address": "123 Main Street, Apt 4B",
        "city": "Los Angeles",
        "state": "CA",
        "zip": "90001",
        "country": "US"
    },
    "items": [
        {
            "name": "Men Restroom Sign",
            "quantity": 2,
            "price": "58.00",
            "specifications": {
                "Size": "8 x 8 in",
                "Color": "Black on White",
                "Braille": "Yes (+$10 CAD)",
                "Custom Number": "Room 101"
            }
        },
        {
            "name": "Acrylic WC Restroom Sign",
            "quantity": 1,
            "price": "25.00",
            "specifications": {
                "Size": "3.9 in height",
                "Color": "Silver"
            }
        }
    ],
    "subtotal": "141.00",
    "shipping": "15.00",
    "tax": "18.33",
    "total": "174.33",
    "notes": "Please rush delivery - needed by Friday"
}

print("🧪 Testing Email Service Directly")
print("=" * 50)

# Test the email service
result = email_service.send_order_notification(order_data)

print(f"\n📧 Email Service Result: {result}")
print("\n✅ The email content above should show all order details including:")
print("   • Order ID: ABS-TEST-003")
print("   • Customer details: John Doe, johndoe@example.com, +1 (555) 123-4567")
print("   • Shipping address: 123 Main Street, Apt 4B, Los Angeles, CA 90001, US")
print("   • Product 1: Men Restroom Sign (Qty: 2, $58.00)")
print("     - Size: 8 x 8 in")
print("     - Color: Black on White")
print("     - Braille: Yes (+$10 CAD)")
print("     - Custom Number: Room 101")
print("   • Product 2: Acrylic WC Restroom Sign (Qty: 1, $25.00)")
print("     - Size: 3.9 in height")
print("     - Color: Silver")
print("   • Pricing: Subtotal $141.00, Shipping $15.00, Tax $18.33, Total $174.33")
print("   • Notes: Please rush delivery - needed by Friday")