<?php
// to allow for the sql requests necessary for this 
require "../../SQL.php";

require "../../whitelist.php";
if ($_POST) {
    //creating the connection
    $SQLconnection = new MySQLRequest();
    $_POST = whitelist($_POST,$SQLconnection->conn);
    
    $SQLconnection->oneResult = true;
    //checking the account credentials
    $output = $SQLconnection->sql("SELECT * FROM users WHERE ID='{$_POST["ID"]}'");

    if($output && (password_verify($_POST['password'], $output['Pass'] ))) {
        //default  sql request  using a left join
        $sql = "SELECT 
         topics.*,
         subjects.name as subjectName,
         COALESCE(visit.diffrating, -1) as diffrating,
         COALESCE(visit.date,topics.dateCreated) as date,
         (SELECT SUM(time)  FROM visit WHERE topicID=topics.ID) as TotalTime
        FROM topics 
        LEFT JOIN subjects
        ON topics.subjectID = subjects.ID 
        LEFT JOIN visit
        ON visit.ID = (
            SELECT v1.ID
            FROM visit v1
            WHERE topics.ID = v1.topicID
            ORDER BY v1.date desc
            LIMIT 1
        )
        WHERE topics.user='{$_POST["ID"]}' 
        && 
        (subjects.user='{$_POST["ID"]}' || topics.subjectID = -1) 
        && 
        (visit.ID is null || visit.user='{$_POST["ID"]}')";
        //to say that no one result is needed 
        $SQLconnection->oneResult = false;
        //if a id is given
        if ($_POST["id"] != 'false') {
            //add a clause to check for that id 
            $sql .= " && topics.ID='{$_POST["id"]}'";
        }
        //send the requst to the database 
        //echo $sql;
        $topic = $SQLconnection->sql($sql); 
        //if a response is given 
        if ($topic != null) {
            //send the data 
            $data = $topic;
            echo json_encode($data);
        } else {
            //send an empty list to avoid errors when the js tries to parse it as JSON 
            echo "[]";
        }
    } else {
        echo 'false';
    }
}
