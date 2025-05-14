

<?php
// to allow for the sql requests neccesary for this 
require "../SQL.php";
require "../utils.php";
if ($_POST) {
 
    $SQLconnection = new MySQLRequest(); // new insance of the sql request
    $_POST = whitelist($_POST,$SQLconnection->conn);

    $SQLconnection->oneResult = true; // as the sql should only return one value 
    $output = $SQLconnection->sql("SELECT * FROM users WHERE ID='{$_POST["ID"]}'");
   

        // sql request to change the record in the database 

        $sql = "UPDATE `events` SET `name` = '{$_POST["data"]["Title"]}', `startTime` = '{$_POST["data"]["StartTime"]}',`endTime`='{$_POST["data"]["EndTime"]}',`Type` = '{$_POST["data"]["EventType"]}',`date` = '{$_POST["data"]["Date"]}' WHERE `ID`={$_POST["data"]["id"]}";
         echo $sql;
        $SQLconnection->sql($sql,false);
 

    
 
    } else {
        echo 'false';
    }

