let gameBoard = document.getElementById('game-board');
let movesCounter = document.getElementById('moves-counter');
let modal = document.getElementById('modal');
let modalClose = document.querySelector('.modal-close');
let reset = document.getElementById('reset');
let rating = document.getElementById('rating').children;
let frontCards = document.getElementsByClassName('card-open');
let timer = document.getElementById('timer');
let win1 = document.getElementById('win1');
let replay = document.getElementsByName('reset');
let openedCards = [];
let matchedCards = [];
let moves = 0;
let clockOn = false;
let time = 0;
let timeCount;

// increment the variable time by 1 every second to act as a timer
function startTimer () {
  timeCount = setInterval(function () {
    time++;
    displayClock();
  }, 1000);
}

// reset the time to 0
function resetTimer () {
  time = 0;
}

// stop the timer
function stopTimer () {
  clearInterval(timeCount);
}

// display the time in seconds and minutes
function displayClock () {
  let seconds = time % 60;
  // use math.floor to round down the float number from division
  let minutes = Math.floor(time / 60);

  if (seconds < 10) {
    timer.innerHTML = `${minutes}:0${seconds}`;
  } else {
    timer.innerHTML = `${minutes}:${seconds}`;
  }
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
    removeClass(card.previousElementSibling, 'hide');
    removeClass(card.previousElementSibling, 'card-closer');
  }, 1000);
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
  // if two cards are selected, check if the icons on the cards match
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
  // if all 8 pairs of cards are matched, stop the game
  if (matchedCards.length === 8) {
    stopTimer();
    showStats();
  }
}

function showStats () {
  win1.innerHTML = `You did it! You beat the game in ${moves} moves. It only
  took you ${timer.innerHTML}. Can you do better than that?`;
  setTimeout(() => {
    removeClass(modal, 'hide');
  }, 1000);
}
showStats();

function rateGameplay (moves) {
  if (moves >= 14 && matchedCards.length < 4) {
    removeClass(rating[2], 'checked');
  };

  if (moves >= 24 && matchedCards.length < 5) {
    removeClass(rating[1], 'checked');
  };

  if (moves >= 34 && matchedCards.length < 6) {
    removeClass(rating[0], 'checked');
  };
}

function shuffleBoard () {
  let cards = Array.from(document.querySelectorAll('.flip i'));
  let card = document.getElementsByClassName('flip');
  setTimeout(() => {
    const shuffledCards = shuffle(cards);
    for (i = 0; i < card.length; i++) {
      card[i].appendChild(shuffledCards[i]);
    }
  }, 1000);
}

// taken from starter code
function shuffle (array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

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

shuffleBoard();

gameBoard.addEventListener('click', (e) => {
  gamePlay(e);
  rateGameplay(moves);
  if (!clockOn) {
    clockOn = true;
    startTimer();
  }
});

modalClose.addEventListener('click', function () {
  modal.style.display = 'none';
});

replay[0].addEventListener('click', function () {
  modal.style.display = 'none';
  gameReset();
  shuffleBoard();
  clockOn = false;
  stopTimer();
  resetTimer();
});

reset.addEventListener('click', function () {
  gameReset();
  shuffleBoard();
  clockOn = false;
  stopTimer();
  resetTimer();
});
