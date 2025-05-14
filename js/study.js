/**
 * Study Planner Study Mode Module
 * This module provides functionality for managing study sessions with features like:
 * - Topic selection
 * - Configurable work/break intervals
 * - Timer controls (pause/resume)
 * - Progress tracking
 * - Break reminders
 */

/** Global variable to hold the current study session instance */
let STUDY;

/**
 * Study class for managing study sessions
 * Extends the Screen base class to handle UI display
 */
class Study extends Screen {
  /**
   * Creates a new study session manager
   * @param {Array} topics - Available topics for study
   */
  constructor(topics) {
    super();
  }

  /**
   * Displays the topic selection screen
   * Shows available topics with their difficulty ratings and last visit dates
   */
  show() {
    this.topics = TopicAndSubjectSection.prototype.topics();
    this.timeDisplayText = "Time Remaining Until Break: ";
    
    let screen = document.createElement("div");
    screen.classList.add("container");

    // Create header and navigation
    let title = document.createElement("div");
    title.classList.add("h2", "card", "p-4", "bg-dark", "text-light");
    title.textContent = "PICK A TOPIC TO START";
    
    let end = document.createElement("div");
    end.classList.add("h2", "btn", "p-4", "btn-danger");
    end.style.width = "100%";
    end.textContent = "Go To Home";
    end.addEventListener("click", function () {
      this.hide();
      homeScreen.show();
    }.bind(this));

    // Create topic list
    this.element.innerHTML = "";
    let topicList = document.createElement("div");
    this.topics.forEach((el) => {
      topicList.append(this.displayTopic(el));
    });

    screen.append(title, end, topicList);
    this.element.append(screen);
  }

  /**
   * Creates a display card for a single topic
   * @param {Object} topic - Topic data including name, difficulty, and visit history
   * @returns {HTMLElement} Button element with topic information
   */
  displayTopic(topic) {
    let dispData = {
      "Difficulty Rating": String(Math.round((topic.diffrating * 100) / 255)) + "%",
      "Last Visited": topic.date,
      "Rating": String(Math.round(100 * topic.rating))
    };

    let btn = createInfoClickBtn(dispData);
    
    let name = document.createElement("div");
    name.classList.add("h4");
    name.textContent = topic.name;
    btn.prepend(name);

    btn.addEventListener("click", function () {
      this.studyWithThisTopic(topic);
    }.bind(this));

    return btn;
  }

  /**
   * Initiates study session setup for a selected topic
   * @param {Object} topic - Selected topic to study
   */
  studyWithThisTopic(topic) {
    this.currentTopic = topic;
    this.element.innerHTML = "";

    let screen = document.createElement("div");
    screen.classList.add("container");
    let timer = new Timer("m");

    // Create timing setup form
    this.form = new FormPopUp(
      "SETUP TIMINGS",
      [{
        name: "OnTime",
        displayName: "Time To work(in minutes)",
        type: "number",
        placeholder: "--",
        value: 30,
        other: [["min", 0]]
      },
      {
        name: "offTime",
        displayName: "Time to Relax(in minutes)",
        type: "number",
        placeholder: "--",
        value: 5,
        other: [["min", 0]]
      }],
      function () {
        STUDY.startStudying(this.formData);
        this.hide();
      },
      "START"
    );

    this.form.show();
    this.form.Modalfooter.querySelector(".btn-danger").addEventListener("click", function () {
      homeScreen.show();
    }.bind(this));

    screen.append();
    this.element.append(screen);
  }

  /**
   * Starts the study session with configured timings
   * @param {Object} formData - Contains OnTime (work duration) and offTime (break duration)
   */
  startStudying(formData) {
    this.element.innerHTML = "";
    let screen = document.createElement("div");
    screen.classList.add("container");

    // Initialize timer
    this.timer = new Timer("m");
    this.timeSpent = Number(formData.OnTime);
    this.restTime = Number(formData.offTime);
    
    this.timer.startTimer(this.timeSpent, function () {
      this.closedByUser = false;
      this.endStudy();
    }.bind(this));

    // Create timer display
    let time = this.timer.getTime();
    this.timeDisplay = document.createElement("div");
    this.timeDisplay.classList.add("card", "text-center");
    this.timeDisplay.style.fontSize = "3rem";
    this.timeDisplay.style.fontVariantNumeric = "tabular-nums";
    this.timeDisplay.textContent = this.timeDisplayText + time.convertToReadableFormat(true);

    // Update timer display every second
    this.timerf = setInterval(function () {
      time = this.timer.getTime();
      this.timeDisplay.textContent = this.timeDisplayText + time.convertToReadableFormat(true);
    }.bind(this), 1000);

    // Create control buttons
    let cancelStudy = document.createElement("button");
    cancelStudy.classList.add("btn", "btn-danger", "mt-3");
    cancelStudy.textContent = "Cancel Study";
    cancelStudy.addEventListener("click", function () {
      this.cancelStudy();
    }.bind(this));

    let stopStudy = document.createElement("button");
    stopStudy.classList.add("btn", "btn-success", "mt-3");
    stopStudy.textContent = "End Study";
    stopStudy.addEventListener("click", function () {
      this.endStudy();
      this.endedByUser = true;
    }.bind(this));

    let playPauseButton = document.createElement("button");
    playPauseButton.classList.add("btn", "btn-primary", "mt-3");
    playPauseButton.textContent = "Pause";
    playPauseButton.addEventListener("click", function () {
      if (this.timer.isPaused()) {
        playPauseButton.textContent = "Pause";
        this.timer.unpause();
      } else {
        playPauseButton.textContent = "Resume";
        this.timer.pause();
      }
    }.bind(this));

    // Assemble screen
    screen.append(this.timeDisplay);
    screen.append(cancelStudy, " ", stopStudy, playPauseButton);
    this.element.append(screen);
    this.viewTopicDetails(this.currentTopic.ID);
  }

