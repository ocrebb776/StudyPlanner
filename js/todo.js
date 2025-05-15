const Todo = {
  show(disp =true) {


    let wrapper = document.createElement("div");
    this.getTodoDISP(disp).forEach((el) => {
      wrapper.append(el);
    });

    let addBtn = createButton('+','primary',this.addTodo.bind(this))

    if(disp){
    let modal = new Popup();
    modal.title("To-Do List");
    modal.body(wrapper);
    modal.footer(addBtn,modal.closeBtn());
    modal.show();
  }else{
    return wrapper
  }
  },
  getTodoDISP(disp=true) {
    let list = this.getToDo();

    let converted = list.map((el) => {
      return this.convertTodoToHTML(el,disp);
    });

    return converted;
  },
  convertTodoToHTML(data,disp=true) {
    let todo = document.createElement("div");
    todo.classList.add("card",'p-2');
    let checkButtonWrapper = document.createElement("div");
    checkButtonWrapper.classList.add("row");

    let IndicheckButtonWrapper = document.createElement('div')
    IndicheckButtonWrapper.classList.add('col-1')

    let checkButton = document.createElement("input");
    checkButton.setAttribute("type", "checkbox");
    checkButton.classList.add("form-check-input");
    checkButton.setAttribute("id", `${data.ID}--todoList`);
    checkButton.addEventListener('click',(()=>this.complete(data.ID)).bind(this))
    if(data.completed){
      checkButton.setAttribute('checked','')
    }

    let label = document.createElement("label");
    label.classList.add('col-6','form-check-label');
    label.textContent = data.text;
    label.setAttribute('contenteditable','true')
    let triggerf = (tdata)=>{this.triggerUpdate(tdata,data)}
    label.addEventListener('input',triggerf.bind(this))

    let due = document.createElement("input")
    due.classList.add('col-4')
    due.value = (data.due.getTime() < 100) ? "" : data.oldDue.replace(" ","T")
    due.setAttribute('placeholder','Due Date')
    due.setAttribute('type','datetime-local')
    due.addEventListener('input',(tdata)=>{
      this.updateDueDate(data.ID,tdata.target.value)
      tdata.target.value
      let now = new Date()
      let Ndue = new Date(tdata.target.value)
    if(Ndue.getTime() < now.getTime()){
      tdata.target.style.borderColor = 'red'
    }else{{
      tdata.target.style.borderColor = ''
    }}
    })
    let now = new Date()
    if(data.oldDue != null){
    if(data.due.getTime() < now.getTime()){
      due.style.borderColor = 'red'
    }
  }
    

    let buttonList = document.createElement("div");
    buttonList.classList.add("col-1");






    //icon DELETE ICON
    deleteBtn = document.createElement("i");
    deleteBtn.classList.add("fa-solid", "fa-trash", "btn", "btn-outline");
    deleteBtn.addEventListener("click", function () {
        this.deleteTodo(data.ID)
      Todo.show()
    }.bind(this));



    if(disp){

    buttonList.append( deleteBtn);
  }
    IndicheckButtonWrapper.append(checkButton)
    checkButtonWrapper.append(IndicheckButtonWrapper ,label,due,buttonList);

    todo.append(checkButtonWrapper);

    return todo;
  },

  getToDo(id = false) {
    let process = function(el){

      delete el.user;
      el.ID = parseInt(el.ID);
      el.completed = el.completed == "1";
      el.created = new Date(el.created);
      el.oldDue = el.due
      el.due = new Date(el.due);

      return el;
    }
    if(id!=false){
    let list = this.getList(id)

        return process(list[0])
    }else{
    let list = this.getList()

    list = list.map((el) => process(el));
    list.sort(function(a, b) { 
      let diff = a.completed - b.completed
      if(diff==0){
        diff = a.due.getTime() - b.due.getTime(
          
        )
        console.log(diff)
      }
      return diff;
  })
  console.log(list)
        return list


    }
  },
  getList(id = false) {
    return jsonRequest("php/homepage/todo/getItem.php", { id: id });
  },
  triggerUpdate(triggerData,todoData){

    let newText = triggerData.target.textContent

    let id = todoData.ID

    if(this.trackingInputs.hasOwnProperty(id)){
        clearTimeout(this.trackingInputs[id])
    }
        this.trackingInputs[id] = setTimeout(()=>{this.update(id,newText)},1000)
    


  },
  trackingInputs: {},
  update(id,newText){
    return jsonRequest("php/homepage/todo/editItem.php", {
      id: id,
      text: newText
    },true);
  },
  deleteTodo(id){
    let info = this.getToDo(id)
    console.log(id,info)
    let conf = confirm(`Are you sure you want to delete '${info.text}'`)
    if(conf){
      return jsonRequest("php/homepage/todo/deleteItem.php", { id: id });
    }
  },
  addTodo(){
    jsonRequest("php/homepage/todo/addItem.php");
    this.show();
  },
  complete(id){
    return jsonRequest("php/homepage/todo/markAsDone.php", { id: id });
  },
  updateDueDate(id,newDate){
    newDate = newDate.replace('T',' ')
    return jsonRequest("php/homepage/todo/updateTodoDate.php", {
      id: id,
      newDate: newDate
    });
  }
};
