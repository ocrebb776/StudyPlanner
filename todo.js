
const Todo = {
    edit(){
        let modal = new Popup()


        this.getList()
        modal.title('To-Do List')

        modal.footer(modal.closeBtn())
        modal.show()
    },
    getToDo(){
        return 'getToDo'
    },
    getList(id = false){
        let request = new AjaxTemplate(false)
        request.href = 'php/homepage/todo/getItem.php'
        request.data = {ID:StoredID,password:StoredPassword,id:id}
        request.dataType = 'json'
        return request.send().responseJSON

    }
}