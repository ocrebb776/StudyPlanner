<?php
// to allow for the sql requests necessary for this 
require "../../SQL.php";

require "../../utils.php";
if ($_POST) {

    $SQLconnection = new MySQLRequest(); // new instance of the sql request
    $_POST = whitelist($_POST,$SQLconnection->conn);

    $SQLconnection->oneResult = true; // as the sql should only return one value 
    $output = $SQLconnection->sql("SELECT * FROM users WHERE ID='{$_POST["ID"]}'");
    if($output && (password_verify($_POST['password'],$output['Pass']))) { // if there is a account with the same credentials 
        

        $SQLconnection->sql("DELETE FROM topics  WHERE ID='{$_POST["topicID"]}'", false);
        $SQLconnection->sql("DELETE FROM notes  WHERE frID='{$_POST["topicID"]}' && frTable='topics'", false);
        $SQLconnection->sql("DELETE FROM visit  WHERE topicID='{$_POST["topicID"]}'", false);
    }
} else {
    echo 'false';
}
