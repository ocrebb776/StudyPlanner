// concrete class HomeScreen inherits from abstract class Screen
function logout() {}
class HomeScreen extends Screen {
  show() {
    this.element.classList.remove("container");
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
    buttonMiddle.textContent = "Create Event ";
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
    this.buttonRight.textContent = "Day View";
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
    //adding the event listener to the search button
    this.searchButton.addEventListener("click", function () {
      search.show();
    });
    //put the button in the wrapper
    this.searchButtonWr.append(this.searchButton);

    //The StudyButton
    //create a wrapper for the study Button
    this.studyButtonWr = document.createElement("div");
    this.studyButtonWr.classList.add("col");
    //create the button
    this.studyButton = document.createElement("button");
    this.studyButton.addEventListener("click", studyPage);
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


//itme to display total time spent
    let totalTimeSpent = document.createElement('div')
    totalTimeSpent.classList.add("container","p-2")
    totalTimeSpent.setAttribute("id","totalTimeSpent")


    //creating the Calendar title
    let CalendarTitle = document.createElement("div");
    CalendarTitle.classList.add("card-header");
    CalendarTitle.textContent = "Calendar";
    //adding it to the title
    calendarWrapper.prepend(CalendarTitle);
    this.element.append(
      totalTimeSpent,
      calendarWrapper,
      this.buttonListContainer,
      this.topicAndSubjectSectionWrapper
    );

    //a element that can store the total time spent 
    this.totalTimeSpent = document.getElementById("totalTimeSpent")

    //get the total time spent studyting 
    let totals = getStudyTotals(timeStudying())
    //set the text content to display it 
    this.totalTimeSpent.textContent = `Time spent over the past Week:${totals.week.convertToReadableFormat()}`

    //instantiating the search features for later in the program
    search = new Search();

    //HomeScreen Calendar Date Attribute, to be used to select a different date
    this.selectedDate = null;
  }
}

let weightings = {
  timeSince: 0.4,
  diffRating: 0.3,
  mood: 0.3,
};

