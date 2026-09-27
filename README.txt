AMORCHECK WEBSITE
=================

This folder is the first complete AmorCheck website prototype.

OPEN IT LOCALLY
1. Open the amorcheck-website folder.
2. Double-click index.html.
3. The website will open in your browser.

WHAT IS ALREADY INCLUDED
- Professional responsive design for desktop, tablet and mobile.
- AmorCheck branding and logo.
- Basic Check €499.
- Relationship Check €699.
- Full Investigation €999.
- 5 to 10 business day delivery language.
- English as the default language.
- Automatic browser-language selection for German, Russian, Ukrainian, Polish, Czech, French and Dutch.
- Manual language selector.
- Investigation intake modal.
- Story submission section with multiple-file selection.
- Example public-story carousel.
- FAQ accordion.
- WhatsApp links to +1 860 555 6688.
- Email links to contact@amorcheck.com.
- Social links for @amorcheck.
- Privacy Policy, Terms and Cookie Policy drafts.
- Cloudflare Worker example for Europe-only access.

BEFORE ACCEPTING REAL CUSTOMERS
1. STRIPE
Open assets/js/config.js.
Paste the Stripe Payment Link for each package into the matching empty field:
stripe.basic
stripe.relationship
stripe.full

2. PAYPAL
Paste each PayPal checkout/payment link into:
paypal.basic
paypal.relationship
paypal.full

3. SECURE FORMS AND FILE UPLOADS
The forms are intentionally in demo mode because accepting sensitive documents requires a real secure backend.
Add your secure form/API endpoint to formEndpoint in assets/js/config.js.
Do not use GitHub itself to store customer investigation documents.

4. EUROPE-ONLY ACCESS
The included cloudflare-worker.js contains a Europe allow-list and a generic block page for other regions, including Egypt.
Use Cloudflare in front of amorcheck.com and attach the Worker to the domain.
Test every target country before launch.
A VPN can bypass country blocking, so no public website can guarantee absolute invisibility from Egypt.

5. LEGAL PAGES
The legal pages are professionally structured drafts, not a substitute for final legal review.
Have counsel confirm the final privacy, consumer, investigation, publication and data-transfer language before launch.

6. PUBLIC STORIES
The current story cards are visibly labeled example content.
Replace them with real, reviewed submissions before launch.
Never publish a person's private address, passport number, financial account information or children's identifying information.

7. COMPANY ADDRESS
No private home or investigator address is displayed in this build.
The footer says only: AmorCheck LLC · Wyoming, United States.
Confirm which business contact details must be disclosed in the jurisdictions you serve.

FILES YOU WILL EDIT MOST OFTEN
assets/js/config.js     Business/payment/form settings.
assets/js/translations.js     Language text.
index.html     Main site content.
assets/css/styles.css     Design.

DOMAIN
amorcheck.com

CONTACT
+1 860 555 6688
contact@amorcheck.com
@amorcheck
