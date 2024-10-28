





class LockScreen extends Screen {
    show() {
document.title = "StudyPlanner Login"
        this.status = true
        this.element.currentScreen = this
        let row = document.createElement("div")

        let login = this.login()
        let signUp = this.signUp()
        let containter = document.createElement("div")
        containter.setAttribute("class","containter-md p-5")

        row.setAttribute("class","row g-3")

        row.appendChild(login)
        row.appendChild(signUp)
        containter.appendChild(row)
        this.element.appendChild(containter)
    }
 
login(){
    let containter = document.createElement("div")
    containter.setAttribute("class"," col-sm")
    let card = document.createElement("div")
    card.setAttribute("class","card")



    let formDiv = document.createElement("div")
    formDiv.setAttribute("class","card-body")

    let footer = document.createElement("div")
    footer.setAttribute("class","card-footer bg-primary text-center")
    let title = document.createElement("div")
    title.setAttribute("class","card-header bg-primary text-light")
    title.textContent = "Login"

        // USERNAME LABEL
    let UsernameLabel = document.createElement('label')
    UsernameLabel.setAttribute("for", "username")
    UsernameLabel.setAttribute("class","form-label")
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
        ["autocomplete","username"],
        ["class","form-control"]
    )
    let passwordinput = document.createElement("input")
    setManyAttrbutes(passwordinput, 
       
        ["name", "password"],
        ["id","password"],
        ["required",""],
        ["autocapitalise","false"],
        ["placeholder","password"],
        ["type","password"],
        ["autocomplete","password"],["class","form-control"]
    )

    let PasswordLabel = document.createElement('label')
    PasswordLabel.setAttribute("for", "password")
    PasswordLabel.setAttribute("class","form-label")
    PasswordLabel.textContent = "Password:"

    let LoginFormSubmit = document.createElement('button');
    LoginFormSubmit.setAttribute('id', 'LoginFormSubmit');
    
    LoginFormSubmit.setAttribute('type', 'button');
    LoginFormSubmit.setAttribute('class', 'btn btn-outline-light w-50');
    LoginFormSubmit.textContent = 'Login';

let FormCheckMark = document.createElement("div")
FormCheckMark.setAttribute("class","form-check mb-3")
let FormCheckLabel = document.createElement("label")
FormCheckLabel.setAttribute("class","form-check-label")
let RememberMe = document.createElement("input")
setManyAttrbutes(RememberMe,
    ["class","form-check-input"],
    ["type","checkbox"],
    ["name","RememberME"],
    ["id","RememberMe"]

)

FormCheckLabel.append(RememberMe,"Remember me")
FormCheckMark.appendChild(FormCheckLabel)

    LoginFormSubmit.addEventListener("click", loginValidation);

