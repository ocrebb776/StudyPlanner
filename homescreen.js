// concrete class HomeScreen inherits from abstract class Screen
function logout() {}
class HomeScreen extends Screen {
  show() {
    this.element.currentScreen = this;
    this.element.innerHTML = "";
    document.title = "StudyPlanner Homepage";
    //temporary logout button
    let tempLogoutButton = document.createElement("button");
    tempLogoutButton.classList.add("btn", "btn-danger");
    tempLogoutButton.textContent = "Logout";
    tempLogoutButton.addEventListener("click", logOut);
    this.element.append(tempLogoutButton);

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
    buttonLeft.addEventListener("click",manageEvents)

    buttonLeftWrapper.append(buttonLeft);

    let buttonMiddleWrapper = document.createElement("div");
    buttonMiddleWrapper.classList.add("col");

    let buttonMiddle = document.createElement("button");
    buttonMiddle.setAttribute("id", "buttonMiddle");

    buttonMiddle.setAttribute("type", "button");
    buttonMiddle.setAttribute("class", "btn btn-primary w-100");
    buttonMiddle.textContent = "Create";
    buttonMiddle.addEventListener("click", createNewEventForm);

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
    this.element.append(calendarWrapper);
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
              // click events will go here
              el.ID;
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
            el.ID;
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
  homeScreen.buttonRight.textContent = "Week View"
  //changing the EventListeners 
  homeScreen.buttonRight.removeEventListener("click", calendarDayView)
  homeScreen.buttonRight.addEventListener("click",calendarWeekView)
}
function calendarWeekView(){
  //create a new instance of the HomeScreenCalendarWeek
  homeScreen.calendar = new HomeScreenCalendarWeek();
  //assigning  the element 
  homeScreen.calendar.element  = homeScreen.calendarBody
  homeScreen.calendar.show();
  //changing the button text 
  homeScreen.buttonRight.textContent = "dayView"
  //changing the eventListeners 
  homeScreen.buttonRight.removeEventListener("click", calendarWeekView)
  homeScreen.buttonRight.addEventListener("click",calendarDayView)

}

let form;
function createNewEventForm() {
  form = new FormPopUp(
    "New Event", //title
    [
      //data
      {
        name: "Title",
        displayName: "Event Title",
        type: "text",
        placeholder: "--",
        value: "",
      },
      {
        name: "Date",
        displayName: "Date",
        type: "date",
        placeholder: "--",
        value: "",
        other: [["min", TodayISO]],
      },
      {
        name: "StartTime",
        displayName: "Start Time",
        type: "time",
        placeholder: "--",
        value: "",
      },
      {
        name: "EndTime",
        displayName: "End Time",
        type: "time",
        placeholder: "--",
        value: "",
      },
      {
        name: "EventType",
        displayName: "Event Type",
        type: "select",
        placeholder: "--",
        value: "study",
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
            alert("this event starts at the same time as \n" + el.name); // tell the user
            valid = false; // make the form false
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
              clash[0] = true;
            }
            //if new event starts after the current event and starts before the current one finishes
            if (NewEvent[0] > curEvent[0] && curEvent[1] > NewEvent[0]) {
              clash[1] = true;
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
        if (data.Repeat !== "none") {
          repeatInfo = Number(
            prompt(
              "Configure Repeating event\n Selected:" +
                data.Repeat +
                "\n what is the Interval?"
            )
          );
          data.repeatInfo = repeatInfo;
        }
        let request = new AjaxTemplate(true);
        request.href = "php/homepage/createCalendarEvent.php";
        request.data = {
          // login details necessary for the php file
          ID: StoredID,
          password: StoredPassword,
          data: data,
        };
        //request.send();
        //this.hide() // close the form
        //homeScreen.show() // to refresh the homepage
      }

      console.log(this.formData);
    },
    "Create Event"
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

function whiteList(string) {
  //list of allowed characters
  let allowed =
    "qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPASDFGHJKLZXCVBNM!£$%&_-+=,.<>#: ".split(
      ""
    );
  let striped = [];
  //for each character in the string ensure that it is in the allowed characters
  string.split("").forEach((el) => {
    if (!allowed.includes(el)) {
      striped.push(el);
    }
  });
  //if any characters a not allowed return them otherwise return true
  if (striped.length > 0) {
    return striped;
  } else {
    return true;
  }
}

function manageEvents(){
  let modal = new Popup()
  let title = document.createElement("h4")
  title.classList.add("modal-title")
  title.textContent = "Manage Events"
  //this is so that the user can clikc on the background to close the modal 
  modal.element.setAttribute("data-bs-backdrop","true")
  modal.title(title)
  //getting all the events 
  let request = new AjaxTemplate(false); // create an synchronous  ajax request
  request.href = "php/homepage/getAllEvents.php"; // point the address to getAllEvents.php
  request.data = {
    // login details necessary for the php file
    ID: StoredID,
    password: StoredPassword,
  };
  //sending the events 
  let events = request.send().responseText
  // converting the string response into JSON
  events = JSON.parse(events)
  console.log(events)
  //for each day 
  for(const key in events){
 events[key].forEach(el=>{
  delete el.ID
  delete el.user
  modal.modalBody.append(createInfoClickBtn(el,0))
 })
  }

  modal.show()
}

function createInfoClickBtn(info,onclick){
  //creating a card element
  let card = document.createElement("div")
  card.classList.add("card","p-2","m-2")
  //creating a row element
  let row = document.createElement("div")
  row.classList.add("row")
  card.appendChild(row)
  //for each key in the info provided 
  for(const key in info){
    //create an element 
    let el = document.createElement("div")
    el.classList.add("col-5")
    //creating the text content 
    el.textContent = `${key} : ${info[key]}`
    //adding it to row 
    row.append(el)


  }
  return card


}