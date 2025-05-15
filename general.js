/*
    abstact class screen

    */
   


    let request = new AjaxTemplate(true)
    request.href = "php/getVersion.php"
    let LATEST_VERSION 
    let CURRENT_VERSION = '0.1.2'

    request.ajaxSuccess = function(data){
      LATEST_VERSION = data
      if(LATEST_VERSION !== CURRENT_VERSION){
        console.log('wrong version detected')
        setTimeout(()=>location.reload(true),5000)
        
      }
    }
    request.send()
    

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
let listOfAjaxRequests = []
let showCalendar = true
// wait until the page has loaded to add items such as event listeners
window.onload = function () {
  lockScreen = new LockScreen();
  homeScreen = new HomeScreen();
  toggleCalendarView(false)
  toggleCalendarView(false)

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

function toggleCalendarView(repl = true) {
  let pageCookies = Cookies.get()
  if(pageCookies.hasOwnProperty('showcal')){
    let curr = Cookies.get('showcal')
    curr = (curr == 'true') ? 'false' : 'true'
    console.log(curr)
    showCalendar = (curr== 'true') ? true : false
    
    Cookies.set("showcal", curr, { expires: 100 })
    

  }else{
    Cookies.set("showcal", "false", { expires: 100 })
    showCalendar = false
    
  }
  if(repl){
    homeScreen.show()
    }
}

function logOut() {
  //remove the login related cookies
  Cookies.remove("username");
  Cookies.remove("password");
  //refreshing the page to return to the homepage
  location.reload();
}

