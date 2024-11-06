<?php
// to allow for the sql requests necessary for this 
require "../../SQL.php";
if ($_POST) {
    //creating the connection
    $SQLconnection = new MySQLRequest();
    $SQLconnection->oneResult = true;
    //checking the account credentials
    $output = $SQLconnection->sql("SELECT * FROM users WHERE Pass='{$_POST["password"]}' && ID='{$_POST["ID"]}'");
    if ($output) {
        $today = date("Y-m-d");  // getting todays date
        $SQLconnection->oneResult = false;
        if ($_POST["id"] == 'false') {
            $sql = "SELECT * FROM subjects WHERE user={$_POST['ID']}";
            $events = $SQLconnection->sql($sql); // all events with the user's ID
        } else {
            $sql = "SELECT * FROM subjects WHERE user={$_POST['ID']} && ID='{$_POST["id"]}'";
            $events = $SQLconnection->sql($sql); // all events with the user's ID
        }
        if ($events != null) {
            $data = $events;
            echo json_encode($data);
        } else {
            echo "[]";
        }
    } else {
        echo 'false';
    }
}
