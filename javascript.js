const container = document.querySelector(".container");

function changeColor(div) {
    div.style.backgroundColor = "black";
}

function fillWithDivs(div) {
    for (i = 0; i < 300; i++){
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