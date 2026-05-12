const container = document.querySelector(".container");
let color = "black";

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
/* Make the grid */
for (let i=0; i < 256; i++) {
    createDiv();
     }
 
container.addEventListener("mouseover", event => {
    const targetDiv = event.target;
    if (targetDiv.className === "filling") {
    console.log('Hover activated...');
        changeColor(targetDiv); 
    }
})