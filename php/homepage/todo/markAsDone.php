

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
        $SQLconnection->oneResult = false; // change the expected result 
       
            // sql request to change the record in the database
          $s =   $SQLconnection->sql("SELECT completed FROM todo WHERE ID={$_POST["id"]} && user={$_POST['ID']}");
         
          $newCompl = abs($s[0]['completed']-1);


            $sql = "UPDATE `todo` SET `completed` = $newCompl WHERE `ID`={$_POST["id"]} && user={$_POST['ID']}";
            echo $sql;
            $SQLconnection->sql($sql, false);
       
    } else {
        echo 'false';
    }
}   
