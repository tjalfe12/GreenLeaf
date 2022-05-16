<?php
include_once("MySQL.php");

class Upload
{
    private $homeLocation = "http://localhost:3001";

    function insertImgToDB($file, $targetFolder, $db, $userid)
    {

        $fileName = $userid . "__" . basename($file["name"]);
        $path = $targetFolder . $fileName;


        if ($userid != null) {
            if ($file['error'] != 1) {
                move_uploaded_file($file["tmp_name"], $targetFolder . $fileName);
                $db->Query("UPDATE settings SET img = '$path' WHERE userid = $userid;", 0);
                header("location:$this->homeLocation");
            } else {
                header("location:$this->homeLocation");
            }
        } else {
            header("location:$this->homeLocation");
        }
    }

    function __construct()
    {
    }
}
