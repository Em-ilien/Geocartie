<?php

session_start();

if (!isset($_SESSION["email"])) {
    echo json_encode(["status" => "error", "message" => "User not logged in"]);
    exit();
}

$email = $_SESSION['email'];

//Get json file
$json = file_get_contents("../data/quizz-users-variables.json");
$json = json_decode($json, true);

if (!isset($json[$email])) {
    echo json_encode(["status" => "error", "message" => "No data found for user $email"]);
    exit();
}

$score = $json[$email]['score'];
$departementsToRework = $json[$email]['departementsToRework'];
$foundDepartements = $json[$email]['foundDepartements'];

$_SESSION['score'] = $score;
$_SESSION['departementsToRework'] = $departementsToRework;
$_SESSION['foundDepartements'] = $foundDepartements;

echo json_encode(["status" => "success", "score" => $score, "departementsToRework" => $departementsToRework, "foundDepartements" => $foundDepartements]);
