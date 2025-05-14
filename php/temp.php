<?php
/**
 * Password Hash Migration Script
 * This is a temporary utility script to rehash all user passwords in the database
 * using the more secure BCRYPT algorithm
 * 
 * WARNING: This script should be run only once during migration
 * and should be removed or secured after use
 */

// Include database functionality
require "SQL.php";

// Create database connection
$SQLconnection = new MySQLRequest();

// Configure for multiple results
$SQLconnection->oneResult = false;

// Get all user records
$output = $SQLconnection->sql("SELECT * FROM users");

// Process each user
foreach($output as $row) {
    // Generate new password hash using BCRYPT
    $row['Pass'] = password_hash($row['Pass'], PASSWORD_BCRYPT);
    
    // Debug output
    echo $row['Pass'];
    
    // Update user's password hash
    $s = "UPDATE users SET pass='{$row['Pass']}' WHERE ID={$row['ID']}";
    echo $s;  // Debug output
    
    // Execute update
    $SQLconnection->sql($s, false);
}


