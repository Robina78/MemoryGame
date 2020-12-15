const gameContainer = document.getElementById("game");
let chosenCard1 = null;
let chosenCard2 = null;
let cardsFlipped  = 0;
let noClicking = false;
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

function shuffle(array) {
  let counter = array.length;

  
  while (counter > 0) {
   
    let index = Math.floor(Math.random() * counter);

    counter--;

    
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);


function createDivsForColors(colorArray) {

  for (let color of colorArray) {    
    const newDiv = document.createElement("div");    
    newDiv.classList.add(color);    
    newDiv.addEventListener("click", handleCardClick);    
    gameContainer.append(newDiv);
  }
}


function handleCardClick(event) {
  
  if (noClicking) return;
  if(event.target.classList.contains("flipped")) return;
 
   let currentCard = event.target;
   currentCard.style.backgroundColor = currentCard.classList[0];
  
    
  if (!chosenCard1 || !chosenCard2) {
   currentCard.classList.add("flipped");
    chosenCard1 = chosenCard1 || currentCard;
    chosenCard2 = currentCard === chosenCard1 ? null : currentCard;
  }

  if (chosenCard1 && chosenCard2) {
    noClicking = true;

    let gif1 = chosenCard1.className;
    let gif2 = chosenCard2.className;

    if(gif1 === gif2){
      cardsFlipped += 2;
      chosenCard1.removeEventListener("click", handleCardClick);
      chosenCard2.removeEventListener("click", handleCardClick);
      chosenCard1 = null;
      chosenCard2 = null;
      noClicking = false;
    } else {
      setTimeout(function(){
        chosenCard1.style.backgroundColor = "";
        chosenCard2.style.backgroundColor = "";
        chosenCard1.classList.remove("flipped");
        chosenCard2.classList.remove("flipped");
        chosenCard1 = null;
        chosenCard2 = null;
        noClicking = false;
      }, 1000);
    }
  }
  if (cardsFlipped === COLORS.length) alert("game over!");
}


createDivsForColors(shuffledColors);
