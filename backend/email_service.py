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

# Create a singleton instance
email_service = EmailService()
