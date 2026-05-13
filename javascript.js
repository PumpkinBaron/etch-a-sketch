/* Variables */

const container = document.querySelector(".container");
const containerWidth = container.offsetWidth
const button = document.createElement("button");
button.textContent = "Click to resize grid.";

let color = "black"

/* Functions */

function changeColor(div) {
    div.style.backgroundColor = color;
}

function findFillSize(containerInput){
    console.log("Running find fill size...")
    const borderlessWidth = containerInput.clientWidth - 2;
    console.log(`containerInput.offsetWidth = ${borderlessWidth}`);
    let fillingWidth = "";
    let numberOfFillings = "";

    if (!(borderlessWidth % 3 === 0 ||
         borderlessWidth % 4 === 0 ||
        borderlessWidth % 5 === 0)) {
           return console.error(`Attempted width ${borderlessWidth} is not evenly
           divisible by 3, 4, or 5.`);   
    } if (borderlessWidth % 5 === 0) {
        fillingWidth = 5;
    } if (borderlessWidth % 4 === 0) {
        fillingWidth = 4;
    } if (borderlessWidth % 3 === 0) {
        fillingWidth = 3;
    }
    numberOfFillings = borderlessWidth / fillingWidth;
    console.log(`Find fill size returned filling width "${fillingWidth}" and 
        number of fillings "${numberOfFillings}"`);
    return [fillingWidth, numberOfFillings];
}

function generateLine(
    containerToFill, squareWidth, squaresPerLine, squareClass, squareColor) {
   console.log(`Running generate line with inputs
            containerToFill "${containerToFill}", square width "${squareWidth}", squares per line 
            "${squaresPerLine}", and class "${squareClass}".`)
        const lineOfSquares = document.createElement("div");
        for (let i = 0; i < squaresPerLine; i++ ) {
            const newSquare = document.createElement("div");
            newSquare.classList.add(squareClass);
            newSquare.style.width = squareWidth + "px";
            newSquare.style.height = squareWidth + "px";
            newSquare.style.backgroundColor = squareColor;  
            lineOfSquares.appendChild(newSquare);
        }
        containerToFill.appendChild(lineOfSquares);
}

function fillWithGreySquares(containerToFill) {
        console.log("Filling container with grey squares...")
        const sizeInfo = findFillSize(containerToFill);
        const squareWidth = sizeInfo[0];
        const squaresPerLine = sizeInfo[1];
        const randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
        console.log(`Running generate line via fillWithGreySquares with inputs
            container "${container}", square width "${squareWidth}", squares per line 
            "${squaresPerLine}", and class "filling".`)

        for (let i = 0; i < squaresPerLine; i++ ) {
            generateLine(containerToFill, squareWidth, squaresPerLine, 
                "filling", randomColor);
        }
}

function findAcceptableBoxWidth(squaresPerLine) {
        console.log("Finding acceptable box width...")
    let borderlessWidth = Math.floor(containerWidth / squaresPerLine - 2);
    while (!(borderlessWidth % 3 === 0 || 
            borderlessWidth % 4 === 0 || 
            borderlessWidth % 5 === 0)) {
                console.log(`Current border with is ${borderlessWidth}`);
                borderlessWidth--;
                if (borderlessWidth < 1) console.error("borderless width went below 1");
            }
            return borderlessWidth + 2;
}

function generateGrid(squaresPerLine) {
        console.log("Generating the grid...")
    const boxWidth = findAcceptableBoxWidth(squaresPerLine);
        console.log(`generateGrid found acceptable box width ${boxWidth}`)
    /* Clear top level container */
    container.textContent = "";
    /* Make a grid */
    for (let i = 0; i < squaresPerLine; i++ ) {
        console.log(`Running generate line via generateGrid with inputs
            container "${container}", box width "${boxWidth}", squares per line 
            "${squaresPerLine}", and class "box".`)
        generateLine(container, boxWidth, squaresPerLine, "box", "");
    }
    /* Fill the squares */
    const boxes = document.querySelectorAll(".box");
    boxes.forEach(fillWithGreySquares);

    /* Add a button */
    newPara = document.createElement("p");
    container.appendChild(newPara);
    newPara.appendChild(button);
}

/* Event Listeners */

container.addEventListener("mouseover", event => {
    const targetDiv = event.target;
    if (targetDiv.className === "filling") {
    console.log('Hover activated...');
    changeColor(targetDiv); 
    }
});

button.addEventListener("click", () => {
    do {    
        numberOfSquares = Number(window.prompt(`How many squares per line? 
            Input a number between 1 and 100`, ""));
        console.log(`Number of squares changed to ${numberOfSquares}`)
        } while (!Number.isInteger(numberOfSquares))
        generateGrid(numberOfSquares);
});

generateGrid(16);