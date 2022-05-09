<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json; charset=UTF-8");
include_once("MySQL.php");

$request_method = $_SERVER['REQUEST_METHOD'];
$mySQL = new MySQL(true);

/* $mySQL->Insert("
INSERT INTO Tags
(tag_name)
VALUES
('Vegetarian');"); */

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['table'])) {
    $postId = $_GET['table'];
    $sql = "SELECT * FROM $postId;";
    echo $mySQL->Query($sql, true);
}
