/**
 * Study Planner Data Retrieval Module
 * This module contains functions for retrieving data from various endpoints
 * of the Study Planner application. It handles events, notes, subjects,
 * topics, and study time data.
 */

/**
 * Retrieves detailed information about a specific calendar event
 * @param {number} id - The ID of the event to retrieve
 * @returns {Object} JSON response containing event details
 */
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

/**
 * Retrieves all calendar events for the current user
 * @returns {Array} JSON array containing all events
 */
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

/**
 * Retrieves all searchable data including events, notes, subjects, topics, and visits
 * Used for global search functionality
 * @returns {Object} Combined object containing all searchable data
 */
function getSearchData() {
  //using each of the relevant function return a
  // dict with all of the different things that needed searching

  return {
    events: getAllEvents(),
    notes: getAllNotes(),
    subjects: getSubject(),
    topics: getTopic(),
    visits: getVisit(),
  };
}

/**
 * Retrieves notes associated with a specific item (event/subject/topic)
 * @param {number} id - ID of the item to get notes for
 * @param {string} table - The table name where the item is stored
 * @returns {Array} JSON array of notes with visit records
 */
function getNotes(id, table) {
  //new synchronous ajax request
  let request = new AjaxTemplate(false);
  request.href = "php/getNotes.php";

  // creating the request data
  request.data = {
    ID: StoredID,
    password: StoredPassword,
    id: id,
    table: table,
  };
  //data type
  request.dataType = "json";
  //send request
  let send = request.send();

  //return the data
  return send.responseJSON;
}

/**
 * Retrieves all notes across all items (events/subjects/topics)
 * @returns {Array} JSON array containing all notes
 */
function getAllNotes() {
  //new synchronous ajax request
  let request = new AjaxTemplate(false);
  request.href = "php/getAllNotes.php";

  // creating the request data
  request.data = {
    ID: StoredID,
    password: StoredPassword,
  };
  //data type
  request.dataType = "json";
  //send request
  let send = request.send();
  //for debugging information

  //return the data
  return send.responseJSON;
}

/**
 * Retrieves subject information, either all subjects or a specific one
 * @param {number|boolean} id - Optional subject ID. If false, returns all subjects
 * @returns {Array|Object} JSON array of all subjects or single subject object
 */
function getSubject(id = false) {
  //send new request
  let request = new AjaxTemplate(false);
  request.href = "php/homepage/subjects/getSubjects.php";
  request.data = {
    ID: StoredID,
    password: StoredPassword,
    id: id,
  };
  //setting the dataType to JSON
  request.dataType = "json";
  //send the request
  let send = request.send();
  //convert the response into a JSON object
  send = send.responseJSON;
  //convert the total time into a readable format
  for (let x = 0; x < send.length; x++) {
    send[x].totalTime = Number(send[x].totalTime).convertToReadableFormat();
  }
  //return the response
  if (id === false) {
    return send;
  } else {
    return send[0];
  }
}

/**
 * Retrieves topic information, either all topics or a specific one
 * @param {number|boolean} id - Optional topic ID. If false, returns all topics
 * @returns {Array|Object} JSON array of all topics or single topic object
 */
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

/**
 * Retrieves visit records for topics
 * @param {number|boolean} id - Optional visit ID or topic ID
 * @param {string} ref - Reference type ("ID" for visit ID lookup)
 * @returns {Array|Object} JSON array of all visits or single visit object
 */
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

/**
 * Retrieves and processes study time statistics
 * Groups study time by day and calculates daily totals
 * @returns {Array} Array of objects containing date and total study time per day
 */
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

