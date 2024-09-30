





class LockScreen extends Screen {
    show() {

        this.status = true
        this.element.currentScreen = this
        let formDiv = document.createElement("div")
            // USERNAME LABEL
        let UsernameLabel = document.createElement('label')
        UsernameLabel.setAttribute("for", "username")
        UsernameLabel.textContent = "Username:"
            //INPUT 
        let usernameinput = document.createElement("input")
        setManyAttrbutes(usernameinput,
            ["name", "username"],
            ["id","username"],
            ["required",""],
            ["autocapitalise","false"],
            ["placeholder","username"],
            ["type","text"],
            ["autocomplete","username"]
        )
        let passwordinput = document.createElement("input")
        setManyAttrbutes(passwordinput,
            ["name", "password"],
            ["id","password"],
            ["required",""],
            ["autocapitalise","false"],
            ["placeholder","password"],
            ["type","password"],
            ["autocomplete","password"]
        )


        let PasswordLabel = document.createElement('label')
        PasswordLabel.setAttribute("for", "password")
        PasswordLabel.textContent = "Password:"


        let LoginFormSubmit = document.createElement('button');
        LoginFormSubmit.setAttribute('id', 'LoginFormSubmit');
        LoginFormSubmit.textContent = 'Login';




        LoginFormSubmit.addEventListener("click", this.loginValidation);
        formDiv.appendChild(UsernameLabel)
        formDiv.appendChild(usernameinput)
        formDiv.appendChild(PasswordLabel)
        formDiv.appendChild(passwordinput)
        formDiv.appendChild(LoginFormSubmit)



console.log(this)
        this.element.appendChild(formDiv)
    }
 loginValidation() {
    // The function of this function is to validate the username and password, strip any characters that arent allowed and send the data to the php server to check to see if it is valid
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username != "" && password != "") {
        let request = new AjaxTemplate("false");
        request.href = "validateLogin.php";
        request.data = {
            username: username,
            password: password,
        };
        request.ajaxSuccess = function(result) {
            if (result == "---false---" || result.length != 8) {
                alert("no");
            } else {
                
                homeScreen.Swapstatus()
            }
        };
        request.send();
        console.log(request)
    } else {
        alert("Your Username or password cannot be empty");
    }
}}

