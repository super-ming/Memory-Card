let cardfront = document.querySelectorAll(".card-front");
let cardback = document.querySelectorAll(".card-back");
let gameboard = document.getElementById("game-board");
let stack = document.querySelectorAll(".stack");
let cards = gameboard.childNodes;
let clicked = [];

cards.forEach(function(card){
    card.addEventListener("click", function(){
        let nextCard = card.nextElementSibling;
        let nextId = card.nextElementSibling.id;
        if (clicked.length < 2 && card.classList.contains('card-close')) {
            clicked.push(nextId);
            card.classList.toggle('card-closer');
            setTimeout(function() {
                card.classList.toggle('hide');
                nextCard.classList.toggle('hide');
                nextCard.classList.toggle('show')
            }, 300);
        }
    });
});
