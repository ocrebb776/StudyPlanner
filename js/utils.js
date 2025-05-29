String.prototype.convertDate = function () {
    return this.split(" ")[0].split("-").reverse().join("/");
  };
  String.prototype.toWordCase = function () {
    //make the entire string to  lowercase
    let string = this.toLowerCase();
    //split the sting by the word
    string = string.split(" ");
    //for each word
    for (const key in string) {
      //set the word to equal to the first letter to uppercase plus the rest of the word
      string[key] =
        string[key].split("")[0].toUpperCase() + string[key].substring(1);
    }
    //join the elements back toGether
    string = string.join(" ");
    //return the sting /
  
    return string;
  };
  String.prototype.toMins = function () {
    return hr_minToMin(this);
  };
  
  Number.prototype.pad = function (n) {
    return String(this).padStart(n, "0");
  };
  
  Date.prototype.isDateOnTheSameDayAs = function (date) {
    //check if both dates are on the same day
    let sameDay = this.getDate() == date.getDate();
    if (sameDay) {
      //if they are on the same day check to see if they are on the same month
      let sameMonth = this.getMonth() == date.getMonth();
      if (sameMonth) {
        //and finally check if they are on the same year
        let sameYear = this.getFullYear() == date.getFullYear();
        if (sameYear) {
          // if all three are true then return true
          return true;
        }
      }
    }
    //if any of the above are false then return false
    return false;
  };
  
  Number.prototype.convertToReadableFormat = function (
    showSecondsAnyway = false
  ) {
    let txt = String(
      Math.floor(this / 60) + "h" + Math.trunc(this % 60).pad(2) + "m"
    );
    txt +=
      this % 1 > 0 || showSecondsAnyway
        ? Math.trunc((this % 1) * 60).pad(2) + "s"
        : "";
    return txt;
  };
  
  function hr_minToMin(l) {
    let time = l.split(":"); // split HH:MM into [HH,MM]
    let hours = Number(time[0]); // convert "HH" to hours
    let minutes = Number(time[1]); //convert "MM" to minutes
    l = hours * 60 + minutes; //convert the hours into minutes and and the minutes
    return l;
  }
  function whiteList(string, allowNewLine = false) {
    //list of allowed characters
    let allowed =
      "qwertyuiopasdfgh\"jklzxcvbnm1234567890QW*ER'T`YUIOPASDFGHJKLZXCVBNM!£-$%&?(),_-+=,.<>#: /@".split(
        ""
      );
    let striped = [];
    //for each character in the string ensure that it is in the allowed characters
    string.split("").forEach((el) => {
      if (!allowed.includes(el)) {
        // a = newline
        // b = allow
        // a  + b = no
        // b = yes
        // a = yes
        // = yesv
        if (!(el == "\n" && allowNewLine)) {
          striped.push(el);
        }
      }
    });
    //if any characters a not allowed return them otherwise return true
    if (striped.length > 0) {
      return striped;
    } else {
      return true;
    }
  }
  function createButton(text, style,call = false) {
    let btn = document.createElement("button");
    btn.classList.add("btn", "btn-" + style);
    btn.textContent = text;
    if(call!==false){
    btn.addEventListener('click',call)
    }
    return btn;
  }
  
  function setManyAttributes(Item) {
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
        let sameAsPivot = []
        list.forEach((item) => {
          if (item[this.key] > pivot) {
            higher.push(item); // if higher than pivot
          } else if (item[this.key] < pivot) {
            lower.push(item); // if lower than pivot
          }else{
            //if it is the same as the 
            sameAsPivot.push(item)
          }
        });
        this.pivot(lower); // start sequnce again for lower values
        this.sortedList = this.sortedList.concat(sameAsPivot)
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
      try {
        //if this.element is already open as a model
        let modal = bootstrap.Modal.getInstance(this.element);
        modal.hide();
      } catch (error) {
        //this will happen when a modal isn't open already
      
      }
  
      this.element.innerHTML = ""; //Clearing the modal of previous elements
      this.element.outerHTML = "<div id='" + id + "'></div>";
      this.element = document.getElementById(id);
      this.element.setAttribute("class", "modal"); //making sure the correct class is there
      this.element.setAttribute("role", "dialog");
      this.element.setAttribute("data-bs-backdrop", "static"); //so the backdrop wont dissapear on press
  
      //creating all the neccesary elements in a modal
      this.modalDialog = document.createElement("div");
      this.modalDialog.classList.add("modal-dialog", "modal-dialog-scrollable");
  
      this.modalContent = document.createElement("div");
      this.modalContent.classList.add("modal-content");
  
      this.modalHeader = document.createElement("div");
      this.modalHeader.classList.add("modal-header");
  
      this.modalBody = document.createElement("div");
      this.modalBody.classList.add("modal-body");
  
      this.Modalfooter = document.createElement("div");
      this.Modalfooter.classList.add("modal-footer");
  
      this.open = false
  
      //creating the structure of the modal
  
      /*
      Modal structure 
  
  as definbed from 
  https://getbootstrap.com/docs/5.0/components/modal/
  
      --element
        --modaldialog
          --modal content
               header
               body
               footer 
          --
        --
      --
  
  
  
      */
      this.modalContent.append(
        this.modalHeader,
        this.modalBody,
        this.Modalfooter
      );
  
      this.modalDialog.append(this.modalContent);
      this.element.append(this.modalDialog);
      this.other();
      this.modalInstance = bootstrap.Modal.getInstance(this.element);
      this.onClosing = function () {};
    }
    show() {
      CURRENTPOPUPOBJECT = this
      //allowing for it to be opend
      bootstrap.Modal.getInstance(this.element).show();
      this.open = true
    }
    hide() {
      //alowing it to be closed
      let modal = bootstrap.Modal.getInstance(this.element);
      modal.hide();
      if(CURRENTPOPUPOBJECT === this){
        CURRENTPOPUPOBJECT = null
      }
      this.open = false
      this.onClosing()
    }
    forceHide() {}
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
    closeBtn(text = "Close") {
      //Cancel button
      let close = document.createElement("button");
      close.setAttribute("class", "btn btn-danger");
      close.textContent = text;
  
      //so the objects attributes and methids can be accsed in the even listener
      this.hide = this.hide.bind(this);
      close.addEventListener("click", this.hide); //allowing it to close
      return close;
    }
  }
  
  class FormPopUp extends Popup {
    constructor(title, formdata, after, partingMessage) {
      super("popup");
      this.after = after; // function to run when the form is submitted
      this.inputData = formdata;
  
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
        //pre-declaring the variables
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
            container.setAttribute("class", "input-group mb-3"); //boostrap classes
            label = document.createElement("span"); // creating the  label
            label.classList.add("input-group-text"); //boostrap classes
            label.textContent = el.displayName; //adding the information
            input = createInputElement(el, title); //creating the element
            el.opt.forEach((opt) => {
              //creating an <option> tag for each option
              let option = document.createElement("option");
              //if the option is a list then have
              //the value being the first item and the second being the display
              if (typeof opt != "object") {
                //if set both of the value and text content to be the option
                opt = [opt, opt];
              }
              option.setAttribute("value", opt[0]);
              option.textContent = opt[1];
              input.append(option); //ading to the <select> tag
            });
            input.value = el.value; //assging the value
            container.append(label, input); //ading the variables
            break;
          case "checkbox":
            container.setAttribute("class", "form-check mb-3"); //boostrap classes
            label = createLabel(el, title, "form-check-label");
            input = createInputElement(el, title);
  
            label.prepend(input);
            container.append(label);
            break;
          case "color":
            container.setAttribute("class", "input-group mb-3"); //boostrap classes
            label = document.createElement("span");
            label.classList.add("input-group-text");
            label.textContent = el.displayName; //asigning the display name to the label
            input = createInputElement(el, title);
            container.append(label, input);
            break;
          case "range":
            container.setAttribute("class", "mb-3"); //boostrap classes
            label = createLabel(el, title, "form-label");
            label.textContent = el.displayName;
            input = createInputElement(el, title);
  
            container.append(label, input);
            break;
          case "hidden":
            input = createInputElement(el, title);
            container.append(input);
            break;
          default:
            container.setAttribute("class", "form-floating mt-3 mb-3"); //boostrap classes
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
      this.FormcloseButton = document.createElement("button");
      this.FormcloseButton.setAttribute("class", "btn btn-danger");
      this.FormcloseButton.textContent = "Cancel";
  
      //so the objects attributes and methids can be accsed in the even listener
      this.hide = this.hide.bind(this);
      this.FormcloseButton.addEventListener("click", this.hide); //allowing it to close
  
      //save button/submit button
      this.saveButton = document.createElement("button");
      this.saveButton.setAttribute("class", "btn btn-primary");
      this.saveButton.textContent = partingMessage; //the message
  
      //so the objects attributes and methids can be accsed in the even listener
      this.handleResponse = this.handleResponse.bind(this);
  
      this.saveButton.addEventListener("click", this.handleResponse);
  
      this.footer(this.FormcloseButton, this.saveButton);
      this.formData = {};
      $("#" + this.id).modal("handleUpdate");
    }
    getFormData() {
      this.inputData.forEach((el) => {
        //for each input store the value against the name
        this.formData[el.name] = document.forms["ModalForm"][el.name].value;
        if (el.type == "checkbox") {
          // if it is a checkbox store the .checked value as .value would be null
          this.formData[el.name] = document.forms["ModalForm"][el.name].checked;
        }
      });
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
        inputClass = "form-control form-select";
        break;
      default:
        inputClass = "form-control";
        inputType = "input";
    }
    const input = document.createElement(inputType);
  
    setManyAttributes(
      input,
      ["type", el.type],
      ["class", inputClass],
      ["id", el.name + "--" + "FORMPOPUPELEMENT"],
      ["name", el.name],
      ["value", el.value]
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
    label.setAttribute("for", el.name + "--" + "FORMPOPUPELEMENT");
    label.textContent = el.displayName;
    if (labelTextClass) label.setAttribute("class", labelTextClass);
    return label;
  }
  function createInfoClickBtn(info) {
    //creating a card element
    let card = document.createElement("div");
    card.classList.add("card", "p-2", "m-2", "btn", "btn-light");
    //creating a row element
    let row = document.createElement("div");
    row.classList.add("row");
  
    //for each key in the info provided
    for (const key in info) {
      //create an element
      let el = document.createElement("div");
      el.classList.add("col-5");
      //creating the text content
      el.textContent = `${key} : ${info[key]}`;
      //adding it to row
      row.append(el);
    }
  
    card.appendChild(row);
    return card;
  }
  class Screen {
    constructor() {
      if (this.constructor == "Screen") {
        // Screen should never be used unless it is used by an abstact class
        throw new Error("Abstract class screen shouldnt be instantiated");
      } else {
        this.status = false;
        this.element = document.querySelector("#wrapper");
      }
    }
    clear() {
      this.element.innerHTML = "";
    }
    swapStatus() {
      if (this.status) {
        this.status = false;
        this.hide();
      } else {
        this.element.currentScreen.swapStatus();
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


/**
 * Makes a JSON AJAX request with validation and error handling
 * @param {string} url - The URL to send the request to
 * @param {Object} data - The data to send with the request
 * @returns {Promise<Object>} A promise that resolves with the JSON response or rejects with an error
 */
function jsonRequest(url, data ={},async = false,success = ()=>{}) {
  // Input validation
  if (!url || typeof url !== 'string') {
    throw new Error('URL must be a non-empty string');
  }



  // Validate required auth parameters exist in global scope
  if (typeof StoredID === 'undefined' || typeof StoredPassword === 'undefined' ) {
    throw new Error('Missing required authentication parameters');
  }

  try {
    // Create request object
    let request = new AjaxTemplate(async);
    request.href = url;
    request.data = {
      ...data,
      ID: StoredID,
      password: StoredPassword
    };
    request.ajaxSuccess = success
    request.dataType = "json";

    // Send request and get response
    let response = request.send();

    // Validate response
    if (!response || !response.responseJSON) {
      throw new Error('Invalid response received from server');
    }

    // Return parsed JSON
    return response.responseJSON;

  } catch (error) {
    // Log error for debugging
    console.error('JSON Request failed:', error);

    // Re-throw error with context
    throw new Error(`Failed to make JSON request to ${url}: ${error.message}`);
  }
}