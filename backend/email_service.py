import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Dict, Any
import os
from datetime import datetime
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

class EmailService:
    def __init__(self):
        self.smtp_server = "smtp.gmail.com"
        self.smtp_port = 587
        self.sender_email = os.environ.get('SENDER_EMAIL', 'noreply@absigns.com')
        self.notification_email = os.environ.get('NOTIFICATION_EMAIL', 'acrylicbraillesigns@gmail.com')
        # For Gmail, you'll need an App Password, not your regular password
        self.sender_password = os.environ.get('SENDER_PASSWORD', '')
    
    def send_email(self, to_email: str, subject: str, body_html: str, body_text: str = None):
        """Send an email with HTML and optional plain text content"""
        try:
            # Log email content for debugging
            print(f"\n{'='*80}")
            print(f"📧 EMAIL NOTIFICATION")
            print(f"{'='*80}")
            print(f"To: {to_email}")
            print(f"Subject: {subject}")
            print(f"{'='*80}")
            if body_text:
                print(body_text)
            print(f"{'='*80}\n")
            
            # If no password is set, skip SMTP sending (for testing)
            if not self.sender_password:
                print("⚠️  SMTP password not configured - Email logged but not sent")
                print(f"📝 Email would be sent to: {to_email}")
                return True
            
            message = MIMEMultipart("alternative")
            message["Subject"] = subject
            message["From"] = self.sender_email
            message["To"] = to_email
            
            # Add plain text version if provided
            if body_text:
                part1 = MIMEText(body_text, "plain")
                message.attach(part1)
            
            # Add HTML version
            part2 = MIMEText(body_html, "html")
            message.attach(part2)
            
            # Send email
            with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                server.starttls()
                server.login(self.sender_email, self.sender_password)
                server.sendmail(self.sender_email, to_email, message.as_string())
            
            print("✅ Email sent successfully via SMTP")
            return True
        except Exception as e:
            print(f"❌ Error sending email: {str(e)}")
            return False
    
    def send_contact_form_notification(self, form_data: Dict[str, Any]):
        """Send notification when contact form is submitted"""
        # Use custom subject if it's a quote request
        is_quote_request = 'Custom Quote Request' in form_data.get('subject', '')
        if is_quote_request:
            subject = f"Custom Quote Request from {form_data.get('name', 'Unknown')}"
        else:
            subject = f"Contact Form Submission from {form_data.get('name', 'Unknown')}"
        
        # Build additional info section if available
        additional_info = ""
        if form_data.get('company') or form_data.get('urgency') or form_data.get('budget'):
            additional_info = f"""
            <div style="margin: 20px 0;">
              <h3 style="color: #1e40af;">Project Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
            """
            if form_data.get('company') and form_data.get('company') != 'Not provided':
                additional_info += f"""
                <tr>
                  <td style="padding: 8px; background-color: #f1f5f9;"><strong>Company:</strong></td>
                  <td style="padding: 8px;">{form_data.get('company')}</td>
                </tr>
                """
            if form_data.get('urgency'):
                additional_info += f"""
                <tr>
                  <td style="padding: 8px; background-color: #f1f5f9;"><strong>Timeline:</strong></td>
                  <td style="padding: 8px;">{form_data.get('urgency')}</td>
                </tr>
                """
            if form_data.get('budget') and form_data.get('budget') != 'Not specified':
                additional_info += f"""
                <tr>
                  <td style="padding: 8px; background-color: #f1f5f9;"><strong>Budget:</strong></td>
                  <td style="padding: 8px;">{form_data.get('budget')}</td>
                </tr>
                """
            additional_info += "</table></div>"
        
        body_html = f"""
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
              <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
                {subject}
              </h2>
              
              <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <p><strong>Date & Time:</strong> {datetime.now().strftime('%B %d, %Y at %I:%M %p')}</p>
              </div>
              
              <div style="margin: 20px 0;">
                <h3 style="color: #1e40af;">Contact Information</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px; background-color: #f1f5f9;"><strong>Name:</strong></td>
                    <td style="padding: 8px;">{form_data.get('name', 'N/A')}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px; background-color: #f1f5f9;"><strong>Email:</strong></td>
                    <td style="padding: 8px;">{form_data.get('email', 'N/A')}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px; background-color: #f1f5f9;"><strong>Phone:</strong></td>
                    <td style="padding: 8px;">{form_data.get('phone', 'Not provided')}</td>
                  </tr>
                  {f'''<tr>
                    <td style="padding: 8px; background-color: #f1f5f9;"><strong>Subject:</strong></td>
                    <td style="padding: 8px;">{form_data.get('subject', 'N/A')}</td>
                  </tr>''' if form_data.get('subject') else ''}
                </table>
              </div>
              
              {additional_info}
              
              <div style="margin: 20px 0;">
                <h3 style="color: #1e40af;">Message</h3>
                <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #2563eb; border-radius: 5px; white-space: pre-wrap;">
                  {form_data.get('message', 'No message provided')}
                </div>
              </div>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
                <p>This is an automated notification from AB Signs {('quote request' if is_quote_request else 'contact')} form.</p>
                <p>Reply directly to: {form_data.get('email', 'N/A')}</p>
              </div>
            </div>
          </body>
        </html>
        """
        
        body_text = f"""
        New Contact Form Submission
        
        Date & Time: {datetime.now().strftime('%B %d, %Y at %I:%M %p')}
        
        Contact Information:
        Name: {form_data.get('name', 'N/A')}
        Email: {form_data.get('email', 'N/A')}
        Phone: {form_data.get('phone', 'N/A')}
        Subject: {form_data.get('subject', 'N/A')}
        
        Message:
        {form_data.get('message', 'No message provided')}
        """
        
        return self.send_email(self.notification_email, subject, body_html, body_text)
    
    def send_order_notification(self, order_data: Dict[str, Any]):
        """Send notification when customer proceeds with checkout"""
        subject = f"New Order #{order_data.get('order_id', 'N/A')} - ${order_data.get('total', 0)}"
        
        # Build items HTML
        items_html = ""
        for item in order_data.get('items', []):
            items_html += f"""
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">
                <strong>{item.get('name', 'Unknown Product')}</strong><br>
                <span style="font-size: 12px; color: #666;">
                  Quantity: {item.get('quantity', 1)}
                </span>
              </td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; text-align: right;">
                ${item.get('price', '0.00')}
              </td>
            </tr>
            """
        
        # Build specifications HTML
        specs_html = ""
        for item in order_data.get('items', []):
            if item.get('specifications'):
                specs_html += f"""
                <div style="margin: 15px 0; padding: 10px; background-color: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 5px;">
                  <h4 style="margin: 0 0 10px 0; color: #92400e;">{item.get('name', 'Product')}</h4>
                  <table style="width: 100%; font-size: 14px;">
                """
                for key, value in item.get('specifications', {}).items():
                    specs_html += f"""
                    <tr>
                      <td style="padding: 5px;"><strong>{key}:</strong></td>
                      <td style="padding: 5px;">{value}</td>
                    </tr>
                    """
                specs_html += "</table></div>"
        
        body_html = f"""
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 700px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
              <div style="background-color: #2563eb; color: white; padding: 20px; border-radius: 5px 5px 0 0; margin: -20px -20px 20px -20px;">
                <h1 style="margin: 0;">🛒 New Order Received!</h1>
                <p style="margin: 5px 0 0 0; opacity: 0.9;">Order #{order_data.get('order_id', 'N/A')}</p>
              </div>
              
              <div style="background-color: #dcfce7; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #16a34a;">
                <p style="margin: 0;"><strong>Order Date:</strong> {datetime.now().strftime('%B %d, %Y at %I:%M %p')}</p>
                <p style="margin: 5px 0 0 0;"><strong>Order Total:</strong> <span style="font-size: 20px; color: #16a34a;">${order_data.get('total', '0.00')}</span></p>
              </div>
              
              <div style="margin: 20px 0;">
                <h3 style="color: #1e40af; border-bottom: 2px solid #dbeafe; padding-bottom: 10px;">Customer Information</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px; background-color: #f1f5f9;"><strong>Name:</strong></td>
                    <td style="padding: 8px;">{order_data.get('customer_name', 'N/A')}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px; background-color: #f1f5f9;"><strong>Email:</strong></td>
                    <td style="padding: 8px;">{order_data.get('customer_email', 'N/A')}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px; background-color: #f1f5f9;"><strong>Phone:</strong></td>
                    <td style="padding: 8px;">{order_data.get('customer_phone', 'N/A')}</td>
                  </tr>
                </table>
              </div>
              
              <div style="margin: 20px 0;">
                <h3 style="color: #1e40af; border-bottom: 2px solid #dbeafe; padding-bottom: 10px;">Shipping Address</h3>
                <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px;">
                  {order_data.get('shipping_address', {}).get('address', 'N/A')}<br>
                  {order_data.get('shipping_address', {}).get('city', '')}, {order_data.get('shipping_address', {}).get('state', '')} {order_data.get('shipping_address', {}).get('zip', '')}<br>
                  {order_data.get('shipping_address', {}).get('country', '')}
                </div>
              </div>
              
              <div style="margin: 20px 0;">
                <h3 style="color: #1e40af; border-bottom: 2px solid #dbeafe; padding-bottom: 10px;">Order Items</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  {items_html}
                  <tr>
                    <td style="padding: 10px; text-align: right;"><strong>Subtotal:</strong></td>
                    <td style="padding: 10px; text-align: right;">${order_data.get('subtotal', '0.00')}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; text-align: right;"><strong>Shipping:</strong></td>
                    <td style="padding: 10px; text-align: right;">${order_data.get('shipping', '0.00')}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; text-align: right;"><strong>Tax:</strong></td>
                    <td style="padding: 10px; text-align: right;">${order_data.get('tax', '0.00')}</td>
                  </tr>
                  <tr style="background-color: #dcfce7;">
                    <td style="padding: 15px; text-align: right;"><strong style="font-size: 18px;">Total:</strong></td>
                    <td style="padding: 15px; text-align: right;"><strong style="font-size: 18px; color: #16a34a;">${order_data.get('total', '0.00')}</strong></td>
                  </tr>
                </table>
              </div>
              
              {f'<div style="margin: 20px 0;"><h3 style="color: #1e40af; border-bottom: 2px solid #dbeafe; padding-bottom: 10px;">Product Specifications</h3>{specs_html}</div>' if specs_html else ''}
              
              {f'<div style="margin: 20px 0;"><h3 style="color: #1e40af; border-bottom: 2px solid #dbeafe; padding-bottom: 10px;">Order Notes</h3><div style="background-color: #fef3c7; padding: 15px; border-radius: 5px; border-left: 4px solid #f59e0b;">{order_data.get("notes", "No notes provided")}</div></div>' if order_data.get('notes') else ''}
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #ddd; font-size: 12px; color: #666; text-align: center;">
                <p>This is an automated notification from AB Signs checkout system.</p>
                <p style="margin: 10px 0;">Reply to this email or contact the customer directly at {order_data.get('customer_email', 'N/A')}</p>
              </div>
            </div>
          </body>
        </html>
        """
        
        return self.send_email(self.notification_email, subject, body_html)
    
    def send_customer_confirmation(self, order_data: Dict[str, Any]):
        """Send order confirmation email to customer"""
        customer_email = order_data.get('customer_email', '')
        customer_name = order_data.get('customer_name', 'Valued Customer')
        order_id = order_data.get('order_id', 'N/A')
        
        subject = f"Order Confirmation #{order_id} - AB Signs"
        
        # Build items HTML for customer
        items_html = ""
        for item in order_data.get('items', []):
            specs_list = ""
            if item.get('specifications'):
                for key, value in item.get('specifications', {}).items():
                    specs_list += f"<li><strong>{key}:</strong> {value}</li>"
            
            items_html += f"""
            <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 15px; margin: 10px 0; background-color: #f9fafb;">
              <h4 style="margin: 0 0 10px 0; color: #1e40af;">{item.get('name', 'Product')}</h4>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <span style="color: #666;">Quantity: {item.get('quantity', 1)}</span>
                <span style="font-size: 18px; font-weight: bold; color: #16a34a;">${item.get('price', '0.00')}</span>
              </div>
              {f'<ul style="margin: 10px 0; padding-left: 20px; color: #555;">{specs_list}</ul>' if specs_list else ''}
            </div>
            """
        
        body_html = f"""
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f5f5f5; margin: 0; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              
              <!-- Header -->
              <div style="background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); color: white; padding: 30px 20px; text-align: center;">
                <h1 style="margin: 0; font-size: 28px;">Thank You for Your Order! 🎉</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">Order #{order_id}</p>
              </div>
              
              <!-- Content -->
              <div style="padding: 30px 20px;">
                
                <!-- Welcome Message -->
                <div style="background-color: #dcfce7; border-left: 4px solid #16a34a; padding: 15px; border-radius: 5px; margin-bottom: 25px;">
                  <p style="margin: 0; color: #166534;">
                    <strong>Hi {customer_name},</strong><br>
                    We've received your order and we're excited to get started on your custom signage! 
                    You'll receive an email from our team shortly to confirm the details and discuss the next steps.
                  </p>
                </div>
                
                <!-- Order Details -->
                <div style="margin: 25px 0;">
                  <h2 style="color: #1e40af; border-bottom: 2px solid #dbeafe; padding-bottom: 10px; margin-bottom: 15px;">Order Summary</h2>
                  <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 15px;">
                    <p style="margin: 5px 0;"><strong>Order Number:</strong> {order_id}</p>
                    <p style="margin: 5px 0;"><strong>Order Date:</strong> {datetime.now().strftime('%B %d, %Y at %I:%M %p')}</p>
                    <p style="margin: 5px 0;"><strong>Email:</strong> {customer_email}</p>
                  </div>
                </div>
                
                <!-- Items -->
                <div style="margin: 25px 0;">
                  <h3 style="color: #1e40af; margin-bottom: 15px;">Your Items</h3>
                  {items_html}
                </div>
                
                <!-- Pricing -->
                <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin: 25px 0;">
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 8px; color: #666;">Subtotal:</td>
                      <td style="padding: 8px; text-align: right;">${order_data.get('subtotal', '0.00')}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px; color: #666;">Shipping:</td>
                      <td style="padding: 8px; text-align: right;">${order_data.get('shipping', '0.00')}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px; color: #666;">Tax (HST):</td>
                      <td style="padding: 8px; text-align: right;">${order_data.get('tax', '0.00')}</td>
                    </tr>
                    <tr style="border-top: 2px solid #ddd;">
                      <td style="padding: 15px 8px; font-size: 18px; font-weight: bold;">Total:</td>
                      <td style="padding: 15px 8px; text-align: right; font-size: 20px; font-weight: bold; color: #16a34a;">${order_data.get('total', '0.00')} CAD</td>
                    </tr>
                  </table>
                </div>
                
                <!-- Shipping Address -->
                <div style="margin: 25px 0;">
                  <h3 style="color: #1e40af; margin-bottom: 10px;">Shipping Address</h3>
                  <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px;">
                    <p style="margin: 0; line-height: 1.6;">
                      {order_data.get('shipping_address', {}).get('address', 'N/A')}<br>
                      {order_data.get('shipping_address', {}).get('city', '')}, {order_data.get('shipping_address', {}).get('state', '')} {order_data.get('shipping_address', {}).get('zip', '')}<br>
                      {order_data.get('shipping_address', {}).get('country', '')}
                    </p>
                  </div>
                </div>
                
                {f'''
                <div style="margin: 25px 0;">
                  <h3 style="color: #1e40af; margin-bottom: 10px;">Special Instructions</h3>
                  <div style="background-color: #fef3c7; padding: 15px; border-radius: 5px; border-left: 4px solid #f59e0b;">
                    <p style="margin: 0;">{order_data.get('notes', '')}</p>
                  </div>
                </div>
                ''' if order_data.get('notes') and order_data.get('notes') != 'No additional notes provided' else ''}
                
                <!-- Next Steps -->
                <div style="background-color: #dbeafe; border-left: 4px solid #2563eb; padding: 15px; border-radius: 5px; margin: 25px 0;">
                  <h3 style="margin: 0 0 10px 0; color: #1e40af;">What Happens Next?</h3>
                  <ol style="margin: 0; padding-left: 20px; color: #1e40af;">
                    <li style="margin: 5px 0;">Our team will review your order details</li>
                    <li style="margin: 5px 0;">We'll contact you within 24 hours to confirm specifications</li>
                    <li style="margin: 5px 0;">Production will begin once all details are confirmed</li>
                    <li style="margin: 5px 0;">You'll receive tracking information when your order ships</li>
                  </ol>
                </div>
                
                <!-- Contact Info -->
                <div style="text-align: center; margin: 30px 0; padding: 20px; background-color: #f8f9fa; border-radius: 5px;">
                  <p style="margin: 0 0 10px 0; font-size: 16px; color: #666;">Questions about your order?</p>
                  <p style="margin: 5px 0;">
                    <strong>📧 Email:</strong> <a href="mailto:acrylicbraillesigns@gmail.com" style="color: #2563eb; text-decoration: none;">acrylicbraillesigns@gmail.com</a>
                  </p>
                  <p style="margin: 5px 0;">
                    <strong>📞 Phone:</strong> <a href="tel:+16472782905" style="color: #2563eb; text-decoration: none;">+1 (647) 278-2905</a>
                  </p>
                </div>
                
              </div>
              
              <!-- Footer -->
              <div style="background-color: #1e293b; color: white; padding: 20px; text-align: center;">
                <p style="margin: 0 0 10px 0; font-size: 18px; font-weight: bold;">AB Signs</p>
                <p style="margin: 5px 0; opacity: 0.8; font-size: 14px;">Professional ADA Compliant Acrylic Braille Signs</p>
                <p style="margin: 15px 0 0 0; opacity: 0.7; font-size: 12px;">
                  This is an automated confirmation email. Please do not reply directly to this message.
                </p>
              </div>
              
            </div>
          </body>
        </html>
        """
        
        return self.send_email(customer_email, subject, body_html)
    
    def send_pre_order_notification(self, order_data: Dict[str, Any]) -> bool:
        """Send pre-order email when customer initiates checkout (before Stripe)"""
        try:
            from datetime import datetime
            # Email to business owner
            subject = f"🔔 NEW PRE-ORDER - {order_data.get('customer_name', 'Customer')}"
            
            # Format cart items with detailed specifications
            items_html = ""
            items_text = ""
            for item in order_data.get('cart_items', []):
                specs = item.get('specifications', {})
                
                # Build specifications display
                spec_details = []
                if specs.get('size'):
                    spec_details.append(f"<strong>Size:</strong> {specs.get('size')}")
                if specs.get('color'):
                    spec_details.append(f"<strong>Color:</strong> {specs.get('color')}")
                if specs.get('braille'):
                    spec_details.append(f"<strong>Braille:</strong> {specs.get('braille')}")
                if specs.get('shape'):
                    spec_details.append(f"<strong>Shape:</strong> {specs.get('shape')}")
                
                # Add custom specifications
                if specs.get('customizations'):
                    for key, value in specs.get('customizations', {}).items():
                        if value:
                            spec_details.append(f"<strong>{key}:</strong> {value}")
                
                spec_html = "<br>".join(spec_details) if spec_details else "<em>No specifications</em>"
                
                items_html += f"""
                <tr style="border-bottom: 1px solid #e5e7eb;">
                    <td style="padding: 12px; text-align: left; vertical-align: top;">
                        <div style="font-weight: 600; margin-bottom: 5px;">{item.get('name', 'Unknown')}</div>
                        <div style="font-size: 13px; color: #6b7280; line-height: 1.6;">{spec_html}</div>
                    </td>
                    <td style="padding: 12px; text-align: center; vertical-align: top;">{item.get('quantity', 1)}</td>
                    <td style="padding: 12px; text-align: right; vertical-align: top; font-weight: 600;">{item.get('price', '$0.00')}</td>
                </tr>
                """
                
                # Text version
                spec_text = []
                if specs.get('size'):
                    spec_text.append(f"  Size: {specs.get('size')}")
                if specs.get('color'):
                    spec_text.append(f"  Color: {specs.get('color')}")
                if specs.get('braille'):
                    spec_text.append(f"  Braille: {specs.get('braille')}")
                if specs.get('shape'):
                    spec_text.append(f"  Shape: {specs.get('shape')}")
                if specs.get('customizations'):
                    for key, value in specs.get('customizations', {}).items():
                        if value:
                            spec_text.append(f"  {key}: {value}")
                
                spec_text_display = "\n".join(spec_text) if spec_text else "  No specifications"
                items_text += f"{item.get('name', 'Unknown')} x{item.get('quantity', 1)} - {item.get('price', '$0.00')}\n{spec_text_display}\n\n"
            
            shipping_addr = order_data.get('shipping_address', {})
            
            body_html = f"""
            <!DOCTYPE html>
            <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
                        <h1 style="margin: 0;">🛒 PRE-ORDER INITIATED</h1>
                        <p style="margin: 10px 0 0 0;">Customer is proceeding to payment</p>
                    </div>
                    
                    <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb;">
                        <div style="background: #fef3c7; color: #92400e; padding: 8px 16px; border-radius: 20px; display: inline-block; font-weight: bold; margin: 20px 0;">⏳ AWAITING PAYMENT</div>
                        
                        <div style="background: #f9fafb; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #667eea;">
                            <h3 style="margin-top: 0; color: #667eea;">📋 Customer Information</h3>
                            <p><strong>Name:</strong> {order_data.get('customer_name', 'N/A')}</p>
                            <p><strong>📧 Email:</strong> {order_data.get('customer_email', 'N/A')}</p>
                            <p><strong>💰 Total Amount:</strong> ${order_data.get('total', 0):.2f} {order_data.get('currency', 'CAD').upper()}</p>
                            <p><strong>🕐 Timestamp:</strong> {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</p>
                        </div>
                        
                        <div style="background: #f9fafb; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #667eea;">
                            <h3 style="margin-top: 0; color: #667eea;">📦 Shipping Address</h3>
                            <p>{shipping_addr.get('address', 'N/A')}</p>
                            <p>{shipping_addr.get('city', 'N/A')}, {shipping_addr.get('state', 'N/A')} {shipping_addr.get('zip', 'N/A')}</p>
                            <p>{shipping_addr.get('country', 'N/A')}</p>
                        </div>
                        
                        <h3 style="color: #667eea;">🛍️ Order Items</h3>
                        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                            <thead>
                                <tr style="background: #f3f4f6;">
                                    <th style="padding: 12px; text-align: left;">Product</th>
                                    <th style="padding: 12px; text-align: center;">Quantity</th>
                                    <th style="padding: 12px; text-align: right;">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items_html}
                            </tbody>
                        </table>
                        
                        <div style="text-align: right; margin-top: 20px;">
                            <p><strong>Subtotal:</strong> ${order_data.get('subtotal', 0):.2f} {order_data.get('currency', 'CAD').upper()}</p>
                            <p><strong>Tax (13%):</strong> ${order_data.get('tax', 0):.2f} {order_data.get('currency', 'CAD').upper()}</p>
                            <p><strong>Shipping:</strong> ${order_data.get('shipping', 0):.2f} {order_data.get('currency', 'CAD').upper()}</p>
                            <hr style="margin: 10px 0;">
                            <p style="font-size: 18px; color: #667eea;"><strong>TOTAL:</strong> ${order_data.get('total', 0):.2f} {order_data.get('currency', 'CAD').upper()}</p>
                        </div>
                        
                        <div style="background: #fef3c7; padding: 15px; margin-top: 20px; border-radius: 8px; border-left: 4px solid #f59e0b;">
                            <p style="margin: 0; color: #92400e;">
                                <strong>⚠️ Note:</strong> This is a PRE-ORDER notification. Customer has been redirected to Stripe for payment. 
                                You will receive an "ORDER COMPLETE" email once payment is confirmed.
                            </p>
                        </div>
                    </div>
                    
                    <div style="background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; border-radius: 0 0 8px 8px;">
                        <p>Acrylic Braille Signs</p>
                        <p>📞 +1 (647) 278-2905 | 📧 acrylicbraillesigns@gmail.com</p>
                    </div>
                </div>
            </body>
            </html>
            """
            
            body_text = f"""
PRE-ORDER INITIATED
Customer: {order_data.get('customer_name', 'N/A')}
Email: {order_data.get('customer_email', 'N/A')}
Total: ${order_data.get('total', 0):.2f} {order_data.get('currency', 'CAD').upper()}

NOTE: Customer is now at payment page.
            """
            
            # Send to business owner
            return self.send_email(self.notification_email, subject, body_html, body_text)
            
        except Exception as e:
            print(f"❌ Error sending pre-order notification: {str(e)}")
            return False
    
    def send_order_complete_notification(self, order_data: Dict[str, Any]) -> bool:
        """Send order complete email after successful payment"""
        try:
            from datetime import datetime
            # Email to business owner
            subject = f"✅ ORDER COMPLETE - {order_data.get('customer_name', 'Customer')}"
            
            # Format cart items with detailed specifications
            items_html = ""
            for item in order_data.get('cart_items', []):
                specs = item.get('specifications', {})
                
                # Build specifications display
                spec_details = []
                if specs.get('size'):
                    spec_details.append(f"<strong>Size:</strong> {specs.get('size')}")
                if specs.get('color'):
                    spec_details.append(f"<strong>Color:</strong> {specs.get('color')}")
                if specs.get('braille'):
                    spec_details.append(f"<strong>Braille:</strong> {specs.get('braille')}")
                if specs.get('shape'):
                    spec_details.append(f"<strong>Shape:</strong> {specs.get('shape')}")
                
                # Add custom specifications
                if specs.get('customizations'):
                    for key, value in specs.get('customizations', {}).items():
                        if value:
                            spec_details.append(f"<strong>{key}:</strong> {value}")
                
                spec_html = "<br>".join(spec_details) if spec_details else "<em>No specifications</em>"
                
                items_html += f"""
                <tr style="border-bottom: 1px solid #e5e7eb;">
                    <td style="padding: 12px; text-align: left; vertical-align: top;">
                        <div style="font-weight: 600; margin-bottom: 5px;">{item.get('name', 'Unknown')}</div>
                        <div style="font-size: 13px; color: #6b7280; line-height: 1.6;">{spec_html}</div>
                    </td>
                    <td style="padding: 12px; text-align: center; vertical-align: top;">{item.get('quantity', 1)}</td>
                    <td style="padding: 12px; text-align: right; vertical-align: top; font-weight: 600;">{item.get('price', '$0.00')}</td>
                </tr>
                """
            
            shipping_addr = order_data.get('shipping_address', {})
            
            body_html = f"""
            <!DOCTYPE html>
            <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
                        <h1 style="margin: 0;">✅ ORDER COMPLETE</h1>
                        <p style="margin: 10px 0 0 0;">Payment Successful - Ready to Manufacture</p>
                    </div>
                    
                    <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb;">
                        <div style="background: #d1fae5; color: #065f46; padding: 8px 16px; border-radius: 20px; display: inline-block; font-weight: bold; margin: 20px 0;">✅ PAYMENT CONFIRMED</div>
                        
                        <div style="background: #d1fae5; padding: 15px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #10b981;">
                            <p style="margin: 0; color: #065f46;">
                                <strong>🎉 Great News!</strong> Payment has been successfully processed. You can now proceed with manufacturing this order.
                            </p>
                        </div>
                        
                        <div style="background: #f9fafb; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #10b981;">
                            <h3 style="margin-top: 0; color: #10b981;">📋 Customer Information</h3>
                            <p><strong>Name:</strong> {order_data.get('customer_name', 'N/A')}</p>
                            <p><strong>📧 Email:</strong> {order_data.get('customer_email', 'N/A')}</p>
                            <p><strong>💰 Paid Amount:</strong> ${order_data.get('amount', 0):.2f} {order_data.get('currency', 'CAD').upper()}</p>
                            <p><strong>🆔 Order ID:</strong> {order_data.get('session_id', 'N/A')[-12:]}</p>
                            <p><strong>🕐 Completed:</strong> {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</p>
                            <p><strong>💳 Status:</strong> <span style="color: #10b981; font-weight: bold;">PAID</span></p>
                        </div>
                        
                        <div style="background: #f9fafb; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #10b981;">
                            <h3 style="margin-top: 0; color: #10b981;">📦 Shipping Address</h3>
                            <p>{shipping_addr.get('address', 'N/A')}</p>
                            <p>{shipping_addr.get('city', 'N/A')}, {shipping_addr.get('state', 'N/A')} {shipping_addr.get('zip', 'N/A')}</p>
                            <p>{shipping_addr.get('country', 'N/A')}</p>
                        </div>
                        
                        <h3 style="color: #10b981;">🛍️ Order Items</h3>
                        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                            <thead>
                                <tr style="background: #f3f4f6;">
                                    <th style="padding: 12px; text-align: left;">Product</th>
                                    <th style="padding: 12px; text-align: center;">Quantity</th>
                                    <th style="padding: 12px; text-align: right;">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items_html}
                            </tbody>
                        </table>
                        
                        <div style="text-align: right; margin-top: 20px;">
                            <p><strong>Subtotal:</strong> ${order_data.get('subtotal', 0):.2f} {order_data.get('currency', 'CAD').upper()}</p>
                            <p><strong>Tax (13%):</strong> ${order_data.get('tax', 0):.2f} {order_data.get('currency', 'CAD').upper()}</p>
                            <p><strong>Shipping:</strong> ${order_data.get('shipping', 0):.2f} {order_data.get('currency', 'CAD').upper()}</p>
                            <hr style="margin: 10px 0;">
                            <p style="font-size: 18px; color: #10b981;"><strong>PAID TOTAL:</strong> ${order_data.get('amount', 0):.2f} {order_data.get('currency', 'CAD').upper()}</p>
                        </div>
                    </div>
                    
                    <div style="background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; border-radius: 0 0 8px 8px;">
                        <p>Acrylic Braille Signs</p>
                        <p>📞 +1 (647) 278-2905 | 📧 acrylicbraillesigns@gmail.com</p>
                    </div>
                </div>
            </body>
            </html>
            """
            
            # Send to business owner
            self.send_email(self.notification_email, subject, body_html)
            
            # Also send confirmation to customer
            customer_subject = f"Order Confirmation - Acrylic Braille Signs"
            customer_html = f"""
            <!DOCTYPE html>
            <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
                        <h1 style="margin: 0;">Thank You for Your Order!</h1>
                    </div>
                    <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb;">
                        <p>Dear {order_data.get('customer_name', 'Customer')},</p>
                        <p>Your order has been confirmed and payment successfully processed.</p>
                        <p><strong>Order ID:</strong> {order_data.get('session_id', 'N/A')[-12:]}</p>
                        <p><strong>Total Paid:</strong> ${order_data.get('amount', 0):.2f} {order_data.get('currency', 'CAD').upper()}</p>
                        <p>We will begin manufacturing your custom signage immediately and will send you shipping updates via email.</p>
                        <p>If you have any questions, please contact us at:<br>
                        📧 acrylicbraillesigns@gmail.com<br>
                        📞 +1 (647) 278-2905</p>
                        <p>Thank you for choosing Acrylic Braille Signs!</p>
                    </div>
                </div>
            </body>
            </html>
            """
            
            self.send_email(order_data.get('customer_email'), customer_subject, customer_html)
            
            return True
            
        except Exception as e:
            print(f"❌ Error sending order complete notification: {str(e)}")
            return False

# Create a singleton instance
email_service = EmailService()
