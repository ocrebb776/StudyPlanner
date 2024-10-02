
// concrete class HomeScreen inherits from abstract class Screen
class HomeScreen extends Screen {
    show() {

        this.calendarColours = {
            "Study":"#ed80f2"
        }
        this.br = 10// Border radius scalar

        let calendar = document.createElement("div");
        calendar.setAttribute("class","calendar")
        let grid = document.createElement("div") // used to arrage the main grid and the buttons on the side and underneath
        grid.style.margin = "auto" // center the grid within calendar (HORIZONTALY)
        grid.style.display = "grid"
        grid.style.gridTemplateColumns = "1fr 20px"// allow a 20px gap on the right for buttons allowing the rest to fill the space
        grid.style.gridTemplateRows = "1fr 20px" // allow a 20px gap underneath for buttons allowing the rest to fill the space above
        grid.style.width = "90vw"
        grid.style.minHeight = "300px"
        let buttonListVertical = document.createElement("div")
        let buttonListHorizontal = document.createElement("div")
       
        buttonListHorizontal.setAttribute("class","grayBox")
        
        buttonListHorizontal.style.borderRadius = `0px 0px ${this.br}px ${this.br}px`
        buttonListVertical.style.borderRadius = `0px ${this.br}px ${this.br}px 0px`
        buttonListVertical.style.height = "90%"
        buttonListHorizontal.style.width = "90%"
buttonListVertical.style.zIndex = "0"
        buttonListVertical.setAttribute("class","grayBox")

       this.calendarView() // creates the calendar view
            


        grid.append(this.daysList,buttonListVertical,buttonListHorizontal) // adding the elements into the grid
        calendar.appendChild(grid)// adding the grid into the calendar div
        this.element.appendChild(calendar)// Finally adding the calendar into the Body


    }
    calendarView(){
        this.daysList = document.createElement("div") // the list of the days
        this.daysList.setAttribute("class","grayBox daysList") // adding thr classes
        this.daysList.style.zIndex = "1"// so its boxshadow appears onto the buttons and not the other way rounf
        
        this.daysList.style.borderRadius = `${this.br}px 0px ${this.br}px 0px`
        
        let day // the horizontal box
        let date  //the label to the left of the day
        let filler = document.createElement("div") // a empty div uses to fill the space between events
        let ViewElement // the day view element
        let currentDay = new Date() // TODAY!
        let data = {
           "0":[
            {"id":"0000",
                "start":"12:00",
                "end":"15:00",
                "type":"study"
            },{"id":"0001",
                "start":"14:00",
                "end":"15:00",
                "type":"study"
            }],
            "2":[
            {"id":"0001",
                "start":"14:00",
                "end":"15:00",
                "type":"study"
            }
            ]
        }
        let dayOf // day of the week
        let days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]
        for(let x =0;x<7;x++){
            console.log(x)
            day = document.createElement("div") // create day DIV
            day.setAttribute("class","day") // assiging the calss
            date = document.createElement("div")// creating the element to shoe the day
            date.setAttribute("class","date") // adding the class
            dayOf = x+currentDay.getDay()-1 // getting the day of the week in relation to moday
            if(dayOf >= days.length){
                dayOf-=days.length // if the day of the week raps aroud to become larger than the list, it wraps it back round to the start of the list
            }
            date.textContent = days[dayOf] // getting the day of the week trxt
            ViewElement = document.createElement("div") // creating the view element
            ViewElement.style.width = "100%"
            let today = data[String(x)]
            filler = []
            if(today){
                let sortDates = new SortByKey(today,"start")
                today = sortDates.returnSortedList()
            let startEndTimes = getStartAndEndTimesCalendar(today)
            let elementOrder = createElementOrder(startEndTimes)
            console.log("🚀 ~ HomeScreen ~ calendarView ~ elementOrder:", elementOrder)
            let frs = getRatios(startEndTimes)
            ViewElement.style.display = "grid"
            ViewElement.style.gridTemplateColumns = frs
            //ViewElement.style.gap = "2px"
            elementOrder.forEach(el=>{
                let event = document.createElement("div")
                if(typeof(el) == "string"){
                    event.addEventListener("click", function(){alert("LOL")});
                    event.style.backgroundColor = this.calendarColours["Study"]
                    event.style.borderRadius = this.br + "px"
                }
                ViewElement.append(event)
            })
        }

         




            day.append(date,ViewElement)
            
            this.daysList.append(day)

        }
    
}}


// CALENDAR FUCTIONS
const getStartAndEndTimesCalendar = function(data){
    let startAndEnd = []
    data.forEach(el => {


        let time = el.start.split(":")
        let hours = Number(time[0])
        let minuites = Number(time[1])
        time = hours*60+minuites
        if(startAndEnd[startAndEnd.length -1] >=time){
            startAndEnd[startAndEnd.length -1] = time-1
        }
        startAndEnd.push(time,el.id)
        time = el.end.split(":")
        hours = Number(time[0])
        minuites = Number(time[1])
        startAndEnd.push(hours*60+minuites)
    });
    return startAndEnd
}
const createElementOrder = function(data){
    let last = "number"
    let order = []
    data.forEach(el=>{
        if(typeof(el) == "number"){
            if(last=="number"){
                order.push(0)
            }
            last = "number"
        }else{
            order.push(el)
            last = "string"

        }
        
    })
    return order
}

const getRatios = function(data){
    let last = 0
    let total = 24*60
    let times = []
    let fr = ""
    data.forEach(el=>{
        if(typeof(el)=="number"){
            times.push(el)
        }
    })
    times.push(total)
   for(let x =0;x<times.length;x++){
    if(x != 0){
        last = times[x-1]
    }
    let length = times[x]-last
    let ratio = Math.round(100*length/total)
    fr+= ` ${ratio}fr`
  
   
}
return fr

    
}
