<?php

// Functions
function httpResponse(int $code, bool $success, string $message, array $data)
{
    header("Content-Type: application/json", true, $code);
    echo json_encode([
        "success" => $success,
        "message" => $message,
        "data" => $data
    ]);
}

//  Define your whitelist of trusted origins
$allowedOrigins = [
    "http://localhost",       // VSCode REST API
    "http://localhost:5173",  // Standard Vite dev server
    "http://localhost:5173/", // Standard Vite dev server
    "https://openaps.co.za",
    "https://www.openaps.co.za"
];

// Check if the incoming request has an Origin header
if (isset($_SERVER["HTTP_ORIGIN"]) || isset($_SERVER["HTTP_REFERER"])) {
    $origin = $_SERVER["HTTP_ORIGIN"] ?? $_SERVER["HTTP_REFERER"];

    // Verify if origin is in the allowed list
    if (in_array($origin, $allowedOrigins, true)) {
        header("Access-Control-Allow-Origin: $origin");
        header("Access-Control-Allow-Credentials: true");
        header("Vary: Origin");
    } else {
        httpResponse(403, false, "Forbidden: Direct access not allowed.", ["origin" => $origin]);
        exit();
    }
}

// Handle browser preflight OPTIONS requests
if (isset($_SERVER["REQUEST_METHOD"]) && $_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
    header("Access-Control-Max-Age: 86400"); // Cache preflight response for 1 day
    http_response_code(204);
    exit(0);
}

// Define allowed methods and headers
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Restrict the endpoint strictly to POST requests
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    httpResponse(405, false, "Only POST requests are allowed.", []);
    exit();
}

// Safely load the configuration from outside the public folder
$config = include __DIR__ . "/../../config.php";

// Expose it to your runtime via putenv() to mimic an environment variable
if (isset($config["RECAPTCHA_API_KEY"])) {
    putenv("RECAPTCHA_API_KEY=" . $config["RECAPTCHA_API_KEY"]);
}

// Test and consume the environment variable
$recaptchaApiKey = getenv("RECAPTCHA_API_KEY");

if (!$recaptchaApiKey || strlen($recaptchaApiKey) < 40 || str_contains($recaptchaApiKey, ' ')) {
    httpResponse(500, false, "API Configuration error.", []);
    exit();
}

// Read raw data from the request body (php://input)
$rawInput = file_get_contents("php://input", true);
$data = json_decode($rawInput, true);
$recaptchaToken = $data["token"] ?? "";

if (empty($recaptchaToken)) {
    httpResponse(400, false, "eCAPTCHA token is missing.", [
        "recaptchaToken" => $recaptchaToken
    ]);
    exit();
}

// Prepare POST data for Google
$postData = http_build_query([
    "secret" => $recaptchaApiKey,
    "response" => $recaptchaToken,
    "remoteip" => $_SERVER["REMOTE_ADDR"] ?? ""
]);

$verificationUrl = "https://www.google.com/recaptcha/api/siteverify";

// Initialize cURL request
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $verificationUrl);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);

if (!$response) {
    httpResponse(500, false, "Failed to connect to verification server.", ["url" => $verificationUrl]);
    exit();
}

// Decode and validate the JSON response
$responseKeys = json_decode($response, true);

// Check if verification succeeded
if ($responseKeys && $responseKeys['success']) {
    httpResponse(200, true, "reCAPTCHA verified successfully.", $responseKeys);
} else {
    // httpResponse(200, false, "reCAPTCHA validation failed.", $responseKeys['error-codes'] ?? ['Unknown error']);
    httpResponse(200, false, "reCAPTCHA validation failed.", $responseKeys);
}
