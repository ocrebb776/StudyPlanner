<?php
/**
 * Utility functions for user authentication and input sanitization
 * This file contains core security functions used throughout the application
 */

/**
 * Validates a user's credentials against the database
 * 
 * @param string $ID The user's ID/username
 * @param string $password The user's password
 * @return boolean True if credentials are valid, false otherwise
 */
function validateUserAccount($ID, $password) {
    // Create new database connection
    $SQLconnection = new MySQLRequest();
    
    // Sanitize input parameters
    $ID = whitelist($ID, $SQLconnection->conn);
    $password = whitelist($password, $SQLconnection->conn);

    // Configure query to return single result
    $SQLconnection->oneResult = true;
    
    // Query database for user account
    $output = $SQLconnection->sql("SELECT * FROM users WHERE ID='{$_POST["ID"]}'");
    
    // Verify password hash and return authentication result
    return ($output && (password_verify($_POST['password'], $output['Pass'])));
}

/**
 * Sanitizes input data to prevent SQL injection and XSS attacks
 * Handles multiple data types including arrays, objects, and strings
 * 
 * @param mixed $input The input to sanitize
 * @param mysqli|null $connection Optional MySQL connection for escaping strings
 * @return mixed The sanitized input
 */
function whitelist($input, $connection = null) {
    // Create database connection if not provided
    if($connection == null) {
        $sqlH = new MySQLRequest();
        $connection = $sqlH->conn;
    }

    // Handle array inputs recursively
    if (is_array($input)) {
        foreach ($input as $key => $value) {
            $input[$key] = whitelist($value, $connection);
        }
        return $input;
    }

    // Convert objects to strings
    if (is_object($input)) {
        $input = (string) $input;
    }

    // Pass through numeric values unchanged
    if (is_numeric($input)) {
        return $input;
    }

    // Handle null values
    if (is_null($input)) {
        return null;
    }

    // Handle empty values, preserving '0'
    if (empty($input) && $input !== '0') {
        return '';
    }

    // Process string inputs
    if (is_string($input)) {
        if ($connection) {
            // Use MySQL's built-in escaping if connection available
            return mysqli_real_escape_string($connection, $input);
        } else {
            // Fallback to basic HTML escaping if no connection
            return htmlspecialchars(trim($input), ENT_QUOTES, 'UTF-8');
        }
    }

    // Return unchanged if no other rules apply
    return $input;
}
