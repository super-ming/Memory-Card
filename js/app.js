let cardfront = document.querySelectorAll(".card-front");
let cardback = document.querySelectorAll(".card-back");
let gameboard = document.getElementById("game-board");

let stack = document.querySelectorAll(".stack");
let cards = gameboard.childNodes;
let clicked = [];
let matchedCardId = [];

gameboard.addEventListener("click", function(e){
    let selectedCard = e.target;
    let backCard = selectedCard.nextElementSibling;
    let cardIcon = backCard.firstElementChild.getAttribute("class");
    let cardId = backCard.getAttribute("id")
    if (clicked.length < 2 && selectedCard.classList.contains('card-close')) {
        alert(cardId);
        clicked.push(cardIcon);
        matchedCardId.push(cardId);
        selectedCard.classList.toggle('card-closer');
        setTimeout(function() {
            selectedCard.classList.toggle('hide');
            backCard.classList.toggle('hide');
            backCard.classList.toggle('show');
        }, 300);
        if ((clicked.length == 2) && (clicked[0]===clicked[1])){
            let firstCard = document.getElementById(matchedCardId[0]);
            backCard.firstElementChild.classList.add('fa-spin', 'fa-3x');
            backCard.classList.toggle('matched');
            firstCard.firstElementChild.classList.add('fa-spin', 'fa-3x');
            firstCard.classList.toggle('matched');
        }
    }
});


/*cards.forEach(function(card){
    card.addEventListener("click", function(){
        let nextCard = card.nextElementSibling;
        let nextId = card.nextElementSibling.id;
        let icon = card.nextElementSibling.children.classList;

        if (clicked.length < 2 && card.classList.contains('card-close')) {

            clicked.push(icon);
            card.classList.toggle('card-closer');
            setTimeout(function() {
                card.classList.toggle('hide');
                nextCard.classList.toggle('hide');
                nextCard.classList.toggle('show')
            }, 300);
            if (clicked.length == 2){
                alert(click[0]);
                alert(clicked[1]);
            }


            if (clicked[0] === clicked[1]){
                alert("MATCHED!");

        }
    });
}); */

/*let saveArray = function(icon) {
    var array = []
    for (let i = 0; i <= icon.length, i++){
        array.push(icon[i]);
    }
}*/
