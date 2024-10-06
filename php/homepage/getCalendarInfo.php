<?php
// to allow for the sql requests neccesary for this 
require "../SQL.php";
if ($_POST) {
    $SQLconnection = new MySQLRequest();
    $SQLconnection->oneResult = true;
    $output = $SQLconnection->sql("SELECT * FROM users WHERE Pass='{$_POST["password"]}' && ID='{$_POST["ID"]}'");
    if($output){
        $today = date("Y-m-d");
        $SQLconnection->oneResult = false;
        $events = $SQLconnection->sql("SELECT * FROM events WHERE user={$_POST['ID']}");
        if($events != null){
            $today = new DateTime($today);
            $data = [];
            foreach($events as $event){
                $eventDate = new DateTime($event["date"]);
                $interval = $today->diff($eventDate);
                $dayDif = $interval->days;
                if($dayDif>=0 && $dayDif <7)
                if(array_key_exists((string)$dayDif,$data)){
                    $data[$dayDif][] = $event;
                }else{
                    $data[(string)$dayDif] = array();
                    $data[(string)$dayDif][] = $event;
                }


            }
            echo json_encode($data);
        }else{
         echo 'false';
        }
    }
}   