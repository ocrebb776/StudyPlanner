
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
    //for debugging information
    console.log(send.responseJSON);
  
    //return the data
    return send.responseJSON;
  }
  function convertNoteToHTML(data, pageRefresh) {
    console.log(data);
    //creating the container
    let container = document.createElement("div");
    // bootstrap classes
    container.classList.add("row", "g-1", "m-2");
    //card containing the text
    let card = document.createElement("textarea");
    //bootstrap classes
    card.classList.add("card", "p-2", "col-8");

    let minRows = (data.text.split('\n').length+2)
    card.style.minHeight = `${minRows}em`
    //adding the notes content to the text content
    card.textContent = data.text;
    card.setAttribute("readonly", "");
    card.style.resize = "none";
  
    //find all of the links in the text using the linkify plugin
    let links = linkify.find(data.text);
  
    let linkElement = document.createElement("div");
    linkElement.classList.add("col-8");
    //for each link
    links.forEach((el) => {
      //create a link element
      let link = document.createElement("a");
      //bootstrap classes
      link.classList.add("btn", "btn-outline", "btn-primary");
      link.setAttribute("href", el.href);
      //set the button text to be the link
      link.textContent = el.href;
      link.style.maxWidth = "20ch";
      link.style.whiteSpace = "nowrap";
      link.style.overflow = "hidden";
      link.style.textOverflow = "ellipsis";
      
      linkElement.append(link);
    });
    
  
    //container containing the buttons
    let buttonList = document.createElement("div");
    buttonList.classList.add("col-4");
    //default values 
    let deleteBtn = ''
    let edit = ''
  
    //if the note is actually a note 
    if ((data.frTable != "aVisit")) {
    //icon EDIT ICON
    edit = document.createElement("i");
    edit.classList.add("fa-solid", "fa-pen-to-square", "btn", "btn-outline");
    
    //adding an event listener to the edit button
      edit.addEventListener("click", function () {
        //show a form to edit the note
        createNote(
          data.frID,
          data.frTable,
          (newNote = false),
          (noteID = data.ID),
          (oldNote = data.text),
          pageRefresh,
          data
        );
      });
    
  
    //icon DELETE ICON
    deleteBtn = document.createElement("i");
    deleteBtn.classList.add("fa-solid", "fa-trash", "btn", "btn-outline");
    deleteBtn.addEventListener("click", function () {
      console.log(pageRefresh);
      //pageRefresh reloads that part of the page to update it without the note
      deleteNote(data, pageRefresh);
    });
  
  }else{
  
    //calculating the percentage difficulty from the diffracting vale
    let diffRating = Math.round(100*data.diffrating/255)
    //making the current card into another variable called text 
    let text = card
    //creating a new element to contain everything 
    card = document.createElement("div");
  
    //making sure the bootstrap classes are correct to make the look consistent 
    text.classList.remove("col-8");
    card.classList.add("card", "p-2", "col-8");
  
    //creating a progress bar to show the difficulty rating
    let progress = document.createElement("div");
    progress.classList.add("progress",'m-2');
    let progressBar = document.createElement("div");
    progressBar.classList.add("progress-bar");
    progressBar.setAttribute("role", "progressbar");
    progressBar.setAttribute("style", `width: ${diffRating}%`);
    progress.append(progressBar);
    //adding everything to the card
    let time = String(Math.floor(data.time/60) + "h" + data.time%60 + "m")
    card.append(data.type +" - " + diffRating+"%" +" - " + time,progress,text)
  
    edit = document.createElement("i");
    edit.classList.add("fa-solid", "fa-pen-to-square", "btn", "btn-outline");
    edit.addEventListener("click", function () {
      visit(data.frID,data.ID)
    })
      //icon DELETE ICON
      deleteBtn = document.createElement("i");
      deleteBtn.classList.add("fa-solid", "fa-trash", "btn", "btn-outline");
      deleteBtn.addEventListener("click", function () {
        //pageRefresh reloads that part of the page to update it without the note
        deleteVisit(data.ID);
        homeScreen.show();
        CURRENTPOPUPOBJECT.hide()
      });
    
  }
    //display the timestamp when created
    let timeStamp = document.createElement("div");
    timeStamp.textContent = data.date;
  
    
  
    //adding icons to the button list
    buttonList.append(deleteBtn, edit, timeStamp);
    //adding the cards to the buttonList
    container.append(card, buttonList,linkElement);
    return container;
  }
  
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
      [
        {
          name: "note",
          displayName: "Note",
          type: "textarea",
          placeholder: "-",
          value: oldNote,
          height: "300px",
          other: [
            ["contenteditable", ""],
          ]
        
        },
      ],
      function () {
        //get note info
        let note = this.formData.note;
  
        //whitelist note
        let whNote = whiteList(note, true);
        let valid;
        if (whNote === true) {
          //if note is valid
          valid = true;
        } else {
          //if it is not valid
          valid = false;
          //tell user that the characters are not allowed
          txt = `These characters are not allowed \n• ${whNote.join("\n• ")}`;
          //alert this to the user
          alert(txt);
        }
        if (valid && note !== "") {
          //start request
          let request = new AjaxTemplate(true);
  
          //creating data about the note
          let data = {};
          data.note = note;
          data.frTable = table;
          data.frID = id;
          //send the request to different files depending of if it is a new event or an older event
          if (newNote) {
            request.href = "php/createNote.php";
          } else {
            request.href = "php/editNote.php";
            //the id is used to find the note in the database
            data.id = noteID;
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
      newNote ? "Add Note" : "Save Changes"
    );
    noteForm.show();
  }
  
  function deleteNote(note, pageRefresh = false) {
    //check the input is valid
    if(note.ID == undefined || note.frID == undefined){
      return
    }
    //start request
    let request = new AjaxTemplate(true);
    request.href = "php/deleteNote.php";
    request.data = {
      // login details necessary for the php file
      ID: StoredID,
      password: StoredPassword,
      id: note.ID,
    };
    request.send();
    console.log();
    //go refresh the page
    pageRefresh(note.frID);
  }
  
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
    console.log(send.responseJSON);
  
    //return the data
    return send.responseJSON;
  }
