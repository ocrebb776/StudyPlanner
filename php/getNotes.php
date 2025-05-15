<?php

// to allow for the sql requests neccesary for this 
require "SQL.php";

require "whitelist.php";
if ($_POST) {
    $SQLconnection = new MySQLRequest();
    $_POST = whitelist($_POST,$SQLconnection->conn);

    $SQLconnection->oneResult = true;
    $output = $SQLconnection->sql("SELECT * FROM users WHERE ID='{$_POST["ID"]}'");
    if($output && (password_verify($_POST['password'],$output['Pass']))) {
        $today = date("Y-m-d");
        $SQLconnection->oneResult = false;
        /*First SQL query to get the notes from the database,
         with the SELECT column having the same number of columns as the visit table 
         so that the UNION ALL can work
        */
        $sql = "SELECT 
        ID,user,frID,frTable,text,date,
        null as diffrating, null as type, null as time 
        FROM notes WHERE `user`='{$_POST['ID']}' && frID='{$_POST['id']}' && frTable='{$_POST["table"]}'";

        //if the type is a topic then add the visits into the sql query 
        if ($_POST["table"] == "topics") {
            $sql .= "UNION ALL SELECT 
           ID,user,topicID as frID,'aVisit' as frTable, note as text, date,diffrating,type,time
            FROM `visit` WHERE `user`={$_POST['ID']} && `topicID`={$_POST['id']}
           ";
        }
        //adding the ORDER BY clause to the sql query so that the newest notes are shown first
        $sql .= " ORDER BY `date` DESC";
        //sending the SQL query to the database
        $notes = $SQLconnection->sql($sql);
        //if there are notes then echo them out as a JSON object
        if ($notes) {
            echo json_encode($notes);
        } else {
            //if there is no notes then echo an empty array
            echo "[]";
        }
    } else {
        //if the user is not found or the login information is false then echo false
        echo 'false';
    }
}
