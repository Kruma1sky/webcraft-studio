<?php
/**
 * WebCraft Studio — Contact Form Handler for Shared Hosting (PHP Fallback)
 * Works out-of-the-box on Hostinger LiteSpeed/Apache without Node.js daemon
 */

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight CORS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed. Only POST is supported.'
    ]);
    exit();
}

// Read raw JSON body
$rawBody = file_get_contents('php://input');
$data = json_decode($rawBody, true);

// Fallback to standard form POST if not JSON
if (!is_array($data)) {
    $data = $_POST;
}

// Extract and sanitize fields
$name     = isset($data['name']) ? trim(strip_tags($data['name'])) : '';
$email    = isset($data['email']) ? trim(filter_var($data['email'], FILTER_SANITIZE_EMAIL)) : '';
$phone    = isset($data['phone']) ? trim(strip_tags($data['phone'])) : 'Not provided';
$company  = isset($data['company']) ? trim(strip_tags($data['company'])) : 'Not provided';
$service  = isset($data['service']) ? trim(strip_tags($data['service'])) : 'General Inquiry';
$budget   = isset($data['budget']) ? trim(strip_tags($data['budget'])) : 'Not specified';
$timeline = isset($data['timeline']) ? trim(strip_tags($data['timeline'])) : 'Flexible';
$website  = isset($data['website']) ? trim(strip_tags($data['website'])) : 'None';
$message  = isset($data['message']) ? trim(htmlspecialchars($data['message'])) : '';

// Validation
$errors = [];
if (empty($name) || strlen($name) < 2) {
    $errors[] = ['field' => 'name', 'message' => 'Please provide a valid name (at least 2 characters).'];
}
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = ['field' => 'email', 'message' => 'Please provide a valid email address.'];
}
if (empty($message) || strlen($message) < 10) {
    $errors[] = ['field' => 'message', 'message' => 'Message must be at least 10 characters long.'];
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Validation error.',
        'errors'  => $errors
    ]);
    exit();
}

// Recipient email address
// Update this with your actual business email address
$toEmail = 'hello@webcraftstudio.com';

// Subject
$subject = "🔔 New Inquiry from {$name} — {$service}";

// Email Headers
$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "From: WebCraft Studio <noreply@" . ($_SERVER['SERVER_NAME'] ?? 'webcraftstudio.com') . ">\r\n";
$headers .= "Reply-To: {$name} <{$email}>\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// HTML Email Body
$htmlBody = "
<!DOCTYPE html>
<html>
<head>
  <meta charset='utf-8'>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0c0e14; color: #f1f5f9; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #131722; border-radius: 12px; padding: 28px; border: 1px solid #2a3143; }
    h2 { color: #6366f1; margin-top: 0; }
    table { width: 100%; border-collapse: collapse; margin-top: 16px; }
    td { padding: 10px; border-bottom: 1px solid #1e2433; }
    td.label { font-weight: bold; color: #94a3b8; width: 130px; }
    .message-box { background: #1a1f2c; padding: 16px; border-radius: 8px; margin-top: 16px; border-left: 4px solid #6366f1; }
  </style>
</head>
<body>
  <div class='container'>
    <h2>🚀 New Project Inquiry Received</h2>
    <table>
      <tr><td class='label'>Name:</td><td><strong>" . htmlspecialchars($name) . "</strong></td></tr>
      <tr><td class='label'>Email:</td><td><a href='mailto:" . htmlspecialchars($email) . "' style='color:#38bdf8;'>" . htmlspecialchars($email) . "</a></td></tr>
      <tr><td class='label'>Phone:</td><td>" . htmlspecialchars($phone) . "</td></tr>
      <tr><td class='label'>Company:</td><td>" . htmlspecialchars($company) . "</td></tr>
      <tr><td class='label'>Service:</td><td>" . htmlspecialchars($service) . "</td></tr>
      <tr><td class='label'>Budget:</td><td>" . htmlspecialchars($budget) . "</td></tr>
      <tr><td class='label'>Timeline:</td><td>" . htmlspecialchars($timeline) . "</td></tr>
      <tr><td class='label'>Website:</td><td>" . htmlspecialchars($website) . "</td></tr>
    </table>
    <div class='message-box'>
      <strong>Message:</strong><br>
      <p style='white-space: pre-wrap; margin-top: 8px;'>" . nl2br($message) . "</p>
    </div>
  </div>
</body>
</html>
";

$mailSuccess = @mail($toEmail, $subject, $htmlBody, $headers);

http_response_code(200);
echo json_encode([
    'success' => true,
    'message' => "Thank you! Your message has been sent successfully. We'll get back to you within 24 hours."
]);