class TopicAndSubjectSection extends Screen {
  show() {
    this.element.classList.add("card", "m-2");
    //create Card header to contain the button row
    this.cardHeader = document.createElement("div");
    this.cardHeader.classList.add("card-header");
    //create ButtonRow to contain both of the buttons
    this.buttonRow = document.createElement("div");
    this.buttonRow.classList.add("row");
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

    //create button twas here

    //create a wrapper to contain the Topic button
    this.TopicButtonWr = document.createElement("div");
    //create the create button itself
    this.TopicButton = createButton("Topics", "secondary");
    //make the width of the wrapper to fill the rest of the row
    this.TopicButtonWr.classList.add("col");
    //make sure it fills the wrapper horizontally
    this.TopicButton.classList.add("w-100");
    //put the button within its wrapper
    this.TopicButtonWr.appendChild(this.TopicButton);
    //add the wrappers to the button row
    this.buttonRow.append(this.subjectButtonWr, this.TopicButtonWr);
    //add the buttonRow to the header
    this.cardHeader.append(this.buttonRow);
    //add the header to the element
    this.element.append(this.cardHeader);
    //adding the eventLisners to the button

    // //Create Button
    // this.createButton.addEventListener("click", function () {
    //   let CreateButtonMenu = new Popup();

    //   //this is so that the user can clikc on the background to close the modal
    //   CreateButtonMenu.element.setAttribute("data-bs-backdrop", "true");
    //   //create a new element to contain all the buttons
    //   let buttonList = document.createElement("div");
    //   buttonList.classList.add("row", "g-3");
    //   buttonList.style.margin = "auto";

    //   //the CreateSubject button
    //   let createSubject = createButton("Create Subject", "primary");
    //   createSubject.addEventListener("click", function () {
    //     createSubjectForm();
    //   });

    //   //toggleDarkMode button
    //   let createTopicButton = createButton("Create Topic", "outline-primary");
    //   createTopicButton.addEventListener("click", function () {
    //     createTopic();
    //   });

    //   //adding buttons to the buttonList
    //   buttonList.append(createSubject, createTopicButton);

    //   //creating the title
    //   CreateButtonMenu.title("Create?");
    //   //adding the button list to the body element
    //   CreateButtonMenu.body(buttonList);
    //   CreateButtonMenu.footer(CreateButtonMenu.closeBtn("cancel"));
    //   //showing the modal
    //   CreateButtonMenu.show();
    // });

    this.subjectButton.addEventListener("click", function () {
      viewSubjects();
    });

    //topic button event listenrt
    this.TopicButton.addEventListener("click", function () {
      viewTopics();
    });

    // the subject and topic managment section

    this.cardBody = document.createElement("div");
    this.cardBody.setAttribute("class", "card-body");
    this.topics();
    this.displayTopics();
    //add the card body to the element
    this.element.append(this.cardBody);
  }
  topics() {
    //get the topics
    let topics = getTopic();
    //calculate the weightings#

    //max and min scores
    let max = {
      timeSince: 0,
      diffRating: 0,
      mood: 0,
    };
    let min = {
      timeSince: -1,
      diffRating: -1,
      mood: -1,
    };

    //work out the maximum and minumum scores
    for (const topicL in topics) {
      let topic = topics[topicL];
      //get the time difference
      let date = new Date(topic.date);
      //get the miliseconds from the date
      let time = date.getTime();
      //get the current date
      let now = new Date();
      //convert it to milliseconds
      now = now.getTime();
      //round the the nearest day
      let timeDiff = Math.round((now - time) / 86400000);
      //if the new timeDiff is higher than the current maximunt
      if (max.timeSince < timeDiff) {
        max.timeSince = timeDiff;
      }
      // if the timediff is lower than the minimum
      if (min.timeSince > timeDiff) {
        min.timeSince = timeDiff;
      }
      //add the timesdiff to the topic
      topics[topicL].timeDiff = timeDiff;
      //diff rating
      //convert the diffrating to a number
      topic.diffrating = Number(topic.diffrating);
      //if the diff rating is -1(topic has not been visited since it was inputted into the system)
      if (topic.diffrating == -1) {
        //set the diffrating to 255/2
        topics[topicL].diffrating = 255 / 2;
        topic.diffrating = 255 / 2;
      }
      //if the new diffrating is hogher than the maximum
      if (max.diffRating < topic.diffrating) {
        max.diffRating = topic.diffrating;
      }
      //if the new diffrating is lower than the maximum
      if (min.diffRating > topic.diffRating) {
        min.diffRating = topic.diffrating;
      }

      //for the defaults
      if (min.timeSince == -1) {
        min.timeSince = timeDiff;
      }
      if (min.diffRating == -1) {
        min.diffRating = topic.diffrating;
      }
    }

    //next the total scores need to be calculated and the maximums and minimus
    let maxLooseScore = 0;
    let minLooseScore = -1;
    for (const topicL in topics) {
      let topic = topics[topicL];
      console.log(topic);
      //if aqll the topics are the same then to avoid zero divison
      if (max.timeSince - min.timeSince == 0) {
        max.timeSince++;
      }
      //if all the diffratings are the same then add one to avoid zero division
      if (max.diffRating - min.diffRating == 0) {
        max.diffRating++;
      }
      //work out the timescore by working out the distance form the minimum time in relation to the total length
      let timeScore =
        (topic.timeDiff - min.timeSince) / (max.timeSince - min.timeSince);
      //workout the diffscore the same way
      let diffScore =
        (topic.diffrating - min.diffRating) / (max.diffRating - min.diffRating);

      // combine the scores using the predefines weightings
      let totalScore =
        timeScore * weightings.timeSince + diffScore * weightings.diffRating;

      //add the total score to the topic
      topics[topicL].looseRating = totalScore;
      topic = topics[topicL];

      //if thr current rating is higher than the maximum
      if (maxLooseScore < topic.looseRating) {
        maxLooseScore = topic.looseRating;
      }
      //if the current rating is lower than the minumum
      if (minLooseScore > topic.looseRating) {
        minLooseScore = topic.looseRating;
      }

      //for the defaults
      if (minLooseScore == -1) {
        minLooseScore = topic.looseRating;
      }
    }
    for (const topicL in topics) {
      //work out the relative rating in comparison to the maximum and minimums scores
      topics[topicL].rating =
        (topics[topicL].looseRating - minLooseScore) /
        (maxLooseScore - minLooseScore);
      //if there as a divison by zero set the score to 1
      if (maxLooseScore - minLooseScore == 0) {
        topics[topicL].rating = 1;
      }
    }
    //sort the topics asc
    let sort = new SortByKey(topics, "rating");
    //get the sorted list and reverse it to get the list in reverse order
    topics = sort.sortedList.reverse();
    this.rankedTopics = topics;
    return topics;
  }
  displayTopics() {
    //create a blanbk list
    this.topicListElement = document.createElement("div");

    //loop through the ranket Topics
    this.rankedTopics.forEach((topic) => {
      //define the data to display
      let dispData = {
        //convert the rating to a percentage
        "Difficulty Rating":
          String(Math.round((topic.diffrating * 100) / 255)) + "%",
        //convert theTimepstamp to the date
        "Last Visited": topic.date.convertDate(),
        //show the rating
        Rating: String(Math.round(100 * topic.rating)),
        "total time spent": topic.TotalTime,
        Subject: topic.subjectName,
      };
      //create the button
      let btn = createInfoClickBtn(dispData);
      // create an element to hold the name
      let name = document.createElement("div");
      name.classList.add("h4");
      name.textContent = topic.name;
      //add the name to the front of the button
      btn.prepend(name);
      //adding the viewElement event listenrer
      btn.addEventListener("click", function () {
        viewTopic(topic);
      });
      //adding the button to the topicLisyElement
      this.topicListElement.append(btn);
    });
    //adding the listElement to a blank card body
    this.cardBody.innerHTML = "";
    this.cardBody.append(this.topicListElement);
  }
}
//adding the convert date to the prototype of String
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
}

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

