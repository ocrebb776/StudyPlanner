<?php
// to allow for the sql requests necessary for this 
require "../../SQL.php";
if ($_POST) {

    $SQLconnection = new MySQLRequest(); // new instance of the sql request
    $SQLconnection->oneResult = true; // as the sql should only return one value 
    $output = $SQLconnection->sql("SELECT * FROM users WHERE Pass='{$_POST["password"]}' && ID='{$_POST["ID"]}'");
    if ($output) { // if there is a account with the same credentials 
        

        $SQLconnection->sql("DELETE FROM subjects  WHERE ID='{$_POST["subjectID"]}'", false);
        $SQLconnection->sql("DELETE FROM notes  WHERE frID='{$_POST["subjectID"]}' && frTable='subject'", false);
        // add delete subjects by changing the subject field to -1 (to indicate that there is no subject )
    }
} else {
    echo 'false';
}