  /**
   * Cancels the current study session
   * Clears timers and returns to topic selection
   */
  cancelStudy() {
    this.show();
    clearInterval(this.timerf);
    clearTimeout(this.timer.timerTimeout);
  }

  /**
   * Ends the current study session
   * Records time spent and triggers visit record
   */
  endStudy() {
    this.timer.pause();
    this.timeSpent = this.timeSpent - this.timer.getTime();

    if (CURRENTPOPUPOBJECT && CURRENTPOPUPOBJECT.open == true) {
      CURRENTPOPUPOBJECT.onClosing = function () {
        this.markTopicAsVisited();
      }.bind(this);
    } else {
      this.markTopicAsVisited();
    }
  }

  /**
   * Records a visit for the current topic
   * Includes study duration and notes
   */
  markTopicAsVisited() {
    visit(this.currentTopic.ID, false, false);

    let form = document.getElementById("ModalForm");
    document.forms["ModalForm"]['time'].value = this.timeSpent / 60;
    document.forms["ModalForm"]['type'].value = document.forms['visitForm']['type'].value;
    document.forms["ModalForm"]['note'].value = document.forms['visitForm']['note'].value;

    CURRENTPOPUPOBJECT.onClosing = function () {
      this.startCalmScreen();
    }.bind(this);
  }

  /**
   * Displays the break screen after study session
   * Switches to dark mode and shows break timer
   */
  startCalmScreen() {
    this.beforeChange = darkMode;
    toggleDarkmode('dark');
    
    let screen = document.createElement("div");
    screen.classList.add("container");
    
    let title = document.createElement("div");
    title.classList.add("h2", "card", "p-4", "bg-dark", "text-light");
    title.textContent = "TAKE A BREAK";
    
    let end = document.createElement("div");
    end.classList.add("h2", "btn", "p-4", "btn-danger");
    end.style.width = "100%";
    end.textContent = "Go To Home";
    end.addEventListener("click", function () {
      this.hide();
      homeScreen.show();
      toggleDarkmode(this.beforeChange, false);
      this.timer.stop();
    }.bind(this));

    screen.append(title, end);
    this.element.innerHTML = "";
    this.element.append(screen);

    // Start break timer
    this.timer = new Timer("m");
    this.timer.startTimer(this.restTime, function () {
      this.hide();
      homeScreen.show();
      toggleDarkmode(this.beforeChange, false);
    }.bind(this));

    this.timeDisplayText = "Break Time Remaining: ";
    let time = this.timer.getTime();
    this.timeDisplay = document.createElement("div");
    this.timeDisplay.classList.add("card", "text-center");
    this.timeDisplay.style.fontSize = "3rem";
    this.timeDisplay.style.fontVariantNumeric = "tabular-nums";
    this.timeDisplay.textContent = this.timeDisplayText + time.convertToReadableFormat(true);
    screen.append(this.timeDisplay);

    this.timerf = setInterval(function () {
      time = this.timer.getTime();
      this.timeDisplay.textContent = this.timeDisplayText + time.convertToReadableFormat(true);
    }.bind(this), 1000);
  }

  /**
   * Displays topic details during study session
   * @param {number} topicID - ID of the current topic
   */
  viewTopicDetails(topicID) {
    let info = getTopic(topicID);
    let displayInfo = structuredClone(info);
    delete displayInfo.ID;
    delete displayInfo.user;
    delete displayInfo.name;
    delete displayInfo.subjectID;

    displayInfo.date = displayInfo.date.convertDate();
    displayInfo.dateCreated = displayInfo.dateCreated.convertDate();
    displayInfo.diffrating = String(Math.round((displayInfo.diffrating * 100) / 255)) + "%";

    let notes = document.createElement("div");
    let listOfNotes = getNotes(topicID, "topics");
    listOfNotes.forEach((el) => {
      notes.append(convertNoteToHTML(el, this.updateNotes.bind(this)));
    });

    let addNoteBtn = document.createElement("button");
    addNoteBtn.classList.add("btn", "btn-primary");
    addNoteBtn.textContent = "Add Note";
    addNoteBtn.addEventListener("click", function () {
      createNote(topicID, "topics", true, false, "", this.updateNotes.bind(this));
    }.bind(this));

    let titleInfo = createInfoClickBtn(displayInfo);
    titleInfo.classList.remove("btn", "btn-light");
    
    let titleEL = document.createElement("div");
    titleEL.setAttribute("class", "col-7 h2");
    titleEL.textContent = info.name;
    titleInfo.prepend(titleEL);

    let modal = new Popup();
    modal.title(titleInfo);
    modal.body(notes);
    modal.footer(addNoteBtn);
    modal.show();
  }

  /**
   * Updates the notes display
   * Called after adding or editing notes
   */
  updateNotes() {
    this.viewTopicDetails(this.currentTopic.ID);
  }
}

/**
 * Creates and initializes a new study session
 */
function startStudyMode() {
  STUDY = new Study();
  STUDY.show();
}

// Start the study mode after a delay
//setTimeout(startStudyMode, 150);
