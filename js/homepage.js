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
      let totalTimeSpent = document.createElement("div");
      totalTimeSpent.classList.add("container", "p-2");
      totalTimeSpent.setAttribute("id", "totalTimeSpent");
  
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
      this.totalTimeSpent = document.getElementById("totalTimeSpent");
  
      //get the total time spent studyting
      let totals = getStudyTotals(timeStudying());
      //set the text content to display it
      this.totalTimeSpent.textContent = `Time spent over the past Week:${totals.week.convertToReadableFormat()}`;
  
      //instantiating the search features for later in the program
      search = new Search();
  
      //HomeScreen Calendar Date Attribute, to be used to select a different date
      this.selectedDate = null;
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
      try {
        let result = request.send();
  
        //if it was a success
        if (result.status == 200) {
          return JSON.parse(result.responseText);
        } else {
          console.log(result);
          //if not return false
          return false;
        }
      } catch (e) {
        console.log(e);
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