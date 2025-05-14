/**
 * AjaxTemplate - A class for handling AJAX requests in a standardized way
 * This class provides a template for making AJAX calls with predefined default settings
 * and customizable success/error handlers
 */
class AjaxTemplate {
    /**
     * Creates a new AjaxTemplate instance
     * @param {boolean} ajax - Whether the request should be asynchronous
     */
    constructor(ajax) {
        // Default configuration for AJAX requests
        this.href = ""        // The URL endpoint for the request
        this.ajax = ajax      // Async flag
        this.data = { "1": 1 }  // Default data payload to help PHP detect request method
        this.type = "POST"    // Default request method
        this.dataType = "text"  // Default response data type
    }
 
    /**
     * Default success callback for AJAX requests
     * Can be overridden when instantiating the class
     * @param {any} data - The response data from the server
     */
    ajaxSuccess(data) {
        // Default implementation is empty
    }

    /**
     * Default error callback for AJAX requests
     * @param {Object} xhr - The XMLHttpRequest object
     * @param {string} status - The error status
     * @param {string} error - The error message
     * @throws {Error} Throws an error with the status and message
     */
    ajaxError(xhr, status, error) {
        throw new Error(error, status)
    }

    /**
     * Sends the AJAX request with the configured parameters
     * @returns {Promise} jQuery AJAX Promise object
     */
    send() {
        // Construct the request parameters
        let sendParams = {
            async: this.ajax,
            error: this.ajaxError,
            url: this.href,
            data: this.data,
            method: this.type,
            success: this.ajaxSuccess,
            dataType: this.dataType
        }
        
        // Make the AJAX request using jQuery
        let sendData = $.ajax(sendParams)
        
        // Store the request parameters for tracking/debugging
        listOfAjaxRequests.push(sendParams)
        
        return sendData
    }
}

// Array to store all AJAX requests made through this template
let listOfAjaxRequests = []