<?php
/**
 * Get Notes Handler
 * Retrieves notes and visit records from the database with proper authentication
 * Combines notes and visit records for topics into a single sorted result set
 * 
 * Required POST parameters:
 * - ID: User ID
 * - password: User password
 * - id: Foreign key ID (related item)
 * - table: Foreign key table name (related item type)
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
        
        // Build base query for notes
        // Include null placeholders for visit-specific columns to match UNION structure
        $sql = "SELECT 
            ID, user, frID, frTable, text, date,
            null as diffrating, null as type, null as time 
            FROM notes 
            WHERE `user` = '{$_POST['ID']}' 
            AND frID = '{$_POST['id']}' 
            AND frTable = '{$_POST["table"]}'";

        // For topics, include related visit records
        if ($_POST["table"] == "topics") {
            $sql .= "UNION ALL SELECT 
                ID, user, topicID as frID, 'aVisit' as frTable, 
                note as text, date, diffrating, type, time
                FROM `visit` 
                WHERE `user` = {$_POST['ID']} 
                AND `topicID` = {$_POST['id']}";
        }

        // Sort combined results by date, newest first
        $sql .= " ORDER BY `date` DESC";
        
        // Execute query
        $notes = $SQLconnection->sql($sql);
        
        // Return results
        if ($notes) {
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
