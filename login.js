// wait until the page has loaded to add items such as event listeners
window.onload = function() {
    console.log("🚀 ~ d:", "a")
    document.getElementById("LoginFormSubmit").addEventListener("click", loginValidation)
    document.getElementById("username").value = "testusr1"
    document.getElementById("password").value = "a"
}

function loginValidation() {
    // The function of this function is to validate the username and password, strip any characters that arent allowed and send the data to the php server to check to see if it is valid
    let username = document.getElementById("username").value
    let password = document.getElementById("password").value

    if (username != "" && password != "") {
        let request = new AjaxTemplate("false")
        request.href = "validateLogin.php"
        request.data = {
            username: username,
            password: password
        }
        request.ajaxSuccess = function(result) {
            if (result == "true") {
                alert("yes")
            } else {
                alert("no")
            }

        }
        request.send()


    } else {
        alert('Your Username or password cannot be empty')
    }


}