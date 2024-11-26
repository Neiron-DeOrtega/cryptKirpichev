<?php

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['error' => 'Invalid request method']);
    exit;
}

$password = $_POST['password'] ?? null;
$hash = $_POST['hash'] ?? null;

if (!$password) {
    echo json_encode(['error' => 'Password is required']);
    exit;
}

if (!$hash) {
    $salt = substr(str_shuffle('./0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'), 0, 2);
    $encrypted = crypt($password, $salt);

    if (!$encrypted || str_starts_with($encrypted, '*')) {
        echo json_encode(['error' => 'Hash generation failed']);
        exit;
    }

    echo json_encode(['encrypted' => $encrypted]);
    exit;
}

$isValid = crypt($password, $hash) === $hash;
if ($isValid) {
    echo json_encode(['valid' => $isValid, 'password' => $hash]);
} else {
    echo json_encode(['valid' => $isValid, 'password' => null]);
}

exit;
