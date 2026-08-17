<?php
/**
 * JW Garden Services — enquiry form handler for self-hosted (Hostinger) deployment.
 *
 * Receives POST JSON from the contact form, validates it, and emails the
 * enquiry to Jw_gardenservices@yahoo.com using PHP's mail() function.
 *
 * This replaces the Lovable Cloud / Supabase database backend so the site is
 * fully self-contained on shared hosting.
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    // Also accept standard form-encoded POST
    $data = $_POST;
}

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
if ($name === '' || mb_strlen($name) > 100)        $errors[] = 'name';
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email) > 255) $errors[] = 'email';
if ($phone !== '' && mb_strlen($phone) > 40)       $errors[] = 'phone';
if ($message === '' || mb_strlen($message) > 2000) $errors[] = 'message';

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode(['error' => 'validation', 'fields' => $errors]);
    exit;
}

// --- Compose email ---
$to      = 'Jw_gardenservices@yahoo.com';
$subject = 'New website enquiry from ' . $name;
$body    = "New enquiry from your website\n\n";
$body   .= "Name:    {$name}\n";
$body   .= "Email:   {$email}\n";
if ($phone !== '') $body .= "Phone:   {$phone}\n";
$body   .= "Page:    {$source}\n\n";
$body   .= "Message:\n{$message}\n";

$headers  = "From: website@jw-gardening.com\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$sent = @mail($to, $subject, $body, $headers);

if ($sent) {
    http_response_code(200);
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'mail_failed']);
}
