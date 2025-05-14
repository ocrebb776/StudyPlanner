<?php
// to allow for the sql requests necessary for this 
require "../../SQL.php";

require "../../utils.php";
if ($_POST) {
    //creating the connection
    $SQLconnection = new MySQLRequest();
    $_POST = whitelist($_POST,$SQLconnection->conn);
    
    $SQLconnection->oneResult = true;
    //checking the account credentials
    $output = $SQLconnection->sql("SELECT * FROM users WHERE ID='{$_POST["ID"]}'");

    if($output && (password_verify($_POST['password'], $output['Pass'] ))) {
        //default  sql request  using a left join
        $sql = "SELECT * FROM todo WHERE user={$_POST['ID']}";
        //to say that no one result is needed 
        $SQLconnection->oneResult = false;
        //if a id is given
        if ($_POST["id"] != 'false') {
            //add a clause to check for that id 
            $sql .= " && todo.ID='{$_POST["id"]}'";
        }
        //send the requst to the database 
        //echo $sql;
        $visit = $SQLconnection->sql($sql); 
        //if a response is given 
        if ($visit != null) {
            //send the data 
            $data = $visit;
            echo json_encode($data);
        } else {
            //send an empty list to avoid errors when the js tries to parse it as JSON 
            echo "[]";
        }
    } else {
        echo 'false';
    }
}
