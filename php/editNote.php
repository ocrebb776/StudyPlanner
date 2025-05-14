<?php
/**
 * Edit Note Handler
 * Handles the updating of existing notes in the database with proper authentication and sanitization
 * 
 * Required POST parameters:
 * - ID: User ID
 * - password: User password
 * - data: Object containing note details (id, note)
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
        
        // Construct and execute update query
        $sql = "UPDATE `notes` SET `text` = '{$_POST["data"]["note"]}' 
                WHERE `ID` = {$_POST["data"]["id"]}";
        
        echo $sql;  // Echo query for debugging
        $SQLconnection->sql($sql, false);
    } else {
        // Authentication failed
        echo 'false';
    }
}   
