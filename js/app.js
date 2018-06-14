let card1front = document.getElementById("card1-front");
let card1back = document.getElementById("card1-back");

card1front.addEventListener("click", function(){
    card1front.classList.toggle('card-closer');
    setTimeout(function (){
        card1front.classList.toggle('hide');
    }, 10);
    setTimeout(function (){
        card1back.classList.toggle('hide');
    }, 300);
});
