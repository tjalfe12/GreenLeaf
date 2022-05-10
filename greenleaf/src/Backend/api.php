<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json; charset=UTF-8");
include_once("MySQL.php");

$request_method = $_SERVER['REQUEST_METHOD'];
$mySQL = new MySQL(true);


if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['getallposts'])) {
    $sql = "SELECT * FROM `GetPosts`;";
    echo $mySQL->Query($sql, true);
} else if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['getusers'])) {
    $sql = "SELECT * FROM `GetPosts`;";
    echo $mySQL->Query($sql, true);
} else if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['getpost'])) {
    $post = $_GET['getpost'];
    $sql = "SELECT * FROM `Entries` WHERE post_id = $post;";
    echo $mySQL->Query($sql, true);
} else if ($_SERVER['REQUEST_METHOD'] === 'PUT' && isset($_GET['id'])) {
    $postId = $_GET['id'];
    $post = json_decode(file_get_contents('php://input'));
    $sql = "CALL UpdatePost('$post->post_title','$post->post_description','$post->post_category','$post->expiration_date','$postId');";
    echo $mySQL->Query($sql, false);
}
