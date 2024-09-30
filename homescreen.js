
// concrete class HomeScreen inherits from abstract class Screen
class HomeScreen extends Screen {
    show() {
        let calendar = document.createElement("div");
        calendar.setAttribute("class","calendar")
        let grid = document.createElement("div")
        grid.style.display = "grid"
        grid.style.gridTemplateColumns = "1fr 20px"
        grid.style.gridTemplateRows = "1fr 20px"
        grid.style.width = "90vw"
        grid.style.minHeight = "300px"
        let buttonListVertical = document.createElement("div")
        let buttonListHorizontal = document.createElement("div")
        let daysList = document.createElement("div")
        buttonListHorizontal.setAttribute("class","grayBox")
        let br = 10
        buttonListHorizontal.style.borderRadius = `0px 0px ${br}px ${br}px`
        buttonListVertical.style.borderRadius = `0px ${br}px ${br}px 0px`
        buttonListVertical.style.height = "90%"
        buttonListHorizontal.style.width = "90%"

        buttonListVertical.setAttribute("class","grayBox")

        daysList.setAttribute("class","grayBox")
        daysList.style.zIndex = "1"
        buttonListVertical.style.zIndex = "0"
        daysList.style.borderRadius = `${br}px 0px ${br}px 0px`

        grid.append(daysList,buttonListVertical,buttonListHorizontal)
        calendar.appendChild(grid)
        this.element.appendChild(calendar)


    }
}
