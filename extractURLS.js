/**
 * Extracts URLs from a given string
 * This function uses regular expressions to find and extract valid HTTP/HTTPS URLs
 * from a text string, with optional case conversion
 *
 * @param {string} str - The input string to extract URLs from
 * @param {boolean} lower - Whether to convert extracted URLs to lowercase (default: false)
 * @returns {Array<string>} An array of extracted URLs with cleaned formatting
 * @throws {TypeError} If the input is not a string
 */
function extractUrls(str, lower = false) {
    // Regular expression for matching HTTP/HTTPS URLs
    // Matches URLs with optional subdomains, various allowed characters, and query parameters
    const regexp = /https?:\/\/(\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,63}\b([-a-zA-Z0-9()'@:%_\+.~#?!&//=]*)/gi;
    
    // Regular expression for cleaning up URLs by removing brackets and trailing dots
    const bracketsRegexp = /[()]|\.$/g;

    // Type checking for input parameter
    if (typeof str !== 'string') {
        throw new TypeError(`The str argument should be a string, got ${typeof str}`);
    }

    // Process non-empty strings
    if (str) {
        // Extract URLs using the regular expression
        let urls = str.match(regexp);
        
        if (urls) {
            // Clean and optionally convert URLs to lowercase
            return lower 
                ? urls.map((item) => item.toLowerCase().replace(bracketsRegexp, '')) 
                : urls.map((item) => item.replace(bracketsRegexp, ''));
        } else {
            return [];  // No URLs found
        }
    } else {
        return [];  // Empty input string
    }
};
