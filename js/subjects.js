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
        viewSubject(el, viewSubjects, modal);
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
  function viewSubject(id, closeFtn = false, modal = new Popup()) {
    let data
    if(typeof id == "number" || typeof id == "string"){
      data = {ID:id}
    }else{
      data = id
    }
    //create new modal
    modal = new Popup();
    //get information about the request
    let subjectInfo = getSubject(Number(data.ID));
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
      notes.append(convertNoteToHTML(el, viewSubject));
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
      createNote(data.ID, "subjects", true, false, "", viewSubject);
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
    viewTopicsButton.textContent = "View Topics(fullScreen)";
    viewTopicsButton.addEventListener("click", function () {
      viewTopics(data.ID);
    });

//showing all of the topics 

let TopicList = viewTopics(data.ID,false,viewSubject)


    //addning the name of the subject and a button to view all of the topics in the subject
    titleEL.append(displayInfo.name, " ", viewTopicsButton);
    TitleInfoCard.prepend(titleEL);
    modal.title(TitleInfoCard);
    //add the buttons to the footer
    //modal.title("l")
    modal.body('Topics',TopicList,'Notes',notes);
    modal.footer(editBTN,addNoteBtn, deleteBtn, closeBtn);
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