<?php
// to allow for the sql requests neccesary for this 
require "../../SQL.php";
require "../../whitelist.php";
if ($_POST) {
    // a string containing all the allowed characters, this is to reduce the risk of a sql Injection
    $trimList = "qwertyuiop()asdfghjklzxcvbnm1234567890QWERTYUIOPASDFGHJKLZXCVBNM!£$%&_-+=,.<>#;: /@?,'/@@";

    $SQLconnection = new MySQLRequest(); // new insance of the sql request
    $SQLconnection->oneResult = true; // as the sql should only return one value 
    $output = $SQLconnection->sql("SELECT * FROM users WHERE Pass='{$_POST["password"]}' && ID='{$_POST["ID"]}'");
    if ($output) { // if there is a account with the same credentials 
        $SQLconnection->oneResult = false; // change the expected result 
        $valid = true; //assume all inputs a valid 
        foreach ($_POST["data"] as $key => $value) {
            //foreach input strip unwanted characters
            $newVal = whitelist($value, $trimList);
            if ($newVal != $value) {
                //if the function striped any characters then it must be invalid 
                $valid = false;
            }
        }

        if ($valid) {
            //if request is valid
            $max = $SQLconnection->sql("SELECT max(ID) FROM topics"); //get highest id

            if ($max) {
                //if there is a highest id then the new id will be one higher 
                $max = $max[0]["max(ID)"] + 1;
            } else {
                //if there is no topics then the id's should start at zero 
                $max = 0;
            }
            // sql request to create the record in the database 
            $SQLconnection->sql("INSERT INTO `topics` (`ID`, `user`, `name`, `links`,`subjectID`,`dateCreated`) VALUES ($max, '{$_POST["ID"]}', '{$_POST["data"]["name"]}', '[]',{$_POST["data"]["subjectID"]},NOW())", false);
        } else {
            echo "some invalid characters in input(s)";
        }
    } else {
        echo 'false';
    }
}
