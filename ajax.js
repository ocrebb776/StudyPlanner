class AjaxTemplate {
    constructor(ajax) {
        // setting the default settings so that they dont need to be spesifed each time the Class is used
        this.href = ""
        this.ajax = ajax
            // by making adding in data it will allow the php files to tell if their is a POST or GET requesr, the bes
        this.data = { "1": 1 }
        this.type = "POST"
        this.dataType = "text"
    }
 
        // incase the ajaxSuccess function isnt spesified
    ajaxSuccess(data) {
            console.log("Recived Ajax")
      
        }
        // incase the ajazError function isnt spesified
    ajaxError(xhr, status, error) {
        throw new Error(error,status)
    }
        // this is where the methid will be used to send the data 
    send() {
        console.log("attempting to send the ajax request")
        return $.ajax({
            async: this.ajax,
            error: this.ajaxError,
            url: this.href,
            data: this.data,
            method: this.type,
            success: this.ajaxSuccess,
            dataType: this.dataType
        })

    }
}