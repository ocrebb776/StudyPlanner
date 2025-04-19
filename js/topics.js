let weightings = {
  timeSince: 0.4,
  diffRating: 0.8,
  mood: 0.3,
};
function createTopic(
  name = "",
  subject = "",
  startText = "New Topic",
  endText = "Create Topic",
  newTopic = true,
  id = false,
  pageRefresh = false
) {
  // get a list of all the subjects
  let Subjects = getSubject();
  //empty list to contain the subect
  let subjectOptions = [[-1, "No Subject"]];
  Subjects.forEach((el) => {
    //add the subject name and topic
    subjectOptions.push([el.ID, el.name]);
  });

  //create the for input with the Title and subject fields with the the startText and EndText
  let topicForm = new FormPopUp(
    startText,
    [
      {
        name: "Title",
        displayName: "Topic Title",
        type: "text",
        placeholder: "--",
        value: name,
      },
      {
        name: "subject",
        displayName: "Subject",
        type: "select",
        placeholder: "--",
        value: subject,
        opt: subjectOptions,
      },
    ],
    function () {
      //function to validate the input and add it to the topic list

      //get name info
      let name = this.formData.Title;
      //get subject
      let subject = this.formData.subject;
      //whitelist name and subject
      let whName = whiteList(name, true);
      let whSubject = whiteList(String(subject), true);
      let valid;
      if (whName === true && whSubject === true) {
        //if name and the subject is valid
        valid = true;
      } else {
        //if it is not valid
        valid = false;
        let list = whName + whSubject;
        //tell user that the characters are not allowed
        txt = `These characters are not allowed in t \n• ${list.join("\n• ")}`;
        //alert this to the user
        alert(txt);
      }
      if (valid && name !== "" && subject != "") {
        //start request
        let request = new AjaxTemplate(false);
        //creating data about the request
        let data = {};
        data.name = name;
        data.subjectID = subject;
        //send the request to different files depending of if it is a new Topic or an older Topic
        if (newTopic) {
          request.href = "php/homepage/topics/createTopic.php";
        } else {
          request.href = "php/homepage/topics/editTopic.php";
          //the id is used to find the Topic in the database
          data.id = id;
        }
        request.data = {
          // login details necessary for the php file
          ID: StoredID,
          password: StoredPassword,
          data: data,
        };
        //send request
        let r = request.send();
        //hideMobile
        this.hide();
        if (pageRefresh) {
       
          //if there is a page to go back to go to it
          pageRefresh({ID:id});
        }else{
          if(!isNaN(r.responseText)){
 
            viewTopic({ID:parseInt(r.responseText)})
          }
        }
        }

      //hide the form after submitting
      //this.hide();
      homeScreen.show();
      
     
    },
    endText
  );

  //show the form
  topicForm.show();
}

