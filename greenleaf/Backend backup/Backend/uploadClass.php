<?php
session_start();
include_once("MySQL.php");

class Upload
{
    private $homeLocation = "http://localhost:3001";

    function insertPostImgToDB($file, $targetFolder, $db, $postId)
    {

        $fileName = "post" . $postId . "__" . basename($file["name"]);
        $path = $targetFolder . $fileName;


        if ($postId != null) {
            if ($file['error'] != 1) {
                move_uploaded_file($file["tmp_name"], $targetFolder . $fileName);
                $db->Query("UPDATE Entries SET postImg_url = '$path' WHERE post_title = $postId;", 0);
                // header("location:$this->homeLocation");
            } else {
                // header("location:$this->homeLocation");
            }
        } else {
            // header("location:$this->homeLocation");
        }
    }

    function __construct()
    {
    }
}
