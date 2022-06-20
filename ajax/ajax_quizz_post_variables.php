<?php

session_start();

if (!isset($_POST["score"]) || !isset($_POST["departementsToRework"]) || !isset($_POST["foundDepartements"])) {
    echo json_encode(["status" => "error", "message" => "Missing parameters"]);
    exit();
}

if (!isset($_SESSION["email"])) {
    echo json_encode(["status" => "error", "message" => "User not logged in"]);
    exit();
}

$email = $_SESSION['email'];

$score = $_POST['score'];
$departementsToRework = $_POST['departementsToRework'];
$foundDepartements = $_POST['foundDepartements'];

$_SESSION['score'] = $score;
$_SESSION['departementsToRework'] = $departementsToRework;
$_SESSION['foundDepartements'] = $foundDepartements;

$json = file_get_contents("../quizz-users-variables.json");
$json = json_decode($json, true);

$json[$email]['score'] = json_decode($score);
$json[$email]['departementsToRework'] = json_decode($departementsToRework);
$json[$email]['foundDepartements'] = json_decode($foundDepartements);

file_put_contents("../quizz-users-variables.json", json_encode($json));

echo json_encode(["status" => "success"]);