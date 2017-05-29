//Defining a card class start
function Card(suit, number) {
  this.suit = suit;
  this.number = number;
  this.numberToStringMapper = ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King"];
}

Card.prototype = {
  toString: function() {
    return this.numberToStringMapper[this.number - 1] + " of " + this.suit;
  }
};
//Defining a card class end

//defining a Suit Enum (.freeze prevents any alterations)
var Suit = Object.freeze({
  "Club": "Club",
  "Diamond": "Diamond",
  "Spade": "Spade",
  "Heart": "Heart"
})
//Suit class end



//Define Deck class
function Deck(numberOfDecks, shuffle) {
  this.numberOfDecks = numberOfDecks;
  this.shuffle = shuffle;
  this.cardsArray = [];
  this.numberOfCards = 0;
  this.shuffle =
    function() {
      var i = 0,
        j = 0;
      temp = null;
      for (i = this.cardsArray.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1));
        temp = this.cardsArray[i];
        this.cardsArray[i] = this.cardsArray[j];
        this.cardsArray[j] = temp;
      }
    };
  this.dealNextCard =
    function() {
      var topCard = this.cardsArray[0];
      for (i = 1; i < this.numberOfCards; i++) {
        this.cardsArray[i - 1] = this.cardsArray[i];
      }
      this.cardsArray[this.numberOfCards - 1] = null;
      this.numberOfCards--;
      return topCard;
    }
  var cardArrayIndex = 0;
  for (i = 0; i < numberOfDecks; i++) {
    //get each suit
    for (var suitType in Suit) {
      if (Suit.hasOwnProperty(suitType)) {
        //for each number
        for (k = 1; k <= 13; k++) {
          this.cardsArray[cardArrayIndex] = new Card(suitType, k);
          cardArrayIndex++;
          this.numberOfCards++;
        }
      }
    }
  }
  if (shuffle) {
    this.shuffle();
  }
}

//Player class
function Player(name) {
  this.name = name;
  this.cardHand = [];
  this.cardHandCurrentIndex = 0;
  this.emptyHand = function() {
    this.cardHand = [];
  }
  //addCard Method
  this.addCard = function(card) {
    this.cardHand[this.cardHandCurrentIndex] = card;
    this.cardHandCurrentIndex++;
  }
  //sumOfHand method
  this.sumOfHand = function() {
    var total = 0;
    var numberOfAces = 0;
    //adding all the card values taking ace value as 11
    for (var i = 0; i < this.cardHandCurrentIndex; i++) {
      if (this.cardHand[i].number == 1) {
        total += 11;
        numberOfAces++;
      } else if (this.cardHand[i].number > 10) {
        total += 10;
      } else {
        total += this.cardHand[i].number;
      }
    }
    // if total is greater than 21 consider ace value as 1 and keep subtract 10 based on the number of ace
    while ((total > 21) && (numberOfAces > 0)) {
      total -= 10;
      numberOfAces--;
    }
    return total;
  }

  //get String value card on the deck
  this.getCardOnHand = function() {
    returnString = "";
    for (var i = 0; i < this.cardHand.length; i++) {
      returnString += this.cardHand[i].toString() + "</br>";
    }
    return returnString;
  }
}

function userInput() {
  var txt = "";
  var person = prompt("Please enter your name:", "Harry Potter");
  if (person == null || person == "") {
    txt = "User cancelled the prompt.";
  } else {
    txt = "Hello " + person + "! How are you today?";
  }
  document.getElementById("demo").innerHTML = txt;
}

//a class to print info into the browser
function DisplayConsole() {
  var txt = "";
  this.displayOnScreen = function(stringValue) {
    txt += stringValue;
    document.getElementById("text_display").innerHTML = txt;
  }
  this.cleanDisplay = function() {
    txt = "";
  }
}

function hideElementById(domId) {
  document.getElementById(domId).style.visibility = 'hidden';
}

function showElementById(domId) {
  document.getElementById(domId).style.visibility = 'visible';
}

//This is the main driver class that co-ordinates the game

var user = null;
var dealer = null;
var displayConsole = null;
var deck = null;

function GameRunner() {
  //player OBejcts initialization
  // var deck = null;
  // var user = null;
  // var dealer = null;
  // var displayConsole = null;
  console.log("GameRunner created");
  this.runGame = function() {

    deck = new Deck(1, true);
    var userName = prompt("Please enter your name:");
    user = new Player(userName);
    dealer = new Player("dealer");
    displayConsole = new DisplayConsole();
    //give 2 cards each to the UserPlayer and dealer and create for-loop
    for (var i = 1; i <= 2; i++) {
      user.addCard(deck.dealNextCard());
      dealer.addCard(deck.dealNextCard());
    }
    //
    displayConsole.displayOnScreen("These are the cards for Player :" + user.name + "</br>" + user.getCardOnHand());
    if (user.sumOfHand() == 21) {
      displayConsole.displayOnScreen("</br>Congratulations " + user.name + " you won the Blackjack game!!");
    } else {
      hideElementById("start_id");
      showElementById("hit_id");
      showElementById("stand_id");
      displayConsole.displayOnScreen("</br>Please choose your next move by clicking Hit or Stand");

    }
  }
}
var gameRunner = new GameRunner();

