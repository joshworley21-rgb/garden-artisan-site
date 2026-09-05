<?php
/**
 * JW Garden Services — enquiry form handler (self-hosted / Hostinger).
 *
 * DELIVERABILITY NOTE
 * -------------------
 * Enquiries land in spam when mail is sent by PHP mail() from an address that
 * the sending server is not authorised to use. To fix it properly:
 *
 *  1. Create a real mailbox on your own domain in Hostinger hPanel, e.g.
 *     info@jw-gardenservices.co.uk
 *  2. Copy public/enquiry-config.sample.php to enquiry-config.php and fill in
 *     the SMTP host / username / password. Put it in the folder ABOVE
 *     public_html: a Git deploy wipes everything inside public_html, so a copy
 *     kept beside this file is deleted every time the site is deployed. When
 *     present, this script authenticates over SMTP instead of using mail() —
 *     this is what stops messages being flagged as spam.
 *  3. Make sure your DNS has SPF, DKIM and DMARC records for jw-gardenservices.co.uk
 *     (Hostinger adds SPF + DKIM automatically for its own mail service).
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$raw  = file_get_contents('php://input');
$data = json_decode($raw, true);
if (json_last_error() !== JSON_ERROR_NONE) { $data = $_POST; }
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid request']);
    exit;
}

// --- Validate ---
$name    = trim($data['name']    ?? '');
$email   = trim($data['email']   ?? '');
$phone   = trim($data['phone']   ?? '');
$message = trim($data['message'] ?? '');
$source  = trim($data['source_page'] ?? '');

$errors = [];
if ($name === '' || mb_strlen($name) > 100) $errors[] = 'name';
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email) > 255) $errors[] = 'email';
if ($phone !== '' && mb_strlen($phone) > 40) $errors[] = 'phone';
if ($message === '' || mb_strlen($message) > 2000) $errors[] = 'message';
if (!empty($errors)) {
    http_response_code(422);
    echo json_encode(['error' => 'validation', 'fields' => $errors]);
    exit;
}

// Strip anything header-injectable from values used in headers.
$clean = static fn (string $v): string => trim(str_replace(["\r", "\n"], ' ', $v));
$name  = $clean($name);
$email = $clean($email);

// --- Config ---
$config = [
    // One address, or several — every one of them gets a copy.
    'to'          => ['info@jw-gardenservices.co.uk', 'Jw_gardenservices@yahoo.com'],
    'from_email'  => 'info@jw-gardenservices.co.uk',
    'from_name'   => 'JW Garden Services Website',
    'smtp_host'   => '',
    'smtp_port'   => 465,
    'smtp_secure' => 'ssl',       // 'ssl' (465) or 'tls' (587)
    'smtp_user'   => '',
    'smtp_pass'   => '',

    // Optional: also file the enquiry in the JW Garden Services CRM app, so it
    // appears in the Enquiries inbox and can be turned into a client or a quote
    // without retyping it. Both must be set for forwarding to happen; put them
    // in enquiry-config.php, not here.
    'crm_endpoint' => '',
    'crm_key'      => '',
];
// Deploying replaces everything in public_html with the contents of the deploy
// branch, and this config is deliberately not in the branch — it holds the
// mailbox password. A copy sitting next to this file is therefore deleted by
// every deploy, so the directory above public_html is checked first: it is
// outside the web root, survives deploys, and cannot be served over HTTP.
foreach ([dirname(__DIR__) . '/enquiry-config.php', __DIR__ . '/enquiry-config.php'] as $configPath) {
    if (!is_file($configPath)) { continue; }
    $override = include $configPath;
    if (is_array($override)) { $config = array_merge($config, $override); }
    break;
}

$domain  = preg_replace('/^www\./', '', $_SERVER['HTTP_HOST'] ?? 'jw-gardenservices.co.uk');
$subject = 'Website enquiry from ' . $name;
$body    = "New enquiry from your website\n\n"
         . "Name:    {$name}\n"
         . "Email:   {$email}\n"
         . ($phone !== '' ? "Phone:   {$phone}\n" : '')
         . "Page:    {$source}\n\n"
         . "Message:\n{$message}\n";

$messageId = '<' . bin2hex(random_bytes(12)) . '@' . $domain . '>';
$headers = [
    'Date'         => gmdate('D, d M Y H:i:s') . ' +0000',
    'From'         => sprintf('"%s" <%s>', $config['from_name'], $config['from_email']),
    'Reply-To'     => sprintf('"%s" <%s>', $name, $email),
    'Message-ID'   => $messageId,
    'MIME-Version' => '1.0',
    'Content-Type' => 'text/plain; charset=UTF-8',
    'Content-Transfer-Encoding' => '8bit',
    'X-Auto-Response-Suppress'  => 'OOF',
];

/** Minimal authenticated SMTP sender (no external dependencies). */
function smtp_send(array $c, array $to, string $subject, string $body, array $headers): bool
{
    $transport = $c['smtp_secure'] === 'ssl' ? 'ssl://' : 'tcp://';
    $fp = @stream_socket_client($transport . $c['smtp_host'] . ':' . $c['smtp_port'], $eno, $estr, 15);
    if (!$fp) { return false; }
    stream_set_timeout($fp, 15);

    $read = static function () use ($fp): string {
        $out = '';
        while (($line = fgets($fp, 1024)) !== false) {
            $out .= $line;
            if (strlen($line) < 4 || $line[3] !== '-') { break; }
        }
        return $out;
    };
    $cmd = static function (string $c, string $expect) use ($fp, $read): bool {
        if ($c !== '') { fwrite($fp, $c . "\r\n"); }
        $r = $read();
        return strncmp($r, $expect, strlen($expect)) === 0;
    };

    if (!$cmd('', '220')) { fclose($fp); return false; }
    $ok = $cmd('EHLO ' . ($_SERVER['HTTP_HOST'] ?? 'localhost'), '250');
    if ($ok && $c['smtp_secure'] === 'tls') {
        $ok = $cmd('STARTTLS', '220')
            && stream_socket_enable_crypto($fp, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)
            && $cmd('EHLO ' . ($_SERVER['HTTP_HOST'] ?? 'localhost'), '250');
    }
    $ok = $ok
        && $cmd('AUTH LOGIN', '334')
        && $cmd(base64_encode($c['smtp_user']), '334')
        && $cmd(base64_encode($c['smtp_pass']), '235')
        && $cmd('MAIL FROM:<' . $c['from_email'] . '>', '250');

    // One RCPT TO per recipient, before DATA — that is what puts a copy in each inbox.
    foreach ($to as $recipient) {
        $ok = $ok && $cmd('RCPT TO:<' . $recipient . '>', '250');
    }
    $ok = $ok && $cmd('DATA', '354');

    if ($ok) {
        $lines = ['To: ' . implode(', ', $to), "Subject: {$subject}"];
        foreach ($headers as $k => $v) { $lines[] = "{$k}: {$v}"; }
        $data = implode("\r\n", $lines) . "\r\n\r\n"
              . preg_replace('/^\./m', '..', str_replace("\n", "\r\n", $body));
        fwrite($fp, $data . "\r\n.\r\n");
        $ok = $cmd('', '250');
    }
    $cmd('QUIT', '221');
    fclose($fp);
    return $ok;
}

