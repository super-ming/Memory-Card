let gameboard = document.getElementById("game-board");
let movesCounter = document.getElementById("moves-counter");
let modal = document.getElementById("winner");
let modalClose = document.querySelector(".modal-close");
let timer = document.getElementById("timer");
let reset = document.querySelector(".reset");
let rating = document.getElementById("rating").children;
let backCards = document.getElementsByClassName("card-open");
let cards = gameboard.children;
let openedCards = [];
let matchedCards = [];
let moves = 0;
let time = 0;

let clock = setInterval(function(){
    timeCount()
}, 1000);

function timeCount(){
    time++;
}

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

function matchCard(oneCard, anotherCard){
    return (getIcon(oneCard) === getIcon(anotherCard));
}

function matchedEffect(element){
    addClass(element, 'fa-spin', 'fa-2x');
    addClass(element.parentElement, 'matched');
}

function closeCard(card){
    setTimeout(()=> {
        toggleClass(card, "card-closer");
    }, 300);
    setTimeout(()=> {
        addClass(card,"hide");
        //addClass(second,"hide");
        removeClass(card.previousElementSibling, "hide");
        removeClass(card.previousElementSibling, "card-closer")
        //removeClass(second.previousElementSibling, "hide");
        //removeClass(second.previousElementSibling, "card-closer");
    }, 700);
}

function openCard(card){
    toggleClass(card,"card-closer");
    setTimeout(()=> {
       addClass(card,"hide");
       removeClass(card.nextElementSibling, "hide");
       removeClass(card,"card-closer");
    },300);
}

function gamePlay(e){
    let cardBackSide = e.target;
    let cardFrontSide = cardBackSide.nextElementSibling;
    if(!cardBackSide.classList.contains("card-close")) {
      console.log("Ignore click");
      return;
    }
    moves+=1;
    movesCounter.textContent= "Moves: " + moves;

    openCard(cardBackSide);

    openedCards.push(cardFrontSide);
    if (openedCards.length == 2){
        let [firstCard, secondCard] = openedCards;
        if (matchCard(firstCard, secondCard)) {
            matchedCards.push(openedCards);
            matchedEffect(firstCard.firstElementChild.firstElementChild);
            setTimeout(()=> {
                matchedEffect(secondCard.firstElementChild.firstElementChild);
            }, 500);
        } else {
            closeCard(firstCard);
            closeCard(secondCard);
        }
      openedCards = [];
    }
    if (matchedCards.length == 8) {
        setTimeout(()=> {
            removeClass(modal, "hide");
        }, 500);
    }
}

function rateGameplay(moves){
    if (moves >= 10 && matchedCards.length < 4){
        removeClass(rating[2], "checked");
    };

    if (moves >= 16 && matchedCards.length < 5){
        removeClass(rating[1], "checked");
    };

    if (moves >= 22 && matchedCards.length < 6){
        removeClass(rating[0], "checked");
    };
}

function gameReset(){
    for (i = 0; i < backCards.length; i++){
        let back = backCards[i];
        if (back.previousElementSibling.classList.contains('hide')){
            closeCard(back);
        }
    }
    moves = 0;
    movesCounter.textContent= "Moves: " + moves;
}
//timer.innerHTML =

gameboard.addEventListener("click", (e) => {
  gamePlay(e);
  rateGameplay(moves);
});

modalClose.addEventListener("click", function(){
    modal.style.display = "none";
});

reset.addEventListener("click", function(){
    gameReset();
});
