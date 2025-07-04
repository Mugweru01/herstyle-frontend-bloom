
-- Create static_pages table if it doesn't exist (it seems to exist but let's ensure it has the right structure)
-- Add any missing columns to static_pages table
ALTER TABLE public.static_pages 
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'published',
ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;

-- Insert static page content for all the required pages
INSERT INTO public.static_pages (slug, title, content, meta_title, meta_description) VALUES
('contact-us', 'Contact Us', 
'<div class="contact-page">
  <h1>Get in Touch</h1>
  <p>We''d love to hear from you. Visit us at our store or send us a message!</p>
  
  <div class="contact-info">
    <h2>Visit Our Store</h2>
    <p><strong>Herstyle</strong><br>
    Westgate Mall<br>
    Nairobi, Kenya</p>
    
    <p><strong>Phone:</strong> +254 700 123 456<br>
    <strong>Email:</strong> hello@herstyle.co.ke</p>
    
    <h2>Business Hours</h2>
    <p>Monday - Saturday: 10:00 AM - 8:00 PM<br>
    Sunday: 11:00 AM - 6:00 PM</p>
  </div>
</div>',
'Contact Us - Herstyle', 'Get in touch with Herstyle. Visit our store at Westgate Mall or contact us online.'),

('shipping-info', 'Shipping Information', 
'<div class="shipping-info">
  <h1>Shipping Information</h1>
  
  <h2>Delivery Areas</h2>
  <p>We deliver nationwide across Kenya with the following timelines:</p>
  
  <ul>
    <li><strong>Nairobi:</strong> 1-2 business days - Ksh 200</li>
    <li><strong>Major Towns:</strong> 2-3 business days - Ksh 300</li>
    <li><strong>Remote Areas:</strong> 3-5 business days - Ksh 500</li>
  </ul>
  
  <h2>Courier Partners</h2>
  <p>We work with trusted courier services including G4S, DHL, and local delivery partners.</p>
  
  <h2>Free Shipping</h2>
  <p>Enjoy free shipping on orders above Ksh 5,000 within Nairobi.</p>
</div>',
'Shipping Information - Herstyle', 'Learn about our shipping options, delivery times and costs across Kenya.'),

('returns-policy', 'Returns Policy', 
'<div class="returns-policy">
  <h1>Returns & Exchanges</h1>
  
  <h2>Return Window</h2>
  <p>You have <strong>14 days</strong> from the date of delivery to return any item.</p>
  
  <h2>Eligibility</h2>
  <ul>
    <li>Items must be unworn with original tags</li>
    <li>Items must be in original packaging</li>
    <li>Underwear and swimwear cannot be returned for hygiene reasons</li>
  </ul>
  
  <h2>Return Process</h2>
  <ol>
    <li>Contact our customer service team</li>
    <li>Package your items securely</li>
    <li>Use our prepaid return label</li>
    <li>Refund processed within 5-7 business days</li>
  </ol>
  
  <h2>Exchanges</h2>
  <p>We offer free size exchanges within 14 days of purchase.</p>
</div>',
'Returns Policy - Herstyle', 'Learn about our returns and exchange policy for hassle-free shopping.'),

('size-guide', 'Size Guide', 
'<div class="size-guide">
  <h1>Size Guide</h1>
  
  <h2>Women''s Clothing</h2>
  <table>
    <thead>
      <tr><th>Size</th><th>Bust (cm)</th><th>Waist (cm)</th><th>Hips (cm)</th></tr>
    </thead>
    <tbody>
      <tr><td>XS</td><td>80-84</td><td>60-64</td><td>86-90</td></tr>
      <tr><td>S</td><td>84-88</td><td>64-68</td><td>90-94</td></tr>
      <tr><td>M</td><td>88-92</td><td>68-72</td><td>94-98</td></tr>
      <tr><td>L</td><td>92-96</td><td>72-76</td><td>98-102</td></tr>
      <tr><td>XL</td><td>96-100</td><td>76-80</td><td>102-106</td></tr>
    </tbody>
  </table>
  
  <h2>How to Measure</h2>
  <ul>
    <li><strong>Bust:</strong> Measure around the fullest part of your chest</li>
    <li><strong>Waist:</strong> Measure around your natural waistline</li>
    <li><strong>Hips:</strong> Measure around the fullest part of your hips</li>
  </ul>
</div>',
'Size Guide - Herstyle', 'Find your perfect fit with our comprehensive size guide for women''s clothing.'),

('faq', 'Frequently Asked Questions', 
'<div class="faq">
  <h1>Frequently Asked Questions</h1>
  
  <h3>How do I place an order?</h3>
  <p>Simply browse our collection, add items to your cart, and proceed to checkout. You can pay via M-Pesa, card, or bank transfer.</p>
  
  <h3>What payment methods do you accept?</h3>
  <p>We accept M-Pesa, Visa, Mastercard, and direct bank transfers.</p>
  
  <h3>How long does delivery take?</h3>
  <p>Delivery typically takes 1-5 business days depending on your location. See our shipping info for details.</p>
  
  <h3>Can I return an item?</h3>
  <p>Yes! You have 14 days to return any item in its original condition. Check our returns policy for full details.</p>
  
  <h3>Do you have a physical store?</h3>
  <p>Yes! Visit us at Westgate Mall in Nairobi. Our store hours are Monday-Saturday 10 AM-8 PM, Sunday 11 AM-6 PM.</p>
  
  <h3>How can I track my order?</h3>
  <p>Once your order ships, you''ll receive a tracking number via SMS and email.</p>
</div>',
'FAQ - Herstyle', 'Find answers to common questions about shopping, shipping, returns and more.'),

