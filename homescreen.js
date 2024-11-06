// concrete class HomeScreen inherits from abstract class Screen
function logout() {}
class HomeScreen extends Screen {
  show() {
    this.element.currentScreen = this;
    this.element.innerHTML = "";
    document.title = "StudyPlanner Homepage";

    // CALENDAR
    let calendarWrapper = document.createElement("div");
    let calendarFooter = document.createElement("div");
    this.calendarBody = document.createElement("div");
    calendarWrapper.classList.add("card", "m-2");
    this.calendarBody.classList.add("card-body");
    calendarFooter.classList.add("card-footer");

    let calendarFooterWrapper = document.createElement("div");
    calendarFooterWrapper.classList.add("row");
    calendarFooterWrapper.style.margin = "auto";
    //Calendar Buttons
    let buttonLeftWrapper = document.createElement("div");
    buttonLeftWrapper.classList.add("col");

    //the manage button
    let buttonLeft = document.createElement("button");
    buttonLeft.setAttribute("id", "buttonLeft");
    // bootstrap classes
    buttonLeft.setAttribute("type", "button");
    buttonLeft.setAttribute("class", "btn btn-secondary  w-100");
    //text content
    buttonLeft.textContent = "Manage";
    //onclick event
    buttonLeft.addEventListener("click", function () {
      manageEvents();
    });

    buttonLeftWrapper.append(buttonLeft);

    let buttonMiddleWrapper = document.createElement("div");
    buttonMiddleWrapper.classList.add("col");

    let buttonMiddle = document.createElement("button");
    buttonMiddle.setAttribute("id", "buttonMiddle");

    buttonMiddle.setAttribute("type", "button");
    buttonMiddle.setAttribute("class", "btn btn-primary w-100");
    buttonMiddle.textContent = "Create";
    buttonMiddle.addEventListener("click", function () {
      createNewEventForm();
    });

    buttonMiddleWrapper.append(buttonMiddle);

    let buttonRightWrapper = document.createElement("div");
    buttonRightWrapper.classList.add("col");

    this.buttonRight = document.createElement("button");
    this.buttonRight.setAttribute("id", "buttonRight");

    //right button
    this.buttonRight.setAttribute("type", "button");
    this.buttonRight.setAttribute("class", "btn btn-secondary w-100");
    this.buttonRight.textContent = "dayView";
    this.buttonRight.addEventListener("click", calendarDayView);
    //event listener to show the day view
    buttonRightWrapper.append(this.buttonRight);

    calendarFooterWrapper.append(
      buttonLeftWrapper,
      buttonMiddleWrapper,
      buttonRightWrapper
    );
    calendarFooter.appendChild(calendarFooterWrapper);
    //Calendar Default View
    this.calendar = new HomeScreenCalendarWeek();
    this.calendar.element = this.calendarBody;
    this.calendar.element.currentScreen = this.calendar;
    this.calendar.show();
    calendarWrapper.append(this.calendarBody, calendarFooter);

    //end of cakendar Wrapper
    //buttonList
    this.buttonList = document.createElement("div");
    setManyAttributes(
      this.buttonList,
      ["class", "row g-3"],
      ["role", "group"],
      ["aria-label", "button List"]
    );
    //The Search Button
    //create a wrapper for the search Button
    this.searchButtonWr = document.createElement("div");
    this.searchButtonWr.classList.add("col");
    //create the button
    this.searchButton = document.createElement("button");
    this.searchButton.classList.add("btn", "btn-secondary");
    this.searchButton.textContent = "Search";
    this.searchButton.style.width = "100%";
    //put the button in the wrapper
    this.searchButtonWr.append(this.searchButton);
    //The StudyButton
    //create a wrapper for the study Button
    this.studyButtonWr = document.createElement("div");
    this.studyButtonWr.classList.add("col");
    //create the button
    this.studyButton = document.createElement("button");
    this.studyButton.classList.add("btn", "btn-primary");
    this.studyButton.textContent = "Study";
    this.studyButton.style.width = "100%";
    //put the button in the wrapper
    this.studyButtonWr.append(this.studyButton);
    //the Options Button
    //create a wrapper for the options Button
    this.optionsWr = document.createElement("div");
    this.optionsWr.classList.add("col");
    //create the button
    this.options = document.createElement("button");
    this.options.classList.add("btn", "btn-secondary");
    this.options.textContent = "options";
    this.options.style.width = "100%";
    //add the eventListenr
    this.options.addEventListener("click", openOptionsView);
    //put the button in the wrapper
    this.optionsWr.append(this.options);
    this.buttonList.append(
      this.searchButtonWr,
      this.studyButtonWr,
      this.optionsWr
    );
    //creating a container for buttonlist
    this.buttonListContainer = document.createElement("div");
    this.buttonListContainer.setAttribute("class", "card m-2 p-2");
    this.buttonListContainer.append(this.buttonList);
    //end of button list
    // start of the Topic and Subject section
    this.topicAndSubjectSectionWrapper = document.createElement("div");
    this.topicAndSubjectSection = new TopicAndSubjectSection();
    this.topicAndSubjectSection.element = this.topicAndSubjectSectionWrapper;
    this.topicAndSubjectSection.show();
    this.element.append(
      calendarWrapper,
      this.buttonListContainer,
      this.topicAndSubjectSectionWrapper
    );
  }
}

