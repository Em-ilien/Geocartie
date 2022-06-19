<?php

require "vendor/autoload.php";
require "config.php";

use GuzzleHttp\Client;

$client = new Client([
    'timeout'  => 2.0,
    'verify'   => __DIR__ . "/cacert.pem"
]);

$response = $client->request("GET", "https://accounts.google.com/.well-known/openid-configuration");
$discoveryJSON = json_decode((string)$response->getBody());

$tokenEndpoint = $discoveryJSON->token_endpoint;
$userInfoEndpoint = $discoveryJSON->userinfo_endpoint;

$response = $client->request("POST", $tokenEndpoint, [
    'form_params' => [
        'code' => $_GET["code"],
        'client_id' => GOOGLE_ID,
        'client_secret' => GOOGLE_SECRET,
        'redirect_uri' => REDIRECT_URI,
        'grant_type' => 'authorization_code'
    ]
]);

$accessToken = json_decode((string)$response->getBody())->access_token;

$response = $client->request("GET", $userInfoEndpoint, [
    'headers' => [
        'Authorization' => "Bearer " . $accessToken
    ]
]);

$response = json_decode($response->getBody());
if ($response->email_verified === true) {
    session_start();
    $_SESSION["email"] = $response->email;
    header("Location: ./");
    exit();
}