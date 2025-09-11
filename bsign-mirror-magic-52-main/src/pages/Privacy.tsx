import SEO from "@/components/SEO";
import Header from "@/components/Header";
import ModernNavigation from "@/components/ModernNavigation";
import ImprovedFooter from "@/components/ImprovedFooter";
import { Card, CardContent } from "@/components/ui/card";

const Privacy = () => {
  return (
    <>
      <SEO
        title="Privacy Policy | Bsign Store"
        description="Learn about how we collect, use, and protect your personal information at Bsign Store."
        canonical="/privacy"
      />
      <div className="min-h-screen bg-background">
        <Header />
        <ModernNavigation />
        
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
              <p className="text-lg text-muted-foreground">
                Your privacy is of the highest importance to us.
              </p>
            </div>

            <Card className="mb-8">
              <CardContent className="p-8">
                <div className="prose prose-gray max-w-none">
                  <p className="text-lg mb-6">
                    At Bsign Store, we do not store credit card details, nor do we share customer details with any 3rd parties.
                  </p>

                  <p className="mb-6">
                    Our privacy policy sets out how Bsign Store uses and protects any sensitive information you give us when you use this website. Please read this privacy policy carefully before using the site or submitting any personal information. By using this website, you are accepting the practices set out below.
                  </p>

                  <p className="mb-8">
                    Bsign Store is committed to ensuring that your privacy is protected. If we ask you to provide certain information by which you can be identified when using this website, you can be assured that it will only be used in accordance with this privacy policy. We may change this policy from time to time, but any changes will be posted and the changes will only apply to activities and information on going forward, never on a retroactive basis.
                  </p>

                  <p className="mb-8 text-sm text-muted-foreground">
                    Note, the privacy policies set out below are for this website only. If you link to other websites, please review the privacy policies posted at those sites.
                  </p>

                  <h2 className="text-2xl font-semibold mb-4">Privacy Promise</h2>
                  
                  <p className="mb-4">
                    Your privacy is of the highest importance to us, and we promise never to release your personal details to any outside company for mailing or marketing purposes.
                  </p>

                  <p className="mb-4">
                    When you make a purchase from our website, we may collect certain personal information from you such as:
                  </p>

                  <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Your name</li>
                    <li>Contact information including email address and telephone number</li>
                    <li>Demographic information such as postcode</li>
                    <li>Payment address and details</li>
                  </ul>

                  <p className="mb-6">
                    All such information is held on secure servers. Bsign Store complies fully with all applicable Data Protection and consumer legislation, and will treat all your personal information as fully confidential. We require this information to understand your needs and provide you with a better service, and in particular for the following reasons:
                  </p>

                  <ul className="list-disc pl-6 mb-8 space-y-2">
                    <li>Processing your orders</li>
                    <li>Verifying details of your payment method or credit card account</li>
                    <li>Internal record keeping</li>
                    <li>Administering this website</li>
                    <li>For statistical purposes to improve our products and services</li>
                    <li>Serving website contents and advertisements to you</li>
                  </ul>

                  <p className="mb-8">
                    You agree that you do not object to us contacting you for any of the above purposes whether, by telephone, e-mail or in writing and you confirm that you do not and will not consider any of the above as being a breach of any of your rights under applicable privacy regulations.
                  </p>

                  <h2 className="text-2xl font-semibold mb-4">Transaction Security</h2>
                  
                  <p className="mb-8">
                    In order to serve you most efficiently, reputable third-party banking (including PayPal) and distribution institutions handle our credit card transactions and order fulfillment. They receive the information needed to verify and authorize your payment card and to process your order. All such organizations are under strict obligation to keep your personal information private.
                  </p>

                  <h2 className="text-2xl font-semibold mb-4">Agreeing to Cookies</h2>
                  
                  <p className="mb-4">
                    Cookies are small text files that ask permission to be placed on your computer's hard drive. Once you agree, the file is added and the cookie helps analyze web traffic or lets you know when you visit a particular website. Cookies allow web applications to respond to you as an individual. The web application can tailor its operations to your needs, likes, and dislikes by gathering and remembering information about your preferences.
                  </p>

                  <p className="mb-4">
                    We use cookies to keep track of what you have in your basket and to remember you when you return to our website. Overall, cookies help us provide you with a better website, by enabling us to monitor which pages you find useful and which you do not. A cookie in no way gives us access to your computer or any information about you, other than the data you choose to share with us.
                  </p>

                  <p className="mb-8">
                    You can choose to allow or block cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer, though this may prevent you from taking full advantage of the website.
                  </p>

                  <h2 className="text-2xl font-semibold mb-4">Links to Other Websites</h2>
                  
                  <p className="mb-8">
                    Our website may contain links to other websites of interest. However, once you have used these links to leave our site, you should note that we do not have any control over that other website. Therefore, we cannot be responsible for the protection and privacy of any information which you provide whilst visiting such sites and such sites are not governed by this privacy policy. You should exercise caution and look at the privacy policy applicable to the website in question.
                  </p>

                  <h2 className="text-2xl font-semibold mb-4">reCAPTCHA</h2>
                  
                  <p className="mb-4">
                    This site is protected by reCAPTCHA and the Google{" "}
                    <a 
                      href="https://www.google.com/intl/en/policies/privacy/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a 
                      href="https://www.google.com/intl/en/policies/terms/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Terms of Service
                    </a>{" "}
                    apply.
                  </p>

                  <div className="bg-muted/30 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
                    <p className="text-sm text-muted-foreground">
                      If you have any questions about this privacy policy or our data practices, please contact us through our{" "}
                      <a 
                        href="/contact" 
                        className="text-primary hover:underline"
                      >
                        contact page
                      </a>.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        <ImprovedFooter />
      </div>
    </>
  );
};

export default Privacy;