class TopicAndSubjectSection extends Screen {
  show() {
    this.element.classList.add("card", "m-2");
    //create Card header to contain the button row
    this.cardHeader = document.createElement("div");
    this.cardHeader.classList.add("card-header");
    //create ButtonRow to contain both of the buttons
    this.buttonRow = document.createElement("div");
    this.buttonRow.classList.add("row");
    //create a wrapper to contain the create button
    this.createButtonWr = document.createElement("div");
    //create the create button itself
    this.createButton = createButton("Create", "primary");
    //make sure it fills the wrapper horizontally
    this.createButton.classList.add("w-100");
    //make the width of the wrapper to be 9/12 of the space
    this.createButtonWr.classList.add("col-9");
    //put the create button within it wrapper
    this.createButtonWr.append(this.createButton);
    //create a wrapper to contain the Subject button
    this.subjectButtonWr = document.createElement("div");
    //create the create button itself
    this.subjectButton = createButton("Subjects", "secondary");
    //make the width of the wrapper to fill the rest of the row
    this.subjectButtonWr.classList.add("col");
    //make sure it fills the wrapper horizontally
    this.subjectButton.classList.add("w-100");
    //put the button within its wrapper
    this.subjectButtonWr.appendChild(this.subjectButton);
    //add the wrappers to the button row
    this.buttonRow.append(this.createButtonWr, this.subjectButtonWr);
    //add the buttonRow to the header
    this.cardHeader.append(this.buttonRow);
    //add the header to the element
    this.element.append(this.cardHeader);
    //adding the eventLisners to the button

    //Create Button
    this.createButton.addEventListener("click", function () {
      let CreateButtonMenu = new Popup();

      //this is so that the user can clikc on the background to close the modal
      CreateButtonMenu.element.setAttribute("data-bs-backdrop", "true");
      //create a new element to contain all the buttons
      let buttonList = document.createElement("div");
      buttonList.classList.add("row", "g-3");
      buttonList.style.margin = "auto";

      //the CreateSubject button
      let createSubject = createButton("Create Subject", "primary");
      createSubject.addEventListener("click", function () {
        createSubjectForm();
      });

      //toggleDarkMode button
      let createTopic = createButton("Create Topic", "outline-primary");
      createTopic.addEventListener("click", function () {
        createTopic();
      });

      //adding buttons to the buttonList
      buttonList.append(createSubject, createTopic);

      //creating the title
      CreateButtonMenu.title("Create?");
      //adding the button list to the body element
      CreateButtonMenu.body(buttonList);
      CreateButtonMenu.footer(CreateButtonMenu.closeBtn("cancel"));
      //showing the modal
      CreateButtonMenu.show();
    });

    this.subjectButton.addEventListener("click", function () {
      viewSubjects();
    });
  }
}

