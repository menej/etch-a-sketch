function randomNumber360() {
    return Math.floor(Math.random() * 361);
}

function decreaseRGBColour(colour) {
    let RGBArray = colour.match(/\d+/g);
    RGBArray = RGBArray.map(number => {
        number -= 25;
        if (number < 0) number = 0;
        return number;
    });
    return "rgb(" + RGBArray.join(", ") + ")";
}

function addColour(e) {
    //     e.target.classList.add("coloured")
    let backgroundColor = e.target.style.backgroundColor;
    if (!backgroundColor) {
        e.target.style.backgroundColor = `rgb(${randomNumber360()}, ${randomNumber360()}, ${randomNumber360()})`;
    } else {
        e.target.style.backgroundColor = decreaseRGBColour(backgroundColor);
    }

}

function changeSize() {
    let userChoice = prompt("Please insert new number of squares per side");
    // Check if user entered something
    if (typeof userChoice != "string") return;

    // Check if it's a valid number
    if (!isNaN(+userChoice) && !isNaN(parseInt(userChoice))) {
        if (userChoice < 1) {
            alert("The number of squares per side is too small. Please try again!");
        } else if (userChoice > 100) {
            alert("The number of squares per side is too high. Please try again!");
        } else {
            updateSize(userChoice);
        }
    } else {
        alert("Please enter a valid number!");
    }
}

function addGridBoxes(gridContainer, gridSize) {
    gridContainer.textContent = "";
    for (let i = 0; i < gridSize * gridSize; i++) {
        let box = document.createElement("div");
        box.classList.add("box");
        box.style.width = CANVAS_SIZE / gridSize + "px";
        box.style.height = CANVAS_SIZE / gridSize + "px";

        box.addEventListener("mouseover", addColour);

        gridContainer.appendChild(box);
    }
}

function updateSize(size) {
    gridSize = size;
    let gridContainer = document.querySelector(".grid-container");
    addGridBoxes(gridContainer, gridSize);

    let gridSizeText = document.querySelector(".menu-container > p");
    gridSizeText.textContent = `${gridSize}x${gridSize}`;
}

const CANVAS_SIZE = 960;
let gridSize = 16;

let body = document.body;

let menuContainer = document.createElement("div");
menuContainer.classList.add("menu-container");

let gridSizeText = document.createElement("p");
gridSizeText.textContent = `${gridSize}x${gridSize}`;
menuContainer.appendChild(gridSizeText);

let button = document.createElement("button");
button.textContent = "Change Size";
button.classList.add("size-button");
button.addEventListener("click", changeSize);
menuContainer.appendChild(button);

body.appendChild(menuContainer);

let gridContainer = document.createElement("div");
gridContainer.classList.add("grid-container");
addGridBoxes(gridContainer, gridSize);
body.appendChild(gridContainer);


