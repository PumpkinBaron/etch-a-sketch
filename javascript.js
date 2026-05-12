const container = document.querySelector(".container");
const button = document.createElement("button")

let color = "black";
let numberOfSquares = 16;

function changeColor(div) {
    div.style.backgroundColor = color;
}

function fillWithDivs(div) {
    for (i = 0; i < 100; i++){
        const newDiv = document.createElement("div");
        newDiv.classList.add("filling");
        div.appendChild(newDiv);

    }
}

function createDiv() {
    const newDiv = document.createElement("div");
    newDiv.classList.add("box");
    fillWithDivs(newDiv);
    container.appendChild(newDiv);

}

function createGrid(squaresPerLine){
for (let i=0; i < squaresPerLine ** 2; i++) {
    createDiv();
     }
container.addEventListener("mouseover", event => {
    const targetDiv = event.target;
    if (targetDiv.className === "filling") {
    console.log('Hover activated...');
    changeColor(targetDiv); 
    }
})
}

createGrid(numberOfSquares);



button.textContent = "Click to resize grid.";
button.addEventListener("click", () => {
    do {    
    numberOfSquares = Number(window.prompt("How many squares per line", ""));
    console.log(`Number of squares changed to ${numberOfSquares}`)
    } while (!Number.isInteger(numberOfSquares));
/*     clearSquares(); */

})
container.appendChild(button);