class HomeScreenCalendarWeek extends Screen {
  show() {
    this.element.innerHTML = "";
    this.calendarColours = {
      Study: "#ed80f2",
    };
    this.ListOfSDays = document.createElement("div");

    this.data = this.GetCalendarData();
    let DayList = this.daysList();
  }
  GetCalendarData() {
    let request = new AjaxTemplate(false);
    request.href = "php/homepage/getCalendarInfo.php";
    request.data = {
      ID: StoredID,
      password: StoredPassword,
    };

    let result = request.send();
    console.log(result.responseText);
    if (result.status == 200) {
      return JSON.parse(result.responseText);
    } else {
      return "there as been a silly little error";
    }
  }
  daysList() {
    //get todays date
    let currentDay = new Date();
    //abreviations of dates
    let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    //iterates through 7 days starting with the current date at the top
    for (let x = 0; x < 7; x++) {
      //container to contain the day
      let dayContainer = document.createElement("div");
      let card = document.createElement("div");
      card.classList.add("card");
      dayContainer.classList.add("row", "card-body");
      //container to display the date
      let date = document.createElement("div");
      date.classList.add("col");
      if (x == 0) {
        //if it is today as a background(as defined by bootStrap)
        date.classList.add("bg-primary", "text-white");
      }
      date.style.borderRadius = "30px";
      date.style.height = 110 % date.classList.add("text-center", "rounded");
      //getting the day of the week of the new date
      let dayOf = x + currentDay.getDay() - 1 + days.length;
      // if the dayOd is more than the list of arrays loop back to the beginning
      if (dayOf >= days.length) {
        dayOf = dayOf % days.length;
      }
      //adding the date to the date element
      date.textContent = days[dayOf];

      //the viewElement contains te bar that all events exist in
      let ViewElement = document.createElement("div");
      //boostrap and styling
      ViewElement.classList.add("progress", "col");
      ViewElement.style.height = "100%";
      let body = document.createElement("div");
      body.classList.add("col-9");

      //addinging the current days dates data to varaibale todat
      let today = this.data[x];
      // if there is event on that date
      if (today) {
        //convert the database response into the day
        today = this.processWeekDay(today);
        ViewElement.style.display = "grid";
        ViewElement.style.gridTemplateColumns = today[1];
        today[0].forEach((el) => {
          let event = document.createElement("div");
          if (el != 0) {
            event.addEventListener("click", function () {
              viewEvent(el.ID);
            });
            if (el.Type == "study") {
              event.classList.add("bg-warning");
            }
            event.classList.add("progress-bar");
            event.style.borderRadius = "20px";
          }
          event.style.width = "100%";
          ViewElement.append(event);
        });
      }
      body.append(ViewElement);
      dayContainer.append(date, body);
      card.append(dayContainer);
      this.element.append(card);
    }
  }
  processWeekDay(today) {
    let sortDates = new SortByKey(today, "startTime");
    today = sortDates.returnSortedList();
    let startEndTimes = getStartAndEndTimesCalendar(today);
    let elementOrder = createElementOrder(startEndTimes);
    let frs = getRatios(startEndTimes);
    return [elementOrder, frs];
  }
}

// CALENDAR FUNCTIONS
const getStartAndEndTimesCalendar = function (data) {
  let startAndEnd = [];

  data.forEach((el) => {
    time = hr_minToMin(el.startTime);
    if (startAndEnd[startAndEnd.length - 1] >= time) {
      startAndEnd[startAndEnd.length - 1] = time - 1;
    }
    startAndEnd.push(time, el);
    startAndEnd.push(hr_minToMin(el.endTime));
  });
  return startAndEnd;
};

const createElementOrder = function (data) {
  let last = "number";
  let order = [];
  data.forEach((el) => {
    if (typeof el == "number") {
      if (last == "number") {
        order.push(0);
      }
      last = "number";
    } else {
      order.push(el);
      last = "string";
    }
  });
  return order;
};

const getRatios = function (data) {
  let last = 0;
  let total = 24 * 60;
  let times = [];
  let fr = ""; // blank ration

  //add all the numbers in the list to times
  data.forEach((el) => {
    if (typeof el == "number") {
      times.push(el);
    }
  });
  //add the end of the list as the total
  times.push(total);
  for (let x = 0; x < times.length; x++) {
    if (x != 0) {
      //except for the
      last = times[x - 1];
    }
    let length = times[x] - last;
    let ratio = Math.round((10000 * length) / total);
    fr += ` ${ratio}fr`;
  }
  return fr;
};

