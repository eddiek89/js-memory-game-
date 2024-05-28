const memoryArray = ["1", "2", "3", "4", "1", "2", "3", "4"];

const memoryBoard = document.querySelector(".memory-board");
const startButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-button");
const winnerMessage = document.getElementById("winner-message");
let winSound;

document.addEventListener("DOMContentLoaded", function () {
  winSound = document.getElementById("win-sound");
});
let memoryValues = [];
let cardsID = [];
let cardsFlipped = 0;
let maxFlips = 10; // you can edit this value for the desired number of flips
let gameStarted = false; // you have to click start game button to start the game

function shuffle(array) {
  let i = array.length;
  let temp;
  while (--i > 0) {
    let j = Math.floor(Math.random() * (i + 1));
    temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }
}

function newBoard(array) {
  if (memoryBoard.innerHTML) memoryBoard.innerHTML = "";
  let cards = "";
  cardsFlipped = 0;
  shuffle(array);
  array.forEach((_, index) => {
    cards += `<div class="card" id="${
      "card-" + index
    }" data-index="${index}"></div>`;
  });
  memoryBoard.innerHTML = cards;

  const cardList = document.querySelectorAll(".card");

  cardList.forEach((card) => {
    card.addEventListener("click", flipCard);
  });
}

function resetGame() {
  gameStarted = true;
  maxFlips = 10;
  memoryValues = [];
  cardsID = [];
  cardsFlipped = 0;
  winnerMessage.style.display = "none";
  newBoard(memoryArray);
}

function flipBack(cardOne, cardTwo) {
  cardOne.classList.remove(
    "back",
    `${"image" + memoryArray[cardOne.dataset.index]}`
  );

  cardTwo.classList.remove(
    "back",
    `${"image" + memoryArray[cardTwo.dataset.index]}`
  );

  memoryValues = [];
  cardsID = [];
  maxFlips--;
}

function sameCards(cardOne, cardTwo) {
  cardOne.style.animation = "none";
  cardTwo.style.animation = "none";
  cardsFlipped += 2;
  memoryValues = [];
  cardsID = [];
}

function saveCards(card) {
  memoryValues.push(`${memoryArray[card.dataset.index]}`);
  cardsID.push(card.id);
}

function flipCard() {
  const card = this;
  if (
    gameStarted &&
    !this.classList.contains(`${"image" + memoryArray[this.dataset.index]}`) &&
    memoryValues.length < 2 &&
    maxFlips > 0
  ) {
    this.classList.add("back", `${"image" + memoryArray[this.dataset.index]}`);
    if (memoryValues.length === 0) {
      saveCards(card);
    } else if (memoryValues.length === 1) {
      saveCards(card);
      const cardOne = document.getElementById(`${cardsID[0]}`);
      const cardTwo = document.getElementById(`${cardsID[1]}`);
      if (memoryValues[0] === memoryValues[1]) {
        sameCards(cardOne, cardTwo);
        if (cardsFlipped === memoryArray.length) {
          winnerMessage.style.display = "block";
          console.log("trying to play sound");
          winSound.play().catch((e) => console.error("Error playing sound", e));
        }
      } else setTimeout(() => flipBack(cardOne, cardTwo), 950);
    }
  } else if (maxFlips === 0) {
    alert("Game Over! You've reached the flip limit.");
  }
}

startButton.addEventListener("click", () => {
  gameStarted = true;
  newBoard(memoryArray);
  startButton.style.display = "none";
  restartButton.style.display = "inline-block";
});

restartButton.addEventListener("click", resetGame);

newBoard(memoryArray);