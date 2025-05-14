<?php
// to allow for the sql requests neccesary for this 
require "../SQL.php";
require "../utils.php";
if ($_POST) {
    // a string contanining all the allowed characters, this is to reduce the risk of a sql Injection

    $SQLconnection = new MySQLRequest(); // new insance of the sql request
    $_POST = whitelist($_POST,$SQLconnection->conn);

    $SQLconnection->oneResult = true; // as the sql should only return one value 
    $output = $SQLconnection->sql("SELECT * FROM users WHERE ID='{$_POST["ID"]}'");
    if($output && (password_verify($_POST['password'],$output['Pass']))) { // if there is a account with the same credintals 
        $SQLconnection->oneResult = false; // change the expected result 
    
        $max = $SQLconnection->sql("SELECT max(ID) FROM events");//get highest id
   
        if ($max) {
            //if there is a highest id then the new id will be one higher 
            $max = $max[0]["max(ID)"] + 1;
        } else {
            //if there is no events then the id;s should start at zero 
            $max = 0;
        }
        // sql request to create the record in the database 
        $SQLconnection->sql("INSERT INTO `events` (`ID`, `user`, `startTime`, `endTime`,`Type`,`date`,`name`) VALUES ($max, '{$_POST["ID"]}', '{$_POST["data"]["StartTime"]}', '{$_POST["data"]["EndTime"]}', '{$_POST["data"]["EventType"]}', '{$_POST["data"]["Date"]}', '{$_POST["data"]["Title"]}')",false);
 
    
    
    } else {
        echo 'false';
    }
}