class HomeScreenDayView extends HomeScreenCalendarWeek {
  daysList() {
    //get todays date
    let currentDay = new Date();

    //container to contain the day
    let dayContainer = document.createElement("div");
    let card = document.createElement("div");
    card.classList.add("card");
    dayContainer.classList.add("row", "card-body");

    //the viewElement contains te bar that all events exist in
    let ViewElement = document.createElement("div");
    //boostrap and styling
    ViewElement.classList.add("progress", "col");
    ViewElement.style.height = "400px";
    let body = document.createElement("div");
    body.classList.add("col");

    //use the first date (the current date)
    let today = this.data[0];
    // if there is event on that date
    if (today) {
      //convert the database response into the day
      today = this.processWeekDay(today);
      ViewElement.style.display = "grid";
      ViewElement.style.gridTemplateRows = today[1];
      today[0].forEach((el) => {
        let event = document.createElement("div");
        if (el != 0) {
          event.addEventListener("click", function () {
            // onClick events will go here
            viewEvent(el.ID);
          });

          if (el.Type == "study") {
            event.classList.add("bg-warning");
          }
          event.classList.add("progress-bar");
          event.classList.add("text-black");
          event.style.borderRadius = "20px";
          event.textContent = ` ${el.startTime} --> ${el.name} --> ${el.endTime}`;
        }
        event.style.width = "100%";
        ViewElement.append(event);
      });
    }
    body.append(ViewElement);
    dayContainer.append(body);
    card.append(dayContainer);
    this.element.append(card);
  }
}

function calendarDayView() {
  //create an instance of HomeScreenDayView
  let dayView = new HomeScreenDayView();
  //assigning the element
  dayView.element = homeScreen.calendar.element;
  dayView.show();
  //changing th button text
  homeScreen.buttonRight.textContent = "Week View";
  //changing the EventListeners
  homeScreen.buttonRight.removeEventListener("click", calendarDayView);
  homeScreen.buttonRight.addEventListener("click", calendarWeekView);
}
function calendarWeekView() {
  //create a new instance of the HomeScreenCalendarWeek
  homeScreen.calendar = new HomeScreenCalendarWeek();
  //assigning  the element
  homeScreen.calendar.element = homeScreen.calendarBody;
  homeScreen.calendar.show();
  //changing the button text
  homeScreen.buttonRight.textContent = "dayView";
  //changing the eventListeners
  homeScreen.buttonRight.removeEventListener("click", calendarWeekView);
  homeScreen.buttonRight.addEventListener("click", calendarDayView);
}

