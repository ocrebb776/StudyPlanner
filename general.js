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
function toggleDarkmode(preset = "") {
  darkMode = Cookies.get("darkMode");
  if (preset != "") {
    darkMode = !preset;
  }
  if (darkMode == "light") {
    darkMode = "dark";
    Cookies.set("darkMode", "dark", { expires: 100 });
    document.querySelector("html").setAttribute("data-bs-theme", "dark");
  } else {
    darkMode = "light";
    document.querySelector("html").setAttribute("data-bs-theme", "light");
    Cookies.set("darkMode", "light", { expires: 100 });
  }
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
    console.log(list);
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
      console.log(error);
    }

    console.log(this.id);
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
  }
  show() {
    CURRENTPOPUPOBJECT = this
    //allowing for it to be opend
    bootstrap.Modal.getInstance(this.element).show();
    console.log(bootstrap.Modal.getInstance(this.element));
  }
  hide() {
    //alowing it to be closed
    let modal = bootstrap.Modal.getInstance(this.element);
    modal.hide();
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
    let close = document.createElement("button");
    close.setAttribute("class", "btn btn-danger");
    close.textContent = "Cancel";

    //so the objects attributes and methids can be accsed in the even listener
    this.hide = this.hide.bind(this);
    close.addEventListener("click", this.hide); //allowing it to close

    //save button/submit button
    this.saveButton = document.createElement("button");
    this.saveButton.setAttribute("class", "btn btn-primary");
    this.saveButton.textContent = partingMessage; //the message

    //so the objects attributes and methids can be accsed in the even listener
    this.handleResponse = this.handleResponse.bind(this);

    this.saveButton.addEventListener("click", this.handleResponse);

    this.footer(close, this.saveButton);
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

function logOut() {
  //remove the login related cookies
  Cookies.remove("username");
  Cookies.remove("password");
  //refreshing the page to return to the homepage
  location.reload();
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

function getNotes(id, table) {
  //new synchronous ajax request
  let request = new AjaxTemplate(false);
  request.href = "php/getNotes.php";

  // creating the request data
  request.data = {
    ID: StoredID,
    password: StoredPassword,
    id: id,
    table: table,
  };
  //data type
  request.dataType = "json";
  //send request
  let send = request.send();
  //for debugging information
  console.log(send.responseJSON);

  //return the data
  return send.responseJSON;
}
function convertNoteToHTML(data, pageRefresh) {
  console.log(data);
  //creating the container
  let container = document.createElement("div");
  // bootstrap classes
  container.classList.add("row", "g-1", "m-2");
  //card containing the text
  let card = document.createElement("textarea");
  //bootstrap classes
  card.classList.add("card", "p-2", "col-8");
  //adding the notes content to the text content
  card.textContent = data.text;
  card.setAttribute("readonly", "");
  card.style.resize = "none";

  //find all of the links in the text using the linkify plugin
  let links = linkify.find(data.text);

  let linkElement = document.createElement("div");
  linkElement.classList.add("col-8");
  //for each link
  links.forEach((el) => {
    //create a link element
    let link = document.createElement("a");
    //bootstrap classes
    link.classList.add("btn", "btn-outline", "btn-primary");
    link.setAttribute("href", el.href);
    //set the button text to be the link
    link.textContent = el.href;
    
    linkElement.append(link);
  });
  

  //container containing the buttons
  let buttonList = document.createElement("div");
  buttonList.classList.add("col-4");
  //default values 
  let deleteBtn = ''
  let edit = ''

  //if the note is actually a note 
  if ((data.frTable != "aVisit")) {
  //icon EDIT ICON
  edit = document.createElement("i");
  edit.classList.add("fa-solid", "fa-pen-to-square", "btn", "btn-outline");
  
  //adding an event listener to the edit button
    edit.addEventListener("click", function () {
      //show a form to edit the note
      createNote(
        data.frID,
        data.frTable,
        (newNote = false),
        (noteID = data.ID),
        (oldNote = data.text),
        pageRefresh,
        data
      );
    });
  

  //icon DELETE ICON
  deleteBtn = document.createElement("i");
  deleteBtn.classList.add("fa-solid", "fa-trash", "btn", "btn-outline");
  deleteBtn.addEventListener("click", function () {
    console.log(pageRefresh);
    //pageRefresh reloads that part of the page to update it without the note
    deleteNote(data, pageRefresh);
  });

}else{

  //calculating the percentage difficulty from the diffracting vale
  let diffRating = Math.round(100*data.diffrating/255)
  //making the current card into another variable called text 
  let text = card
  //creating a new element to contain everything 
  card = document.createElement("div");

  //making sure the bootstrap classes are correct to make the look consistent 
  text.classList.remove("col-8");
  card.classList.add("card", "p-2", "col-8");

  //creating a progress bar to show the difficulty rating
  let progress = document.createElement("div");
  progress.classList.add("progress",'m-2');
  let progressBar = document.createElement("div");
  progressBar.classList.add("progress-bar");
  progressBar.setAttribute("role", "progressbar");
  progressBar.setAttribute("style", `width: ${diffRating}%`);
  progress.append(progressBar);
  //adding everything to the card
  let time = String(Math.floor(data.time/60) + "h" + data.time%60 + "m")
  card.append(data.type +" - " + diffRating+"%" +" - " + time,progress,text)

  edit = document.createElement("i");
  edit.classList.add("fa-solid", "fa-pen-to-square", "btn", "btn-outline");
  edit.addEventListener("click", function () {
    visit(data.frID,data.ID)
  })
    //icon DELETE ICON
    deleteBtn = document.createElement("i");
    deleteBtn.classList.add("fa-solid", "fa-trash", "btn", "btn-outline");
    deleteBtn.addEventListener("click", function () {
      //pageRefresh reloads that part of the page to update it without the note
      deleteVisit(data.ID);
      homeScreen.show();
      CURRENTPOPUPOBJECT.hide()
    });
  
}
  //display the timestamp when created
  let timeStamp = document.createElement("div");
  timeStamp.textContent = data.date;

  

  //adding icons to the button list
  buttonList.append(deleteBtn, edit, timeStamp);
  //adding the cards to the buttonList
  container.append(card, buttonList,linkElement);
  return container;
}

function createNote(
  id,
  table,
  newNote = true,
  noteID = false,
  oldNote = "",
  pageRefresh
) {
  noteForm = new FormPopUp(
    newNote ? "Add Note" : "Edit Note",
    [
      {
        name: "note",
        displayName: "Note",
        type: "textarea",
        placeholder: "-",
        value: oldNote,
        height: "300px",
        other: [
          ["contenteditable", ""],
        ]
      
      },
    ],
    function () {
      //get note info
      let note = this.formData.note;

      //whitelist note
      let whNote = whiteList(note, true);
      let valid;
      if (whNote === true) {
        //if note is valid
        valid = true;
      } else {
        //if it is not valid
        valid = false;
        //tell user that the characters are not allowed
        txt = `These characters are not allowed \n• ${whNote.join("\n• ")}`;
        //alert this to the user
        alert(txt);
      }
      if (valid && note !== "") {
        //start request
        let request = new AjaxTemplate(true);

        //creating data about the note
        let data = {};
        data.note = note;
        data.frTable = table;
        data.frID = id;
        //send the request to different files depending of if it is a new event or an older event
        if (newNote) {
          request.href = "php/createNote.php";
        } else {
          request.href = "php/editNote.php";
          //the id is used to find the note in the database
          data.id = noteID;
        }

        request.data = {
          // login details necessary for the php file
          ID: StoredID,
          password: StoredPassword,
          data: data,
        };
        //send request
        request.send();
        //hideMobile
        this.hide();
        if (pageRefresh) {
          //if there is a page to go back to go to it
          pageRefresh(id);
        }
      }
    },
    newNote ? "Add Note" : "Save Changes"
  );
  noteForm.show();
}

function deleteNote(note, pageRefresh = false) {
  let request = new AjaxTemplate(true);
  request.href = "php/deleteNote.php";
  request.data = {
    // login details necessary for the php file
    ID: StoredID,
    password: StoredPassword,
    id: note.ID,
  };
  request.send();
  console.log();
  //go refresh the page
  pageRefresh(note.frID);
}

function getAllNotes() {
  //new synchronous ajax request
  let request = new AjaxTemplate(false);
  request.href = "php/getAllNotes.php";

  // creating the request data
  request.data = {
    ID: StoredID,
    password: StoredPassword,
  };
  //data type
  request.dataType = "json";
  //send request
  let send = request.send();
  //for debugging information
  console.log(send.responseJSON);

  //return the data
  return send.responseJSON;
}
