<?php
// to allow for the sql requests necessary for this 
require "../SQL.php";
if ($_POST) {
    //creating the connection
    $SQLconnection = new MySQLRequest();
    $SQLconnection->oneResult = true; 
    //checking the account credentials
    $output = $SQLconnection->sql("SELECT * FROM users WHERE Pass='{$_POST["password"]}' && ID='{$_POST["ID"]}'"); 
    if($output){
        $today = date("Y-m-d");  // getting todays date
        $subject = $SQLconnection->sql("SELECT * FROM events WHERE user={$_POST['ID']} &&ID='{$_POST["eventID"]}'"); // all events with the user's ID
        if($subject != null){

            //return the data
            echo json_encode($subject);
        }else{
         echo 'false';
        }
    }
}   