// Global variable to hold the study instance
let STUDY;

// Study class extending Screen class
class Study extends Screen {
  constructor(topics) {
    super();
  }

  // Method to display the study screen
  show() {
    this.topics = TopicAndSubjectSection.prototype.topics();
    this.timeDisplayText = "Time Remaining Until Break: ";
    let screen = document.createElement("div");
    screen.classList.add("container");

    let title = document.createElement("div");
    title.classList.add("h2", "card", "p-4", "bg-dark", "text-light");
    title.textContent = "PICK A TOPIC TO START";
    let end = document.createElement("div");
    end.classList.add("h2", "btn", "p-4", "btn-danger");
    end.style.width = "100%";
    end.textContent = "Go To Home";
    end.addEventListener(
      "click",
      function () {
        this.hide();
        homeScreen.show();
      }.bind(this)
    );

    this.element.innerHTML = "";
    let topicList = document.createElement("div");
    this.topics.forEach((el) => {
      topicList.append(this.displayTopic(el));
    });
    screen.append(title, end, topicList);
    this.element.append(screen);
  }

  // Method to display a single topic
  displayTopic(topic) {
    // Define the data to display
    let dispData = {
      // Convert the rating to a percentage
      "Difficulty Rating":
        String(Math.round((topic.diffrating * 100) / 255)) + "%",
      // Convert the timestamp to the date
      "Last Visited": topic.date,
      // Show the rating
      Rating: String(Math.round(100 * topic.rating)),
    };

    // Create the button
    let btn = createInfoClickBtn(dispData);

    // Create an element to hold the name
    let name = document.createElement("div");
    name.classList.add("h4");
    name.textContent = topic.name;

    // Add the name to the front of the button
    btn.prepend(name);

    // Adding the viewElement event listener
    btn.addEventListener(
      "click",
      function () {
        this.studyWithThisTopic(topic);
      }.bind(this)
    );

    // Return the button
    return btn;
  }

  // Method to start studying with a selected topic
  studyWithThisTopic(topic) {
    this.currentTopic = topic;
    this.element.innerHTML = "";

    let screen = document.createElement("div");
    screen.classList.add("container");
    let timer = new Timer("m");

    // Create a form popup for setting up timings
    this.form = new FormPopUp(
      "SETUP TIMINGS",
      [
        {
          name: "OnTime",
          displayName: "Time To work(in minutes)",
          type: "number",
          placeholder: "--",
          value: 30,
          other: [["min", 0]],
        },
        {
          name: "offTime",
          displayName: "Time to Relax(in minutes)",
          type: "number",
          placeholder: "--",
          value: 5,
          other: [["min", 0]],
        },
      ],
      function () {
        STUDY.startStudying(this.formData);
        console.log(this.formData);
        this.hide();
      },
      "START"
    );
    this.form.show();
    this.form.Modalfooter.querySelector(".btn-danger").addEventListener(
      "click",
      function () {
        homeScreen.show()
      }.bind(this)
    )

    screen.append();

    this.element.append(screen);
  }

  // Method to start studying with the provided form data
  startStudying(formData) {
    this.element.innerHTML = "";
    let screen = document.createElement("div");
    screen.classList.add("container");
    this.timer = new Timer("m");
    this.timeSpent = Number(formData.OnTime);
    this.restTime = Number(formData.offTime);
    this.timer.startTimer(this.timeSpent, function () {
      this.closedByUser = false;
      this.endStudy();
      console.log("Time is up");
    }.bind(this));
    let time = this.timer.getTime();
    this.timeDisplay = document.createElement("div");
    this.timeDisplay.classList.add("card", "text-center");
    this.timeDisplay.style.fontSize = "3rem";
    this.timeDisplay.textContent =
      this.timeDisplayText + time.convertToReadableFormat(true);
    this.timeDisplay.style.fontVariantNumeric = "tabular-nums";
    screen.append(this.timeDisplay);
    this.element.append(screen);
    this.timerf = setInterval(
      function () {
        time = this.timer.getTime();
        this.timeDisplay.textContent =
          this.timeDisplayText + time.convertToReadableFormat(true);
      }.bind(this),
      1000
    );

    let cancelStudy = document.createElement("button");
    cancelStudy.classList.add("btn", "btn-danger", "mt-3");
    cancelStudy.textContent = "Cancel Study";
    cancelStudy.addEventListener(
      "click",
      function () {
        this.cancelStudy();
      }.bind(this)
    );

    let stopStudy = document.createElement("button");
    stopStudy.classList.add("btn", "btn-success", "mt-3");
    stopStudy.textContent = "End Study";
    stopStudy.addEventListener(
      "click",
      function () {
        this.endStudy();
        this.endedByUser = true;
      }.bind(this)
    );
    let playPauseButton = document.createElement("button");
    playPauseButton.classList.add("btn", "btn-primary", "mt-3");
    playPauseButton.textContent = "Pause";
    playPauseButton.addEventListener(
      "click",
      function () {
        if (this.timer.isPaused()) {
          playPauseButton.textContent = "Pause";
          this.timer.unpause();
        } else {
          playPauseButton.textContent = "Resume";
          this.timer.pause();
        }
      }.bind(this)
    );
    screen.append(cancelStudy, " ", stopStudy,playPauseButton);
    this.element.append(screen);
    this.viewTopicDetails(this.currentTopic.ID);
  }

