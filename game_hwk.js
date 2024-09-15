window.onload = () => {
    console.log("Page Loaded");
    setRandomTileOrder(12);
    setTiles();
}

// global variables
let i = 0;
let clicks;
let timeScore;

// start button initiates the game and starts the counter
const startButton = document.getElementById("startGame");
startButton.addEventListener("click", startGame);

const startGame = () => {
    tiles.forEach(tile => tile.addEventListener("click", displayTile));
    resetTiles();
    startButton.disabled = true;
    console.log(randomOrderArray);
    startTimer();
}

// end button stops the game
document.getElementById('endGame').addEventListener("click", endGame);

const endGame = () => {
    const endTimer = () => {
        timeScore = document.getElementById("timer").innerText;
        console.log(timeScore);
        clearInterval(timer);
    }
    randomOrderArray = [];
    startButton.innerText = "New Game";
    startButton.disabled = false;
    endTimer();
    calculateScore();
}

// create an array of 12 random numbers
let randomOrderArray = [];
const setRandomTileOrder = (numberOfTiles) => {
    while (randomOrderArray.length < numberOfTiles) {
        let randomNum = Math.floor(Math.random() * numberOfTiles) + 1;

        if (!randomOrderArray.includes(randomNum)) {
            randomOrderArray.push(randomNum);
        }
    }
}

// Set tiles variable for use throughout code
const tiles = document.querySelectorAll(".gametile");

const setTiles = () => {
    for (let tile of tiles) {
        tile.innerHTML = randomOrderArray[i];
        i++;

        // replace numerical values with icon pairs
        if (tile.innerText < 3) {
            tile.innerHTML = rocket;
            tile.setAttribute("icon", "rocket");
        } else if (tile.innerHTML < 5) {
            tile.innerHTML = bacteria;
            tile.setAttribute("icon", "bacteria");
        } else if (tile.innerHTML < 7) {
            tile.innerHTML = cocktail;
            tile.setAttribute("icon", "cocktail");
        } else if (tile.innerHTML < 9) {
            tile.innerHTML = football;
            tile.setAttribute("icon", "football");
        } else if (tile.innerHTML < 11) {
            tile.innerHTML = pizza;
            tile.setAttribute("icon", "pizza");
        } else if (tile.innerHTML < 13) {
            tile.innerHTML = kiwi;
            tile.setAttribute("icon", "kiwi");
        } else {
            console.log("Error: too many tiles");
        }
    }
}

// Timer Function
let count, timer;

const startTimer = () => {
    clearInterval(timer); // clears timer before timer starts
    count = 0;
    timer = setInterval(() => {
        document.getElementById("timer").firstChild.innerText = ++count;

        // end timer when it reaches 60 seconds
        if (count === 60) {
            clearInterval(timer);
            document.getElementById("timer").firstChild.innerText = "Game Over";
        }
    }, 1000);
}

// Icon definitions
const football = `<i class="fas fa-football-ball"></i>`;
const mask = `<i class="fas fa-ufo"></i>`;
const pizza = `<i class="fas fa-pizza-slice"></i>`;
const lightning = `<i class="far fa-bolt"></i>`;
const bulb = `<i class="fal fa-lightbulb"></i>`;
const rocket = `<i class="fas fa-rocket"></i>`;
const bacteria = `<i class="fas fa-bacterium"></i>`;
const kiwi = `<i class="fas fa-kiwi-bird"></i>`;
const cocktail = `<i class="fas fa-cocktail"></i>`;

let tileIcon;
let tileIcons = [];
let tileIds = [];

// Display tile on click event
const displayTile = (e) => {
    const tile = e.target;
    tile.classList.remove("hideTile");
    tile.classList.add("displayTile");

    // logs the value of the tile's icon and ID
    tileIcon = tile.getAttribute("icon");
    tileIcons.push(tileIcon);
    const tileId = tile.getAttribute("id");
    tileIds.push(tileId);

    countMoves();

    if (tileIcons.length % 2 === 0) {
        checkMatch(tileIcons, tileIds, n);
        n += 2;
    }
};

tiles.forEach(tile => tile.addEventListener("click", displayTile));

let n = 0;

const checkMatch = (tileIcons, tileIds, n) => {
    if (tileIcons[n] !== tileIcons[n + 1]) {
        setTimeout(() => {
            document.getElementById(tileIds[n]).classList.remove("displayTile");
            document.getElementById(tileIds[n + 1]).classList.remove("displayTile");
        }, 1000);
    } else {
        document.getElementById(tileIds[n]).style.backgroundColor = "green";
        document.getElementById(tileIds[n + 1]).style.backgroundColor = "green";
        document.getElementById(tileIds[n]).setAttribute("guess", "correct");
        document.getElementById(tileIds[n + 1]).setAttribute("guess", "correct");
        document.getElementById(tileIds[n]).removeEventListener("click", displayTile);
        document.getElementById(tileIds[n + 1]).removeEventListener("click", displayTile);
    }
};

// Count clicks -> calculates number of user clicks
const countMoves = () => {
    clicks = n;
    document.getElementById("clicks").firstChild.innerHTML = clicks;
}

// Clear tiles when new game is started
const resetTiles = () => {
    for (let tile of tiles) {
        tile.style.fontSize = "0em";
        tile.style.backgroundColor = "#44445a";
        tile.removeAttribute("state");
        tile.classList.remove("hideTile");
        tile.classList.remove("displayTile");
    }
}

// Calculate score
const calculateScore = () => {
    timeScore = parseInt(timeScore);
    const calculatedScore = (timeScore + clicks);
    console.log(calculatedScore);
    document.querySelector("#score").firstChild.innerHTML = calculatedScore;
}

// Generate RGB value for additional difficulty
let newRGB;

const generateRGBVal = () => {
    const generateRandomColor = () => Math.round(Math.random() * 255);

    const rgbValue = Array.from({ length: 3 }, generateRandomColor);
    newRGB = `rgb(${rgbValue.join(",")})`;
    return newRGB;
}