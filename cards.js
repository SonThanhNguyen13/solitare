var cols = document.getElementsByClassName('col')
var dragItem = null
var dragCardValue = null
var point = 0

var items = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
]
var mess = null

function addEventToCard() {
    let dragItems = document.getElementsByClassName("drag")
    for (let i of dragItems) {
        i.addEventListener('dragstart', dragStart)
        i.addEventListener('dragend', dragEnd)
    }
}

function dragStart(event) {
    // stop event to father div
    event.stopPropagation()
    // get all div child of drag div
    let divChild = this.querySelectorAll("div")
    // get value
    let oldValue = this.className.split(" ")[1]
    for (let i = 0; i < divChild.length; i++) {
        // get div child value
        let currentValue = divChild[i].className.split(" ")[1]
        // if father value - child value != 1, stop drag
        if (!checkBiggerByOne(oldValue, currentValue)) {
            return
        }
        oldValue = currentValue
    }
    dragItem = this
    dragCardValue = this.className.split(" ")[1]
    setTimeout(() => this.style.display = "none", 0);
}

function dragEnd() {
    setTimeout(() => this.style.display = "block", 0);
    dragItem = null
}

function checkBiggerByOne(currentCardValue, checkCardValue) {
    if (currentCardValue - checkCardValue == 1) {
        return true
    }
    return false
}

function Drop() {
    // get all div child in column
    let colItemList = this.querySelectorAll("div")
    // if no div in col, append
    if (colItemList.length == 0) {
        dragItem.style.top = "0px"
        this.append(dragItem)
    }
    else {
        // else, check last child value
        let currentCardValue = colItemList[colItemList.length - 1].className.split(" ")[1]
        // if bigger than one, append to last div
        if (checkBiggerByOne(currentCardValue, dragCardValue)) {
            dragItem.style.position = "absolute"
            dragItem.style.top = "50px"
            colItemList[colItemList.length - 1].append(dragItem)
            dragCardValue = null
        }
    }
    addPoint()
    checkBiggerByOneWin()
}

function dragOver(e) {
    e.preventDefault()
}

function dragEnter(e) {
    e.preventDefault()
}

function dragLeave(e) {
    e.preventDefault()
}

function randomCard() {
    let card = items[Math.floor(Math.random() * items.length)]
    // delete value randomed in item
    let indexInItems = items.indexOf(card)
    items.splice(indexInItems, 1)
    // new Div
    let newDiv = document.createElement("div")
    let img = document.createElement("img")
    img.src = `cards-images/${card}S.png`
    img.width = 150
    img.height = 210
    newDiv.draggable = "true"
    newDiv.className = `drag ${card}`
    newDiv.appendChild(img)
    newDiv.style.position = "absolute"
    return newDiv
}

function addCards() {
    if (items.length > 0) {
        for (let j = 0; j < cols.length; j++) {
            let card = randomCard()
            let allDiv = cols[j].querySelectorAll("div")
            if (allDiv.length == 0) {
                cols[j].appendChild(card)
            }
            else {
                let lastDiv = allDiv[allDiv.length - 1]
                card.style.top = `40px`
                card.style.position = "absolute"
                lastDiv.appendChild(card)
            }
        }
        addEventToCard()
        addPoint()
    }
    else {
        alert("No more card")
    }

}

function addPoint() {
    // get all columns in game
    for (let i of cols) {
        let colItemList = i.querySelectorAll("div")
        // get all div in 1 column
        for (let j = 0; j < colItemList.length; j++) {
            let currentValue = colItemList[j].className.split(" ")[1]
            // if div value is 13, check
            if (currentValue == 13) {
                // count length
                let count = 0
                // get all child
                let checkPoint = colItemList[j].querySelectorAll("div")
                for (let k = 0; k < checkPoint.length; k++) {
                    // get child value
                    let childValue = checkPoint[k].className.split(" ")[1]
                    // if child value is 1 smaller than father value, count + 1
                    if (checkBiggerByOne(currentValue, childValue)) {
                        count = count + 1
                    }
                    else {
                        break
                    }
                    // continue check
                    currentValue = childValue
                }
                // if count == 12 ( K => A), add point and remove 
                if (count == 12) {
                    point += 1
                    colItemList[j].remove()
                    setPoint()
                }
            }
        }
    }
}

for (let j of cols) {
    j.addEventListener('dragover', dragOver)
    j.addEventListener('dragenter', dragEnter)
    j.addEventListener('dragleave', dragLeave)
    j.addEventListener('drop', Drop)
}

for (let i = 0; i < 3; i++) {
    addCards()
}

addEventToCard()

function checkWin() {
    console.log("run")
    if (point == cols.length) {
        alert("Victory")
        point = "Victory"
        setPoint()
    }
}

checkWin()

function setPoint() {
    document.getElementById("point").innerHTML = point
}

addPoint()
