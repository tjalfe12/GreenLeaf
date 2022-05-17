<?php
include_once("MySQL.php");
class Authenticator
{

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
