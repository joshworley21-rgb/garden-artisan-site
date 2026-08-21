<?php
/**
 * Copy this file to enquiry-config.php (same folder) on your host and fill in
 * the mailbox details created in Hostinger hPanel > Emails.
 * Do NOT commit the filled-in version anywhere public.
 */
return [
    // Where enquiries are delivered
    'to'          => 'Jw_gardenservices@yahoo.com',

    // Must be a real mailbox on your own domain
    'from_email'  => 'info@jw-gardenservices.co.uk',
    'from_name'   => 'JW Garden Services Website',

    // Hostinger SMTP (see hPanel > Emails > Configuration settings)
    'smtp_host'   => 'smtp.hostinger.com',
    'smtp_port'   => 465,
    'smtp_secure' => 'ssl',           // 'ssl' for 465, 'tls' for 587
    'smtp_user'   => 'info@jw-gardenservices.co.uk',
    'smtp_pass'   => 'YOUR-MAILBOX-PASSWORD',
];
