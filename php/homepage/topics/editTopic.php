

<?php
// to allow for the sql requests necessary for this 
require "../../SQL.php";
require "../../whitelist.php";

if ($_POST) {
    // a string containing all the allowed characters, this is to reduce the risk of a sql Injection

    $SQLconnection = new MySQLRequest(); // new insance of the sql request
    $_POST = whitelist($_POST,$SQLconnection->conn);

    $SQLconnection->oneResult = true; // as the sql should only return one value 
    $output = $SQLconnection->sql("SELECT * FROM users WHERE Pass='{$_POST["password"]}' && ID='{$_POST["ID"]}'");
    if ($output) { // if there is a account with the same credintals 
        $SQLconnection->oneResult = false; // change the expected result 
        

       
            //if request is valid
            // sql request to change the record in the database 
            $sql = "UPDATE topics SET `name` = '{$_POST["data"]["name"]}', `subjectID` = '{$_POST["data"]["subjectID"]}' WHERE `ID`={$_POST["data"]["id"]} && user='{$_POST["ID"]}'";
            echo $sql;
            $SQLconnection->sql($sql, false);
      
    } else {
        echo 'false';
    }
}
