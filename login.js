class LockScreen extends Screen {
  show() {
    //setting the title of the document to appear in the tab bar of the web browser
    document.title = "StudyPlanner Login";
    //setting information for screen switching
    this.status = true;
    this.element.currentScreen = this;
    //creating an element to contain the row
    let row = document.createElement("div");
    //creating the login and signup forms
    let login = this.login();
    let signUp = this.signUp();
    //creating a container element
    let containter = document.createElement("div");
    containter.setAttribute("class", "containter-md p-5");
    //baking the row element a bootstrap row
    row.setAttribute("class", "row g-3");
    //adding the login and signup pages to the row
    row.appendChild(login);
    row.appendChild(signUp);
    //adding the row to the container
    containter.appendChild(row);
    //adding the container to the element
    this.element.appendChild(containter);
  }
  login() {
    //creating a container co hold the card
    let container = document.createElement("div");
    container.setAttribute("class", " col-sm");
    //creating a card to hold the form
    let card = document.createElement("div");
    card.setAttribute("class", "card");
    //creating a element to store the input fields
    let formDiv = document.createElement("div");
    formDiv.setAttribute("class", "card-body");
    //creating a footer
    let footer = document.createElement("div");
    footer.setAttribute("class", "card-footer bg-primary text-center");
    //creating a title
    let title = document.createElement("div");
    title.setAttribute("class", "card-header bg-primary text-light");
    title.textContent = "Login";
    // USERNAME LABEL
    let UsernameLabel = document.createElement("label");
    UsernameLabel.setAttribute("for", "username");
    UsernameLabel.setAttribute("class", "form-label");
    UsernameLabel.textContent = "Username:";
    //username input
    let usernameinput = document.createElement("input");
    setManyAttributes(
      usernameinput,

      ["name", "username"],
      ["id", "username"],
      ["required", ""],
      ["autocapitalise", "off"],
      ["placeholder", "username"],
      ["type", "text"],
      ["autocomplete", "username"],
      ["class", "form-control"]
    );
    //creating the password input
    let passwordinput = document.createElement("input");
    setManyAttributes(
      passwordinput,

      ["name", "password"],
      ["id", "password"],
      ["required", ""],
      ["autocapitalise", "false"],
      ["placeholder", "password"],
      ["type", "password"],
      ["autocomplete", "password"],
      ["class", "form-control"]
    );

    //creating a label for the password field
    let PasswordLabel = document.createElement("label");
    PasswordLabel.setAttribute("for", "password");
    PasswordLabel.setAttribute("class", "form-label");
    PasswordLabel.textContent = "Password:";
    //creating a submit button
    let LoginFormSubmit = document.createElement("button");
    LoginFormSubmit.setAttribute("id", "LoginFormSubmit");
    LoginFormSubmit.setAttribute("type", "button");
    LoginFormSubmit.setAttribute("class", "btn btn-outline-light w-50");
    LoginFormSubmit.textContent = "Login";
    //creating a remember me section
    let FormCheckMark = document.createElement("div");
    FormCheckMark.setAttribute("class", "form-check mb-3");
    let FormCheckLabel = document.createElement("label");
    FormCheckLabel.setAttribute("class", "form-check-label");
    let RememberMe = document.createElement("input");
    setManyAttributes(
      RememberMe,
      ["class", "form-check-input"],
      ["type", "checkbox"],
      ["name", "RememberME"],
      ["id", "RememberMe"]
    );
    //adding the the text and the remember me checkbox to the label
    FormCheckLabel.append(RememberMe, "Remember me");
    FormCheckMark.appendChild(FormCheckLabel);
    //adding an event listener to validate the form
    LoginFormSubmit.addEventListener("click", function () {
      loginValidation();
    });

    //adding eveything to the from div
    formDiv.appendChild(UsernameLabel);
    formDiv.appendChild(usernameinput);
    formDiv.appendChild(PasswordLabel);
    formDiv.appendChild(passwordinput);
    formDiv.appendChild(FormCheckMark);
    footer.appendChild(LoginFormSubmit);

    //adding the the title form and footer to the card
    card.appendChild(title);
    card.appendChild(formDiv);
    card.appendChild(footer);
    //adding the card into the container
    container.appendChild(card);
    //returning the container
    return container;
  }
  signUp() {
    let containter = document.createElement("div");
    containter.setAttribute("class", " col-sm");
    let card = document.createElement("div");
    card.setAttribute("class", "card");

    let formDiv = document.createElement("div");
    formDiv.setAttribute("class", "card-body");

    let footer = document.createElement("div");
    footer.setAttribute("class", "card-footer bg-primary text-center");
    let title = document.createElement("div");
    title.setAttribute("class", "card-header bg-primary text-light");
    title.textContent = "Create Account";

    // USERNAME LABEL
    let UsernameLabel = document.createElement("label");
    UsernameLabel.setAttribute("for", "username-SignUp");
    UsernameLabel.setAttribute("class", "form-label");
    UsernameLabel.textContent = "Username:";
    //INPUT
    let usernameinput = document.createElement("input");
    setManyAttributes(
      usernameinput,

      ["name", "username-SignUp"],
      ["id", "username-SignUp"],
      ["required", ""],
      ["autocapitalise", "false"],
      ["placeholder", "username"],
      ["type", "text"],
      ["autocomplete", "username"],
      ["class", "form-control"]
    );
    let passwordinput = document.createElement("input");
    setManyAttributes(
      passwordinput,

      ["name", "password-SignUp1"],
      ["id", "password-SignUp1"],
      ["required", ""],
      ["autocapitalise", "false"],
      ["placeholder", "password"],
      ["type", "password"],
      ["autocomplete", "password"],
      ["class", "form-control"]
    );

    let PasswordLabel = document.createElement("label");

    PasswordLabel.setAttribute("for", "password-SignUp1");
    PasswordLabel.setAttribute("class", "form-label");
    PasswordLabel.textContent = "Password:";

    let passwordinput2 = document.createElement("input");
    setManyAttributes(
      passwordinput2,
      ["name", "password-SignUp2"],
      ["id", "password-SignUp2"],
      ["required", ""],
      ["autocapitalise", "false"],
      ["placeholder", "password"],
      ["type", "password"],
      ["autocomplete", "password"],
      ["class", "form-control"]
    );

    let PasswordLabel2 = document.createElement("label");
    PasswordLabel2.setAttribute("for", "password-SignUp2");
    PasswordLabel2.setAttribute("class", "form-label");
    PasswordLabel2.textContent = "Confirm Password:";

    let LoginFormSubmit = document.createElement("button");
    LoginFormSubmit.setAttribute("id", "LoginFormSubmit");

    LoginFormSubmit.setAttribute("type", "button");
    LoginFormSubmit.setAttribute("class", "btn btn-outline-light w-50");
    LoginFormSubmit.textContent = "Create Account";

    LoginFormSubmit.addEventListener("click", ValidateCreateAccount);

    formDiv.appendChild(UsernameLabel);
    formDiv.appendChild(usernameinput);
    formDiv.appendChild(PasswordLabel);
    formDiv.appendChild(passwordinput);
    formDiv.appendChild(PasswordLabel2);
    formDiv.appendChild(passwordinput2);

    footer.appendChild(LoginFormSubmit);

    card.appendChild(title);
    card.appendChild(formDiv);
    card.appendChild(footer);
    containter.appendChild(card);
    return containter;
  }
}

