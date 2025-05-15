/**
 * Study Planner Topics Module
 * This module handles the creation, viewing, editing, and deletion of topics
 * as well as tracking study visits and progress. It provides functionality for
 * managing topic data, study sessions, and associated notes.
 */

/**
 * Weighting factors used for calculating study recommendations
 * These values influence how different factors affect topic priority
 */
let weightings = {
  timeSince: 0.4,  // Weight for time since last visit
  diffRating: 0.8, // Weight for topic difficulty
  mood: 0.3,       // Weight for study mood/effectiveness
};

/**
 * Creates or edits a topic using a popup form
 * @param {string} name - Initial topic name (empty for new topics)
 * @param {string|number} subject - Subject ID or empty string
 * @param {string} startText - Title text for the popup form
 * @param {string} endText - Text for the submit button
 * @param {boolean} newTopic - Whether this is a new topic (true) or edit (false)
 * @param {number|boolean} id - Topic ID when editing, false for new topics
 * @param {Function} pageRefresh - Callback to refresh the page after save
 */
function createTopic(
  name = "",
  subject = "",
  startText = "New Topic",
  endText = "Create Topic",
  newTopic = true,
  id = false,
  pageRefresh = false
) {
  // Get available subjects for dropdown
  let Subjects = getSubject();
  let subjectOptions = [[-1, "No Subject"]];
  Subjects.forEach((el) => {
    subjectOptions.push([el.ID, el.name]);
  });

  let topicForm = new FormPopUp(
    startText,
    [{
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
    }],
    function () {
      let name = this.formData.Title;
      let subject = this.formData.subject;
      
      // Validate input
      let whName = whiteList(name, true);
      let whSubject = whiteList(String(subject), true);
      let valid;
      
      if (whName === true && whSubject === true) {
        valid = true;
      } else {
        valid = false;
        let list = whName + whSubject;
        let txt = `These characters are not allowed in t \n• ${list.join("\n• ")}`;
        alert(txt);
      }

      if (valid && name !== "" && subject != "") {
        let request = new AjaxTemplate(false);
        let data = {
          name: name,
          subjectID: subject
        };

        if (newTopic) {
          request.href = "php/homepage/topics/createTopic.php";
        } else {
          request.href = "php/homepage/topics/editTopic.php";
          data.id = id;
        }

        request.data = {
          ID: StoredID,
          password: StoredPassword,
          data: data,
        };

        let r = request.send();
        this.hide();

        if (pageRefresh) {
          pageRefresh({ID: id});
        } else {
          if (!isNaN(r.responseText)) {
            viewTopic({ID: parseInt(r.responseText)});
          }
        }
      }
      homeScreen.show();
    },
    endText
  );

  topicForm.show();
}

/**
 * Displays a list of topics, optionally filtered by subject
 * @param {number|boolean} subjectID - Optional subject ID to filter topics
 * @param {boolean} disp - Whether to display in modal (true) or return element (false)
 * @param {Function} forceCallback - Callback function for topic clicks
 * @returns {HTMLElement|undefined} Topic list element if disp is false
 */
function viewTopics(subjectID = false, disp = true, forceCallback = viewTopics) {
  let subjectSpec = !(subjectID == false);
  let data = getTopic();
  let TopicList = document.createElement("div");

  // Create topic cards
  data.forEach((el) => {
    if (!subjectSpec || el.subjectID == subjectID) {
      let btn = createInfoClickBtn({ subject: el.subjectName });
      let title = document.createElement("div");
      title.setAttribute("class", "col-12 h4");
      title.textContent = el.name;
      btn.prepend(title);
      
      btn.addEventListener("click", function () {
        viewTopic(el, forceCallback, subjectID);
      });
      TopicList.append(btn);
    }
  });

  let createTopicButton = createButton("Create Topic", "warning");
  createTopicButton.addEventListener("click", function () {
    createTopic();
  });

  if (disp) {
    let modal = new Popup();
    let modalCloseBtn = modal.closeBtn();
    modal.body(TopicList);

    if (subjectSpec) {
      let subject = getSubject(subjectID);
      modal.title(`View Topics for ${subject.name}`);
    } else {
      modal.title("View Topics");
    }

    modal.footer(createTopicButton, modalCloseBtn);
    modal.show();
  } else {
    return TopicList;
  }
}

