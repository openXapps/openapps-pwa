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

// 3. Define allowed methods and headers
// header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// 4. Handle HTTP OPTIONS preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Browsers send a preflight OPTIONS request before making a POST request
    http_response_code(204); // No Content
    exit();
}

// 5. Enforce JSON content type for the actual request
header("Content-Type: application/json; charset=UTF-8");

// 3. Read raw data from the request body (php://input)
$raw_input = file_get_contents("php://input");
$data = json_decode($raw_input, true);

// 4. Validate incoming data payload
if (!isset($data['name']) || !isset($data['email'])) {
    http_response_code(400); // Bad Request
    echo json_encode([
        "status" => false,
        "message" => "Incomplete data. 'name' and 'email' fields are required."
    ]);
    exit();
}

// 5. Sanitize and prepare data for database processing (Placeholder)
$name = htmlspecialchars(strip_tags($data['name']));
$email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);

// --- Your Database Logic Goes Here ---
// Example: $stmt = $pdo->prepare("INSERT INTO users (name, email) VALUES (?, ?)");
// $stmt->execute([$name, $email]);

// 6. Return a successful creation response
http_response_code(201); // Created
echo json_encode([
    "status" => true,
    "message" => "Resource created successfully.",
    "data" => [
        "name" => $name,
        "email" => $email
    ]
]);