let form;
function createNewEventForm(
  inputData = { name: "", startTime: "", endTime: "", Type: "study", date: "" },
  startText = "New Event",
  endText = "Create Event",
  newEvent = true,
  id = false
) {
  form = new FormPopUp(
    startText, //title
    [
      //data
      {
        name: "Title",
        displayName: "Event Title",
        type: "text",
        placeholder: "--",
        value: inputData.name,
      },
      {
        name: "Date",
        displayName: "Date",
        type: "date",
        placeholder: "--",
        value: inputData.date,
        other: [["min", TodayISO]],
      },
      {
        name: "StartTime",
        displayName: "Start Time",
        type: "time",
        placeholder: "--",
        value: inputData.startTime,
      },
      {
        name: "EndTime",
        displayName: "End Time",
        type: "time",
        placeholder: "--",
        value: inputData.endTime,
      },
      {
        name: "EventType",
        displayName: "Event Type",
        type: "select",
        placeholder: "--",
        value: inputData.Type,
        opt: ["study", "engagement", "other"],
      },
      {
        name: "desc",
        displayName: "Description",
        type: "textarea",
        placeholder: "--",
        value: "",
        height: "200px",
      },
    ],
    function () {
      //input validation
      let data = this.formData;
      let missing = [];

      //checking that all fields except desc is filled
      for (const name in data) {
        if (data.hasOwnProperty(name) && data[name] == "") {
          switch (name) {
            case "desc":
              break;
            default:
              missing.push(name);
          }
        }
      }
      let valid = true;
      //alerting to the user when there is missing fields
      if (missing.length > 0) {
        let txt = "You are Missing these required fields";
        missing.forEach((el) => {
          //creating a new line for each field
          txt += "\n-" + el;
        });
        alert(txt);
        valid = false;
      }
      txt = "";
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          let chr = whiteList(data[key]);
          if (chr !== true) {
            txt += `\n in ${key} these characters are not allowed \n• ${chr.join(
              "\n• "
            )}`;
            valid = false;
          }
        }
      }
      if (txt !== "") {
        alert(txt);
      }
      let request = new AjaxTemplate(false); // create an synchronous  ajax request
      request.href = "php/homepage/getAllEvents.php"; // point the address to getAllEvents.php
      request.data = {
        // login details necessary for the php file
        ID: StoredID,
        password: StoredPassword,
      };

      let eventData = request.send().responseText; // send the request and get the response
      eventData = JSON.parse(eventData); //convert the response into an object
      console.log(eventData); // for debugging purposes
      if (eventData.hasOwnProperty(data.Date)) {
        // if events exists on the entered date
        let list = eventData[data.Date];
        let allClashes = [];
        list.forEach((el) => {
          //for each event on that date
          if (el.startTime == data.StartTime) {
            // if they start at the same time

            if (el.ID != id) {
              alert("this event starts at the same time as \n" + el.name); // tell the user
              valid = false; // make the form false
            }
          } else {
            //Start and end times of each event to be converted into minutes
            let NewEvent = [
              hr_minToMin(data.StartTime),
              hr_minToMin(data.EndTime),
            ];
            let curEvent = [hr_minToMin(el.startTime), hr_minToMin(el.endTime)];
            // [end clashes,start clashes]
            let clash = [false, false];
            //if the new event starts before the current event and does not finish before the next one starts
            if (NewEvent[0] < curEvent[0] && NewEvent[1] > curEvent[0]) {
              if (el.ID != id) {
                clash[0] = true;
              }
            }
            //if new event starts after the current event and starts before the current one finishes
            if (NewEvent[0] > curEvent[0] && curEvent[1] > NewEvent[0]) {
              if (el.ID != id) {
                clash[1] = true;
              }
            }
            // if there is a clash add it to the list
            if (clash[0] || clash[1]) {
              allClashes.push([el.name, clash]);
            }
          }
        });
        //if there is any clashes
        if (allClashes.length > 0) {
          let txt = "";
          //for each clash create an error message
          allClashes.forEach((el) => {
            console.log(el[1]);
            txt += "\nclashes with " + el[0];
            if (el[1][0]) {
              txt += "\nend of this event starts before the next one";
            }
            if (el[1][1]) {
              txt +=
                "\nstart of this event is before the end of the one before";
            }
            txt += "\n";
          });
          if (valid) {
            //if the form is still valid ask the user of they want to proceed
            valid = confirm(
              txt + "\n Would you still like to create this event?"
            );
          }
        }
      }
      if (valid) {
        // if the user wants to proceed
        //create a new syncronus request
        let repeatInfo;

        let request = new AjaxTemplate(true);
        //send the request to different files depending of if it is a new event or an older event
        if (newEvent) {
          request.href = "php/homepage/createCalendarEvent.php";
        } else {
          request.href = "php/homepage/editCalendarEvent.php";
          //the id can be used for reference
          data.id = id;
        }

        request.data = {
          // login details necessary for the php file
          ID: StoredID,
          password: StoredPassword,
          data: data,
        };
        request.send();
        this.hide(); // close the form
        homeScreen.show(); // to refresh the homepage
      }

      console.log(this.formData);
    },
    endText
  );

  form.show();
}

function hr_minToMin(l) {
  let time = l.split(":"); // split HH:MM into [HH,MM]
  console.log(l);
  let hours = Number(time[0]); // convert "HH" to hours
  let minutes = Number(time[1]); //convert "MM" to minutes
  l = hours * 60 + minutes; //convert the hours into minutes and and the minutes
  return l;
}

