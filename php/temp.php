<?php 

// to allow for the sql requests neccesary for this 
require "SQL.php";


    $SQLconnection = new MySQLRequest();


    $SQLconnection->oneResult = false;
    $output = $SQLconnection->sql("SELECT * FROM users");
    foreach($output as $row){
        $row['Pass'] = password_hash($row['Pass'],PASSWORD_BCRYPT);
        echo $row['Pass'];
        $s = "UPDATE users SET pass='{$row['Pass']}' WHERE ID={$row['ID']}";
        echo $s;
        $SQLconnection->sql($s,false);

    }