function viewTopics(subjectID = false,disp=true,forceCallback = viewTopics) {
  //if there is a subjectID then then the functions should filter for only that subject
  let subjectSpec = !(subjectID == false);
  //get topic data
  let data = getTopic();
  //create popup
 
  //this is so that the user can clikc on the background to close the modal
  //modal.element.setAttribute("data-bs-backdrop", "true");
  //element to store the list of topics
  let TopicList = document.createElement("div");
  //for each topic
  data.forEach((el) => {
    //if the program is not subject specific or the topic is in the subject given
    if (!subjectSpec || el.subjectID == subjectID) {
      //create an empty cardButton
      let btn = createInfoClickBtn({ subject: el.subjectName });
      //create a title element
      let title = document.createElement("div");
      //make it big
      title.setAttribute("class", "col-12 h4");
      //set the name to the text content
      title.textContent = el.name;
      //add the title into the button
      btn.prepend(title);
      //add an event listener for the button
      btn.addEventListener("click", function () {
        viewTopic(el, forceCallback,subjectID);
      });
      //add the button to the topic list
      TopicList.append(btn);
    }
  });
  //add the topic list into the body

  //a button for creating a Topic
  let createTopicButton = createButton("Create Topic", "warning");
  createTopicButton.addEventListener("click", function () {
    createTopic();
  });

  if(disp){
  let modal = new Popup();

  //add the close button to the footer
  let modalCloseBtn = modal.closeBtn();
  modal.body(TopicList);

  //define the title
  modal.title("View Topics");
  if (subjectSpec) {
    //get the information about the subject
    let subject = getSubject(subjectID);
    //change the title to show the name of the subject
    modal.title(`View Topics for ${subject.name}`);
  }
  modal.footer(createTopicButton, modalCloseBtn);
  //show the modal
  modal.show();}else{
    return TopicList
  }
}
function viewTopic(data, closeFtn = false, subjectID=false) {

  //create new modal
  let modal = new Popup();
  //get information about the request
  let topicInfo = getTopic(data.ID);
  //create the info
  let displayInfo = structuredClone(topicInfo);
  //delete unnecessary information that the user won't need
  delete displayInfo.ID;
  delete displayInfo.user;
  delete displayInfo.subjectID;

  displayInfo.date = displayInfo.date.convertDate();
  displayInfo.dateCreated = displayInfo.date.convertDate();
  displayInfo.diffrating =
    String(Math.round((displayInfo.diffrating * 100) / 255)) + "%";

  //get list of notes in the element
  let notes = document.createElement("div");
  notes.append();
  let listOfNotes = getNotes(data.ID, "topics");

  listOfNotes.forEach((el) => {
    notes.append(convertNoteToHTML(el, viewTopic));
  });
  //create the edit button
  let editBTN = document.createElement("button");
  editBTN.classList.add("btn", "btn-primary");
  //text edit
  editBTN.textContent = "Edit Topic";
  //adding an event listener for opening the edit event form modal
  editBTN.addEventListener("click", function () {
    editTopic(data.ID);
  });
  //create addNoteBtn
  let addNoteBtn = document.createElement("button");
  addNoteBtn.classList.add("btn", "btn-primary");
  addNoteBtn.textContent = "Add Note";
  addNoteBtn.addEventListener("click", function () {
    createNote(data.ID, "topics", true, false, "", viewTopic);
  });
  //create deleteBtn
  let deleteBtn = document.createElement("button");
  deleteBtn.classList.add("btn", "btn-danger");
  deleteBtn.textContent = "Delete Topic";
  deleteBtn.addEventListener("click", function () {
    if (confirm("are you sure you want to delete" + displayInfo.name)) {
      deleteTopic(data.ID);

      //hide the popup
      modal.hide();
    }
  });
  let titleInfo = structuredClone(displayInfo);
  delete titleInfo.name;
  //change the title to hold information about the Topic
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
      closeFtn(subjectID);
    });
  }
  //text content
  titleEL.textContent = displayInfo.name;
  TitleInfoCard.prepend(titleEL);

  //mark as visited button
  let markTopicAsVisited = createButton("Mark As Visited", "danger");
  //call the visit function when button is clicked
  markTopicAsVisited.addEventListener("click", function () {
    visit(data.ID);
  });
  modal.title(TitleInfoCard);
  //add the buttons to the footer
  //modal.title("l")

  //a button to go to the subject that the link is attached to
  let goToSubject = "";
  //if there is a subjectID then the button should be created
  if (topicInfo.subjectID != -1) {
    //creating the button
    goToSubject = document.createElement("button");
    goToSubject.classList.add("btn", "btn-primary");
    goToSubject.textContent = "Go to Subject";
    goToSubject.addEventListener("click", function () {
      viewSubject({ ID: topicInfo.subjectID });
    });
  }
  modal.body(goToSubject, " ", editBTN, notes);
  modal.footer(markTopicAsVisited, addNoteBtn, deleteBtn, closeBtn);
  modal.show();
}
function deleteTopic(id) {
  let request = new AjaxTemplate(true);
  request.href = "php/homepage/topics/deleteTopic.php";
  //login credentials and the topicID
  request.data = {
    ID: StoredID,
    password: StoredPassword,
    topicID: id,
  };
  request.send();

  //refresh the homepage to update everything
  homeScreen.show();
}

