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

# Create a singleton instance
email_service = EmailService()