// Accept either a single address or a list, so an older config keeps working.
$recipients = array_values(array_filter(array_map('trim', (array) $config['to'])));
if (!$recipients) {
    http_response_code(500);
    echo json_encode(['error' => 'no_recipient']);
    exit;
}

$sent = false;
if ($config['smtp_host'] !== '' && $config['smtp_user'] !== '') {
    $sent = smtp_send($config, $recipients, $subject, $body, $headers);
}

if (!$sent) {
    // Fallback: mail() with a matching envelope sender (-f) so SPF can pass.
    $hdr = '';
    foreach ($headers as $k => $v) { $hdr .= "{$k}: {$v}\r\n"; }
    $sent = @mail(implode(', ', $recipients), $subject, $body, $hdr, '-f' . $config['from_email']);
}

/**
 * File the enquiry in the CRM as well as emailing it.
 *
 * Deliberately after the email and never able to change the outcome: the email
 * is the part the business has always relied on, and an enquiry from a paying
 * customer must not be lost because an API somewhere was slow. If this fails,
 * it fails quietly and the email has already gone.
 *
 * `notify` is the inverse of whether the email got out. The CRM sends its own
 * notification, so telling it the customer has already been emailed avoids two
 * copies of every enquiry — but if the mail above failed, the CRM becomes the
 * one that tells you, and nothing is missed.
 */
function crm_forward(array $c, array $fields, bool $alreadyEmailed): bool
{
    if (empty($c['crm_endpoint']) || empty($c['crm_key'])) { return false; }

    $payload = json_encode([
        'key'     => $c['crm_key'],
        'name'    => $fields['name'],
        'email'   => $fields['email'],
        'phone'   => $fields['phone'],
        'message' => $fields['message'],
        'source'  => $fields['source'] !== '' ? $fields['source'] : 'website',
        'notify'  => !$alreadyEmailed,
    ]);

    if (function_exists('curl_init')) {
        $ch = curl_init($c['crm_endpoint']);
        curl_setopt_array($ch, [
            CURLOPT_POST           => true,
            CURLOPT_POSTFIELDS     => $payload,
            CURLOPT_HTTPHEADER     => ['Content-Type: application/json'],
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT        => 8,
            CURLOPT_CONNECTTIMEOUT => 5,
        ]);
        $body = curl_exec($ch);
        $status = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
        $error = curl_error($ch);
        curl_close($ch);
        if ($status >= 200 && $status < 300) { return true; }
        // Quietly failing is right, but silently failing is not: without the
        // reason there is nothing to go on when enquiries stop arriving.
        error_log('enquiry.php: CRM forward failed (HTTP ' . $status . ') '
            . ($error !== '' ? $error : substr((string) $body, 0, 300)));
        return false;
    }

    // Shared hosting without curl still has the stream wrappers.
    $body = @file_get_contents($c['crm_endpoint'], false, stream_context_create([
        'http' => [
            'method'        => 'POST',
            'header'        => "Content-Type: application/json\r\n",
            'content'       => $payload,
            'timeout'       => 8,
            'ignore_errors' => true,
        ],
    ]));
    if ($body === false) {
        error_log('enquiry.php: CRM forward failed (no response)');
        return false;
    }

    // $http_response_header is set by the stream wrapper on the call above.
    $status = isset($http_response_header[0]) && preg_match('#\s(\d{3})\s#', $http_response_header[0], $m)
        ? (int) $m[1]
        : 0;
    if ($status >= 200 && $status < 300) { return true; }
    error_log('enquiry.php: CRM forward failed (HTTP ' . $status . ') ' . substr($body, 0, 300));
    return false;
}

$filedInCrm = crm_forward(
    $config,
    ['name' => $name, 'email' => $email, 'phone' => $phone, 'message' => $message, 'source' => $source],
    $sent,
);

if ($sent) {
    http_response_code(200);
    echo json_encode(['success' => true]);
} else {
    // The email failed. Only claim success if the CRM actually accepted it —
    // telling a customer their message arrived when nothing caught it is the
    // one outcome worth avoiding above all others here.
    http_response_code($filedInCrm ? 200 : 500);
    echo json_encode($filedInCrm ? ['success' => true] : ['error' => 'mail_failed']);
}
