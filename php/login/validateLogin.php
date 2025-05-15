<?php
// to allow for the sql requests necessary for this 
require "../SQL.php";
require "../whitelist.php";

//if the file has been called with a POST request
if ($_POST) {
    //start a connection to the database 
    $SQLconnection = new MySQLRequest();
    $_POST = whitelist($_POST,$SQLconnection->conn);

    //the program is only expecting one result 
    $SQLconnection->oneResult = true;
    //send the request
    $output = $SQLconnection->sql("SELECT * FROM users WHERE name='{$_POST["username"]}'");
    //if the program returns a result 
    if($output && (password_verify($_POST['password'],$output['Pass']))){
        //output the ID
        echo $output["ID"];
    }else{
        //otherwise output false
        echo "---false---";
    }
}