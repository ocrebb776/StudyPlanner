<?php
// to allow for the sql requests neccesary for this 
require "../SQL.php";

require "../whitelist.php";

if ($_POST) {
    $SQLconnection = new MySQLRequest();
    $_POST = whitelist($_POST,$SQLconnection->conn);

    $output = $SQLconnection->sql("SELECT * FROM users WHERE ID='{$_POST["ID"]}'");
    if($output && (password_verify($_POST['password'],$output['Pass']))){
        echo "false";
    }else{
        echo "true";
    }
}




?>