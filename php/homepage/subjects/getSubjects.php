<?php
// to allow for the sql requests necessary for this 
require "../../SQL.php";
if ($_POST) {
    //creating the connection
    $SQLconnection = new MySQLRequest();
    $SQLconnection->oneResult = true;
    //checking the account credentials
    $output = $SQLconnection->sql("SELECT * FROM users WHERE Pass='{$_POST["password"]}' && ID='{$_POST["ID"]}'");
    if ($output) {
        $SQLconnection->oneResult = false;

        $sql = "
        SELECT 
        subjects.*, COALESCE(SUM(visit.time),0) as totalTime 
        FROM subjects
            LEFT JOIN 
            topics 
            ON topics.subjectID = subjects.ID 
            LEFT JOIN 
            visit 
            ON 
            topics.ID = visit.topicID 
        WHERE subjects.user={$_POST['ID']} ";

        if ($_POST["id"] != 'false') {
            $sql .= "&& subjects.ID='{$_POST["id"]}'";
        }
        $sql .= " GROUP BY subjects.ID";
        $subject = $SQLconnection->sql($sql); // all events with the user's ID
        if ($subject != null) {
            $data = $subject;
            echo json_encode($data);
        } else {
            echo "[]";
        }
    } else {
        echo 'false';
    }
}
