<?php
// to allow for the sql requests necessary for this 
require "../../SQL.php";
require "../../whitelist.php";

if ($_POST) {

    $SQLconnection = new MySQLRequest(); // new instance of the sql request
    $_POST = whitelist($_POST,$SQLconnection->conn);

    $SQLconnection->oneResult = true; // as the sql should only return one value 
    $output = $SQLconnection->sql("SELECT * FROM users WHERE ID='{$_POST["ID"]}'");
    if($output && (password_verify($_POST['password'],$output['Pass']))) { // if there is a account with the same credentials 
        

        //deleting the subject from the table and checking if the user is the owner of the subject
        $SQLconnection->sql("DELETE FROM subjects  WHERE ID='{$_POST["subjectID"]}' && user={$_POST["ID"]}", false);
        //deleting all of the notes on the subject
        $SQLconnection->sql("DELETE FROM notes  WHERE frID='{$_POST["subjectID"]}' && frTable='subjects' && user={$_POST["ID"]}", false);
        //changing all of the topics to gave a subject id of -1 so that any new subjects with the id dont get given the topics 
        $SQLconnection->sql("UPDATE topics SET subjectID='-1' WHERE subjectID='{$_POST["subjectID"]} && user={$_POST["ID"]}'");
    }
} else {
    echo 'false';
}
