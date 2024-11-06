<?php
// to allow for the sql requests necessary for this 
require "SQL.php";
if ($_POST) {
    // a string containing all the allowed characters, this is to reduce the risk of a sql Injection

    $SQLconnection = new MySQLRequest(); // new instance of the sql request
    $SQLconnection->oneResult = true; // as the sql should only return one value 
    $output = $SQLconnection->sql("SELECT * FROM users WHERE Pass='{$_POST["password"]}' && ID='{$_POST["ID"]}'");
    if ($output) { // if there is a account with the same credentials 
        
        // sql request to remove empty the record but the id
        // the reason why it does not remove the record is so that if it is the most recent event another event will take its place
        // by removing the user tag it wont show up anymore, and all the data is cleared 
        $SQLconnection->sql("DELETE FROM notes WHERE `notes`.`ID` = {$_POST["id"]} && `notes`.`user`='{$_POST["ID"]}'", false);
    }
} else {
    echo 'false';
}
