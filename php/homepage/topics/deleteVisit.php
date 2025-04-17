<?php
// to allow for the sql requests necessary for this 
require "../../SQL.php";

require "../../whitelist.php";
if ($_POST) {

    $SQLconnection = new MySQLRequest(); // new instance of the sql request
    $_POST = whitelist($_POST,$SQLconnection->conn);

    $SQLconnection->oneResult = true; // as the sql should only return one value 
    $output = $SQLconnection->sql("SELECT * FROM users WHERE Pass='{$_POST["password"]}' && ID='{$_POST["ID"]}'");
    if ($output) { // if there is a account with the same credentials 
        

        $SQLconnection->sql("DELETE FROM visit  WHERE ID='{$_POST["visitID"]}' && user='{$_POST['ID']}'", false);
    }
} else {
    echo 'false';
}