function editTopic(id) {
  //get the info on the topic
  let info = getTopic(id);
  //create the form with prefilled info
  createTopic(
    info.name,
    info.subjectID,
    "Edit Topic",
    "Save Changes",
    false,
    id,
    viewTopic
  );
}
function getTopic(id = false) {
  let request = new AjaxTemplate(false);
  request.href = "php/homepage/topics/getTopic.php";
  request.data = {
    ID: StoredID,
    password: StoredPassword,
    id: id,
  };
  request.dataType = "json";

  let send = request.send().responseJSON;
  //for each subject
  for (let i = 0; i < send.length; i++) {
    // if the subjectName is null
    if (send[i]["subjectName"] == null) {
      //change it to Empty
      send[i]["subjectName"] = "Empty";
    }
    send[i].TotalTime = Number(send[i].TotalTime).convertToReadableFormat();
  }

  if (id === false) {
    return send;
  } else {
    return send[0];
  }
}

function visit(topicID, visitID = false, onHome = true) {
  //get information about the topic
  let topicInfo = getTopic(topicID);

  //default values to use in the form
  let visitValues = {
    diffrating: 127,
    type: "",
    time: 0,
    note: "",
  };
  if (visitID != false) {
    //if the visitIS is not false then get the date from the existing visit
    visitValues = getVisit(visitID);
    visitValues.time = visitValues.time / 60;
  }

  // if the diffrating is -1 then display it as being in the middle of the input
  if (topicInfo.diffrating == -1) {
    topicInfo.diffrating = 127;
  }
  //create a new form
  let form = new FormPopUp(
    // the header text with the topic name in it
    visitID !== false
      ? `Edit "${topicInfo.name}'s" Visit on ${visitValues.date}`
      : `Mark "${topicInfo.name}" as Visited`,
    [
      //range input so that the user can input the difficulty of the task
      {
        name: "diffrating",
        displayName: "Difficulty",
        type: "range",
        other: [
          ["min", "0"],
          ["max", "255"],
          ["value", visitValues.diffrating],
        ],
      },
      //input to show the type of activity
      {
        name: "type",
        displayName: "activity",
        value: visitValues.type,
        type: "text",
        placeholder: "--",
      },
      //number input so that the user can input the time spent studying
      {
        name: "time",
        displayName: "Time spent(hours)",
        value: visitValues.time,
        type: "number",
        placeholder: "--",
      },
      // a note so they can talk about what they did while studying
      {
        name: "note",
        displayName: "note",
        value: visitValues.note,
        type: "textarea",
        placeholder: "--",
        height: "200px",
      },
    ],
    function () {
      //reassing this.formData to a local variable data
      let data = this.formData;
      //asssume that the form is valid
      valid = true;
      //empty string to put the error message in to display in one single alert
      txt = "";
      //for each input
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          //check if the program should allow for a new line
          switch (key) {
            case "note":
              newLine = true;
              break;
            default:
              newLine = false;
          }
          // get any false character
          let chr = whiteList(data[key], newLine);
          //if there are any disallowed  characters
          if (chr !== true) {
            //add the disallowed charters to the txt
            txt += `\n in ${key} these characters are not allowed \n• ${chr.join(
              "\n• "
            )}`;
            //now the form is invalid
            valid = false;
          }
        }
      }
      // if there is any text to alert, it should send the alert message
      if (txt !== "") {
        alert(txt);
      }
      data.time = Math.round(data.time * 60);
      data.diffrating = Math.round(data.diffrating);

      let request = new AjaxTemplate(false);

      if (visitID == false) {
        request.href = "php/homepage/topics/markTopicAsVisited.php";
      } else {
        request.href = "php/homepage/topics/editVisit.php";
      }
      if (valid) {
        data.topicID = topicID;
        request.data = {
          // login details necessary for the php file
          ID: StoredID,
          password: StoredPassword,
          data: data,
          visitID: visitID,
        };
        request.send();
        this.hide(); // close the form

        if (onHome) {
          homeScreen.show(); // to refresh the homepage
        }
      }
    },
    visitID !== false ? "Save Changes " : "Mark as Visited"
  );
  //show the form
  form.show();
}
function getVisit(id = false, ref = "ID") {
  //creat a new ajax request
  let request = new AjaxTemplate(false);
  //set the href of the php file
  request.href = "php/homepage/topics/getVisit.php";
  //set the request payload
  request.data = {
    ID: StoredID,
    password: StoredPassword,
    id: id,
    ref: ref,
  };
  //set the response type to be data
  request.dataType = "json";
  //send the request
  let send = request.send().responseJSON;

  //if the request was for one item then
  if (id === false) {
    return send;
  } else {
    return send[0];
  }
}


