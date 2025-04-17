<?php
// to allow for the sql requests neccesary for this 
require "../SQL.php";

require "../whitelist.php";

if ($_POST) {
    $SQLconnection = new MySQLRequest();
    $_POST = whitelist($_POST,$SQLconnection->conn);

    $output = $SQLconnection->sql("SELECT * FROM users WHERE name='{$_POST["username"]}'");
    if($output){
        echo "false";
    }else{
        echo "true";
    }
}




?>