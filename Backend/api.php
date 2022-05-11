<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json; charset=UTF-8");
include_once("MySQL.php");

//Online server location:
//http://www.sabox.dk/backend/api.php

/* To use API endpoints - For example 'getusers' to get an object with all the users, 
fetch http://www.sabox.dk/backend/api.php?getusers 
or http://www.sabox.dk/backend/api.php?getpost=2 to get post with id 2 */


// Instantiates a MySQL object with auto-connect enabled (the parameter is set to true).
$mySQL = new MySQL(true);

//----------- API endpoints for the GET method. Used to retrieve data. --------------
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['getusers'])) {
    $sql = "SELECT * FROM `Users`;";
    echo $mySQL->Query($sql, true);
} else if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['getpost'])) {
    $post = $_GET['getpost'];
    $sql = "SELECT * FROM `Entries` WHERE post_id = $post;";
    echo $mySQL->Query($sql, true);
}
//GetPosts is a 'view' in the database, 
else if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['getallposts'])) {
    $sql = "SELECT * FROM `GetPosts`;";
    echo $mySQL->Query($sql, true);
}
// ------------------------------------------------------------------------------------




//------- API endpoints for the PUT method. Used to send data to server. --------------
//"CALL UpdatePost()" and "CALL UpdateUser()" refers to stored procedures in the database.
else if ($_SERVER['REQUEST_METHOD'] === 'PUT' && isset($_GET['postid'])) {
    $id = $_GET['postid'];
    $post = json_decode(file_get_contents('php://input'));
    $sql = "CALL UpdatePost('$post->post_title','$post->post_description','$post->post_category','$post->expiration_date','$id');";
    echo $mySQL->Query($sql, false);
} else if ($_SERVER['REQUEST_METHOD'] === 'PUT' && isset($_GET['userid'])) {
    $id = $_GET['userid'];
    $user = json_decode(file_get_contents('php://input'));
    $hashedPassword = password_hash($user->password, PASSWORD_DEFAULT);
    $sql = "CALL UpdateUser('$user->first_name','$user->last_name','$user->email','$user->is_business','$hashedPassword','$id');";
    echo $mySQL->Query($sql, false);
}
// -------------------------------------------------------------------------------------