function whiteList(string, allowNewLine = false) {
  //list of allowed characters
  let allowed =
    "qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPASDFGHJKLZXCVBNM!£$%&_-+=,.<>#: ".split(
      ""
    );
  let striped = [];
  //for each character in the string ensure that it is in the allowed characters
  string.split("").forEach((el) => {
    if (!allowed.includes(el)) {
      // a = el= \n
      // b = allownewLine
      // a and b do nothing
      // !a and !b
      // !(a or b)
      if (!(el != "\\n" || allowNewLine)) {
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

function manageEvents(modal = new Popup()) {
  console.log(modal);
  modal.title("");
  modal.body("");
  modal.footer("");
  let title = document.createElement("h4");
  title.classList.add("modal-title");
  title.textContent = "Manage Events";
  //this is so that the user can clikc on the background to close the modal
  modal.element.setAttribute("data-bs-backdrop", "true");
  modal.title(title);
  //getting all the events
  let request = new AjaxTemplate(false); // create an synchronous  ajax request
  request.href = "php/homepage/getAllEvents.php"; // point the address to getAllEvents.php
  request.data = {
    // login details necessary for the php file
    ID: StoredID,
    password: StoredPassword,
  };
  //sending the events
  let events = request.send().responseText;
  // converting the string response into JSON
  events = JSON.parse(events);
  console.log(events);

  //collating all of the events into one list
  let allDays = [];
  for (const key in events) {
    events[key].forEach((el) => {
      let dateString = el.date + "T" + el.startTime;
      console.log(dateString);
      el.epDate = new Date(dateString);
      allDays.push(el);
    });
  }
  let sort = new SortByKey(allDays, "epDate");
  allDays = sort.returnSortedList();

  allDays.forEach((el) => {
    // deleting the id, user,name and epDAte Attirbutes so they dont appear on the button
    let id = el.ID;
    delete el.ID;
    delete el.user;
    let name = el.name;
    delete el.name;
    delete el.epDate;
    //creating the button
    let button = createInfoClickBtn(el);
    //adding the onClick function
    button.addEventListener("click", function () {
      viewEvent(id, modal, manageEvents);
    });
    //creating the element to contain the title  witch is were the title will appear
    let titleEL = document.createElement("div");
    titleEL.setAttribute("class", "col-7 h4");
    //text content
    titleEL.textContent = name;
    button.prepend(titleEL);
    //adding it to the body element
    modal.modalBody.append(button);
  });
  modal.footer(modal.closeBtn("close"));
  //showing the modal_
  modal.show();
}

function viewEvent(id, callBack = new Popup(), closeFtn = false) {
  console.log(callBack);
  //get information about the request
  let eventInfo = getEventInfo(id);
  //create the info
  let displayInfo = structuredClone(eventInfo);

  //delete unnecessary information that the user won't need
  delete displayInfo.ID;
  delete displayInfo.user;

  let titleInfo = structuredClone(displayInfo);
  delete titleInfo.name;

  //change the title to hold information about the event
  let TitleInfoCard = createInfoClickBtn(titleInfo);
  //change styling
  TitleInfoCard.classList.remove("btn", "btn-light", "card");

  //create
  let titleEL = document.createElement("div");
  titleEL.setAttribute("class", "col-7 h2");
  //text content
  titleEL.textContent = displayInfo.name;
  TitleInfoCard.prepend(titleEL);
  callBack.title(TitleInfoCard);

  //get list of notes in the element
  let notes = document.createElement("div");
  let listOfNotes = getNotes(id, "events");
  listOfNotes.forEach((el) => {
    notes.append(convertNoteToHTML(el, viewEvent));
  });

  //create the edit button
  let editBTN = document.createElement("button");
  editBTN.classList.add("btn", "btn-primary");
  //text edit
  editBTN.textContent = "Edit Event";
  //adding an event listener for opening the edit event form modal
  editBTN.addEventListener("click", function () {
    editEvent(id);
  });
  callBack.body(editBTN, notes);

  //create a close Button
  let closeBtn = callBack.closeBtn("Back");
  //change background color
  closeBtn.classList.remove("btn-danger");
  closeBtn.classList.add("btn-secondary");
  //if there is a close function
  if (closeFtn) {
    //add eventListener for that function
    closeBtn.addEventListener("click", function () {
      closeFtn();
    });
  }
  //create addNoteBtn

  let addNoteBtn = document.createElement("button");
  addNoteBtn.classList.add("btn", "btn-primary");
  addNoteBtn.textContent = "Add Note";
  addNoteBtn.addEventListener("click", function () {
    createNote(id, "event", true, false, "", viewEvent);
  });

  //create deleteByn
  let deleteBtn = document.createElement("button");
  deleteBtn.classList.add("btn", "btn-danger");
  deleteBtn.textContent = "Delete Event";
  deleteBtn.addEventListener("click", function () {
    if (confirm("are you sure you want to delete" + displayInfo.name)) {
      deleteEvent(id);

      //hide the popup
      callBack.hide();
    }
  });

  //add the buttons to the footer

  callBack.show();
  callBack.footer(deleteBtn, addNoteBtn, closeBtn);
}

function getEventInfo(id) {
  //send new request
  let request = new AjaxTemplate(false);
  request.href = "php/homepage/getEventInfo.php";
  //login credentials and the eventID
  request.data = {
    ID: StoredID,
    password: StoredPassword,
    eventID: id,
  };
  request.dataType = "json";
  //return the JSON part of the response
  return request.send().responseJSON;
}

function deleteEvent(id) {
  let request = new AjaxTemplate(true);
  request.href = "php/homepage/deleteEvent.php";
  //login credentials and the eventID
  request.data = {
    ID: StoredID,
    password: StoredPassword,
    eventID: id,
  };
  request.send();

  //refresh the homepage to update everything
  homeScreen.show();
}

function editEvent(id) {
  let info = getEventInfo(id);

  createNewEventForm(info, "Edit Event", (endText = "Save Changes"), false, id);
}

function openOptionsView() {
  //crete new modal
  let optionsView = new Popup();

  //this is so that the user can clikc on the background to close the modal
  optionsView.element.setAttribute("data-bs-backdrop", "true");
  //create a new element to contain all the buttons
  let buttonList = document.createElement("div");
  buttonList.classList.add("row", "g-3");
  buttonList.style.margin = "auto";

  //the logout button
  let logoutButton = createButton("Logout", "warning");
  logoutButton.addEventListener("click", logOut);

  //toggleDarkMode button
  let toggleDarkModeButton = createButton("Toggle DarkMode", "outline-warning");
  toggleDarkModeButton.addEventListener("click", function () {
    toggleDarkmode();
  });

  //adding buttons to the buttonList
  buttonList.append(logoutButton, toggleDarkModeButton);

  //creating the title
  optionsView.title("Options");
  //adding the button list to the body element
  optionsView.body(buttonList);
  optionsView.footer(optionsView.closeBtn());
  //showing the modal
  optionsView.show();
}
function createButton(text, style) {
  let btn = document.createElement("button");
  btn.classList.add("btn", "btn-" + style);
  btn.textContent = text;
  return btn;
}

function createSubjectForm(
  name = "",
  startText = "New Subject",
  endText = "Create Subject",
  newSubject = true,
  id = false,
  pageRefresh = false
) {
  let subjectForm = new FormPopUp(
    startText,
    [
      {
        name: "name",
        displayName: "Subject Title",
        type: "text",
        placeholder: "--",
        value: name,
      },
    ],
    function () {
      //get name info
      let name = this.formData.name;
      //whitelist name
      let whName = whiteList(name, true);
      let valid;
      if (whName === true) {
        //if name is valid
        valid = true;
      } else {
        //if it is not valid
        valid = false;
        //tell user that the characters are not allowed
        txt = `These characters are not allowed \n• ${whName.join("\n• ")}`;
        //alert this to the user
        alert(txt);
      }
      if (valid && name !== "") {
        //start request
        let request = new AjaxTemplate(true);
        //creating data about the request
        let data = {};
        data.name = name;
        //send the request to different files depending of if it is a new subject or an older subject
        if (newSubject) {
          request.href = "php/homepage/subjects/createSubject.php";
        } else {
          request.href = "php/homepage/subjects/editSubject.php";
          //the id is used to find the subject in the database
          data.id = id;
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
    endText
  );
  subjectForm.show();
}

function getSubject(id = false) {
  let request = new AjaxTemplate(false);
  request.href = "php/homepage/subjects/getSubjects.php";
  request.data = {
    ID: StoredID,
    password: StoredPassword,
    id: id,
  };
  request.dataType = "json";
  let send = request.send();
  if (id === false) {
    return send.responseJSON;
  } else {
    return send.responseJSON[0];
  }
}

function viewSubjects() {
  //get subject data
  let data = getSubject();
  //create popup
  let modal = new Popup();
  //define the title
  modal.title("View Subjects");
  //this is so that the user can clikc on the background to close the modal
  //modal.element.setAttribute("data-bs-backdrop", "true");
  //element to store the list of subjects
  let SubjectList = document.createElement("div");
  //for each subject
  data.forEach((el) => {
    //create an empty cardButton
    let btn = createInfoClickBtn({});
    //create a title element
    let title = document.createElement("div");
    //make it big
    title.setAttribute("class", "col h-4");
    //set the name to the text content
    title.textContent = el.name;
    //add the title into the button
    btn.append(title);
    //add an event listener for the button
    btn.addEventListener("click", function () {
      viewSubject(el, viewSubjects(), modal);
    });
    //add the button to the subject list
    SubjectList.append(btn);
  });
  //add the subject list into the body
  modal.body(SubjectList);

  //add the close button to the footer
  modal.footer(modal.closeBtn());
  //show the modal
  modal.show();
}
function viewSubject(data, closeFtn = false, modal = new Popup()) {
  //create new modal
  modal = new Popup();
  //get information about the request
  let subjectInfo = getSubject(data.ID);
  //create the info
  let displayInfo = structuredClone(subjectInfo);
  //delete unnecessary information that the user won't need
  delete displayInfo.ID;
  delete displayInfo.user;

  //get list of notes in the element
  let notes = document.createElement("div");
  let listOfNotes = getNotes(data.ID, "subjects");

  listOfNotes.forEach((el) => {
    //notes.append(convertNoteToHTML(el, viewSubjects()));
   
  });
  //create the edit button
  let editBTN = document.createElement("button");
  editBTN.classList.add("btn", "btn-primary");
  //text edit
  editBTN.textContent = "Edit Subject";
  //adding an event listener for opening the edit event form modal
  editBTN.addEventListener("click", function () {
    editSubject(data.ID);
  });
  //create addNoteBtn
  let addNoteBtn = document.createElement("button");
  addNoteBtn.classList.add("btn", "btn-primary");
  addNoteBtn.textContent = "Add Note";
  addNoteBtn.addEventListener("click", function () {
    createNote(data.ID, "subject", true, false, "", viewSubjects);
  });
  //create deleteBtn
  let deleteBtn = document.createElement("button");
  deleteBtn.classList.add("btn", "btn-danger");
  deleteBtn.textContent = "Delete Subject";
  deleteBtn.addEventListener("click", function () {
    if (confirm("are you sure you want to delete" + displayInfo.name)) {
      deleteSubject(data.ID);

      //hide the popup
      modal.hide();
    }
  });
  let titleInfo = structuredClone(displayInfo);
  delete titleInfo.name;
  //change the title to hold information about the Subject
  let TitleInfoCard = createInfoClickBtn(titleInfo);
  //change styling
  TitleInfoCard.classList.remove("btn", "btn-light", "card");
  //create
  let titleEL = document.createElement("div");
  titleEL.setAttribute("class", "col-7 h2");
  //create a close Button
  let closeBtn = modal.closeBtn("Back");
  //change background color
  closeBtn.classList.remove("btn-danger");
  closeBtn.classList.add("btn-secondary");
  //if there is a close function
  if (closeFtn) {
    //add eventListener for that function
    closeBtn.addEventListener("click", function () {
      closeFtn();
    });
  }
  //text content
  titleEL.textContent = displayInfo.name;
  TitleInfoCard.prepend(titleEL);
  modal.title(TitleInfoCard);
  //add the buttons to the footer
  //modal.title("l")
  modal.body(editBTN);
  modal.footer(addNoteBtn, deleteBtn, closeBtn);
  modal.show();
}
function deleteSubject(id) {}
function editSubject(id) {}
