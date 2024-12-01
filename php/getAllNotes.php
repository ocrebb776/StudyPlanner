<?php
// to allow for the sql requests neccesary for this 
require "SQL.php";
if ($_POST) {
    $SQLconnection = new MySQLRequest();
    $SQLconnection->oneResult = true;
    $output = $SQLconnection->sql("SELECT * FROM users WHERE Pass='{$_POST["password"]}' && ID='{$_POST["ID"]}'");
    if ($output) {
        $today = date("Y-m-d");
        $SQLconnection->oneResult = false;
        //get the 
$sql = "SELECT
         notes.*,
         fr.name
         FROM notes 
         LEFT JOIN  events fr
         ON fr.ID = notes.frID
         WHERE notes.user='{$_POST['ID']}' && notes.frTable='events'  
         && fr.user='{$_POST['ID']}'
        UNION ALL
         SELECT
          notes.*,
          fr.name
          FROM notes 
          LEFT JOIN  subjects fr 
          ON fr.ID = notes.frID
          WHERE notes.user='{$_POST['ID']}' && notes.frTable='subjects' 
          && fr.user='{$_POST['ID']}'
        UNION ALL
        SELECT
         notes.*,
         fr.name
         FROM notes 
         LEFT JOIN  topics fr
         ON fr.ID = notes.frID
         WHERE notes.user='{$_POST['ID']}' && notes.frTable='topics'
          && fr.user='{$_POST['ID']}'
         
          ORDER BY date DESC
        ";
        
 
        $notes = $SQLconnection->sql($sql);
        
        if($notes){
        
        echo json_encode($notes);
        }else{
            echo "[]";
        }
    } else {
        echo 'false';
    }
}
