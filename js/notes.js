/**
 * Study Planner Notes Module
 * This module handles the creation, display, editing, and deletion of notes
 * throughout the application. It supports both regular notes and visit records
 * with different display and interaction patterns.
 */

/**
 * Converts a note object into an HTML element for display
 * @param {Object} data - The note data object containing text, metadata, and relationships
 * @param {Function} pageRefresh - Callback function to refresh the page after note operations
 * @returns {HTMLElement} Container element with the formatted note and controls
 */
function convertNoteToHTML(data, pageRefresh) {
  // Create main container with Bootstrap grid layout
  let container = document.createElement("div");
  container.classList.add("row", "g-1", "m-2");

  // Create textarea for note content
  let card = document.createElement("textarea");
  card.classList.add("card", "p-2", "col-8");

  // Set minimum height based on content lines
  let minRows = (data.text.split('\n').length + 2);
  card.style.minHeight = `${minRows}em`;
  card.textContent = data.text;
  card.setAttribute("readonly", "");
  card.style.resize = "none";

  // Process and display URLs found in the note
  let links = linkify.find(data.text);
  let linkElement = document.createElement("div");
  linkElement.classList.add("col-8");

  // Create clickable links with truncated display
  links.forEach((el) => {
    let link = document.createElement("a");
    link.classList.add("btn", "btn-outline", "btn-primary");
    link.setAttribute("href", el.href);
    link.textContent = el.href;
    link.style.maxWidth = "20ch";
    link.style.whiteSpace = "nowrap";
    link.style.overflow = "hidden";
    link.style.textOverflow = "ellipsis";
    linkElement.append(link);
  });

  // Create container for action buttons
  let buttonList = document.createElement("div");
  buttonList.classList.add("col-4");
  let deleteBtn = '';
  let edit = '';

  // Handle regular notes vs visit records differently
  if (data.frTable != "aVisit") {
    // Regular note controls
    edit = document.createElement("i");
    edit.classList.add("fa-solid", "fa-pen-to-square", "btn", "btn-outline");
    edit.addEventListener("click", function () {
      createNote(
        data.frID,
        data.frTable,
        false,
        data.ID,
        data.text,
        pageRefresh,
        data
      );
    });

    deleteBtn = document.createElement("i");
    deleteBtn.classList.add("fa-solid", "fa-trash", "btn", "btn-outline");
    deleteBtn.addEventListener("click", function () {
      deleteNote(data, pageRefresh);
    });
  } else {
    // Visit record display and controls
    let diffRating = Math.round(100 * data.diffrating / 255);
    let text = card;
    card = document.createElement("div");

    text.classList.remove("col-8");
    card.classList.add("card", "p-2", "col-8");

    // Create difficulty rating progress bar
    let progress = document.createElement("div");
    progress.classList.add("progress", 'm-2');
    let progressBar = document.createElement("div");
    progressBar.classList.add("progress-bar");
    progressBar.setAttribute("role", "progressbar");
    progressBar.setAttribute("style", `width: ${diffRating}%`);
    progress.append(progressBar);

    // Format and display visit duration
    let time = String(Math.floor(data.time/60) + "h" + data.time%60 + "m");
    card.append(data.type + " - " + diffRating + "%" + " - " + time, progress, text);

    // Visit record controls
    edit = document.createElement("i");
    edit.classList.add("fa-solid", "fa-pen-to-square", "btn", "btn-outline");
    edit.addEventListener("click", function () {
      visit(data.frID, data.ID);
    });

    deleteBtn = document.createElement("i");
    deleteBtn.classList.add("fa-solid", "fa-trash", "btn", "btn-outline");
    deleteBtn.addEventListener("click", function () {
      deleteVisit(data.ID);
      homeScreen.show();
      CURRENTPOPUPOBJECT.hide();
    });
  }

  // Add timestamp
  let timeStamp = document.createElement("div");
  timeStamp.textContent = data.date;

  // Assemble final layout
  buttonList.append(deleteBtn, edit, timeStamp);
  container.append(card, buttonList, linkElement);
  return container;
}

/**
 * Creates or edits a note using a popup form
 * @param {number} id - ID of the parent item (event/subject/topic)
 * @param {string} table - Table name where the note belongs
 * @param {boolean} newNote - Whether this is a new note (true) or edit (false)
 * @param {number|boolean} noteID - ID of the note when editing, false for new notes
 * @param {string} oldNote - Previous note content when editing
 * @param {Function} pageRefresh - Callback to refresh the page after save
 */
function createNote(
  id,
  table,
  newNote = true,
  noteID = false,
  oldNote = "",
  pageRefresh
) {
  noteForm = new FormPopUp(
    newNote ? "Add Note" : "Edit Note",
    [{
      name: "note",
      displayName: "Note",
      type: "textarea",
      placeholder: "-",
      value: oldNote,
      height: "300px",
      other: [["contenteditable", ""]]
    }],
    function () {
      let note = this.formData.note;

      // Validate note content
      let whNote = whiteList(note, true);
      let valid;
      if (whNote === true) {
        valid = true;
      } else {
        valid = false;
        let txt = `These characters are not allowed \n• ${whNote.join("\n• ")}`;
        alert(txt);
      }

      if (valid && note !== "") {
        // Prepare and send request
        let request = new AjaxTemplate(true);
        let data = {
          note: note,
          frTable: table,
          frID: id
        };

        if (newNote) {
          request.href = "php/createNote.php";
        } else {
          request.href = "php/editNote.php";
          data.id = noteID;
        }

        request.data = {
          ID: StoredID,
          password: StoredPassword,
          data: data,
        };

        request.send();
        request.ajaxSuccess = ((data) => {
          this.hide();
          if (pageRefresh) {
            pageRefresh({ID: id});
          }
        }).bind(this);
      }
    },
    newNote ? "Add Note" : "Save Changes"
  );
  noteForm.show();
}

/**
 * Deletes a note from the database
 * @param {Object} note - Note object containing ID and parent ID
 * @param {Function} pageRefresh - Callback to refresh the page after deletion
 */
function deleteNote(note, pageRefresh = false) {
  if (note.ID == undefined || note.frID == undefined) {
    return;
  }

  let request = new AjaxTemplate(true);
  request.href = "php/deleteNote.php";
  request.data = {
    ID: StoredID,
    password: StoredPassword,
    id: note.ID,
  };
  request.send();

  if (pageRefresh) {
    pageRefresh(note.frID);
  }
}
