<?php
session_start();
include_once("MySQL.php");
class Authenticator
{

    //Checks to see if the given user email matches with one in the database, and if so, if the password matches the hashed password in the DB as well.
    function verify($targetEmail, $targetPassword, $startDb)
    {
        $userfetch = $startDb->Query("SELECT * FROM Users WHERE email='$targetEmail';", 0);
        $user = $userfetch->fetch_object();
        if ($user) {
            $passCheck = password_verify($targetPassword, $user->pass);

            if ($passCheck) {
                return $user;
            } else {
                return "badPass";
            }
        } else {
            return "noUser";
        }
    }

    function __construct()
    {
    }
}
