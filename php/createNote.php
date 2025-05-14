<?php
/**
 * Create Note Handler
 * Handles the creation of new notes in the database with proper authentication and sanitization
 * 
 * Required POST parameters:
 * - ID: User ID
 * - password: User password
 * - data: Object containing note details (frID, frTable, note)
 */

// Include required database and utility functions
require "SQL.php";
require "utils.php";

// Only process POST requests
if ($_POST) {
    // Create database connection
    $SQLconnection = new MySQLRequest();
    
    // Sanitize all POST data to prevent SQL injection
    $_POST = whitelist($_POST, $SQLconnection->conn);

    // Configure query to return single result for authentication
    $SQLconnection->oneResult = true;
    
    // Verify user credentials
    $output = $SQLconnection->sql("SELECT * FROM users WHERE ID='{$_POST["ID"]}'");
    
    // Check if user exists and password matches
    if($output && (password_verify($_POST['password'], $output['Pass']))) {
        // Switch to multi-result mode for subsequent queries
        $SQLconnection->oneResult = false;
        
        // Get the highest existing note ID
        $max = $SQLconnection->sql("SELECT max(ID) FROM notes");
        
        // Determine new note ID
        if($max) {
            // Increment highest existing ID
            $max = $max[0]["max(ID)"] + 1;
        } else {
            // Start from 0 if no existing notes
            $max = 0;
        }
        
        // Construct and execute insert query
        // frID: Foreign key ID (related item)
        // frTable: Foreign key table (related item type)
        $sql = "INSERT INTO `notes` (`ID`, `user`, `frID`, `frTable`, `text`, `date`) 
                VALUES ($max, '{$_POST["ID"]}', '{$_POST["data"]["frID"]}', 
                '{$_POST["data"]["frTable"]}', '{$_POST["data"]["note"]}', NOW())";
        
        echo $sql;  // Echo query for debugging
        $SQLconnection->sql($sql, false);
    } else {
        // Authentication failed
        echo 'false';
    }
}

