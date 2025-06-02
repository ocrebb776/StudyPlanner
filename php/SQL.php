<?php
class MySQLRequest
{
    // definine all the public attributes
    public $servername;
    public $username;
    public $password;
    public $dbname;
    public $oneResult;
    // $Cconn would need to be a private attribute as it shouldn't be Changed
    public $conn;
    function __construct($oneResult = false)
    { // if  no value is given then 
        // defining the variables
        $this->servername = "localhost:3306";
        $this->username = "";
        $this->password = "";
        $this->dbname = "studyplanner";
        $this->oneResult = $oneResult;
        
        // Set PHP timezone to British time
        date_default_timezone_set('Europe/London');
        
        // Create Connection to mysql server
        $this->conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);
        
        // Set MySQL session timezone to match British time
        // Use offset instead of named timezone
        $offset = date('P'); // Gets timezone offset in +HH:MM format
        $this->conn->query("SET time_zone = '$offset'");
    }
    function sql($sql, $exp = true)
    {
        //Executing request based of sql parameters
        $result = $this->conn->query($sql);
        // create a blank list variable for all the columns to be added
        $output = [];
        if ($exp) {
            if ($result->num_rows > 0) {
                //for each row of data append it to the end of a list
                while ($row = $result->fetch_assoc()) {
                    $output[] = $row;
                }
                if (count($output) == 1 && $this->oneResult) {
                    // if their is only one result and the program is only expecting one result it will returnt the one result on its own rather than in a class
                    return $output[0];
                } else if ($this->oneResult) {
                    // if the program is expecting one result and many is given it will return false
                    return false;
                }
                // if their is a result return the result
                return $output;
            } else {
                // if their is no result of the sql return False
                return false;
            }
        }
    }
    function __destruct()
    {
        //close the connection when the last reference is made
        $this->conn->close();
    }
}
