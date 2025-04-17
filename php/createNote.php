<?php
// to allow for the sql requests neccesary for this 
require "SQL.php";
require "whitelist.php";
if ($_POST) {
    // a string containing all the allowed characters, this is to reduce the risk of a sql Injection
    $SQLconnection = new MySQLRequest(); // new instance of the sql request
    $_POST = whitelist($_POST,$SQLconnection->conn);

    $SQLconnection->oneResult = true; // as the sql should only return one value 
    $output = $SQLconnection->sql("SELECT * FROM users WHERE ID='{$_POST["ID"]}'");
    if($output && (password_verify($_POST['password'],$output['Pass']))) { // if there is a account with the same credentials 
        $SQLconnection->oneResult = false; // change the expected result 
        $valid = true; //assume all inputs a valid 
        
            //if request is valid
            $max = $SQLconnection->sql("SELECT max(ID) FROM notes"); //get highest id
            if($max){
                //if there is a highest id then the new id will be one higher 
                $max = $max[0]["max(ID)"] + 1;
            }else {
                //if there is no events then the id;s should start at zero 
                $max = 0;
            }
            // sql request to create the record in the database 
            $sql = "INSERT INTO `notes` (`ID`, `user`, `frID`, `frTable`,`text`,`date`) VALUES ($max, '{$_POST["ID"]}', '{$_POST["data"]["frID"]}', '{$_POST["data"]["frTable"]}', '{$_POST["data"]["note"]}',NOW())";
            echo $sql;
            $SQLconnection->sql($sql, false);
      
    } else {
        echo 'false';
    }}

