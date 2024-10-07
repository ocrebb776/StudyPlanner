// concrete class HomeScreen inherits from abstract class Screen
class HomeScreen extends Screen {
  show() {

// CALENDAR
    let calendarWrapper = document.createElement("div");
    let calendarFooter = document.createElement("div");
    let calendarBody = document.createElement("div");
    calendarWrapper.classList.add("card","m-2")
    calendarBody.classList.add("card-body")
    calendarFooter.classList.add("card-footer")

    let calendarFooterWrapper = document.createElement("div")
    calendarFooterWrapper.classList.add("row")
    calendarFooterWrapper.style.width= "100%"
//Calendar Buttons
let buttonLeftWrapper = document.createElement("div")
buttonLeftWrapper.classList.add("col")

let buttonLeft = document.createElement('button');
buttonLeft.setAttribute('id', 'buttonLeft');

buttonLeft.setAttribute('type', 'button');
buttonLeft.setAttribute('class', 'btn btn-primary  w-100');
buttonLeft.textContent = 'Manage';

buttonLeftWrapper.append(buttonLeft)

let buttonMiddleWrapper = document.createElement("div")
buttonMiddleWrapper.classList.add("col")


let buttonMiddle = document.createElement('button');
buttonMiddle.setAttribute('id', 'buttonMiddle');


buttonMiddle.setAttribute('type', 'button');
buttonMiddle.setAttribute('class', 'btn btn-primary w-100');
buttonMiddle.textContent = 'Create';

buttonMiddleWrapper.append(buttonMiddle)

let buttonRightWrapper = document.createElement("div")
buttonRightWrapper.classList.add("col")

let buttonRight = document.createElement('button');
buttonRight.setAttribute('id', 'buttonRight');

buttonRight.setAttribute('type', 'button');
buttonRight.setAttribute('class', 'btn btn-primary w-100');
buttonRight.textContent = 'dayView';


buttonRightWrapper.append(buttonRight)


calendarFooterWrapper.append(buttonLeftWrapper,buttonMiddleWrapper,buttonRightWrapper)
calendarFooter.appendChild(calendarFooterWrapper)
  //Calendar Default View
    this.calendar = new HomeScreenCalendar();
    this.calendar.element = calendarBody;
    this.calendar.show();
    calendarWrapper.append(calendarBody,calendarFooter)
    this.element.append(calendarWrapper);



  }
}

class HomeScreenCalendar extends Screen {
  show() {
    this.calendarColours = {
      Study: "#ed80f2",
    };
    this.ListOfSDays = document.createElement("div");

    this.data = this.GetCalendarData()
    let DayList = this.daysList()
    
  }
  GetCalendarData(){
    let request = new AjaxTemplate(false)
    request.href = "php/homepage/getCalendarInfo.php"
    request.data = {
        ID: StoredID,
        password: StoredPassword,
    };
   

   let result = request.send()
   console.log(result.responseText)
   if(result.status == 200){
    return JSON.parse(result.responseText)
   }else{
    return "there as been a silly little error"
   }
  }
  daysList(){
    let currentDay = new Date()
    
    let days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]
    for(let x =0;x<7;x++){
        let dayContainer =document.createElement("div")
        let card = document.createElement("div")
        card.classList.add("card")
        dayContainer.classList.add("row","card-body")

        let date = document.createElement("div")
        date.classList.add("col")
        if(x == 0){
          date.classList.add("bg-primary")
          
        }else{
          date.classList.add("bg-dark")
          
        }
date.style.borderRadius = "30px"
date.style.height=110%
date.classList.add("text-center","rounded","text-white")


       

        let dayOf = x+currentDay.getDay() -1+days.length
        console.log(dayOf)
        if(dayOf >=days.length){
            dayOf = dayOf % days.length
        }

        date.textContent = days[dayOf]


        let ViewElement = document.createElement("div")
        ViewElement.classList.add("progress","col")
        ViewElement.style.height = "100%"
   let body = document.createElement("div")
   body.classList.add("col-9")
    
      
console.log(this.data)
        let today = this.data[x]

        if(today){
        
        let sortDates = new SortByKey(today,"startTime")
        console.log(today)
            today = sortDates.returnSortedList()
        let startEndTimes = getStartAndEndTimesCalendar(today)
        let elementOrder = createElementOrder(startEndTimes)
        let frs = getRatios(startEndTimes)
        ViewElement.style.display = "grid"
        ViewElement.style.gridTemplateColumns = frs
        //ViewElement.style.gap = "2px"
        console.log(elementOrder)
        elementOrder.forEach(el=>{

            let event = document.createElement("div")
            if(el !=0){
                event.addEventListener("click", function(){alert("LOL")});
                if(el.Type == "study"){
                    event.classList.add("bg-warning")

                }
                event.classList.add("progress-bar")
                event.style.borderRadius = "20px"
            }
            event.style.width = "100%"
            ViewElement.append(event)
        })
        console.log("🚀 ~ daysList ~ elementOrder:", elementOrder)
        console.log(date.textContent)
        
        }
        body.append(ViewElement)
        dayContainer.append(date,body)
        card.append(dayContainer)
        this.element.append(card)
       
    }
    console.log(this.element)

    }

   
  }


// CALENDAR FUCTIONS
const getStartAndEndTimesCalendar = function (data) {
  let startAndEnd = [];

  data.forEach((el) => {
    let time = el.startTime.split(":");
    let hours = Number(time[0]);
    let minuites = Number(time[1]);
    time = hours * 60 + minuites;
    if (startAndEnd[startAndEnd.length - 1] >= time) {
      startAndEnd[startAndEnd.length - 1] = time - 1;
    }
    startAndEnd.push(time, el);
    time = el.endTime.split(":");
    hours = Number(time[0]);
    minuites = Number(time[1]);
    startAndEnd.push(hours * 60 + minuites);
  });
  return startAndEnd;
};

const createElementOrder = function (data) {
  
  let last = "number";
  let order = [];
  data.forEach((el) => {
    if (typeof el == "number") {
      if (last == "number") {
        order.push(0);
      }
      last = "number";
    } else {
      order.push(el);
      last = "string";
    }
  });
  return order;
};

const getRatios = function (data) {
  let last = 0;
  let total = 24 * 60;
  let times = [];
  let fr = "";
  data.forEach((el) => {
    if (typeof el == "number") {
      times.push(el);
    }
  });
  times.push(total);
  for (let x = 0; x < times.length; x++) {
    if (x != 0) {
      last = times[x - 1];
    }
    let length = times[x] - last;
    let ratio = Math.round((100 * length) / total);
    fr += ` ${ratio}fr`;
  }
  return fr;
};
