<?php
/**
 * Copy this file to enquiry-config.php (same folder) on your host and fill in
 * the mailbox details created in Hostinger hPanel > Emails.
 * Do NOT commit the filled-in version anywhere public.
 */
return [
    // Where enquiries are delivered. One address, or a list for several —
    // each one receives its own copy.
    'to'          => [
        'info@jw-gardenservices.co.uk',
        'Jw_gardenservices@yahoo.com',
    ],

    // Must be a real mailbox on your own domain
    'from_email'  => 'info@jw-gardenservices.co.uk',
    'from_name'   => 'JW Garden Services Website',

    // Hostinger SMTP (see hPanel > Emails > Configuration settings)
    'smtp_host'   => 'smtp.hostinger.com',
    'smtp_port'   => 465,
    'smtp_secure' => 'ssl',           // 'ssl' for 465, 'tls' for 587
    'smtp_user'   => 'info@jw-gardenservices.co.uk',
    'smtp_pass'   => 'YOUR-MAILBOX-PASSWORD',

    // --- JW Garden Services CRM (optional) ---
    //
    // Fill these in and every enquiry is also filed in the CRM app's Enquiries
    // inbox, where it can be turned into a client or a quote without retyping
    // it. Leave them empty and the form behaves exactly as it always has.
    //
    // The key is on the Enquiries screen in the app. It is not a password —
    // it only identifies which business an enquiry belongs to — but there is
    // no reason to publish it, which is why it lives here rather than in the
    // website's source code.
    //
    // The email you already get is unchanged. The CRM is told the customer has
    // been emailed already, so no enquiry arrives twice; if the email above
    // fails, the CRM sends one instead and nothing is lost.
    'crm_endpoint' => 'https://ugbjwgfmsrkclrzpfwgz.supabase.co/functions/v1/public-enquiry',
    'crm_key'      => 'YOUR-ENQUIRY-KEY',
];
