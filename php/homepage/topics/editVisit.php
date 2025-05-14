

<?php
// to allow for the sql requests necessary for this 
require "../../SQL.php";
require "../../utils.php";
if ($_POST) {
    // a string containing all the allowed characters, this is to reduce the risk of a sql Injection

    $SQLconnection = new MySQLRequest(); // new instance of the sql request
    $_POST = whitelist($_POST,$SQLconnection->conn);
    $SQLconnection->oneResult = true; // as the sql should only return one value 
    $output = $SQLconnection->sql("SELECT * FROM users WHERE ID='{$_POST["ID"]}'");
    if($output && (password_verify($_POST['password'],$output['Pass']))) { // if there is a account with the same credentials 
        print_r($_POST);
        $SQLconnection->oneResult = false; // change the expected result 
        $valid = true; //assume all inputs a valid 
       
            //if request is valid
            // sql request to change the record in the database 
            $sql = "UPDATE `visit` SET `time`='{$_POST["data"]["time"]}', `diffrating` = '{$_POST["data"]["diffrating"]}' , `type`='{$_POST["data"]["type"]}' ,`note`='{$_POST["data"]["note"]} ' WHERE `ID`={$_POST["visitID"]}";
            echo $sql;
            $SQLconnection->sql($sql, false);
        
    } else {
        echo 'false';
    }
}   
