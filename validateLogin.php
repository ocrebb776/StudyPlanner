<?php
// to allow for the sql requests neccesary for this 
require "SQL.php";
if ($_POST) {
    $SQLconnection = new MySQLRequest();
    $SQLconnection->oneResult = true;
    $output = $SQLconnection->sql("SELECT * FROM users WHERE name='{$_POST["username"]}' && pass='{$_POST["password"]}'");
    if($output){
        echo $output["ID"];
    }else{
        echo "---false---";
    }
}