  // Method to end the study session
  cancelStudy() {
    this.show();
    clearInterval(this.timerf);
    clearTimeout(this.timer.timerTimeout);
  }
  endStudy() {

    this.timer.pause();
    this.timeSpent = this.timeSpent - this.timer.getTime();



    if (CURRENTPOPUPOBJECT &&CURRENTPOPUPOBJECT.open == true) {
      CURRENTPOPUPOBJECT.onClosing = function () {
        this.markTopicAsVisited();
      }.bind(this);
    }else{
      this.markTopicAsVisited();
    }
  }
  markTopicAsVisited() {
    visit(this.currentTopic.ID,false,false);

    let form = document.getElementById("ModalForm");
    document.forms["ModalForm"]['time'].value = this.timeSpent / 60
    document.forms["ModalForm"]['type'].value = document.forms['visitForm']['type'].value
    document.forms["ModalForm"]['note'].value = document.forms['visitForm']['note'].value

    CURRENTPOPUPOBJECT.onClosing = function () {
      this.startCalmScreen();
    }.bind(this);
  }
startCalmScreen(){
  this.beforeChange = darkMode
  toggleDarkmode('dark')
  let screen = document.createElement("div");
  screen.classList.add("container");
  let title = document.createElement("div");
  title.classList.add("h2", "card", "p-4", "bg-dark", "text-light");
  title.textContent = "TAKE A BREAK";
  let end = document.createElement("div");
  end.classList.add("h2", "btn", "p-4", "btn-danger");
  end.style.width = "100%";
  end.textContent = "Go To Home";
  end.addEventListener(
    "click",
    function () {
      this.hide();
      homeScreen.show();
      toggleDarkmode(this.beforeChange,false)
      this.timer.stop();
    }.bind(this)
  );

  clearInterval(this.timerf);

  this.timer.startTimer(this.restTime, function () {
    this.cancelStudy();
    toggleDarkmode(this.beforeChange,false)
    this.timer.stop();
  }.bind(this));

  this.timeDisplayText = 'Time Remaining Until Work: ';
  this.timeDisplay = document.createElement("div");
  this.timeDisplay.classList.add("card", "text-center",'m-2');
  this.timeDisplay.style.fontSize = "3rem";
  let time = this.timer.getTime();
  this.timeDisplay.textContent =
    this.timeDisplayText + time.convertToReadableFormat(true);
  this.timeDisplay.style.fontVariantNumeric = "tabular-nums";
  this.timerf = setInterval(
    function () {
      time = this.timer.getTime();
      this.timeDisplay.textContent =
        this.timeDisplayText + time.convertToReadableFormat(true);
    }.bind(this),
    1000
  );  
  let startAgain = document.createElement("button");
  startAgain.classList.add( "btn",  "btn-success"
  );
  startAgain.textContent = "Start Studying";
  startAgain.addEventListener(
    "click",
    function () {
      this.show();
      toggleDarkmode(this.beforeChange,false)
      this.timer.stop()
    }.bind(this)
  )

  let btnRow = document.createElement("div");
  btnRow.classList.add('card','p-4');


  btnRow.append(startAgain);


  
  screen.append(title,this.timeDisplay ,btnRow,end);
  this.element.innerHTML = "";
  this.element.append(screen);
}
  // New method to view topic details
  viewTopicDetails(topicID) {
    let screen = document.createElement("div");
    screen.classList.add("container", "row");
    this.element.classList.add("container");

    let topic = getTopic(topicID);

    // Left side for notes and visits
    let leftSide = document.createElement("div");
    leftSide.classList.add("col-12", "col-lg-6");
    leftSide.style.overflowY = "auto";
    leftSide.style.maxHeight = "80vh";

    // Create a title for the left side
    let title = document.createElement("div");
    title.classList.add("h2", "card", "p-4", "bg-dark", "text-light");
    title.textContent = "Notes and Visits for " + topic.name;
    leftSide.append(title);

    // Fetch notes and visits
    let notes = getNotes(topicID, "topics");
    notes.forEach((note) => {
      note = convertNoteToHTML(note);
      note.querySelectorAll("i").forEach((el) => {
        el.remove();
      });
      leftSide.append(note);
    });

    // Right side for visit form
    let rightSide = document.createElement("div");
    rightSide.classList.add("col-12", "col-lg-6");

    // Create visit form
    let visitForm = new FormPopUp(
      `Mark Topic as Visited`,
      [
        {
          name: "type",
          displayName: "Activity",
          value: "",
          type: "text",
          placeholder: "--",
        },

        {
          name: "note",
          displayName: "Note",
          value: "",
          type: "textarea",
          placeholder: "--",
          height: "200px",
        },
      ],
      function () {
        // Handle form submission
        let formData = this.formData;
        console.log(formData);
        this.hide();
      },
      "Mark as Visited"
    );

    visitForm.form.classList.add("card", "p-3");
    visitForm.form.setAttribute("id", "visitForm");

    let visitFormTitle = document.createElement("div");
    visitFormTitle.classList.add("h4");
    visitFormTitle.textContent =
      "Input information about your your study session";
    visitForm.form.prepend(visitFormTitle);

    rightSide.append(visitForm.form);

  


    screen.append(leftSide, rightSide);
    this.element.append(screen);
  }
  updateNotes() {
    console.log("Notes updated");
  }
}

// Function to start the study mode
function startStudyMode() {
  STUDY = new Study();
  STUDY.show();
}

// Start the study mode after a delay
//setTimeout(startStudyMode, 150);
