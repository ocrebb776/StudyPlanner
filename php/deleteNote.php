<?php
/**
 * Delete Note Handler
 * Handles the deletion of notes from the database with proper authentication and sanitization
 * 
 * Required POST parameters:
 * - ID: User ID
 * - password: User password
 * - id: Note ID to delete
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
        // Delete note, ensuring it belongs to the authenticated user
        // This prevents unauthorized deletion of notes by other users
        $SQLconnection->sql(
            "DELETE FROM notes 
             WHERE `notes`.`ID` = {$_POST["id"]} 
             AND `notes`.`user` = '{$_POST["ID"]}'", 
            false
        );
    }
} else {
    // Invalid request method
    echo 'false';
}
