<?php
// to allow for the sql requests necessary for this 
require "../../SQL.php";
if ($_POST) {

    $SQLconnection = new MySQLRequest(); // new instance of the sql request
    $SQLconnection->oneResult = true; // as the sql should only return one value 
    $output = $SQLconnection->sql("SELECT * FROM users WHERE Pass='{$_POST["password"]}' && ID='{$_POST["ID"]}'");
    if ($output) { // if there is a account with the same credentials 
        

        //deleting the subject from the table
        $SQLconnection->sql("DELETE FROM subjects  WHERE ID='{$_POST["subjectID"]}'", false);
        //deleting all of the notes on the subject
        $SQLconnection->sql("DELETE FROM notes  WHERE frID='{$_POST["subjectID"]}' && frTable='subjects'", false);
        //changing all of the topics to gave a subject id of -1 so that any new subjects with the id dont get given the topics 
        $SQLconnection->sql("UPDATE topics SET subjectID='-1' WHERE subjectID='{$_POST["subjectID"]}'");
    }
} else {
    echo 'false';
}
