/* Variables */

const container = document.querySelector(".container");
const containerWidth = container.offsetWidth
const button = document.createElement("button");
button.textContent = "Click to resize grid.";
button.classList.add("button");
button.style.width = "200px";
button.style.height = "50px";
let color = "black"
let boxNumber = 0;

/* Functions */

function changeColor(div, newColor) {
    div.style.backgroundColor = newColor;
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
    containerToFill, squareWidth, squaresPerLine, squareClass, squareColor, 
    opacity) {
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
            newSquare.style.opacity = opacity;
            lineOfSquares.appendChild(newSquare);
        }
        containerToFill.appendChild(lineOfSquares);
}

function fillWithSquares(containerToFill) {
        console.log("Filling container with grey squares...")
        const sizeInfo = findFillSize(containerToFill);
        const squareWidth = sizeInfo[0];
        const squaresPerLine = sizeInfo[1];
        const color = "whitesmoke";
        const currentBox = "boxnumber" + boxNumber;
        console.log(`Running generate line via fillWithSquares with inputs
            container "${container}", square width "${squareWidth}", squares per line 
            "${squaresPerLine}", and class ${currentBox}".`)

        for (let i = 0; i < squaresPerLine; i++ ) {
            generateLine(containerToFill, squareWidth, squaresPerLine, 
                currentBox, color, 0);
        }
        boxNumber++;
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
        generateLine(container, boxWidth, squaresPerLine, "box", 0);
    }
    /* Fill the squares */
    const boxes = document.querySelectorAll(".box");
    boxes.forEach(fillWithSquares);

    /* Add a button */
    document.querySelector("body").appendChild(button);
}

/* Event Listeners */

container.addEventListener("mouseover", event => {
    const targetDiv = event.target;
    const targetDivClass = targetDiv.className;
    console.log(`TargetDivClass is ${targetDivClass}`);
    if (targetDivClass.includes("boxnumber")) {
    console.log('Hover activated...');
    const currentColor = "#" + Math.floor(Math.random()*16777215).toString(16);
    const divClassArray = document.querySelectorAll("." + targetDivClass);
   
    divClassArray.forEach(currentDiv => {
        console.log(`Current opacity is ${currentDiv.style.opacity}`);
        changeColor(currentDiv, currentColor);
        if (currentDiv.style.opacity < 1) {
            currentDiv.style.opacity = Number(currentDiv.style.opacity) + .1;
        }                
    });
    targetDiv.classList.remove(targetDivClass);
    targetDiv.style.opacity = 1; 
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