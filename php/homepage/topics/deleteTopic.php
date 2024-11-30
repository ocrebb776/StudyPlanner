<?php
// to allow for the sql requests necessary for this 
require "../../SQL.php";
if ($_POST) {

    $SQLconnection = new MySQLRequest(); // new instance of the sql request
    $SQLconnection->oneResult = true; // as the sql should only return one value 
    $output = $SQLconnection->sql("SELECT * FROM users WHERE Pass='{$_POST["password"]}' && ID='{$_POST["ID"]}'");
    if ($output) { // if there is a account with the same credentials 
        

        $SQLconnection->sql("DELETE FROM topics  WHERE ID='{$_POST["topicID"]}'", false);
        $SQLconnection->sql("DELETE FROM notes  WHERE frID='{$_POST["topicID"]}' && frTable='topic'", false);
        $SQLconnection->sql("DELETE FROM visit  WHERE topicID='{$_POST["topicID"]}'", false);
    }
} else {
    echo 'false';
}