function hit() {
  user.addCard(deck.dealNextCard());
  displayConsole.cleanDisplay();
  displayConsole.displayOnScreen("These are the cards for Player : " + user.name + "</br>" + user.getCardOnHand());
  var sumOfCards = user.sumOfHand();
  if (sumOfCards == 21) {
    showElementById("start_id");
    hideElementById("hit_id");
    hideElementById("stand_id");
    displayConsole.displayOnScreen("</br>Congratulations " + user.name + " you won the Blackjack game!!");
    displayConsole.displayOnScreen("Click 'Start Game' to Play again or 'Exit Game' to end Play ");
  } else if (sumOfCards > 21) {
    showElementById("start_id");
    hideElementById("hit_id");
    hideElementById("stand_id");
    displayConsole.displayOnScreen("You point is " + sumOfCards + ". You are BUSTED " + user.name + ".");
    displayConsole.displayOnScreen("Click 'Start Game' to Play again or 'Exit Game' to end Play ");
  } else {
    showElementById("hit_id");
    showElementById("stand_id");
    displayConsole.cleanDisplay();
    displayConsole.displayOnScreen("These are the cards for Player : " + user.name + "</br>" + user.getCardOnHand());
    displayConsole.displayOnScreen("</br>Please choose your next move by clicking Hit or Stand");
  }
}

function displayDealerAndUserCards(){
  displayConsole.displayOnScreen("These are the cards for Player : " + user.name + "</br>" + user.getCardOnHand());
  displayConsole.displayOnScreen(user.name + " Sum : "  + user.sumOfHand() +"</br></br>");
  displayConsole.displayOnScreen("These are the cards for Dealer : </br>" + dealer.getCardOnHand());
  displayConsole.displayOnScreen("Dealer Sum  : "  + dealer.sumOfHand() +"</br>");
}


function stand() {
  var sumOfDealerCards = dealer.sumOfHand();
  var sumOfUserCards = user.sumOfHand();
  displayConsole.cleanDisplay();
  displayDealerAndUserCards();
  while(true){
  if (sumOfDealerCards == 21){
    showElementById("start_id");
    hideElementById("hit_id");
    hideElementById("stand_id");
    displayConsole.displayOnScreen("Dealer Sum  : "  + dealer.sumOfHand() +"</br></br>");
    displayConsole.displayOnScreen("Dealer Won !!!"+ user.name + " Lost");
    displayConsole.displayOnScreen("Click 'Start Game' to Play again or 'Exit Game' to end Play ");
    break;
  } else  if (sumOfDealerCards > 21){
    displayConsole.displayOnScreen("Dealer Sum  : "  + dealer.sumOfHand() +"</br></br>");
    displayConsole.displayOnScreen("Dealer Lost "+ user.name + " Won !!!");
    displayConsole.displayOnScreen("Click 'Start Game' to Play again or 'Exit Game' to end Play ");
    break;
  } else if (sumOfDealerCards > sumOfUserCards ) {
    displayConsole.displayOnScreen("Dealer Sum  : "  + dealer.sumOfHand() +"</br></br>");
    displayConsole.displayOnScreen("Dealer Won !!!"+ user.name + " Lost the Blackjack game!! ");
    displayConsole.displayOnScreen("Click 'Start Game' to Play again or 'Exit Game' to end Play ");
    break;
  } else {
    var dealerNextCard = deck.dealNextCard();
    dealer.addCard(dealerNextCard);
    sumOfDealerCards = dealer.sumOfHand();
    displayConsole.displayOnScreen("Dealer draws next card "+ dealerNextCard.toString()+"</br>");
  }
}
}
function exitGame() {
  hideElementById("hit_id");
  hideElementById("stand_id");
  hideElementById("start_id");

  if (displayConsole == null) {
    displayConsole = new DisplayConsole();
  }
  displayConsole.cleanDisplay();
    if (user == null) {
      displayConsole.displayOnScreen("Bye See you soon. Please close the window.");
    } else {
      displayConsole.displayOnScreen("Bye " + user.name + ". Thank you for playing. See you soon. Please close the window.");
    }
}

function main() {
  //  gameRunner = new GameRunner();
  this.gameRunner.runGame();
}
// all test
// //Create an instance of card.
//var card1 = new Card(Suit.Club, 1);
//var card2 = new Card(Suit.Diamond, 2);
//console.log("created card1 " + card1);
//console.log("created card2  " + card2);
//var deck1 = new Deck(1, false);
// console.log("created Deck with size  " + deck1.cardsArray);
