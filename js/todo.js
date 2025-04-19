const Todo = {
  show() {
    let modal = new Popup();

    this.getList();
    modal.title("To-Do List");

    let wrapper = document.createElement("div");
    this.getTodoDISP().forEach((el) => {
      wrapper.append(el);
    });

    modal.body(wrapper);
    let addBtn = createButton('+','primary',this.addTodo.bind(this))

    modal.footer(addBtn,modal.closeBtn());
    modal.show();
  },
  getTodoDISP() {
    let list = this.getToDo();

    let converted = list.map((el) => {
      return this.convertTodoToHTML(el);
    });

    return converted;
  },
  convertTodoToHTML(data) {
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
    label.classList.add('col-8','form-check-label');
    label.textContent = data.text;
    label.setAttribute('contenteditable','true')
    let triggerf = (tdata)=>{this.triggerUpdate(tdata,data)}
    label.addEventListener('input',triggerf.bind(this))

    let buttonList = document.createElement("div");
    buttonList.classList.add("col-3");



    //icon DELETE ICON
    deleteBtn = document.createElement("i");
    deleteBtn.classList.add("fa-solid", "fa-trash", "btn", "btn-outline");
    deleteBtn.addEventListener("click", function () {
        this.deleteTodo(data.ID)
      Todo.show()
    }.bind(this));




    buttonList.append( deleteBtn);
    IndicheckButtonWrapper.append(checkButton)
    checkButtonWrapper.append(IndicheckButtonWrapper ,label,buttonList);

    todo.append(checkButtonWrapper);

    return todo;
  },

  getToDo(id = false) {
    let process = function(el){

      delete el.user;
      el.ID = parseInt(el.ID);
      el.completed = el.completed == "1";
      el.created = new Date(el.created);
      el.due = new Date(el.due);

      return el;
    }
    if(id!=false){
    let list = this.getList(id)

        return process(list[0])
    }else{
    let list = this.getList()

    list = list.map((el) => process(el));

        return list
    }
  },
  getList(id = false) {
    let request = new AjaxTemplate(false);
    request.href = "php/homepage/todo/getItem.php";
    request.data = { ID: StoredID, password: StoredPassword, id: id };
    request.dataType = "json";
    return request.send().responseJSON;
  },
  triggerUpdate(triggerData,todoData){

    let newText = triggerData.srcElement.textContent

    let id = todoData.ID

    if(this.trackingInputs.hasOwnProperty(id)){
        clearTimeout(this.trackingInputs[id])
    }
        this.trackingInputs[id] = setTimeout(()=>{this.update(id,newText)},1500)
    


  },
  trackingInputs: {},
  update(id,newText){
    let request = new AjaxTemplate(true)
    request.href = "php/homepage/todo/editItem.php"
    request.data = {ID:StoredID,password :StoredPassword,id:id,text:newText}
    request.send()
  },
  deleteTodo(id){
    let info = this.getToDo(id)
    console.log(id,info)
    let conf = confirm(`Are you sure you want to delete '${info.text}'`)
    if(conf){
        let request = new AjaxTemplate(true)
        request.href = "php/homepage/todo/deleteItem.php"
        request.data = {ID:StoredID,password :StoredPassword,id:id}
        request.send()
    }
  },
  addTodo(){
    let request = new AjaxTemplate(true)
    request.href = "php/homepage/todo/addItem.php"
    request.data = {ID:StoredID,password :StoredPassword}
    request.send()
    this.show()
  },
  complete(id){
    let request = new AjaxTemplate(true)
    request.href = "php/homepage/todo/markAsDone.php"
    request.data = {ID:StoredID,password :StoredPassword,id:id}
    request.send()
  }
};
