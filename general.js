
/*
    abstact class screen

    */
class Screen {
    constructor() {
        if (this.constructor == "Screen") {
            // Screen should never be used unless it is used by an abstact class
            throw new Error("Abstract class screen shouldnt be instantiated");
        } else {
            this.status = false;
            this.element = document.querySelector("body");
            console.log(this)
        }
    }
    clear() {
        this.element.innerHTML = "";
    }
    Swapstatus() {
        if (this.status) {
            this.status = false;
            this.hide();
        } else {
            this.element.currentScreen.Swapstatus();
            this.element.currentScreen = this;
            this.stats = true;
            this.show();
        }
    }
    hide() {
        this.element.innerHTML = "";
    }
    show() { }
}

class Popup extends Screen{
    show(){
        
    }
}
let lockScreen
let homeScreen
// wait until the page has loaded to add items such as event listeners
window.onload = function() {
    lockScreen = new LockScreen()
    homeScreen = new HomeScreen()

    // create a new instance of the  lockscreen
    
        // set the current screen for body to be the lockscreen
    document.querySelector("body").currentScreen = lockScreen
        // show the lockscreen
    lockScreen.show()
    document.getElementById("username").value = "testusr1";
    document.getElementById("password").value = "123";
};

function setManyAttrbutes(Item){
    console.log(Item)
    for(let x=1;x < arguments.length;x++){
        Item.setAttribute(arguments[x][0],arguments[x][1])
    }
    return Item
}
