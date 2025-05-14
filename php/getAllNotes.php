<?php
/**
 * Get All Notes Handler
 * Retrieves all notes for a user across events, subjects, and topics
 * Includes related information from the referenced tables
 * 
 * Required POST parameters:
 * - ID: User ID
 * - password: User password
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
        $today = date("Y-m-d");
        
        // Switch to multi-result mode for data queries
        $SQLconnection->oneResult = false;
        
        // Build complex query to get all notes with related information
        // Uses UNION ALL to combine notes from different sources
        $sql = "SELECT
                notes.*,
                fr.name
                FROM notes 
                LEFT JOIN events fr
                ON fr.ID = notes.frID
                WHERE notes.user = '{$_POST['ID']}' 
                AND notes.frTable = 'events'  
                AND fr.user = '{$_POST['ID']}'
            UNION ALL
                SELECT
                notes.*,
                fr.name
                FROM notes 
                LEFT JOIN subjects fr 
                ON fr.ID = notes.frID
                WHERE notes.user = '{$_POST['ID']}' 
                AND notes.frTable = 'subjects' 
                AND fr.user = '{$_POST['ID']}'
            UNION ALL
                SELECT
                notes.*,
                fr.name
                FROM notes 
                LEFT JOIN topics fr
                ON fr.ID = notes.frID
                WHERE notes.user = '{$_POST['ID']}' 
                AND notes.frTable = 'topics'
                AND fr.user = '{$_POST['ID']}'
            ORDER BY date DESC";
        
        // Execute query
        $notes = $SQLconnection->sql($sql);
        
        // Return results
        if($notes) {
            // Return notes as JSON array
            echo json_encode($notes);
        } else {
            // Return empty array if no notes found
            echo "[]";
        }
    } else {
        // Authentication failed
        echo 'false';
    }
}
