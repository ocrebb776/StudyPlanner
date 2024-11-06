

<?php
// to allow for the sql requests necessary for this 
require "SQL.php";
require "whitelist.php";
if ($_POST) {
    // a string containing all the allowed characters, this is to reduce the risk of a sql Injection
    $trimList = "qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPASDFGHJKLZXCVBNM!£$%&_-+=,.<>#;: ";

    $SQLconnection = new MySQLRequest(); // new instance of the sql request
    $SQLconnection->oneResult = true; // as the sql should only return one value 
    $output = $SQLconnection->sql("SELECT * FROM users WHERE Pass='{$_POST["password"]}' && ID='{$_POST["ID"]}'");
    if ($output) { // if there is a account with the same credentials 
        $SQLconnection->oneResult = false; // change the expected result 
        $valid = true; //assume all inputs a valid 
        foreach ($_POST["data"] as $key => $value) {
            //checking the input to check for any characters that could cause an issue with the SQL
            $newVal = whitelist($value, $trimList);
            if ($newVal != $value) {
                //if the function striped any characters then it must be invalid 
                $valid = false;
            }
        }
        if ($valid) {
            //if request is valid
            // sql request to change the record in the database 
            $sql = "UPDATE `notes` SET `text` = '{$_POST["data"]["note"]}' WHERE `ID`={$_POST["data"]["id"]}";
            echo $sql;
            $SQLconnection->sql($sql, false);
        } else {
            echo "some invalid characters in input(s)";
        }
    } else {
        echo 'false';
    }
}   
