let gameBoard = document.getElementById('game-board');
let movesCounter = document.getElementById('moves-counter');
let modal = document.getElementById('winner');
let modalClose = document.querySelector('.modal-close');
let timer = document.getElementById('timer');
let reset = document.getElementById('reset');
let rating = document.getElementById('rating').children;
let frontCards = document.getElementsByClassName('card-open');
let cards = gameBoard.children;
let openedCards = [];
let matchedCards = [];
let moves = 0;
let time = 0;

let clock = setInterval(function () {
  timeCount();
}, 1000);

function timeCount () {
  time++;
}

function toggleClass (element, className) {
  element.classList.toggle(className);
}

function addClass (element, className) {
  element.classList.add(className);
}

function removeClass (element, className) {
  element.classList.remove(className);
}

function getIcon (element) {
  return element.firstElementChild.firstElementChild.getAttribute('class');
}

function matchCard (oneCard, anotherCard) {
  return (getIcon(oneCard) === getIcon(anotherCard));
}

function matchedEffect (element) {
  addClass(element, 'fa-spin', 'fa-2x');
  addClass(element.parentElement, 'matched');
}

function closeCard (card) {
  setTimeout(() => {
    toggleClass(card, 'card-closer');
  }, 700);
  setTimeout(() => {
    addClass(card, 'hide');
    // addClass(second,'hide');
    removeClass(card.previousElementSibling, 'hide');
    removeClass(card.previousElementSibling, 'card-closer');
    // removeClass(second.previousElementSibling, "hide");
    // removeClass(second.previousElementSibling, "card-closer");
  }, 1100);
}

function openCard (card) {
  toggleClass(card, 'card-closer');
  setTimeout(() => {
    addClass(card, 'hide');
    removeClass(card.nextElementSibling, 'hide');
    removeClass(card, 'card-closer');
  }, 300);
}

function gamePlay (e) {
  let cardBackSide = e.target;
  let cardFrontSide = cardBackSide.nextElementSibling;
  if (!cardBackSide.classList.contains('card-close')) {
    console.log('Ignore click');
    return;
  }
  moves += 1;
  movesCounter.textContent = 'Moves: ' + moves;

  openCard(cardBackSide);

  openedCards.push(cardFrontSide);
  if (openedCards.length === 2) {
    let [firstCard, secondCard] = openedCards;
    if (matchCard(firstCard, secondCard)) {
      matchedCards.push(openedCards);
      matchedEffect(firstCard.firstElementChild.firstElementChild);
      setTimeout(() => {
        matchedEffect(secondCard.firstElementChild.firstElementChild);
      }, 500);
    } else {
      closeCard(firstCard);
      closeCard(secondCard);
    }
    openedCards = [];
  }
  if (matchedCards.length === 8) {
    setTimeout(() => {
      removeClass(modal, 'hide');
    }, 500);
  }
}

function rateGameplay (moves) {
  if (moves >= 10 && matchedCards.length < 4) {
    removeClass(rating[2], 'checked');
  };

  if (moves >= 16 && matchedCards.length < 5) {
    removeClass(rating[1], 'checked');
  };

  if (moves >= 22 && matchedCards.length < 6) {
    removeClass(rating[0], 'checked');
  };
}

function shuffleBoard () {
  //let arr = [];
  let cards = Array.from(document.querySelectorAll('.flip i'));
  let card = document.getElementsByClassName('flip');
  //console.log(card);
  //console.log(card[0]);
  //console.log(card[2]);
  //for (i = 0; i <= cards; i++) {
  //  arr.push(cards[i].getAttribute('class'));
  //}
  const shuffledCards = shuffle(cards);
  for (i = 0; i < card.length; i++){
    console.log(card[i]);
    card[i].appendChild(shuffledCards[i]);
  }
  //for (i in card) {
    //console.log(card[i]);
    //for (c in shuffledCards){
      //console.log(shuffledCards[i]);
      //let newIcon = document.createElement(shuffledCards[c]);
      //card[i].parentNode.appendChild(shuffledCards[c]);
      //tester.removeChild(c);
      //card[i].appendChild(shuffledCards[c]);
    //}
  //}
}

shuffleBoard();

//taken from starter code
function shuffle (array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function gameReset () {
  for (i = 0; i < frontCards.length; i++) {
    let front = frontCards[i];
    if (front.previousElementSibling.classList.contains('hide')) {
      closeCard(front);
    }
    let icons = document.getElementsByClassName('fa-lg');
    if (icons[i].classList.contains('fa-spin')) {
      let parent = icons[i].parentElement;
      removeClass(icons[i], 'fa-spin');
      removeClass(parent, 'matched');
    }
  }
  moves = 0;
  movesCounter.textContent = 'Moves: ' + moves;
  for (j = 0; j < rating.length; j++) {
    addClass(rating[j], 'checked');
  }

}
//timer.innerHTML =

gameBoard.addEventListener('click', (e) => {
  gamePlay(e);
  rateGameplay(moves);
});

modalClose.addEventListener('click', function () {
  modal.style.display = 'none';
});

reset.addEventListener('click', function () {
  gameReset();
  shuffleBoard();
});