function loginValidation(
  //get the username and passwords
  username = document.getElementById("username").value,
  password = document.getElementById("password").value,
  checked = document.getElementById("RememberMe").checked
) {
  //check to make sure that both the useername and password is not empty
  if (username != "" && password != "") {
    //create a new request to validateLogin.php
    let request = new AjaxTemplate("false");
    request.href = "php/login/validateLogin.php";
    //define the input data
    request.data = {
      username: username,
      password: password,
    };
    //define the fucntion to be run if the PHP successfully returns a response
    request.ajaxSuccess = function (result) {
      //checking to see if the result is not a number (the user cannot log in)
      if (isNaN(result)) {
        if (result == "false") {
          //tell the user that their username or password is incorrect
          alert("The entered Username or password is incorrect");
        }else{
          throw new Error(result)
        }
      } else {
        //set the global variables as stored id and stored password to be the result and the user entered password
        StoredID = result;
        StoredPassword = password;

        if (checked) {
          //if the user selected remember me ,store the login information as a cookie
          Cookies.set("username", username, { expires: 100 });
          Cookies.set("password", password, { expires: 100 });
        }
        //set the homescreen to be shown
        homeScreen.swapStatus();
        document.getElementById("nameGoesHere").innerHTML = username;
      }
    };
    //send the request
    request.send();
    console.log(request);
  } else {
    //tell the user that either their username or password is empty
    alert("Your Username or password cannot be empty");
  }
}

let IsTheUsernameNotTaken = true;

function ValidateCreateAccount() {
  let username = document.getElementById("username-SignUp");
  let password = document.getElementById("password-SignUp1");
  let confirmPassword = document.getElementById("password-SignUp2");
  //assume valid 
  let valid = true;
  //check for invalid characters 
  let wUser = whiteList(username.value);
  let wPass = whiteList(password.value);
  //if there is invalid characters in the username 
  if (wUser != true) {
    //set valid to be false 
    valid = false;
    //tell the user
    alert("invalid characters in the username \n-" + wUser.join("'\n-") + "");
  }
  if (wPass != true) {
    //set valid to be false 
    valid = false;
    //tell the user
    alert("invalid charcaters in the password\n-" + wPass.join("'\n-'") + "");
  }

  let CheckIfUsernameIsAvaliable = new AjaxTemplate("false");

  CheckIfUsernameIsAvaliable.href = "php/login/CheckIfUsernameIsAvaliable.php";

  CheckIfUsernameIsAvaliable.data = {
    username: username.value,
  };
  CheckIfUsernameIsAvaliable.ajaxSuccess = function (result) {
    if (result == "true") {
      IsTheUsernameNotTaken = true;
    } else {
      alert("Sorry That Username Is Taken");
      IsTheUsernameNotTaken = false;
    }
  };
  if (valid) {
    CheckIfUsernameIsAvaliable.send();
    valid = IsTheUsernameNotTaken;
    if (password.value.length < 8 || password.value.length > 30) {
      alert("Password Must Be within 8 and 30 characters");
      valid = false;
    }
    if (password.value != confirmPassword.value) {
      alert("Password Must Match");
      valid = false;
    }
    if (username.value.length < 4) {
      alert("usernames must be at least 5 characters");
      valid = false;
    }
    if (valid) {
      let CreateAccount = new AjaxTemplate("false");

      CreateAccount.href = "php/login/CreateAccount.php";

      CreateAccount.data = {
        username: username.value,
        password: password.value,
      };
      CreateAccount.ajaxSuccess = function (result) {
        if (result == "true") {
          document.getElementById("username").value = username.value;
          document.getElementById("password").value = password.value;
          loginValidation();
        } else {
          console.log(result);
        }
      };
      CreateAccount.send();
    }
  }
}
