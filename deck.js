let deck;
let currentVal = 0;
let points = 0;
let score = 0;
let main = document.querySelector('.main');
let fig = document.createElement('figure');
let pic = document.createElement('img');
let figcap = document.createElement('figcaption');
window.addEventListener('load', function () {
    console.log('Test Deck Card API');

    startGame(); 
    console.log(deck);
    console.log(currentVal);
    pickHigher();   

    pickLower();
});

function startGame() {
    let newDeck = new XMLHttpRequest();
    newDeck.open('GET', 'https://deckofcardsapi.com/api/deck/new/draw/?count=1');
    newDeck.addEventListener('load', function () {
        let response = JSON.parse(newDeck.responseText);
        deck = response.deck_id;

        let newVal = response.cards[0].value;

        console.log("newVal = " + newVal);
        if (newVal === "JACK") {
            newVal = 11
        } else if (newVal === "QUEEN") {
            newVal = 12
        } else if (newVal === "KING") {
            newVal = 13
        } else if (newVal === "ACE") {
            newVal = 14
        } else {
            newVal = parseInt(newVal);
        }
        console.log("New Cards, newVal = " + newVal);

        currentVal = newVal;
        
        main.appendChild(fig);
       
        pic.src = response.cards[0].image;
        fig.appendChild(pic);
       
        figcap.textContent = "The " + response.cards[0].value + " of " + response.cards[0].suit;
        fig.appendChild(figcap);
        console.log("Game start.....");
    });
    newDeck.send();
};

function pickHigher() {
    console.log('Higher Card loading......');
    let higher = document.querySelector('#higher');
    higher.addEventListener('click', function () {
        console.log('pickHigher running');
        let drawCard = new XMLHttpRequest();
        drawCard.open('GET', 'https://deckofcardsapi.com/api/deck/' + deck + '/draw/?count=1');
        drawCard.addEventListener('load', function () {
            let response = JSON.parse(drawCard.responseText);
            let newVal = response.cards[0].value;

           

            console.log("newVal = " + newVal);
            if (newVal === "JACK") {
                newVal = 11
            } else if (newVal === "QUEEN") {
                newVal = 12
            } else if (newVal === "KING") {
                newVal = 13
            } else if (newVal === "ACE") {
                newVal = 14
            } else {
                newVal = parseInt(newVal);
            }
            console.log("After 'if' statement, newVal = " + newVal);
            
          
            let main = document.querySelector('.main');
            let fig = document.createElement('figure');
            main.appendChild(fig);
            let pic = document.createElement('img');
            pic.src = response.cards[0].image;
            fig.appendChild(pic);
            let figcap = document.createElement('figcaption');
            figcap.textContent = "The " + response.cards[0].value + " of " + response.cards[0].suit;
            fig.appendChild(figcap);

            if (newVal > currentVal) {
                console.log('YAY!')
                console.log(response.cards[0].value);
                currentVal = newVal;
                console.log(currentVal);
                //currentVal.push(newVal);
                console.log(currentVal);
                addScore()
                winGame()
            } else {
                console.log("Too bad!");
                console.log(response.cards[0].value);
                lose = confirm("Sorry " + response.cards[0].value + " of " + response.cards[0].suit + ". You lose. Play again?");
                if (lose === true) {
                    location.reload();
                }
            }
        });
        drawCard.send();
    });
}

function pickLower() {
    console.log('pickLower loaded');
    let higher = document.querySelector('#lower');
    higher.addEventListener('click', function () {
        console.log('Lower Card loading....');
        let drawCard = new XMLHttpRequest();
        drawCard.open('GET', 'https://deckofcardsapi.com/api/deck/' + deck + '/draw/?count=1');
        drawCard.addEventListener('load', function () {
            let response = JSON.parse(drawCard.responseText);
            let newVal = response.cards[0].value;

            console.log("newVal = " + newVal);
            if (newVal === "JACK") {
                newVal = 11
            } else if (newVal === "QUEEN") {
                newVal = 12
            } else if (newVal === "KING") {
                newVal = 13
            } else if (newVal === "ACE") {
                newVal = 14
            } else {
                newVal = parseInt(newVal);
            }
            console.log("After 'if' statement, newVal = " + newVal);
           
            main.appendChild(fig);
            pic.src = response.cards[0].image;
            fig.appendChild(pic);
           
            figcap.textContent = "The " + response.cards[0].value + " of " + response.cards[0].suit;
            fig.appendChild(figcap);

            if (newVal < currentVal) {
                console.log('congrats')
                currentVal = newVal;
                console.log(currentVal);
                addScore();
                winGame();
            } else {
                console.log("Too bad!");
                lose = confirm("Sorry " + response.cards[0].value + " of " + response.cards[0].suit + ". You lose. Play again?");
                if (lose === true) {
                    location.reload();
                }
            }
        });
        drawCard.send();
    });
}

function addScore() {
    points++
    console.log("Your score " + points);
}

function winGame() {
    if (points === 5) {
        let again = confirm("Are you a winner?");
        if (again === true) {
            score++
            console.log("Your score " + score);
            let main = document.querySelector('.main');
            while (main.firstChild) {
                main.removeChild(main.firstChild);
            }
            startGame();
        }
    }
}