Number.prototype.convertToReadableFormat = function (showSecondsAnyway = false) {
  let txt = String(Math.floor(this / 60) + "h" + Math.trunc(this % 60).pad(2) + "m");
  txt+= (this % 1 > 0 || showSecondsAnyway) ?  (Math.trunc(this % 1 * 60)).pad(2) + "s":'';
  return txt
};

class HomeScreenCalendarWeek extends Screen {
  show() {
    this.changeSelectedDate = this.changeSelectedDate.bind(this);
    this.element.innerHTML = "";
    this.calendarColours = {
      Study: "#ed80f2",
    };
    this.ListOfSDays = document.createElement("div");

    this.data = this.GetCalendarData();
    let DayList = this.daysList();
  }
  GetCalendarData() {
    // IF no date has been selected or the Date Selected is invallid then use todays date
    this.updateCurrentDay();
    //send a request
    let request = new AjaxTemplate(false);
    request.href = "php/homepage/getCalendarInfo.php";
    request.data = {
      ID: StoredID,
      password: StoredPassword,
      date: this.currentDay,
    };
    let result = request.send();

    //if it was a success
    if (result.status == 200) {
      return JSON.parse(result.responseText);
    } else {
      console.log(result);
      //if not return false
      return false;
    }
  }
  daysList() {
    //get todays date

    //abbreviations of dates
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
        date.classList.add("text-white");
        date.textContent = this.currentDay.getDate() + "-";
        // add an eventListener when the first date is clicked

        date.addEventListener("click", this.changeSelectedDate);
        //check to see if the first date is today
        if (this.currentDay.isDateOnTheSameDayAs(new Date())) {
          //if it is set the colour to be blue
          date.classList.add("bg-primary");
        } else {
          //if not set it to be grey
          date.classList.add("bg-secondary");
        }
      }
      date.style.borderRadius = "30px";
      date.style.height = 110 % date.classList.add("text-center", "rounded");
      //getting the day of the week of the new date
      let dayOf = x + this.currentDay.getDay() - 1 + days.length;
      // if the dayOd is more than the list of arrays loop back to the beginning
      if (dayOf >= days.length) {
        dayOf = dayOf % days.length;
      }
      //adding the date to the date element
      date.textContent += days[dayOf];

