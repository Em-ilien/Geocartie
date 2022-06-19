<?php
$json = file_get_contents("../data/departements.json");
$data = json_decode($json, true);

if (!isset($_POST["departement_id"]) || !isset($_POST["image_index"])) {
	echo json_encode(["status" => "error", "error" => "Missing parameters"]);
    exit();
}

$id = $_POST["departement_id"];
$imageIndex = $_POST["image_index"];

$departementKey;

foreach ($data as $keyDep => $dep) {
    if ($dep["id"] == $id) {
        $departementKey = $keyDep;
        break;
    }
}

foreach ($data[$departementKey]["images"] as $imgKey => $img) {
    if ($imgKey == $imageIndex) {
        array_splice($data[$departementKey]["images"], $imgKey, 1);
        break;
    }
}

$json = json_encode($data, JSON_UNESCAPED_SLASHES);
file_put_contents("../data/departements.json", $json);

//Ajax response
echo json_encode(["status" => "success", "departement_id" => $id, "image_index" => $imageIndex]);