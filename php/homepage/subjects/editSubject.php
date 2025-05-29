

<?php
// to allow for the sql requests necessary for this 
require "../../SQL.php";
require "../../whitelist.php";
if ($_POST) {
    // a string containing all the allowed characters, this is to reduce the risk of a sql Injection

    $SQLconnection = new MySQLRequest(); // new insance of the sql request
    $_POST = whitelist($_POST,$SQLconnection->conn);

    $SQLconnection->oneResult = true; // as the sql should only return one value 
    $output = $SQLconnection->sql("SELECT * FROM users WHERE ID='{$_POST["ID"]}'");
    if($output && (password_verify($_POST['password'],$output['Pass']))) { // if there is a account with the same credintals 
        $SQLconnection->oneResult = false; // change the expected result 
       
            //if request is valid

            // sql request to change the record in the database 

            $sql = "UPDATE subjects SET `name` = '{$_POST["data"]["name"]}' WHERE `ID`={$_POST["data"]["id"]} && user={$_POST["ID"]}";
            
            $SQLconnection->sql($sql, false);
            echo $_POST["data"]["id"]; // return the id of the subject that was edited
        
    } else {
        echo 'false';
    }
}



