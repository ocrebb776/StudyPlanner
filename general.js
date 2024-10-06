
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
            this.element = document.querySelector("#wrapper");
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
let darkmode = true
let StoredID = false
let StoredPassword = false
// wait until the page has loaded to add items such as event listeners
window.onload = function() {
    lockScreen = new LockScreen()
    homeScreen = new HomeScreen()

    // create a new instance of the  lockscreen
    
        // set the current screen for body to be the lockscreen
    lockScreen.element.currentScreen = lockScreen
        // show the lockscreen
    lockScreen.show()
    // document.getElementById("username").value = "testusr1";
    // document.getElementById("password").value = "123";

    // loginValidation()

    if(darkmode){
        document.querySelector("html").setAttribute("data-bs-theme","dark")
    }

};

function setManyAttrbutes(Item){
    console.log(Item)
    for(let x=1;x < arguments.length;x++){
        Item.setAttribute(arguments[x][0],arguments[x][1])
    }
    return Item
}


class SortByKey{
    constructor(list,key){
        this.list = list
        this.key = key 
        this.sortedList = []
        this.pivot(list) // start sequence
    }
    pivot(list){
        // if their is items to sort
        if(list.length >1){
        
        let lower = [] // where all values lower of the pivot will go
        let higher = []// where all values Higher than the pivot will og 
        let pivot = list[list.length-1][this.key] // the value of the pivot
        list.forEach(item => {
            if(item[this.key]>pivot){
                higher.push(item) // if higher than pivot
            }else if(item[this.key]<pivot){
                lower.push(item)// if lower than pivot
            }
        })
        this.pivot(lower) // start sequnce again for lower values

        this.sortedList.push(list[list.length-1])// when the call stack reaches this line it will already have put all values lower than into the sorted list, so the pivot can now enter

        this.pivot(higher)// start sequnce again for higher values after lower values have been put in
    
    
    }else if(list.length==1){
            this.sortedList.push(list[0])}// if their is 1 element left add it to the list
        }
        returnSortedList(){
            return this.sortedList
        }
    }
