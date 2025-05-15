/**
 * Study Planner Todo Module
 * This module provides functionality for managing a todo list with due dates,
 * completion status, and real-time updates. It's implemented as a singleton
 * object with methods for CRUD operations and UI management.
 */

const Todo = {
  /**
   * Displays the todo list either in a modal or as a DOM element
   * @param {boolean} disp - Whether to display in modal (true) or return element (false)
   * @returns {HTMLElement|undefined} Todo list element if disp is false
   */
  show(disp = true) {
    let wrapper = document.createElement("div");
    this.getTodoDISP(disp).forEach((el) => {
      wrapper.append(el);
    });

    let addBtn = createButton('+', 'primary', this.addTodo.bind(this));

    if (disp) {
      let modal = new Popup();
      modal.title("To-Do List");
      modal.body(wrapper);
      modal.footer(addBtn, modal.closeBtn());
      modal.show();
    } else {
      return wrapper;
    }
  },

  /**
   * Retrieves and converts todo items to HTML elements
   * @param {boolean} disp - Whether items are for modal display
   * @returns {Array<HTMLElement>} Array of todo item elements
   */
  getTodoDISP(disp = true) {
    let list = this.getToDo();
    return list.map((el) => this.convertTodoToHTML(el, disp));
  },

  /**
   * Converts a todo item into an HTML element
   * @param {Object} data - Todo item data
   * @param {boolean} disp - Whether the item is for modal display
   * @returns {HTMLElement} Todo item card element
   */
  convertTodoToHTML(data, disp = true) {
    let todo = document.createElement("div");
    todo.classList.add("card", 'p-2');
    
    // Create checkbox wrapper
    let checkButtonWrapper = document.createElement("div");
    checkButtonWrapper.classList.add("row");

    let IndicheckButtonWrapper = document.createElement('div');
    IndicheckButtonWrapper.classList.add('col-1');

    // Create completion checkbox
    let checkButton = document.createElement("input");
    checkButton.setAttribute("type", "checkbox");
    checkButton.classList.add("form-check-input");
    checkButton.setAttribute("id", `${data.ID}--todoList`);
    checkButton.addEventListener('click', (() => this.complete(data.ID)).bind(this));
    if (data.completed) {
      checkButton.setAttribute('checked', '');
    }

    // Create editable text label
    let label = document.createElement("label");
    label.classList.add('col-6', 'form-check-label');
    label.textContent = data.text;
    label.setAttribute('contenteditable', 'true');
    let triggerf = (tdata) => { this.triggerUpdate(tdata, data) };
    label.addEventListener('input', triggerf.bind(this));

    // Create due date input
    let due = document.createElement("input");
    due.classList.add('col-4');
    due.value = (data.due.getTime() < 100) ? "" : data.oldDue.replace(" ", "T");
    due.setAttribute('placeholder', 'Due Date');
    due.setAttribute('type', 'datetime-local');
    due.addEventListener('input', (tdata) => {
      this.updateDueDate(data.ID, tdata.target.value);
      let now = new Date();
      let Ndue = new Date(tdata.target.value);
      due.style.borderColor = (Ndue.getTime() < now.getTime()) ? 'red' : '';
    });

    // Set border color for overdue items
    let now = new Date();
    if (data.oldDue != null && data.due.getTime() < now.getTime()) {
      due.style.borderColor = 'red';
    }

    // Create button container
    let buttonList = document.createElement("div");
    buttonList.classList.add("col-1");

    // Create delete button
    let deleteBtn = document.createElement("i");
    deleteBtn.classList.add("fa-solid", "fa-trash", "btn", "btn-outline");
    deleteBtn.addEventListener("click", function () {
      this.deleteTodo(data.ID);
      Todo.show();
    }.bind(this));

    if (disp) {
      buttonList.append(deleteBtn);
    }

    // Assemble todo item layout
    IndicheckButtonWrapper.append(checkButton);
    checkButtonWrapper.append(IndicheckButtonWrapper, label, due, buttonList);
    todo.append(checkButtonWrapper);

    return todo;
  },

  /**
   * Retrieves todo items from the server
   * @param {number|boolean} id - Optional ID to retrieve specific item
   * @returns {Array|Object} Array of todo items or single item
   */
  getToDo(id = false) {
    let process = function(el) {
      delete el.user;
      el.ID = parseInt(el.ID);
      el.completed = el.completed == "1";
      el.created = new Date(el.created);
      el.oldDue = el.due;
      el.due = new Date(el.due);
      return el;
    };

    if (id !== false) {
      let list = this.getList(id);
      return process(list[0]);
    } else {
      let list = this.getList();
      list = list.map((el) => process(el));
      
      // Sort by completion status then due date
      list.sort(function(a, b) {
        let diff = a.completed - b.completed;
        if (diff == 0) {
          diff = a.due.getTime() - b.due.getTime();
        }
        return diff;
      });
      
      return list;
    }
  },

  /**
   * Makes API request to get todo items
   * @param {number|boolean} id - Optional ID to retrieve specific item
   * @returns {Array|Object} Raw todo data from server
   */
  getList(id = false) {
    let request = new AjaxTemplate(false);
    request.href = "php/homepage/todo/getItem.php";
    request.data = { ID: StoredID, password: StoredPassword, id: id };
    request.dataType = "json";
    return request.send().responseJSON;
  },

  /**
   * Debounces text updates to reduce server requests
   * @param {Event} triggerData - Input event data
   * @param {Object} todoData - Todo item data
   */
  triggerUpdate(triggerData, todoData) {
    let newText = triggerData.target.textContent;
    let id = todoData.ID;

    if (this.trackingInputs.hasOwnProperty(id)) {
      clearTimeout(this.trackingInputs[id]);
    }
    this.trackingInputs[id] = setTimeout(() => { this.update(id, newText) }, 1000);
  },

  /** Storage for debounce timeouts */
  trackingInputs: {},

  /**
   * Updates todo item text on server
   * @param {number} id - Todo item ID
   * @param {string} newText - Updated text content
   */
  update(id, newText) {
    let request = new AjaxTemplate(true);
    request.href = "php/homepage/todo/editItem.php";
    request.data = { ID: StoredID, password: StoredPassword, id: id, text: newText };
    request.send();
  },

  /**
   * Deletes a todo item
   * @param {number} id - ID of todo item to delete
   */
  deleteTodo(id) {
    let request = new AjaxTemplate(true);
    request.href = "php/homepage/todo/deleteItem.php";
    request.data = { ID: StoredID, password: StoredPassword, id: id };
    request.send();
  },

  /**
   * Opens form to add new todo item
   */
  addTodo() {
    let form = new FormPopUp(
      "Add Todo",
      [{ name: "text", displayName: "Todo", type: "text", placeholder: "-" }],
      function () {
        let request = new AjaxTemplate(true);
        request.href = "php/homepage/todo/addItem.php";
        request.data = { ID: StoredID, password: StoredPassword, text: this.formData.text };
        request.send();
        this.hide();
        Todo.show();
      }
    );
    form.show();
  },

  /**
   * Toggles completion status of todo item
   * @param {number} id - Todo item ID
   */
  complete(id) {
    let request = new AjaxTemplate(true);
    request.href = "php/homepage/todo/markAsDone.php";
    request.data = { ID: StoredID, password: StoredPassword, id: id };
    request.send();
  },

  /**
   * Updates due date of todo item
   * @param {number} id - Todo item ID
   * @param {string} newDate - New due date
   */
  updateDueDate(id, newDate) {
    let request = new AjaxTemplate(true);
    request.href = "php/homepage/todo/updateTodoDate.php";
    request.data = { ID: StoredID, password: StoredPassword, id: id, newDate: newDate };
    request.send();
  }
};
