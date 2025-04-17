<?php
// to allow for the sql requests necessary for this 
require "../../SQL.php";

require "../../whitelist.php";
if ($_POST) {
    //creating the connection
    $SQLconnection = new MySQLRequest();
    $_POST = whitelist($_POST,$SQLconnection->conn);

    $SQLconnection->oneResult = true;
    //checking the account credentials
    $output = $SQLconnection->sql("SELECT * FROM users WHERE Pass='{$_POST["password"]}' && ID='{$_POST["ID"]}'");
    if ($output) {
     
        $sql = "SELECT 
         *
         FROM visit

        WHERE user='{$_POST["ID"]}' 
        ";
        //to say that no one result is needed 
        $SQLconnection->oneResult = false;
        //if a id is given
        if ($_POST["id"] != 'false') {
            //add a clause to check for that id 
            $sql .= " && {$_POST["ref"]}='{$_POST["id"]}'";
        }
        //send the requst to the database 
        //echo $sql;
        $topic = $SQLconnection->sql($sql); 
        //if a response is given 
        if ($topic != null) {
            //send the data 
            $data = $topic;
            echo json_encode($data);
        } else {
            //send an empty list to avoid errors when the js tries to parse it as JSON 
            echo "[]";
        }
    } else {
        echo 'false';
    }
}