    formDiv.appendChild(UsernameLabel)
    formDiv.appendChild(usernameinput)
    formDiv.appendChild(PasswordLabel)
    formDiv.appendChild(passwordinput)
    formDiv.appendChild(FormCheckMark)
    footer.appendChild(LoginFormSubmit)

card.appendChild(title)
    card.appendChild(formDiv)
    card.appendChild(footer)
    containter.appendChild(card)
    return containter
}
signUp(){
    let containter = document.createElement("div")
    containter.setAttribute("class"," col-sm")
    let card = document.createElement("div")
    card.setAttribute("class","card")



    let formDiv = document.createElement("div")
    formDiv.setAttribute("class","card-body")

    let footer = document.createElement("div")
    footer.setAttribute("class","card-footer bg-primary text-center")
    let title = document.createElement("div")
    title.setAttribute("class","card-header bg-primary text-light")
    title.textContent = "Create Account"

        // USERNAME LABEL
    let UsernameLabel = document.createElement('label')
    UsernameLabel.setAttribute("for", "username-SignUp")
    UsernameLabel.setAttribute("class","form-label")
    UsernameLabel.textContent = "Username:"
        //INPUT 
    let usernameinput = document.createElement("input")
    setManyAttrbutes(usernameinput, 
       
        ["name", "username-SignUp"],
        ["id","username-SignUp"],
        ["required",""],
        ["autocapitalise","false"],
        ["placeholder","username"],
        ["type","text"],
        ["autocomplete","username"],
        ["class","form-control"]
    )
    let passwordinput = document.createElement("input")
    setManyAttrbutes(passwordinput, 
       
        ["name", "password-SignUp1"],
        ["id","password-SignUp1"],
        ["required",""],
        ["autocapitalise","false"],
        ["placeholder","password"],
        ["type","password"],
        ["autocomplete","password"],["class","form-control"]
    )

    let PasswordLabel = document.createElement('label')

    PasswordLabel.setAttribute("for", "password-SignUp1")
    PasswordLabel.setAttribute("class","form-label")
    PasswordLabel.textContent = "Password:"   
    
    let passwordinput2 = document.createElement("input")
    setManyAttrbutes(passwordinput2,
        ["name", "password-SignUp2"],
        ["id","password-SignUp2"],
        ["required",""],
        ["autocapitalise","false"],
        ["placeholder","password"],
        ["type","password"],
        ["autocomplete","password"],["class","form-control"]
    )

    let PasswordLabel2 = document.createElement('label')
    PasswordLabel2.setAttribute("for", "password-SignUp2")
    PasswordLabel2.setAttribute("class","form-label")
    PasswordLabel2.textContent = "Confirm Password:"

    let LoginFormSubmit = document.createElement('button');
    LoginFormSubmit.setAttribute('id', 'LoginFormSubmit');
    
    LoginFormSubmit.setAttribute('type', 'button');
    LoginFormSubmit.setAttribute('class', 'btn btn-outline-light w-50');
    LoginFormSubmit.textContent = 'Create Account';




    LoginFormSubmit.addEventListener("click", ValidateCreateAccount);

    formDiv.appendChild(UsernameLabel)
    formDiv.appendChild(usernameinput)
    formDiv.appendChild(PasswordLabel)
    formDiv.appendChild(passwordinput)   
     formDiv.appendChild(PasswordLabel2)
    formDiv.appendChild(passwordinput2)

    footer.appendChild(LoginFormSubmit)

card.appendChild(title)
    card.appendChild(formDiv)
    card.appendChild(footer)
    containter.appendChild(card)
    return containter
}

}



function loginValidation() {
    // The function of this function is to validate the username and password, strip any characters that arent allowed and send the data to the php server to check to see if it is valid
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username != "" && password != "") {
        let request = new AjaxTemplate("false");
        request.href = "php/login/validateLogin.php";
        request.data = {
            username: username,
            password: password,
        };
        request.ajaxSuccess = function(result) {
            if (result == "---false---") {
                console.log(result)
                alert("no");
            } else {
                StoredID = result
                StoredPassword = password
                homeScreen.Swapstatus()
            }
        };
        request.send();
        console.log(request)
    } else {
        alert("Your Username or password cannot be empty");
    }
}

let IsTheUsernameNotTaken = true

function ValidateCreateAccount(){
    let username = document.getElementById("username-SignUp")
    let password = document.getElementById("password-SignUp1")
    let confirmPassword = document.getElementById("password-SignUp2")
    let valid = true

    let CheckIfUsernameIsAvaliable = new AjaxTemplate("false")


    CheckIfUsernameIsAvaliable.href = "php/login/CheckIfUsernameIsAvaliable.php"

    CheckIfUsernameIsAvaliable.data = {
            username: username.value,
        };
        CheckIfUsernameIsAvaliable.ajaxSuccess = function(result) {
            if(result == "true"){

                IsTheUsernameNotTaken = true
            }else{
                alert("Sorry That Username Is Taken")
                IsTheUsernameNotTaken = false
            }
        };
        CheckIfUsernameIsAvaliable.send();
valid = IsTheUsernameNotTaken
    if(password.value.length < 8 || password.value.length > 15){
        alert("Password Must Be within 8 and 15 characters")
        valid = false
    }
    if(password.value != confirmPassword.value){
        alert("Password Must Match")
        valid = false
    }
    if(username.value.length < 4){
        alert("usernames must be at least 5 characters")
        valid = false
    }
    if(valid){
        let CreateAccount = new AjaxTemplate("false")


        CreateAccount.href = "php/login/CreateAccount.php"
    
        CreateAccount.data = {
                username: username.value,
                password:password.value
            };
            CreateAccount.ajaxSuccess = function(result) {
                if(result == "true"){
                document.getElementById("username").value = username.value;
                document.getElementById("password").value = password.value;
                loginValidation()
                }else{
                    console.log(result)
                }
            };
            CreateAccount.send();
    }

}
