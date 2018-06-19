let gameboard = document.getElementById("game-board");
let movesCounter = document.getElementById("moves-counter");
let modal = document.getElementById("winner");
let modalClose = document.querySelector(".modal-close");
let openedCards = [];
let matchedCards = [];
let moves = 0;

function toggleClass(element,className) {
  element.classList.toggle(className);
}

function addClass(element,className) {
  element.classList.add(className);
}

function removeClass(element,className) {
  element.classList.remove(className);
}

function getIcon(element) {
  return element.firstElementChild.firstElementChild.getAttribute("class");
}

function matchedEffect(element){
    addClass(element, 'fa-spin', 'fa-2x');
    addClass(element.parentElement, 'matched');
}

gameboard.addEventListener("click", (e) => {
  let cardBackSide = e.target;
  let cardFrontSide = cardBackSide.nextElementSibling;
  //let clicked = [cardBackSide, cardFrontSide];
  //alert(cardBackSide.getAttribute("id"));

  if(!cardBackSide.classList.contains("card-close")) {
    console.log("Ignore click");
    return;
  }
  moves+=1;
  movesCounter.textContent= "Moves: " + moves;
  toggleClass(cardBackSide,"card-closer");
  setTimeout(()=> {
     addClass(cardBackSide,"hide");
     removeClass(cardFrontSide, "hide");
     removeClass(cardBackSide,"card-closer");
  },300);

  openedCards.push(cardFrontSide);
  if (openedCards.length == 2){
      let [firstCard, secondCard] = openedCards;
      if (getIcon(firstCard) === getIcon(secondCard)) {
          matchedCards.push(openedCards);
          matchedEffect(firstCard.firstElementChild.firstElementChild);
          setTimeout(()=> {
              matchedEffect(secondCard.firstElementChild.firstElementChild);
          }, 500);
      } else {
          setTimeout(()=> {
              addClass(firstCard,"hide");
              addClass(secondCard,"hide");
              removeClass(firstCard.previousElementSibling, "hide");
              removeClass(secondCard.previousElementSibling, "hide");
              //toggleClass(secondCard.previousElementSibling,"hide");
              removeClass(secondCard.previousElementSibling, "card-closer");
          }, 1000);
      }
    openedCards = [];
  }

  if (matchedCards.length == 8) {
      setTimeout(()=> {
          modal.style.display = "block";
      }, 500);
  }
});

modal.addEventListener("click", function(){
    modal.style.display = "none";
});