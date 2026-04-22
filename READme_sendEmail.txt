To make it work, you need to:

1.Create an EmailJS account at https://www.emailjs.com/

2.Get your credentials from the EmailJS dashboard:
  Public Key
  Service ID
  Template ID

3.Update js/contact.js with your actual credentials:
  Replace YOUR_PUBLIC_KEY with your EmailJS public key
  Replace YOUR_SERVICE_ID with your email service ID
  Replace YOUR_TEMPLATE_ID with your email template ID
4.Create an email template in EmailJS with these variables:
  {{from_name}}
  {{from_email}}
  {{phone}}
  {{subject}}
  {{message}}

Once configured, messages from the contact form will be sent to info@techhub.com.



OR with PHP

1.contact-process.php - PHP script that:
  Validates form inputs (name, email, message)
  Sanitizes data for security
  Sends email to info@techhub.com using PHP's mail() function
  Returns JSON response (success/error)
2.Updated js/contact.js - JavaScript that:
  Sends form data to PHP via Fetch API
  Shows loading state while sending
  Displays success/error messages

Important: For the PHP mail to work, your server needs:

  A properly configured SMTP server
  PHP's mail() function enabled
  The From email address (noreply@techhub.com) must be a valid registered email on your server
If you're using shared hosting, contact your hosting provider to enable email functionality.

AND

The PHP file now uses only the built-in mail() function and is error-free.

Requirements for it to work:

 1 Server must have SMTP properly configured (contact your hosting provider)
 2 The "From" address (noreply@yourdomain.com) must be a valid registered email on your server
 3 Your web host must have PHP's mail() function enabled

If you're using Gmail SMTP, you can integrate PHPMailer by:

  Downloading PHPMailer from https://github.com/PHPMailer/PHPMailer
  Updating the SMTP settings in the PHP file with your Gmail credentials
  Using an App Password (not your regular Gmail password) - get it from Google Account > Security > 2-Step Verification > App Passwords