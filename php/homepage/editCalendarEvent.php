

<?php
// to allow for the sql requests neccesary for this 
require "../SQL.php";
require "../whitelist.php";
if ($_POST) {
    // a string contanining all the allowed characters, this is to reduce the risk of a sql Injection
    $trimList = "qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPASDFGHJKLZXCVBNM!£$%&_-+=,.<>#;: ";
  
    $SQLconnection = new MySQLRequest(); // new insance of the sql request
    $SQLconnection->oneResult = true; // as the sql should only return one value 
    $output = $SQLconnection->sql("SELECT * FROM users WHERE Pass='{$_POST["password"]}' && ID='{$_POST["ID"]}'");
    if ($output) { // if there is a account with the same credintals 
        $SQLconnection->oneResult = false; // change the expected result 
        $valid = true; //assume all inputs a valid 
        foreach($_POST["data"] as $key=>$value){
            //foreach input strip unwanted characters
            $newVal= whitelist($value,$trimList);
            if($newVal !=$value){
                //if the function striped any characrters then it must be invalid 
                $valid= false;

            }
        }



if($valid){
//if request is valid

        // sql request to change the record in the database 

        $sql = "UPDATE `events` SET `name` = '{$_POST["data"]["Title"]}', `startTime` = '{$_POST["data"]["StartTime"]}',`endTime`='{$_POST["data"]["EndTime"]}',`Type` = '{$_POST["data"]["EventType"]}',`date` = '{$_POST["data"]["Date"]}' WHERE `ID`={$_POST["data"]["id"]}";
         echo $sql;
        $SQLconnection->sql($sql,false);
 

    
    }else{
        echo "some invalid characters in input(s)";
    }
    } else {
        echo 'false';
    }
}
