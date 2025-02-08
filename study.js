


let study 
class Study extends Screen{
    constructor(topics){
        super()
        this.topics = topics
    }
    show(){
        let screen = document.createElement("div")
        screen.style.width = "100vw"
        screen.style.height = "100vh"
        screen.style.background = "#093145"
        screen.style.color = "white"
        screen.textContent = "BLUE"
        this.element.innerHTML = ""
        this.element.append(screen)
    }
    displayTopic(topic){
      //define the data to display
      let dispData = {
        //convert the rating to a percentage
        "Difficulty Rating":String(Math.round(topic.diffrating*100/255))+"%",
        //convert theTimepstamp to the date 
        "Last Visited":topic.date.convertDate(),
        //show the rating 
        "Rating":String(Math.round(100*(topic.rating)))
      }
      //create the button
      let btn = createInfoClickBtn(dispData)
      // create an element to hold the name
      let name = document.createElement("div")
      name.classList.add("h4")
      name.textContent = topic.name
      //add the name to the front of the button
      btn.prepend(name)
      //adding the viewElement event listenrer 
      btn.addEventListener("click",function(){
        viewTopic(topic)
      })
      //return the button
      return btn

    }

}
function startStudying(){
    let topics = TopicAndSubjectSection.prototype.topics()
    study = new Study(topics)
    study.show()

}