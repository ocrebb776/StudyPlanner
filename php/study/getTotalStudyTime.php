<?php

// to allow for the sql requests neccesary for this 
require "../SQL.php";
require "../utils.php";

if ($_POST) {
    $SQLconnection = new MySQLRequest();
    $_POST = whitelist($_POST,$SQLconnection->conn);

    $SQLconnection->oneResult = true;
    $output = $SQLconnection->sql("SELECT * FROM users WHERE ID='{$_POST["ID"]}'");
    if($output && (password_verify($_POST['password'],$output['Pass']))) {
        $today = date("Y-m-d");
        $SQLconnection->oneResult = false;
   
        $sql = 
        "SELECT 
        time,date
        FROM
        visit
        WHERE
        user={$_POST['ID']}
        ORDER BY date 
        ";
        //sending the SQL query to the database
        $time = $SQLconnection->sql($sql);
        //if there are notes then echo them out as a JSON object
        if ($time) {
            echo json_encode($time);
        } else {
            //if there is no notes then echo an empty array
            echo "[]";
        }
    } else {
        //if the user is not found or the login information is false then echo false
        echo 'false';
    }
}
