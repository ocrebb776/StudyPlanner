<?php
// to allow for the sql requests necessary for this 
require "../SQL.php";
require "../whitelist.php";

if ($_POST) {
    // a string containing all the allowed characters, this is to reduce the risk of a sql Injection

    $SQLconnection = new MySQLRequest(); // new instance of the sql request
    $_POST = whitelist($_POST,$SQLconnection->conn);

    $SQLconnection->oneResult = true; // as the sql should only return one value 
    $output = $SQLconnection->sql("SELECT * FROM users WHERE ID='{$_POST["ID"]}'");
    if($output && (password_verify($_POST['password'],$output['Pass']))) { // if there is a account with the same credentials 
        
        // sql request to remove empty the record but the id
        // the reason why it does not remove the record is so that if it is the most recent event another event will take its place
        // by removing the user tag it wont show up anymore, and all the data is cleared 
        $sql = "UPDATE `events` SET `user` = , `name` = '', `startTime` = '', `endTime` = '', `Type` = '', `date` = '' WHERE `events`.`ID` = '{$_POST["eventID"]}'";
        $sql = "DELETE FROM events WHERE user={$_POST['ID']} && ID={$_POST['eventID']}";
        $SQLconnection->sql($sql, false);
        $SQLconnection->sql("DELETE FROM notes WHERE user={$_POST['ID']} && frID={$_POST['eventID']}  && frTable='events' ", false);
    }
} else {
    echo 'false';
}
