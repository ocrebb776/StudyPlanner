<?php
/**
 * MySQLRequest Class
 * Handles database connections and query execution for the Study Planner application
 * Provides a simplified interface for MySQL operations with automatic connection management
 */
class MySQLRequest
{
    /** @var string Database server hostname and port */
    public $servername;
    
    /** @var string Database username */
    public $username;
    
    /** @var string Database password */
    public $password;
    
    /** @var string Name of the database */
    public $dbname;
    
    /** @var boolean Whether to return single results directly */
    public $oneResult;
    
    /** @var mysqli Active database connection */
    public $conn;

    /**
     * Constructor - Initializes database connection
     * 
     * @param boolean $oneResult Whether to return single results directly (default: false)
     */
    function __construct($oneResult = false)
    {
        // Set database connection parameters
        $this->servername = "localhost:3306";
        $this->username = "";  // Database username should be configured
        $this->password = "";  // Database password should be configured
        $this->dbname = "studyplanner";
        $this->oneResult = $oneResult;

        // Establish connection to MySQL server
        $this->conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);
    }

    /**
     * Executes an SQL query and processes the results
     * 
     * @param string $sql The SQL query to execute
     * @param boolean $exp Whether to expect and process results (default: true)
     * @return mixed Array of results, single result object, or false on failure/no results
     */
    function sql($sql, $exp = true)
    {
        // Execute the SQL query
        $result = $this->conn->query($sql);
        
        // Initialize output array
        $output = [];

        if ($exp) {
            // Process query results if any exist
            if ($result->num_rows > 0) {
                // Fetch all rows and store in output array
                while ($row = $result->fetch_assoc()) {
                    $output[] = $row;
                }

                // Handle single result mode
                if (count($output) == 1 && $this->oneResult) {
                    // Return single result directly if oneResult is true
                    return $output[0];
                } else if ($this->oneResult) {
                    // Return false if oneResult is true but multiple results found
                    return false;
                }

                // Return all results
                return $output;
            } else {
                // No results found
                return false;
            }
        }
    }

    /**
     * Destructor - Closes database connection
     * Automatically called when object is destroyed
     */
    function __destruct()
    {
        // Close the database connection
        $this->conn->close();
    }
}
