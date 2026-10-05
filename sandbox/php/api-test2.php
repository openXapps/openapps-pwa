<?php

// Init vars
// $gr = getenv('GR') ? 'No GR' : $_ENV['GR'];
$gr = $_ENV['GR'];
$verification_url = 'https://www.google.com/recaptcha/api/siteverify';
$user_ip = $_SERVER['REMOTE_ADDR'];

// Define allowed origins (your React app's local addresses)
$allowed_origins = [
    "http://localhost:5173", // Standard Vite dev server
    "https://openaps.co.za",
    "https://www.openaps.co.za"
];

// Check if the incoming request comes from an allowed origin
if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
}

// Define allowed methods and headers
// header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Handle HTTP OPTIONS preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Browsers send a preflight OPTIONS request before making a POST request
    http_response_code(204); // No Content
    exit();
}

// Enforce JSON content type for the actual request
header("Content-Type: application/json; charset=UTF-8");

// Restrict the endpoint strictly to POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    echo json_encode([
        "status" => false,
        "message" => "Only POST requests are allowed."
    ]);
    exit();
}

// Read raw data from the request body (php://input)
$raw_input = file_get_contents("php://input");
$data = json_decode($raw_input, true);

// Validate incoming data payload
if (!isset($data['val1']) || !isset($data['val2'])) {
    http_response_code(400); // Bad Request
    echo json_encode([
        "status" => false,
        "message" => "Incomplete data."
    ]);
    exit();
}

// Sanitize and prepare data for database processing (Placeholder)
$val1 = htmlspecialchars(strip_tags($data['val1']));
$val2 = htmlspecialchars(strip_tags($data['val2']));
// $email = filter_var($data['val2'], FILTER_SANITIZE_EMAIL);

// --- Your Database Logic Goes Here ---
// Example: $stmt = $pdo->prepare("INSERT INTO users (name, email) VALUES (?, ?)");
// $stmt->execute([$name, $email]);

// Return a successful creation response
// http_response_code(201); // Created
http_response_code(200); // Success
echo json_encode([
    "status" => true,
    "message" => "Request processed successfully.",
    "data" => [
        "val1" => $val1,
        "val2" => $val2,
        "gr" => $gr,
        "verificationUrl" => $verification_url,
        "userIp" => $user_ip
    ]
]);
