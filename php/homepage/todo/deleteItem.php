<?php
// to allow for the sql requests necessary for this 
require "../../SQL.php";

require "../../whitelist.php";
if ($_POST) {
    // a string containing all the allowed characters, this is to reduce the risk of a sql Injection

    $SQLconnection = new MySQLRequest(); // new instance of the sql request
    $_POST = whitelist($_POST,$SQLconnection->conn);

    $SQLconnection->oneResult = true; // as the sql should only return one value 
    $output = $SQLconnection->sql("SELECT * FROM users WHERE ID='{$_POST["ID"]}'");
    if($output && (password_verify($_POST['password'],$output['Pass']))) { // if there is a account with the same credentials 
        
 
        $SQLconnection->sql("DELETE FROM todo WHERE ID = {$_POST["id"]} && user='{$_POST["ID"]}'", false);
    }
} else {
    echo 'false';
}
