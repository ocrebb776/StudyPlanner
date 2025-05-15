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
          opt: ["study", "blue", "green", "red", "yellow", "purple", "other"],
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
        //if the start time is after the end time
        if (data.StartTime.toMins() >= data.EndTime.toMins()) {
          //the form is invalid
          valid = false;
          //tell the user that there is an issue
          alert("The start time must be before the end time");
        } else {
        }
  
        if (valid) {
          // if the user wants to proceed
          //create a new syncronus request
          let repeatInfo;
  
          let request = new AjaxTemplate(false);
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
  
      },
      endText
    );
  
    form.show();
  }
  function manageEvents(modal = new Popup()) {
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
  
    events = getAllEvents();
  
    //collating all of the events into one list
    let allDays = [];
    for (const key in events) {
      events[key].forEach((el) => {
        let dateString = el.date + "T" + el.startTime;
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
    if(id == undefined ) {
      return false
    }
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
      createNote(id, "events", true, false, "", viewEvent);
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
    let request = new AjaxTemplate(false);
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
  function getAllEvents() {
    let request = new AjaxTemplate(false); // create an synchronous  ajax request
    request.href = "php/homepage/getAllEvents.php"; // point the address to getAllEvents.php
    request.data = {
      // login details necessary for the php file
      ID: StoredID,
      password: StoredPassword,
    };
    request.dataType = "json";
    //sending the events
    return request.send().responseJSON;
  }