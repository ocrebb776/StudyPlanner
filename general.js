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

function setManyAttrbutes(Item) {
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
  constructor(title, formdata, after, partingMessage) {
    super("popup");

    this.titleElement = document.createElement("h4");
    this.titleElement.setAttribute("class", "modal-title");
    this.titleElement.textContent = title;

    this.title(this.titleElement);
    let form = document.createElement("form");
    form.setAttribute("id", "ModalForm");
    formdata.forEach((el) => {
      // el.name
      // el.dispName
      // el.type
      // el.placeholder
      // el.value
      console.log(el.type);
      let container = document.createElement("div");
      let label;
      let input;
      switch (el.type) {
        case "textarea":
          container.setAttribute("class", "form-floating mt-3 mb-3");
          label = document.createElement("label");
          label.setAttribute("for", el.name + "--" + title);
          label.textContent = el.dispName;
          input = document.createElement("textarea");
          setManyAttrbutes(
            input,
            ["type", el.type],
            ["class", "form-control"],
            ["id", el.name + "--" + title],
            ["placeholder", el.placeholder],
            ["name", el.name],
            ["value", el.value],
            ["type", el.type]
          );
          input.style.height = el.height;
          input.innerHTML = el.value
          container.append(input, label);
          break;
        case "select":
          input = document.createElement(el.type);
          container.setAttribute("class", "input-group mb-3");
          label = document.createElement("span");
          label.setAttribute("class", "input-group-text");
          label.textContent = el.dispName;

          setManyAttrbutes(
            input,
            ["class", "form-control"],
            ["id", el.name + "--" + title],
            ["name", el.name],
            ["value", el.value]
          );
          el.opt.forEach((opt) => {
            let option = document.createElement("option");
            option.setAttribute("value", opt);
            option.textContent = opt;
            input.append(option);
          });
          container.append(label, input);

          break;
        case "checkbox":
            container.setAttribute("class","form-check mb-3")
            label = document.createElement("label")
            label.setAttribute("class","form-check-label")
            input = document.createElement("input")
            setManyAttrbutes(
                input,
                ["type", el.type],
                ["class", "form-check-input"],
                ["id", el.name + "--" + title],
                ["name", el.name],
                ["type", el.type]
              );
              if(el.checked){
                input.setAttribute("checked","")
              }
              label.append(input,el.dispName)
            container.append(label)
        break;
        case "color":
            container.setAttribute("class","input-group mb-3")
            label = document.createElement("soan")
            label.setAttribute("class","input-group-text")
            input = document.createElement("input")
            setManyAttrbutes(
                input,
                ["type", el.type],
                ["class", "form-control form-control-color"],
                ["id", el.name + "--" + title],
                ["name", el.name],
                ["type", el.type]
              );
              label.append(el.dispName)
            container.append(label,input)
            break;
        case "hidden":
            input = document.createElement("input");
            setManyAttrbutes(
              input,
              ["type", el.type],
              ["class", "form-control"],
              ["id", el.name + "--" + title],
              ["placeholder", el.placeholder],
              ["name", el.name],
              ["value", el.value],
              ["type", el.type]
            );
            container.append(input)
            break;
       
        case "range":
            container.setAttribute("class", "");
          label = document.createElement("label");
          label.setAttribute("for", el.name + "--" + title);
          label.setAttribute("class","form-label")
          label.textContent = el.dispName;
          input = document.createElement("input");
          setManyAttrbutes(
            input,
            ["type", el.type],
            ["class", "form-range"],
            ["id", el.name + "--" + title],
            ["name", el.name],
            ["type", el.type]
          );
          container.append(label,input);
          break;

        default:
          container.setAttribute("class", "form-floating mt-3 mb-3");
          label = document.createElement("label");
          label.setAttribute("for", el.name + "--" + title);
          label.textContent = el.dispName;
          input = document.createElement("input");
          setManyAttrbutes(
            input,
            ["type", el.type],
            ["class", "form-control"],
            ["id", el.name + "--" + title],
            ["placeholder", el.placeholder],
            ["name", el.name],
            ["value", el.value],
            ["type", el.type]
          );
          container.append(input, label);
      }
      form.append(container);
      if(el.hasOwnProperty("other")){
       setManyAttrbutes(...[input].concat(el.other))
      }
    });
    this.body(form);

    let close = document.createElement("button");
    close.setAttribute("class", "btn btn-danger");
    close.textContent = "Cancel";
    let save = document.createElement("button");
    save.setAttribute("class", "btn btn-primary");
    save.textContent = partingMessage;

    save.addEventListener("click", function () {
      let formData = {};
      document.querySelectorAll(`#popup form`);

      after(formData);
    });

    this.footer(close, save);
  }
}
