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
 *  2. Copy public/enquiry-config.sample.php to enquiry-config.php next to this
 *     file and fill in the SMTP host / username / password. When present, this
 *     script authenticates over SMTP instead of using mail() — this is what
 *     stops messages being flagged as spam.
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
];
if (is_file(__DIR__ . '/enquiry-config.php')) {
    $override = include __DIR__ . '/enquiry-config.php';
    if (is_array($override)) { $config = array_merge($config, $override); }
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

if ($sent) {
    http_response_code(200);
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'mail_failed']);
}