      //the viewElement contains te bar that all events exist in
      let ViewElement = document.createElement("div");
      //boostrap and styling
      ViewElement.classList.add("progress", "col");
      ViewElement.style.height = "100%";
      let body = document.createElement("div");
      body.classList.add("col-9");

      //addinging the current days dates data to varaibale todat
      let today = this.data[x];
      console.log(this.data);
      // if there is event on that date
      if (today) {
        //convert the database response into the day
        today = this.processWeekDay(today);
        console.log(today);
        ViewElement.style.display = "grid";
        ViewElement.style.gridTemplateColumns = today[1];
        today[0].forEach((el) => {
          let event = document.createElement("div");
          if (el != 0) {
            event.addEventListener("click", function () {
              viewEvent(el.ID);
            });
            //if the event is a study event
            // if (el.Type == "study") {
            //   event.classList.add("bg-warning");
            // }

            //default style is none
            let style = "";
            //switch to define what the type should be
            switch (el.Type) {
              //if the type is study
              case "study":
                style = "warning";
                break;
              //all colour specific cases
              case "blue":
                style = "primary";
                break;
              case "green":
                style = "success";
                break;
              case "red":
                style = "danger";
                break;
              case "yellow":
                style = "warning";
                break;
              case "purple":
                style = "purple";
                break;
              //incase no colour is set
              default:
                style = "secondary";
            }
            event.classList.add("bg-" + style);

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
  updateCurrentDay() {
    if (
      homeScreen.selectedDate == null ||
      homeScreen.selectedDate.constructor != Date
    ) {
      this.currentDay = new Date();
    } else {
      // use selected date
      this.currentDay = homeScreen.selectedDate;
    }
  }
  changeSelectedDate() {
    //update the current date
    this.updateCurrentDay();
    //a for to edit the date
    let form = new FormPopUp(
      "Change Date",
      [
        {
          name: "Date",
          displayName: "Date",
          type: "date",
          placeholder: "--",
          value: this.currentDay.toISOString().split("T")[0],
        },
      ],
      function () {
        homeScreen.selectedDate = new Date(this.formData.Date);
        homeScreen.calendar.show();
        this.hide();
      },
      "Change Selected Date"
    );
    form.show();
  }
}

// CALENDAR FUNCTIONS
const getStartAndEndTimesCalendar = function (data) {
  //empty list to contain the elemnt
  let startAndEnd = [];

  data.forEach((el) => {
    //add the start time and the end time to the list with the data inbetween
    //if the event cuts of an event before, to avoid breakage stop the event before 1 minute before the next one stqaerts
    time = hr_minToMin(el.startTime);
    if (startAndEnd[startAndEnd.length - 1] >= time) {
      startAndEnd[startAndEnd.length - 1] = time - 1;
    }
    startAndEnd.push(time, el);
    startAndEnd.push(hr_minToMin(el.endTime));
  });
  //retunr the l;ist
  return startAndEnd;
};

const createElementOrder = function (data) {
  let last = "number";
  let order = [];
  //go through each element
  data.forEach((el) => {
    //if it was a number
    if (typeof el == "number") {
      //and the last one was a number
      if (last == "number") {
        //then a space should be next
        order.push(0);
      }
      last = "number";
    } else {
      //if it not a number then an event should be there
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
  let fr = ""; // blank ratio

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
      // unless it it the first one then the last should be the the one before
      last = times[x - 1];
    }
    //length of that section
    let length = times[x] - last;
    //get the ratio relative to the length of the day
    let ratio = Math.round((10000 * length) / total);
    //add the ratio
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

          //default style is none
          let style = "";
          //switch to define what the type should be
          switch (el.Type) {
            //if the type is study
            case "study":
              style = "warning";
              break;
            //all colour specific cases
            case "blue":
              style = "primary";
              break;
            case "green":
              style = "success";
              break;
            case "red":
              style = "danger";
              break;
            case "yellow":
              style = "warning";
              break;
            case "purple":
              style = "purple";
              break;
            //incase no colour is set
            default:
              style = "secondary";
          }
          event.classList.add("bg-" + style);
          event.classList.add("progress-bar");
          event.classList.add("text-black");
          event.style.borderRadius = "20px";
          event.textContent = ` ${el.startTime} --> ${el.name} --> ${el.endTime}`;
        }
        event.style.width = "100%";
        ViewElement.append(event);
      });
    }
    //creating a button to change the event
    let changeDateBtn = document.createElement("button");
    //adding button styling and text
    changeDateBtn.classList.add("btn", "btn-primary");
    changeDateBtn.textContent = "Change Date";
    //adding the change event listener
    changeDateBtn.addEventListener("click", this.changeSelectedDate);

    //create text to display the current date
    let crrDate = document.createElement("div");
    crrDate.classList.add("m-2");
    crrDate.textContent = `${this.currentDay.toLocaleDateString("en-EN", {
      weekday: "short",
      day: "numeric",
      month: "short",
    })} `;
    //adding everything into the body of the card
    body.append(changeDateBtn, crrDate, ViewElement);
    dayContainer.append(body);
    card.append(dayContainer);
    this.element.append(card);
  }
}

function calendarDayView() {
  //create an instance of HomeScreenDayView
  homeScreen.calendar = new HomeScreenDayView();
  //assigning the element
  homeScreen.calendar.element = homeScreen.calendarBody;
  homeScreen.calendar.show();
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
  homeScreen.buttonRight.textContent = "Day View";
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
      //if the start time is after the end time
      if (data.StartTime.toMins() >= data.EndTime.toMins()) {
        //the form is invalid
        valid = false;
        //tell the user that there is an issue
        alert("The start time must be before the end time");
      } else {
        console.log(data.StartTime.toMins(), data.EndTime.toMins());
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
    "qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPASDFGHJKLZXCVBNM!£$%&_-+=,.<>#: /@".split(
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
      console.log(striped);
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

  events = getAllEvents();

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

  let refreshButton = createButton("Refresh", "outline-warning");
  refreshButton.addEventListener("click", function () {
    homeScreen.show();
    optionsView.hide();
  });
  refreshButton.textContent = "Refresh";

  //adding buttons to the buttonList
  buttonList.append(logoutButton, toggleDarkModeButton, refreshButton);

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
  send = send.responseJSON;
  for (let x = 0; x < send.length; x++) {
    send[x].totalTime = Number(send[x].totalTime).convertToReadableFormat();
  }
  if (id === false) {
    return send;
  } else {
    return send[0];
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
  //a button for creating a Subject
  let createSubjectButton = createButton("Create Subject", "warning");
  createSubjectButton.addEventListener("click", function () {
    createSubjectForm();
  });
  //add the close button to the footer
  modal.footer(createSubjectButton, modal.closeBtn());
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
  notes.append();
  let listOfNotes = getNotes(data.ID, "subjects");

  listOfNotes.forEach((el) => {
    console.log(el);
    notes.append(convertNoteToHTML(el, viewSubjects));
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
    createNote(data.ID, "subjects", true, false, "", viewSubjects);
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
  titleEL.setAttribute("class", "col-24 h2");
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
  //creating a button to view all of the topics in the subject
  let viewTopicsButton = document.createElement("button");
  viewTopicsButton.classList.add("btn", "btn-primary");
  viewTopicsButton.textContent = "View Topics";
  viewTopicsButton.addEventListener("click", function () {
    viewTopics(data.ID);
  });
  //addning the name of the subject and a button to view all of the topics in the subject
  titleEL.append(displayInfo.name, " ", viewTopicsButton);
  TitleInfoCard.prepend(titleEL);
  modal.title(TitleInfoCard);
  //add the buttons to the footer
  //modal.title("l")
  modal.body(editBTN, notes);
  modal.footer(addNoteBtn, deleteBtn, closeBtn);
  modal.show();
}
function deleteSubject(id) {
  let request = new AjaxTemplate(true);
  request.href = "php/homepage/subjects/deleteSubject.php";
  //login credentials and the subjectID
  request.data = {
    ID: StoredID,
    password: StoredPassword,
    subjectID: id,
  };
  request.send();

  //refresh the homepage to update everything
  homeScreen.show();
}

function editSubject(id) {
  //get the info on the subject
  let info = getSubject(id);
  //create the form with prefilled info
  createSubjectForm(
    info.name,
    "Edit Subject",
    "Save Changes",
    false,
    id,
    false
  );
}



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
      console.log(valid, name, subject);
      if (valid && name !== "" && subject != "") {
        //start request
        let request = new AjaxTemplate(true);
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
        request.send();
        //hideMobile
        this.hide();
        if (pageRefresh) {
          //if there is a page to go back to go to it
          pageRefresh(id);
        }
      }
      //hide the form after submitting
      this.hide();
      homeScreen.show();
    },
    endText
  );

  //show the form
  topicForm.show();
}

function viewTopics(subjectID = false) {
  //if there is a subjectID then then the functions should filter for only that subject
  let subjectSpec = !(subjectID == false);
  //get topic data
  let data = getTopic();
  //create popup
  let modal = new Popup();
  //define the title
  modal.title("View Topics");
  if (subjectSpec) {
    //get the information about the subject
    let subject = getSubject(subjectID);
    //change the title to show the name of the subject
    modal.title(`View Topics for ${subject.name}`);
  }
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
        viewTopic(el, viewTopics(), modal);
      });
      //add the button to the topic list
      TopicList.append(btn);
    }
  });
  //add the topic list into the body
  modal.body(TopicList);

  //a button for creating a Topic
  let createTopicButton = createButton("Create Topic", "warning");
  createTopicButton.addEventListener("click", function () {
    createTopic();
  });
  //add the close button to the footer
  let modalCloseBtn = modal.closeBtn();

  modal.footer(createTopicButton, modalCloseBtn);
  console.log(modal);
  //show the modal
  modal.show();
}
function viewTopic(data, closeFtn = false, modal = new Popup()) {
  //create new modal
  modal = new Popup();
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
    console.log(el);
    notes.append(convertNoteToHTML(el, viewTopics));
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
    createNote(data.ID, "topics", true, false, "", viewTopics);
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
      closeFtn();
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
    false
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

function visit(topicID, visitID = false,onHome = true) {
  console.log(visitID);
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
  console.log(visitValues);
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

      if(onHome){
      homeScreen.show(); // to refresh the homepage
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

function getSearchData() {
  //using each of the relevant function return a
  // dict with all of the different things that needed searching

  return {
    events: getAllEvents(),
    notes: getAllNotes(),
    subjects: getSubject(),
    topics: getTopic(),
  };
}

class Search {
  constructor() {
    // set this.last to be zero so that the program will fetch
    this.last = 0;
    //getting all the data needed to search
    this.getData();
  }
  getData() {
    //getting the current time in milliseconds
    let now = Date.now();
    // if it has been more than ten seconds since the data was fetched
    if (now - this.last > 10000) {
      //fetch the data
      this.data = getSearchData();
      //output the time between fetches to the console
      console.log("Time between ", now - this.last);
      // change the last attribute to be the current time
      this.last = now;

      //create a new empty list
      this.data.eventList = [];
      //for each date
      for (const day in this.data.events) {
        //for each event in that date
        this.data.events[day].forEach((event) => {
          //add the event to the main event
          event.date = event.date.convertDate();
          event.Type = event.Type.toWordCase();
          this.data.eventList.push(event);
        });
      }
      for (const notes in this.data.notes) {
        this.data.notes[notes].date = this.data.notes[notes].date.convertDate();
        this.data.notes[notes].frTable =
          this.data.notes[notes].frTable.toWordCase();
      }
      for (const topic in this.data.topics) {
        this.data.topics[topic].date =
          this.data.topics[topic].date.convertDate();
        this.data.topics[topic].diffrating =
          String(Math.round((this.data.topics[topic].diffrating * 100) / 255)) +
          "%";
      }
      //return the data
      return this.data;
    }
  }
  show() {
    this.getData();
    //create a new popup
    this.popup = new Popup();
    this.popup.element.setAttribute("data-bs-backdrop", "true");
    //set the title to be search
    this.popup.title("Search");

    //other ui elements goes here

    //Creating the search element

    //input data
    let el = {
      type: "text",
      name: "searchInput",
      value: "",
      placeholder: "-",
      displayName: " Search Everything",
    };
    //set the Title for the inputs
    let title = "search";
    //creating the input element
    this.searchElement = createInputElement(el, title);
    //crating the container
    this.searchInputContainer = document.createElement("div");
    this.searchInputContainer.setAttribute("class", "form-floating mt-3 mb-3"); //boostrap classes
    //creating the label
    this.searchLabel = createLabel(el, title);
    //creating the magnifying glass
    let magnifyingGlass = document.createElement("i");
    magnifyingGlass.classList.add("fa-solid", "fa-magnifying-glass");
    //adding the magnifying class to the from odf the label
    this.searchLabel.prepend(magnifyingGlass);
    //adning the label and input to the container
    this.searchInputContainer.append(this.searchElement, this.searchLabel);

    //container to contain all the tables
    this.table = document.createElement("div");
    this.table.classList.add("card");
    this.tableEvents = document.createElement("table");
    this.tableNotes = document.createElement("table");
    this.tableSubjects = document.createElement("table");
    this.tableTopics = document.createElement("table");

    let eventsLabel = document.createElement("div");
    eventsLabel.setAttribute("class", "h3 text-center");
    eventsLabel.textContent = "Events";
    let notesLabel = document.createElement("div");
    notesLabel.setAttribute("class", "h3 text-center");
    notesLabel.textContent = "Notes";
    let subjectLabel = document.createElement("div");
    subjectLabel.setAttribute("class", "h3 text-center");
    subjectLabel.textContent = "Subjects";
    let topicsLabel = document.createElement("div");
    topicsLabel.setAttribute("class", "h3 text-center");
    topicsLabel.textContent = "Topics";

    this.updateTables();
    this.table.append(
      eventsLabel,
      this.tableEvents,
      notesLabel,
      this.tableNotes,
      subjectLabel,
      this.tableSubjects,
      topicsLabel,
      this.tableTopics
    );

    //adding everything to the container
    this.popup.body(this.searchInputContainer, this.table);

    this.popup.footer(this.popup.closeBtn());

    //show the popup
    this.popup.show();
  }

  updateTables() {
    /* 
    •	Events
      o	Name
      o	Type
      o	date
•	Notes
      o	Text
      o	date
      o for 
•	Subjects
      o	name
•	Topics
      o	Name
      o	Date created 
*/

    // the events table
    this.tableEvents = this.createTable(
      ["name", "Type", "date"],
      ["Name", "Type", "Date"],
      this.data.eventList,
      "eventsTable",
      function (data) {
        //call viewEvent with the id
        viewEvent(data.ID);
      }
    );
    // the Notes Table
    this.tableNotes = this.createTable(
      ["text", "date", "frTable", "name"],
      ["Note", "Date", "For", "Name"],
      this.data.notes,
      "notesTable",
      function (data) {
        switch (data.frTable) {
          case "events":
            viewEvent(data.frID);
            break;
          case "subjects":
            viewSubject({ ID: data.frID });
            break;
          case "topics":
            viewTopic({ ID: data.frID });
            break;
        }
      }
    );
    //tje subjects Table
    this.tableSubjects = this.createTable(
      ["name"],
      ["Name"],
      this.data.subjects,
      "subjectsTable",
      function (data) {
        viewSubject({ ID: data.ID });
      }
    );
    //the topics table
    this.tableTopics = this.createTable(
      ["name", "date", "diffrating", "subjectName"],
      ["Name", "Last Visited", "Difficulty", "Subject Name"],
      this.data.topics,
      "topicsTable",
      function (data) {
        viewTopic({ ID: data.ID });
      }
    );

    //when the user enters a something into the search bar
    this.searchElement.addEventListener("keyup", function () {
      //convert the search to lowercase
      let val = this.value.toLowerCase();
      //filter through the events table
      $("#eventsTable tr").filter(function () {
        $(this).toggle(
          // if the search term is found in the content of the row
          // then dont hide it
          $(this).text().toLowerCase().indexOf(val) > -1
        );
      });
      //filter through the notes Table
      $("#notesTable tr").filter(function () {
        $(this).toggle(
          // if the search term is found in the content of the row
          // then dont hide it
          $(this).text().toLowerCase().indexOf(val) > -1
        );
      });
      // filter through the subjects table
      $("#subjectsTable tr").filter(function () {
        $(this).toggle(
          // if the search term is found in the content of the row
          // then dont hide it
          $(this).text().toLowerCase().indexOf(val) > -1
        );
      });
      // filter through thhe topics table
      $("#topicsTable tr").filter(function () {
        $(this).toggle(
          // if the search term is found in the content of the row
          // then dont hide it
          $(this).text().toLowerCase().indexOf(val) > -1
        );
      });
    });
  }

  createTable(columns, display, data, id = "", btn = false) {
    //create a table element
    let tableContainer = document.createElement("div");
    tableContainer.style.maxWidth = "100%";
    tableContainer.style.overflowX = "auto";
    let table = document.createElement("table");
    //add the table classes
    table.classList.add("table", "table-striped");
    //create the tow to contain the headers
    let headerRow = document.createElement("tr");
    let headerThead = document.createElement("thead");

    //add the header text
    display.forEach((header) => {
      let headerElement = document.createElement("th");
      headerElement.textContent = header;
      headerElement.classList.add("text-center");
      headerRow.append(headerElement);
    });
    headerThead.appendChild(headerRow);
    //create an element to contain the elements
    let tableBody = document.createElement("tbody");
    tableBody.setAttribute("id", id);

    //for each row
    for (const rowID in data) {
      //set the row variable
      let row = data[rowID];
      //crete the row element
      let rowElement = document.createElement("tr");

      //for each of the columns needing to be displayed
      for (const col in columns) {
        //get the value from the row
        let val = row[columns[col]];
        //create an element to contain the value
        let bodyElement = document.createElement("td");
        //add the value into the element
        bodyElement.textContent = val;
        //set styling to ensure that the value does not get too long
        bodyElement.style.maxWidth = "20ch";
        bodyElement.style.whiteSpace = "nowrap";
        bodyElement.style.overflow = "hidden";
        bodyElement.style.textOverflow = "ellipsis";
        bodyElement.classList.add("text-center");
        if (col == 0) {
          bodyElement.style.borderRadius = "20px 0px 0px 20px";
        } else if (col == columns.length - 1) {
          bodyElement.style.borderRadius = "0px 20px 20px 0px ";
        }
        if (columns.length == 1) {
          bodyElement.style.borderRadius = "20px 20px 20px 20px ";
        }
        //add the element to the row
        rowElement.append(bodyElement);
        rowElement.style.borderColor = "#00000000";
      }

      //adding an onclick event listerner to the row
      if (btn) {
        rowElement.addEventListener("click", function () {
          btn(row);
        });
      }

      //add  the row to the table body
      tableBody.append(rowElement);
    }

    //add the header and body to the table
    table.append(headerThead, tableBody);
    //return the table
    tableContainer.append(table);
    return tableContainer;
  }
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

function getStudyTotals(data){
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
      year:totalThisYear,
      month:totalThisMonth,
      week:totalPastWeek,
      today:totalToday

    }
}

function studyPage() {
  const modal = new Popup();

  // StudyStatistics
  let timeByDate = timeStudying();


  let totals = getStudyTotals(timeByDate)


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
  let studyNowButton = document.createElement("button")
  studyNowButton.classList.add('btn','btn-primary')
  studyNowButton.textContent = 'STUDY NOW'
  studyNowButton.addEventListener('click',function(){ 
  startStudyMode()
modal.hide()
  })



  //setting the modal Titles , body and footer
  modal.title("Study Page");
  modal.body(dateDisplay);
  let closeBTN = modal.closeBtn();
  modal.footer(studyNowButton," Fun Studying! ", closeBTN);
  modal.show();
}
