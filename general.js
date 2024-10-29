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
      console.log(this);
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
  show() {}
}
let TodayISO_Obj = new Date()
let TodayISO = TodayISO_Obj.toISOString().split('T')[0]
let lockScreen;
let homeScreen;
let darkmode = false;
let StoredID = false;
let StoredPassword = false;
// wait until the page has loaded to add items such as event listeners
window.onload = function () {
  lockScreen = new LockScreen();
  homeScreen = new HomeScreen();

  // create a new instance of the  lockscreen

  // set the current screen for body to be the lockscreen
  lockScreen.element.currentScreen = lockScreen;
  // show the lockscreen
  lockScreen.show();

  document.getElementById("username").value = "testusr1";
  document.getElementById("password").value = "123";
  loginValidation();

  if (darkmode) {
    document.querySelector("html").setAttribute("data-bs-theme", "dark");
  }
};
function toggleDarkmode(preset = "") {
  if (preset != "") {
    darkmode = !preset;
  }
  if (!darkmode) {
    darkmode = true;
    document.querySelector("html").setAttribute("data-bs-theme", "dark");
  } else {
    darkmode = false;
    document.querySelector("html").setAttribute("data-bs-theme", "light");
  }
}

function setManyAttributes(Item) {
  console.log(Item);
  for (let x = 1; x < arguments.length; x++) {
    Item.setAttribute(arguments[x][0], arguments[x][1]);
  }
  return Item;
}

class SortByKey {
  constructor(list, key) {
    this.list = list;
    this.key = key;
    this.sortedList = [];
    this.pivot(list); // start sequence
  }
  pivot(list) {
    // if their is items to sort
    if (list.length > 1) {
      let lower = []; // where all values lower of the pivot will go
      let higher = []; // where all values Higher than the pivot will og
      let pivot = list[list.length - 1][this.key]; // the value of the pivot
      list.forEach((item) => {
        if (item[this.key] > pivot) {
          higher.push(item); // if higher than pivot
        } else if (item[this.key] < pivot) {
          lower.push(item); // if lower than pivot
        }
      });
      this.pivot(lower); // start sequnce again for lower values

      this.sortedList.push(list[list.length - 1]); // when the call stack reaches this line it will already have put all values lower than into the sorted list, so the pivot can now enter

      this.pivot(higher); // start sequnce again for higher values after lower values have been put in
    } else if (list.length == 1) {
      this.sortedList.push(list[0]);
    } // if their is 1 element left add it to the list
  }
  returnSortedList() {
    return this.sortedList;
  }
}

class Popup {
  constructor(id = "popup") {
    this.id = id;
    this.element = document.getElementById(id);
    console.log(this.id);
    this.element.innerHTML = ""; //Clearing the modal of previous elements

    this.element.setAttribute("class", "modal fade"); //making sure the correct class is there
    this.element.setAttribute("role", "dialog");

    //createing all the neccesary elements in a modal
    this.modalDialog = document.createElement("div");
    this.modalDialog.classList.add("modal-dialog");

    this.modalContent = document.createElement("div");
    this.modalContent.classList.add("modal-content");

    this.modalHeader = document.createElement("div");
    this.modalHeader.classList.add("modal-header");

    this.modalBody = document.createElement("div");
    this.modalBody.classList.add("modal-body");

    this.Modalfooter = document.createElement("div");
    this.Modalfooter.classList.add("modal-footer");

    //createing the structure of the modal
    this.modalContent.append(
      this.modalHeader,
      this.modalBody,
      this.Modalfooter
    );
    this.modalDialog.append(this.modalContent);
    this.element.append(this.modalDialog);
    this.other();
  }
  show() {
    //allowing for it to be opend
    $("#" + this.id).modal("show");
  }
  hide() {
    //alowing it to be closed
    $("#" + this.id).modal("hide");
  }
  // for each part it takes n DOM elements as a list and
  //  appends them to an empty list
  title() {
    this.modalHeader.innerHTML = "";
    let args = [...arguments];
    args.forEach((el) => {
      this.modalHeader.append(el);
    });
    $("#" + this.id).modal("handleUpdate"); // readjust the size of the modal
  }
  body() {
    this.modalBody.innerHTML = "";
    let args = [...arguments];
    args.forEach((el) => {
      this.modalBody.append(el);
    });
    $("#" + this.id).modal("handleUpdate"); // readjust the size of the modal
  }
  footer() {
    this.Modalfooter.innerHTML = "";
    let args = [...arguments];
    args.forEach((el) => {
      this.Modalfooter.append(el);
    });
    $("#" + this.id).modal("handleUpdate"); // readjust the size of the modal
  }
  other() {}
}

