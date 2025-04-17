<?php
// to allow for the sql requests necessary for this 
require "../SQL.php";
require "../whitelist.php";

if ($_POST) {
    //creating the connection
    $SQLconnection = new MySQLRequest();
    $_POST = whitelist($_POST,$SQLconnection->conn);

    $SQLconnection->oneResult = true; 
    //checking the account credentials
    $output = $SQLconnection->sql("SELECT * FROM users WHERE ID='{$_POST["ID"]}'"); 
    if($output && (password_verify($_POST['password'],$output['Pass']))){
        $today = date("Y-m-d");  // getting todays date
        $SQLconnection->oneResult = false; 
        $subject = $SQLconnection->sql("SELECT * FROM events WHERE user={$_POST['ID']}"); // all events with the user's ID
        if($subject != null){
            $today = new DateTime($today); // creating a new datetime with todays date
            $data = []; // empty associative  array with for events over the next dates
            foreach($subject as $event){ 
                $eventDate = new DateTime($event["date"]); //creating a DateTime with the date of the event 
                $interval = $today->diff($eventDate); // getting the interval between the two dates 
                $dayDif = $interval->days; // getting the interval in days
                if($eventDate>=$today){ // ensure that the date is in the future
                if(array_key_exists((string)$event["date"],$data)){
                    $data[$event["date"]][] = $event; // if their has been an event on that day add the event after it 
                }else{
                    //if not create a new array with the key of the date and add the event to it 
                    $data[(string)$event["date"]] = array();
                    $data[(string)$event["date"]][] = $event;
                }}


            }
            //return the data
            echo json_encode($data);
        }else{
         echo 'false';
        }
    }
}   