('terms-of-service', 'Terms of Service', 
'<div class="terms">
  <h1>Terms of Service</h1>
  <p><em>Last updated: [Date]</em></p>
  
  <h2>1. Acceptance of Terms</h2>
  <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>
  
  <h2>2. Use License</h2>
  <p>Permission is granted to temporarily download one copy of the materials on Herstyle''s website for personal, non-commercial transitory viewing only.</p>
  
  <h2>3. Disclaimer</h2>
  <p>The materials on Herstyle''s website are provided on an ''as is'' basis. Herstyle makes no warranties, expressed or implied.</p>
  
  <h2>4. Limitations</h2>
  <p>In no event shall Herstyle or its suppliers be liable for any damages arising out of the use or inability to use the materials on this website.</p>
  
  <h2>5. Privacy Policy</h2>
  <p>Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the website.</p>
  
  <h2>Contact Information</h2>
  <p>Questions about the Terms of Service should be sent to us at legal@herstyle.co.ke</p>
</div>',
'Terms of Service - Herstyle', 'Read our terms of service and user agreement for using the Herstyle website.'),

('privacy-policy', 'Privacy Policy', 
'<div class="privacy">
  <h1>Privacy Policy</h1>
  <p><em>Last updated: [Date]</em></p>
  
  <h2>Information We Collect</h2>
  <p>We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us.</p>
  
  <h2>How We Use Your Information</h2>
  <ul>
    <li>To process and fulfill your orders</li>
    <li>To communicate with you about your account or transactions</li>
    <li>To improve our website and services</li>
    <li>To send you marketing communications (with your consent)</li>
  </ul>
  
  <h2>Information Sharing</h2>
  <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.</p>
  
  <h2>Data Security</h2>
  <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
  
  <h2>Your Rights</h2>
  <p>You have the right to access, update, or delete your personal information. Contact us at privacy@herstyle.co.ke for any requests.</p>
  
  <h2>Contact Us</h2>
  <p>If you have questions about this Privacy Policy, please contact us at privacy@herstyle.co.ke</p>
</div>',
'Privacy Policy - Herstyle', 'Learn how we collect, use, and protect your personal information.'),

('cookie-policy', 'Cookie Policy', 
'<div class="cookies">
  <h1>Cookie Policy</h1>
  <p><em>Last updated: [Date]</em></p>
  
  <h2>What Are Cookies</h2>
  <p>Cookies are small text files stored on your device when you visit our website. They help us provide you with a better experience.</p>
  
  <h2>Types of Cookies We Use</h2>
  <h3>Essential Cookies</h3>
  <p>These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas.</p>
  
  <h3>Analytics Cookies</h3>
  <p>These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.</p>
  
  <h3>Marketing Cookies</h3>
  <p>These cookies track your online activity to help us deliver more relevant advertising and limit how many times you see an ad.</p>
  
  <h2>Managing Cookies</h2>
  <p>You can control cookies through your browser settings. However, disabling certain cookies may affect your experience on our website.</p>
  
  <h2>Third-Party Cookies</h2>
  <p>Some cookies are placed by third-party services that appear on our pages, such as Google Analytics and social media platforms.</p>
  
  <h2>Contact Us</h2>
  <p>If you have questions about our cookie policy, contact us at privacy@herstyle.co.ke</p>
</div>',
'Cookie Policy - Herstyle', 'Learn about how we use cookies to improve your browsing experience.')

ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  meta_title = EXCLUDED.meta_title,
  meta_description = EXCLUDED.meta_description,
  updated_at = now();

-- Create settings table entries for footer and site configuration
INSERT INTO public.settings (key, value, type, category, description) VALUES
('site_logo_url', 'https://cbxzzudqfyilqhamztvo.supabase.co/storage/v1/object/public/logo/herstylelogo.png', 'string', 'general', 'Main site logo URL'),
('company_name', 'Herstyle', 'string', 'general', 'Company name'),
('company_location', 'Westgate Mall, Nairobi, Kenya', 'string', 'general', 'Company physical location'),
('contact_phone', '+254 700 123 456', 'string', 'contact', 'Primary contact phone number'),
('contact_email', 'hello@herstyle.co.ke', 'string', 'contact', 'Primary contact email'),
('social_facebook', '#', 'string', 'social', 'Facebook page URL'),
('social_instagram', '#', 'string', 'social', 'Instagram profile URL'),
('social_linkedin', '#', 'string', 'social', 'LinkedIn profile URL'),
('cookie_consent_enabled', 'true', 'boolean', 'privacy', 'Enable cookie consent banner'),
('free_shipping_threshold', '5000', 'number', 'shipping', 'Minimum order value for free shipping (KES)')

ON CONFLICT (key) DO UPDATE SET
  value = EXCLUDED.value,
  updated_at = now();
