<?php
// 1. Define allowed origins (your React app's local addresses)
$allowed_origins = [
    "http://localhost:5173", // Standard Vite dev server
    "http://localhost:3000"  // Standard Create React App server
];

// 2. Check if the incoming request comes from an allowed origin
if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
}

header('Content-Type: application/json');

// Ensure it is a POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
    exit;
}

// Read incoming JSON or form data
$input = json_decode(file_get_contents('php://input'), true);
$recaptchaResponse = $input['g-recaptcha-response'] ?? $_POST['g-recaptcha-response'] ?? '';

if (empty($recaptchaResponse)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'reCAPTCHA token is missing.']);
    exit;
}

$secretKey = 'YOUR_GOOGLE_RECAPTCHA_SECRET_KEY'; // Replace with your actual secret key
$verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';

// Prepare POST data for Google
$postData = http_build_query([
    'secret' => $secretKey,
    'response' => $recaptchaResponse,
    'remoteip' => $_SERVER['REMOTE_ADDR']
]);

// Initialize cURL request
$ch = curl_init($verifyUrl);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$apiResponse = curl_exec($ch);
curl_close($ch);

if (!$apiResponse) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to connect to verification server.']);
    exit;
}

$responseData = json_decode($apiResponse, true);

// Check if verification succeeded
if ($responseData['success'] === true) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'reCAPTCHA verified successfully.'
    ]);
} else {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'reCAPTCHA validation failed.',
        'error-codes' => $responseData['error-codes'] ?? []
    ]);
}