function deleteVisit(id) {
    let request = new AjaxTemplate(true);
    request.href = "php/homepage/topics/deleteVisit.php";
    //login credentials and the topicID
    request.data = {
      ID: StoredID,
      password: StoredPassword,
      visitID: id,
    };
    request.send();
  }
  
  function timeStudying() {
    let request = new AjaxTemplate(false);
    request.href = "php/study/getTotalStudyTime.php";
    request.data = {
      // login details necessary for the php file
      ID: StoredID,
      password: StoredPassword,
    };
    request.dataType = "json";
    //getting the json Response
    let data = request.send().responseText;
    //getting the time spent by day
    let timeByDay = [];
    //converting the date into a Object
    data = JSON.parse(data);
    //iterating through each event
    data.forEach((x) => {
      //Converting the date and time into A date obj and a integer
      x.date = new Date(x.date);
      x.time = Number(x.time);
      //setting the Time to be midnight
      x.date.setHours(0, 0, 0, 0);
  
      if (timeByDay.length > 0) {
        // if there is already an element in there then if it is on the same day then add the times
        if (timeByDay[timeByDay.length - 1].date.isDateOnTheSameDayAs(x.date)) {
          timeByDay[timeByDay.length - 1].time += x.time;
        } else {
          //if not then start a new item
          timeByDay.push(x);
        }
      } else {
        //add the first item
        timeByDay.push(x);
      }
    });
    //return the results
    return timeByDay;
  }
  
  function getStudyTotals(data) {
    //initializing the default counting variables
    let totalThisYear = 0;
    let totalPastWeek = 0;
    let totalThisMonth = 0;
    let totalToday = 0;
    //setting the date to compare to the current day at midnight
    let today = new Date();
    today.setHours(0, 0, 0, 0);
  
    //for each date counting down
    for (x = data.length - 1; x >= 0; x--) {
      //if on the same year
      let sameYear = today.getFullYear() == data[x].date.getFullYear();
      //use temp date to not mutilate the today Variable
      let tempDate = new Date(today);
      //if on the same day
      if (data[x].date.isDateOnTheSameDayAs(today)) {
        totalToday += data[x].time;
      }
      //if in the past week
      if (tempDate.setDate(tempDate.getDate() - 6) <= data[x].date) {
        totalPastWeek += data[x].time;
      }
      //if in the same month in the same year
      if (today.getMonth() == data[x].date.getMonth() && sameYear) {
        totalThisMonth += data[x].time;
      }
      //if in the same year
      if (sameYear) {
        totalThisYear += data[x].time;
      }
    }
    return {
      year: totalThisYear,
      month: totalThisMonth,
      week: totalPastWeek,
      today: totalToday,
    };
  }
  
  function studyPage() {
    const modal = new Popup();
  
    // StudyStatistics
    let timeByDate = timeStudying();
  
    let totals = getStudyTotals(timeByDate);
  
    //creating a div to display the Totals
    let dateDisplay = document.createElement("div");
  
    //using basic HTML to display the totals
    dateDisplay.innerHTML = `
    <b>Study Totals</b>
    <br>
    Total Today: ${totals.today.convertToReadableFormat()}
    <br>
    Total Over The Past Week: ${totals.week.convertToReadableFormat()}
    <br>
    Total This Month: ${totals.month.convertToReadableFormat()}
    <br>
    Total This Year: ${totals.year.convertToReadableFormat()}
    `;
  
    //study Features PAge
    let studyNowButton = document.createElement("button");
    studyNowButton.classList.add("btn", "btn-primary");
    studyNowButton.textContent = "STUDY NOW";
    studyNowButton.addEventListener("click", function () {
      startStudyMode();
      modal.hide();
    });
  
    //todo features
  
    //edit button
    let editToDo = document.createElement("button");
    editToDo.classList.add("btn", "btn-primary");
    editToDo.textContent = "Edit To Do List";
    editToDo.addEventListener("click", function () {
      Todo.show();
    });
    //todo list
    let todoListElement = document.createElement("div");
    let stuffToDo = Todo.getToDo();
  
    //setting the modal Titles , body and footer
    modal.title("Study Page");
    modal.body(dateDisplay);
    let closeBTN = modal.closeBtn();
    modal.footer(editToDo, studyNowButton, " Fun Studying! ", closeBTN);
    modal.show();
  }
  