/**
 * Displays detailed view of a topic including its notes and study history
 * @param {Object} data - Topic data object
 * @param {Function} closeFtn - Optional callback when closing the popup
 * @param {number|boolean} subjectID - Optional subject ID for filtering
 */
function viewTopic(data, closeFtn = false, subjectID = false) {
  let modal = new Popup();
  let topicInfo = getTopic(data.ID);
  
  // Prepare display info
  let displayInfo = structuredClone(topicInfo);
  delete displayInfo.ID;
  delete displayInfo.user;
  delete displayInfo.subjectID;

  // Format dates and difficulty rating
  displayInfo.date = displayInfo.date.convertDate();
  displayInfo.dateCreated = displayInfo.date.convertDate();
  displayInfo.diffrating = String(Math.round((displayInfo.diffrating * 100) / 255)) + "%";

  // Display notes
  let notes = document.createElement("div");
  let listOfNotes = getNotes(data.ID, "topics");
  listOfNotes.forEach((el) => {
    notes.append(convertNoteToHTML(el, viewTopic));
  });

  // Create action buttons
  let editBTN = document.createElement("button");
  editBTN.classList.add("btn", "btn-primary");
  editBTN.textContent = "Edit Topic";
  editBTN.addEventListener("click", function () {
    editTopic(data.ID);
  });

  let addNoteBtn = document.createElement("button");
  addNoteBtn.classList.add("btn", "btn-primary");
  addNoteBtn.textContent = "Add Note";
  addNoteBtn.addEventListener("click", function () {
    createNote(data.ID, "topics", true, false, "", viewTopic);
  });

  let deleteBtn = document.createElement("button");
  deleteBtn.classList.add("btn", "btn-danger");
  deleteBtn.textContent = "Delete Topic";
  deleteBtn.addEventListener("click", function () {
    if (confirm("are you sure you want to delete " + displayInfo.name)) {
      deleteTopic(data.ID);
      modal.hide();
    }
  });

  // Create title section with topic info
  let titleInfo = structuredClone(displayInfo);
  delete titleInfo.name;
  let TitleInfoCard = createInfoClickBtn(titleInfo);
  TitleInfoCard.classList.remove("btn", "btn-light", "card");

  let titleEL = document.createElement("div");
  titleEL.setAttribute("class", "col-7 h2");

  let closeBtn = modal.closeBtn("Back");
  closeBtn.classList.remove("btn-danger");
  closeBtn.classList.add("btn-secondary");

  if (closeFtn) {
    closeBtn.addEventListener("click", function () {
      closeFtn(subjectID);
    });
  }

  titleEL.textContent = displayInfo.name;
  TitleInfoCard.prepend(titleEL);

  // Assemble modal
  modal.title(TitleInfoCard);
  modal.body(notes);
  modal.footer(editBTN, addNoteBtn, deleteBtn, closeBtn);
  modal.show();
}

/**
 * Deletes a topic and its associated data
 * @param {number} id - ID of the topic to delete
 */
function deleteTopic(id) {
  let request = new AjaxTemplate(true);
  request.href = "php/homepage/topics/deleteTopic.php";
  request.data = {
    ID: StoredID,
    password: StoredPassword,
    topicID: id,
  };
  request.send();
  homeScreen.show();
}

/**
 * Opens the edit form for a topic
 * @param {number} id - ID of the topic to edit
 */
function editTopic(id) {
  let info = getTopic(id);
  createTopic(
    info.name,
    info.subjectID,
    "Edit Topic",
    "Save Changes",
    false,
    id,
    false
  );
}

