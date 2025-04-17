<?php
// to allow for the sql requests necessary for this 
require "../SQL.php";
require "../whitelist.php";

if ($_POST) {

    //start the connection 
    $SQLconnection = new MySQLRequest();
    $_POST = whitelist($_POST,$SQLconnection->conn);

    //expect only one rsult 
    $SQLconnection->oneResult = true;
    // validate the login 
    $output = $SQLconnection->sql("SELECT * FROM users WHERE ID='{$_POST["ID"]}'");
    if($output && (password_verify($_POST['password'],$output['Pass']))){
     /*   take the Javascript dateTime string and convert it to a format that can be used in the php 
        format 
        */
        $_POST['date'] = preg_replace('/\s\([^)]+\)$/', '', $_POST['date']);
        //parse the updates String to a dateTime object
        $today = new dateTime($_POST['date']);
        $today->setTime(0,0,0);
        
  
        //expect multiple results 
        $SQLconnection->oneResult = false;
        //send the sql
        $subject = $SQLconnection->sql("SELECT * FROM events WHERE user={$_POST['ID']}");
        //if events
        if($subject != null){
            //empty list for the data
            $data = [];
            foreach($subject as $event){
                //find the difference in days 

                //parse the date to a dateTime object with the correct timezone
                $eventDate = new DateTime($event["date"],new DateTimeZone('UTC'));
                //getting the difference 
                $interval = $today->diff($eventDate,false);
                $dayDif = $interval->days;
                //is it is within seven days 
         
                if($dayDif>=0 && $dayDif <7 && $eventDate>=$today){
                if(array_key_exists((string)$dayDif,$data)){
                    //if there is already events on this day add it after
                    $data[$dayDif][] = $event;
                }else{
                    //if not create a new list and add ot to it 
                    $data[(string)$dayDif] = array();
                    $data[(string)$dayDif][] = $event;
                }}


            }
            echo json_encode($data);
        }else{
         echo 'false';
        }
    }
}   