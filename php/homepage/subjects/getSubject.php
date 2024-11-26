<?php
// to allow for the sql requests necessary for this 
require "../../SQL.php";
if ($_POST) {
    //creating the connection
    $SQLconnection = new MySQLRequest();
    $SQLconnection->oneResult = true; 
    //checking the account credentials
    $output = $SQLconnection->sql("SELECT * FROM users WHERE Pass='{$_POST["password"]}' && ID='{$_POST["ID"]}'"); 
    if($output){
        //getting the subjects data ( to be the most up to date)
        $subject = $SQLconnection->sql("SELECT * FROM subjects WHERE user={$_POST['ID']} &&ID='{$_POST["subjectID"]}'"); // all subject with the user's ID
        if($subject != null){

            //return the data if a subject was found 
            echo json_encode($subject);
        }else{
         echo 'false';
        }
    }
}   