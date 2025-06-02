<?php
function whitelist($input, $connection = null) {
    if($connection == null){
        $sqlH = new MySQLRequest();
        $connection = $sqlH->conn;
    }
    if (is_array($input)) {
    foreach ($input as $key => $value) {
        $input[$key] = whitelist($value, $connection);
    }
    return $input;
}

if (is_object($input)) {
    // Handle objects if needed. For simplicity, we can convert them to strings.
    $input = (string) $input;
}

if (is_numeric($input)) {
    return $input; // No need to sanitize numeric values, but be mindful of data type issues elsewhere.
}

if (is_null($input)) {
    return null;
}

if (empty($input) && $input !== '0') { //handle empty strings and nulls, but allow '0'
    return '';
}

if (is_string($input)) {
    if ($connection) {
        // Use prepared statements when possible. This is the best approach.
        // Example with mysqli:
        return mysqli_real_escape_string($connection, $input); //Requires a db connection.
    } else {
        // If no connection is available, use a fallback (less secure).
        // Consider using a library like OWASP ESAPI or HTML Purifier for more robust sanitization.
        return htmlspecialchars(trim($input), ENT_QUOTES, 'UTF-8');
    }
}

// Handle other data types as needed.
return $input; // Return the input unchanged if it's not a string, array, or object.
}