/**
 * Records or edits a study visit for a topic
 * @param {number} topicID - ID of the topic being studied
 * @param {number|boolean} visitID - ID of visit when editing, false for new visits
 * @param {boolean} onHome - Whether to return to home screen after saving
 */
function visit(topicID, visitID = false, onHome = true) {
  let form = new FormPopUp(
    visitID ? "Edit Visit" : "New Visit",
    [{
      name: "type",
      displayName: "Type",
      type: "select",
      placeholder: "--",
      value: "",
      opt: [
        ["Revision", "Revision"],
        ["Learning", "Learning"],
        ["Practice", "Practice"],
      ],
    },
    {
      name: "time",
      displayName: "Time (minutes)",
      type: "number",
      placeholder: "--",
      value: "",
    },
    {
      name: "diffrating",
      displayName: "Difficulty Rating",
      type: "range",
      placeholder: "--",
      value: "127",
      other: [
        ["min", "0"],
        ["max", "255"],
      ],
    },
    {
      name: "note",
      displayName: "Note",
      type: "textarea",
      placeholder: "-",
      value: "",
      height: "300px",
    }],
    function () {
      let type = this.formData.type;
      let time = this.formData.time;
      let diffrating = this.formData.diffrating;
      let note = this.formData.note;

      let whType = whiteList(type);
      let whTime = whiteList(String(time));
      let whDiffrating = whiteList(String(diffrating));
      let whNote = whiteList(note, true);

      let valid = true;
      let invalidChars = [];

      if (whType !== true) invalidChars = invalidChars.concat(whType);
      if (whTime !== true) invalidChars = invalidChars.concat(whTime);
      if (whDiffrating !== true) invalidChars = invalidChars.concat(whDiffrating);
      if (whNote !== true) invalidChars = invalidChars.concat(whNote);

      if (invalidChars.length > 0) {
        valid = false;
        let txt = `These characters are not allowed \n• ${invalidChars.join("\n• ")}`;
        alert(txt);
      }

      if (valid && type !== "" && time !== "" && diffrating !== "") {
        let request = new AjaxTemplate(true);
        let data = {
          type: type,
          time: time,
          diffrating: diffrating,
          note: note,
          topicID: topicID,
        };

        if (visitID) {
          request.href = "php/homepage/topics/editVisit.php";
          data.id = visitID;
        } else {
          request.href = "php/homepage/topics/markTopicAsVisited.php";
        }

        request.data = {
          ID: StoredID,
          password: StoredPassword,
          data: data,
        };

        request.send();
        this.hide();

        if (onHome) {
          homeScreen.show();
        }
      }
    },
    visitID ? "Save Changes" : "Mark as Visited"
  );

  if (visitID) {
    let visit = getVisit(visitID)[0];
    form.formData = {
      type: visit.type,
      time: visit.time,
      diffrating: visit.diffrating,
      note: visit.text,
    };
  }

  form.show();
}

/**
 * Deletes a study visit record
 * @param {number} id - ID of the visit to delete
 */
function deleteVisit(id) {
  let request = new AjaxTemplate(true);
  request.href = "php/homepage/topics/deleteVisit.php";
  request.data = {
    ID: StoredID,
    password: StoredPassword,
    visitID: id,
  };
  request.send();
}

/**
 * Calculates study time totals from visit data
 * @param {Array} data - Array of visit records
 * @returns {Object} Study time totals by year, month, and week
 */
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

/**
 * Displays the study statistics page
 * Shows study time totals and visit history
 */
function studyPage() {
 const modal = new Popup();
  
    // StudyStatistics
    let timeByDate = timeStudying();
  
    let totals = getStudyTotals(timeByDate);
    console.log(totals)
  
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
    let stuffToDo = Todo.show(false)
  
    //setting the modal Titles , body and footer
    modal.title("Study Page");
    modal.body(dateDisplay,stuffToDo);
    let closeBTN = modal.closeBtn();
    modal.footer(editToDo, studyNowButton, " Fun Studying! ", closeBTN);
    modal.show();
  }