class FormPopUp extends Popup {
  constructor(title, formdata , after, partingMessage) {
    super("popup");
    this.after = after; // function to run when the form is submitted 
this.inputData = formdata 

    // creating the title element 
    this.titleElement = document.createElement("h4");
    this.titleElement.setAttribute("class", "modal-title");
    this.titleElement.textContent = title;
    //adding the title element to the title part of the modal
    this.title(this.titleElement);
    //creating a form
    this.form = document.createElement("form");
    this.form.setAttribute("id", "ModalForm");
    this.form.setAttribute("name", "ModalForm");

    //for each input
    formdata.forEach((el) => {
    //creating a container to store the input 
      let container = document.createElement("div");
      //pre-decaring the variables
      let label;
      let input;
      switch (el.type) {
        case "textarea":
          container.setAttribute("class", "form-floating mt-3 mb-3"); //boostrap classes
          label = createLabel(el, title); //creating a label for textarea
          input = createInputElement(el, title); //creating the textarea element
          input.innerHTML = el.value; //asiging the preexising data
          container.append(input, label); // adding elements to container
          break;
        case "select":
          container.setAttribute("class", "input-group mb-3");  //boostrap classes
          label = document.createElement("span"); // creating the  label
          label.classList.add("input-group-text"); //boostrap classes
          label.textContent = el.displayName; //adding the information
          input = createInputElement(el, title); //creating the element 
          el.opt.forEach((opt) => { 
            //creating an <option> tag for each option
            let option = document.createElement("option");
            option.setAttribute("value", opt);
            option.textContent = opt;
            input.append(option); //ading to the <select> tag
      
          });
          input.value = el.value //assging the value
          container.append(label, input); //ading the variables
          break;
        case "checkbox":
          container.setAttribute("class", "form-check mb-3");  //boostrap classes
          label = createLabel(el, title, "form-check-label");
          input = createInputElement(el, title);
          label.prepend(input);
          container.append(label);
          break;
        case "color":
          container.setAttribute("class", "input-group mb-3");  //boostrap classes
          label = document.createElement("span"); 
          label.classList.add("input-group-text");
          label.textContent = el.displayName; //asigning the display name to the label
          input = createInputElement(el, title); 
          container.append(label, input);
          break;
        case "range":
          container.setAttribute("class", "mb-3");  //boostrap classes
          label = createLabel(el, title, "form-label");
          input = createInputElement(el, title);
          container.append(label, input);
          break;
        case "hidden":
          input = createInputElement(el, title);
          container.append(input);
          break;
        default:
          container.setAttribute("class", "form-floating mt-3 mb-3");  //boostrap classes
          label = createLabel(el, title);
          input = createInputElement(el, title);
          container.append(input, label);
      }
      this.form.append(container);
      if (el.hasOwnProperty("other")) {
        //if their is any other attributes to add to the element 
        // combining the input element with the other elements to pass as a prameter
        setManyAttributes(...[input].concat(el.other)); 
      }
    });
    //adding the form to the body
    this.body(this.form);


    //Cancel button
    let close = document.createElement("button");
    close.setAttribute("class", "btn btn-danger");
    close.textContent = "Cancel";
    close.addEventListener("click",this.hide)//allowing it to close

    //save button/submit button
    this.saveButton = document.createElement("button");
    this.saveButton.setAttribute("class", "btn btn-primary");
    this.saveButton.textContent = partingMessage; //the message 
    
    //so the obects attributes and methids can be accsed in the even listener
    this.handleResponse = this.handleResponse.bind(this);
    this.saveButton.addEventListener("click", this.handleResponse);

    this.footer(close, this.saveButton);
    this.formData = {};
    $("#" + this.id).modal("handleUpdate")
  }
  getFormData() {
    this.inputData.forEach(el=>{
        //for each input store the value against the name
        this.formData[el.name] =document.forms["ModalForm"][el.name].value
        if(el.type == "checkbox"){
            // if it is a checkbox store the .checked value as .value would be null 
            this.formData[el.name] =document.forms["ModalForm"][el.name].checked
        }
    })


  }
  handleResponse() {
    this.getFormData();
    this.after();
  }
}

function createInputElement(el, title) {
  let inputType;
  let inputClass;
  switch (el.type) {
    case "checkbox":
      inputClass = "form-check-input";
      inputType = "input";
      break;
    case "textarea":
      inputClass = "form-control";
      inputType = "textarea";
      break;
    case "color":
      inputClass = "form-control form-control-color";
      inputType = "input";
      break;
    case "range":
      inputClass = "form-range";
      inputType = "input";
      break;
    case "select":
        inputType = "select";
        inputClass = "form-control form-select"
        break
    default:
      inputClass = "form-control";
      inputType = "input";
  }
  const input = document.createElement(inputType);

  setManyAttributes(
    input,
    ["type", el.type],
    ["class", inputClass],
    ["id", el.name + "--" + title],
    ["name", el.name],
    ["value", el.value || ""]
  );
  if (el.placeholder) {
    input.setAttribute("placeholder", el.placeholder);
  }
  if (el.type == "textarea") {
    input.style.height = el.height;
  }
  if (el.type == "checkbox" && el.checked) {
    input.setAttribute("checked", "");
  }

  return input;
}

function createLabel(el, title, labelTextClass = "") {
  const label = document.createElement("label");
  label.setAttribute("for", el.name + "--" + title);
  label.textContent = el.displayName;
  if (labelTextClass) label.setAttribute("class", labelTextClass);
  return label;
}
