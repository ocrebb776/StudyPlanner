<?php
// to allow for the sql requests neccesary for this 
require "../SQL.php";
require "../whitelist.php";
if ($_POST) {
    $SQLconnection = new MySQLRequest();
    $_POST = whitelist($_POST,$SQLconnection->conn);

    $trimList = "qwertyuiopasdfgh()jklzxcvbnm1234567890QWERTYUIOPASDFGHJKLZXCVBNM!£$%&_-+=,.<>#;:";
    $username = $_POST["username"];
    $password = $_POST["password"];
    $usrtrim = whitelist($username, $trimList);
    $pastrim = whitelist($password, $trimList);
    $existingUsernamesOut = $SQLconnection->sql("SELECT Name FROM users");
    $existingUsernames = [];
    foreach ($existingUsernamesOut as $name) {
        $existingUsernames[] = $name["Name"];
    }

    if ($username == $usrtrim && $password == $pastrim && !(in_array($usrtrim,$existingUsernames))) {
        $output = $SQLconnection->sql("SELECT max(ID) FROM users");
   
        if($output && (password_verify($_POST['password'],$output['Pass']))) {
            $max = $output[0]["max(ID)"] + 1;
        } else {
            $max = 0;
        }

        $SQLconnection->sql("INSERT INTO `users` (`ID`, `Name`, `Pass`, `active`) VALUES ($max, '$usrtrim', '$password', 1)",false);
        echo "true";
    }
} else {
    echo "CHR";
}
