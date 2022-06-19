<?php

session_start();

require "../config.php";

if (!isset($_SESSION['email'])) {
    echo json_encode(['status' => 'success', 'connected' => false, 'redirectUri' => REDIRECT_URI, 'clientId' => GOOGLE_ID]);
    exit();
}

echo json_encode(['status' => 'success', 'connected' => true, 'email' => $_SESSION['email']]);