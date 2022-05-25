<?php
session_start();
ob_start();
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json; charset=UTF-8");
include_once("MySQL.php");
include_once("authenticator.php");
$homeLocation = "http://localhost:3001";





//Online server location:
//http://www.sabox.dk/backend/api.php

/* To use API endpoints - For example 'getusers' to get an object with all the users, 
fetch http://www.sabox.dk/backend/api.php?getallusers 
or http://www.sabox.dk/backend/api.php?getpost=2 to get post with id 2 */


// Instantiates a MySQL object with auto-connect enabled (the parameter is set to true).
$mySQL = new MySQL(true);




//----------- API endpoints for the GET method. Used to retrieve data. --------------
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['getallusers'])) {
    $sql = "SELECT * FROM `Users`;";
    echo $mySQL->Query($sql, true);
} else if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['getuser'])) {
    $userid = $_GET['getuser'];
    $sql = "SELECT * FROM `Users` WHERE user_id = $userid;";
    echo $mySQL->Query($sql, true);
} else if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['getpost'])) {
    $post = $_GET['getpost'];
    $sql = "SELECT * FROM Entries
JOIN Users
ON Entries.user_id = Users.user_id 
WHERE post_id = $post;";
    echo $mySQL->Query($sql, true);
} else if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['getcategories'])) {
    $sql = "SELECT * FROM `Categories`;";
    echo $mySQL->Query($sql, true);
}
//GetPosts is a 'view' in the database, 
else if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['getallposts'])) {
    $sql = "SELECT * FROM Entries
JOIN Users
ON Entries.user_id = Users.user_id;";
    echo $mySQL->Query($sql, true);
}
// ------------------------------------------------------------------------------------



//------- API endpoints for the PUT method. Use to change/replace data in DB. --------------
//"CALL UpdatePost()" and "CALL UpdateUser()" refers to stored procedures in the database.
// To update a post, send the following object structure along in the body of the fetch request.

// Example:
/*  const postToUpdate = {
        post_title : "PostExample",
        post_description : "Some nice description of the product",
        post_category : "Backery",
        expiration_date : "yyyy-mm-dd",
    }

    const response = await fetch('http://www.sabox.dk/backend/api.php?updatepostid=2', 
    {
      method: "PUT",
      body: JSON.stringify(postToUpdate),
    });
*/ else if ($_SERVER['REQUEST_METHOD'] === 'PUT' && isset($_GET['updatepostid'])) {
    $id = $_GET['updatepostid'];
    $post = json_decode(file_get_contents('php://input'));
    $filename = str_replace(' ', '', $post->post_title);
    $filePath = $post->user_id . "__" . $filename . ".png";
    $onlinePath = "http://sabox.dk/imgs/${filePath}";
    file_put_contents("../imgs/${filePath}", file_get_contents($post->post_img));
    $sql = "CALL UpdatePost('$post->post_title','$post->post_description','$post->post_category','$post->expiration_date','$id','$onlinePath');";
    echo $mySQL->Query($sql, false);
} else if ($_SERVER['REQUEST_METHOD'] === 'PUT' && isset($_GET['updateuserid'])) {
    $id = $_GET['updateuserid'];
    $user = json_decode(file_get_contents('php://input'));
    $hashedPassword = password_hash($user->password, PASSWORD_DEFAULT);
    $sql = "CALL UpdateUser('$user->first_name','$user->last_name','$user->email','$user->is_business','$hashedPassword','$id');";
    echo $mySQL->Query($sql, false);
}
//-------------------------------------------------------------------------------------



//----------- API endpoints for the POST method. Adds new entries in the database.-----

else if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['createpost'])) {
    $post = json_decode(file_get_contents('php://input'));
    $filename = str_replace(' ', '', $post->post_title);
    $filePath = $post->user_id . "__" . $filename . ".png";
    $onlinePath = "http://sabox.dk/imgs/${filePath}";
    file_put_contents("../imgs/${filePath}", file_get_contents($post->post_img));
    $sql = "CALL AddPost('$post->post_description','$post->expiration_date','$post->post_categoryid','$post->post_title','$post->user_id','$onlinePath');";
    echo $mySQL->Query($sql, false);
    var_dump($post);
} else if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['createuser'])) {
    $user = json_decode(file_get_contents('php://input'));
    $pass = password_hash($user->password, PASSWORD_DEFAULT);
    $filePath = $user->first_name . "__" . $user->last_name . ".png";
    $onlinePath = "http://sabox.dk/imgs/${filePath}";
    file_put_contents("../imgs/${filePath}", file_get_contents($user->img_url));
    $sql = "CALL AddUser('$user->first_name','$user->last_name','$user->email','$pass','$user->is_business','$onlinePath');";
    echo $mySQL->Query($sql, false);
}
// -------------------------------------------------------------------------------------



//----------- API endpoints for the DELETE method. Deletes entries from database.-------
else if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['deletepost'])) {
    $post = $_GET['deletepost'];
    $sql = "CALL DeletePost('$post');";
    echo $mySQL->Query($sql, false);
}
// -------------------------------------------------------------------------------------


// ----------------------- Login and session API endpoints ------------------------------
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['login'])) {
    $user = json_decode(file_get_contents('php://input'));
    login($user, $mySQL);
} else if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['checksession'])) {
    if ($_SESSION['userLoggedIn'] == true) {
        echo "{\"status\":\"success\",\"msg\":\"Successfully logged in.\",\"id\":\"" . $_SESSION['loggedInUser']->user_id . "\", \"img\":\"" . $_SESSION['loggedInUser']->img_url . "\"}";
    } else {
        echo "{\"status\":\"failed at session login\"}";
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['signout'])) {
    if (isset($_SESSION['userLoggedIn'])) {
        $_SESSION['userLoggedIn'] = false;
        $_SESSION['loggedInUser'] = null;
        echo "Signout successful";
    } else {
        echo "Signout failed";
    }
}



function login($user, $sql)
{
    $auth = new Authenticator();
    $loginStatus = $auth->verify($user->userEmail, $user->userPassword, $sql);

    if ($loginStatus->user_id != null) {
        $_SESSION['loggedInUser'] = $loginStatus;
        $_SESSION['userLoggedIn'] = true;
        echo "{\"status\":\"success\",\"msg\":\"Successfully logged in.\",\"id\":\"" .
            $loginStatus->user_id . "\", \"img\":\"" . $loginStatus->img_url . "\"}";
    } else if ($loginStatus == "badPass") {
        echo "{\"status\":\"failed\",\"msg\":\"Wrong password.\"}";
    } else if ($loginStatus == "noUser") {
        echo "{\"status\":\"failed\",\"msg\":\"User not found\"}";
    }
}
