<?php
// to allow for the sql requests neccesary for this 
require "SQL.php";
if ($_POST) {
    $SQLconnection = new MySQLRequest();
    $SQLconnection->oneResult = true;
    $output = $SQLconnection->sql("SELECT * FROM users WHERE Pass='{$_POST["password"]}' && ID='{$_POST["ID"]}'");
    if ($output) {
        $today = date("Y-m-d");
        $SQLconnection->oneResult = false;
        $sql = "SELECT * FROM notes WHERE `user`='{$_POST['ID']}' && frID='{$_POST['id']}' ORDER BY date DESC";
        $notes = $SQLconnection->sql($sql);
        if($notes){
        
        echo json_encode($notes);
        }else{
            echo "[]";
        }
    } else {
        echo 'false';
    }
}
