/*
    abstact class screen

    */

//all of the global variables
let TodayISO_Obj = new Date();
let TodayISO = TodayISO_Obj.toISOString().split("T")[0];
let lockScreen;
let homeScreen;
let darkMode = false;
let StoredID = false;
let StoredPassword = false;
let search
let CURRENTPOPUPOBJECT
let form
let noteForm;
// wait until the page has loaded to add items such as event listeners
window.onload = function () {
  lockScreen = new LockScreen();
  homeScreen = new HomeScreen();

  // create a new instance of the  lockscreen

  // set the current screen for body to be the lockscreen
  lockScreen.element.currentScreen = lockScreen;
  // show the lockscreen
  lockScreen.show();

  //checking if there is any cookies
  let pageCookies = Cookies.get();
  //if the cookies password and username exists
  if (
    pageCookies.hasOwnProperty("password") &&
    pageCookies.hasOwnProperty("username")
  ) {
    //autofill the username and password fields
    document.getElementById("username").value = pageCookies["username"];
    document.getElementById("password").value = pageCookies["password"];
    // login
    loginValidation();
  }

  if (pageCookies.hasOwnProperty("darkMode")) {
    document
      .querySelector("html")
      .setAttribute("data-bs-theme", pageCookies["darkMode"]);
  } else {
    Cookies.set("darkMode", "light", { expires: 100 });
  }
};
function toggleDarkmode(preset =false,change = true) {
  darkMode = Cookies.get("darkMode");
  if (preset != false) {
    darkMode = (preset == "dark") ? "light" : "dark";
  }
  if (darkMode == "light") {
    darkMode = "dark";
    if(change){
    Cookies.set("darkMode", "dark", { expires: 100 });}
    document.querySelector("html").setAttribute("data-bs-theme", "dark");
  } else {
    if(change){
    darkMode = "light";
    }
    document.querySelector("html").setAttribute("data-bs-theme", "light");
    Cookies.set("darkMode", "light", { expires: 100 });
  }
}



function logOut() {
  //remove the login related cookies
  Cookies.remove("username");
  Cookies.remove("password");
  //refreshing the page to return to the homepage
  location.reload();
}

