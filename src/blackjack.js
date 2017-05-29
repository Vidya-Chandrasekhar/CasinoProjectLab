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
    this.cardHandCurrentIndex = 0;

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


//a class to print info into the browser
function DisplayConsole() {
  var txt = "";
  this.displayOnScreen = function(stringValue) {
    txt += stringValue;
    document.getElementById("text_display").innerHTML = txt;
  }
  this.cleanDisplay = function() {
    txt = "";
    document.getElementById("text_display").innerHTML = txt;
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
var despositAmount = 0.00;
var betAmount = 0.00;
var currentAmount = 0.00;

function GameRunner() {
  console.log("GameRunner created");
  this.runGame = function() {
    betAmount = prompt("Please enter your bet amount (should be less than or equal to your current Amount): ", 0.00 );
    while  (betAmount > currentAmount){
      betAmount = prompt("Please enter your bet amount : ", 0.00 );
    }
    currentAmount= currentAmount - betAmount;
    displayCurrentAndBetAmount(currentAmount,betAmount);
    deck = new Deck(1, true);
    dealer = new Player("dealer");
    displayConsole = new DisplayConsole();
    //give 2 cards each to the UserPlayer and dealer and create for-loop
    for (var i = 1; i <= 2; i++) {
      user.addCard(deck.dealNextCard());
      dealer.addCard(deck.dealNextCard());
    }

    displayConsole.displayOnScreen("These are the cards for Player :" + user.name + "</br>" + user.getCardOnHand());
    if (user.sumOfHand() == 21) {
      updateWinDisplay();
      displayConsole.displayOnScreen("</br>Congratulations " + user.name + " you won the Blackjack game!!");
    } else {
      hideElementById("start_id");
      showElementById("hit_id");
      showElementById("stand_id");
      displayConsole.displayOnScreen("</br>Please choose your next move by clicking Hit or Stand");

    }
  }
}


function updateWinDisplay() {
  currentAmount = currentAmount + betAmount*2;
  betAmount =0.00 ;
  displayCurrentAndBetAmount(currentAmount,0.00);
  displayConsole.cleanDisplay();
  user.emptyHand();
  dealer.emptyHand();
  deck = new Deck(1, true);
}

function updateLossDisplay() {
  betAmount =0.00 ;
  displayCurrentAndBetAmount(currentAmount,0.00);
  displayConsole.cleanDisplay();
  user.emptyHand();
  dealer.emptyHand();
  deck = new Deck(1, true);
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
    updateWinDisplay();
    displayConsole.displayOnScreen("</br>Congratulations " + user.name + " you won the Blackjack game!!");
    displayConsole.displayOnScreen("Click 'Start Game' to Play again or 'Exit Game' to end Play ");
    } else if (sumOfCards > 21) {
    showElementById("start_id");
    hideElementById("hit_id");
    hideElementById("stand_id");
    updateLossDisplay();
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

function displayDealerAndUserCards() {
  displayConsole.displayOnScreen("These are the cards for Player : " + user.name + "</br>" + user.getCardOnHand());
  displayConsole.displayOnScreen(user.name + " Sum : " + user.sumOfHand() + "</br></br>");
  displayConsole.displayOnScreen("These are the cards for Dealer : </br>" + dealer.getCardOnHand());
  displayConsole.displayOnScreen("Dealer Sum  : " + dealer.sumOfHand() + "</br>");
}


function stand() {
  var sumOfDealerCards = dealer.sumOfHand();
  var sumOfUserCards = user.sumOfHand();
  displayConsole.cleanDisplay();
  displayDealerAndUserCards();
  while (true) {
    if (sumOfDealerCards == 21) {
      showElementById("start_id");
      hideElementById("hit_id");
      hideElementById("stand_id");
      displayConsole.displayOnScreen("Dealer Sum  : " + dealer.sumOfHand() + "</br></br>");
      updateLossDisplay();
      displayConsole.displayOnScreen("Dealer Won !!!" + user.name + " Lost");
      displayConsole.displayOnScreen("Click 'Start Game' to Play again or 'Exit Game' to end Play ");
      showElementById("start_id");
      break;
    } else if (sumOfDealerCards > 21) {
      displayConsole.displayOnScreen("Dealer Sum  : " + dealer.sumOfHand() + "</br></br>");
      updateWinDisplay();
      displayConsole.displayOnScreen("Dealer Lost " + user.name + " Won !!!");
      displayConsole.displayOnScreen("Click 'Start Game' to Play again or 'Exit Game' to end Play ");
      showElementById("start_id");
      break;
    } else if (sumOfDealerCards > sumOfUserCards) {
      displayConsole.displayOnScreen("Dealer Sum  : " + dealer.sumOfHand() + "</br></br>");
      updateLossDisplay();
      displayConsole.displayOnScreen("Dealer Won !!!" + user.name + " Lost the Blackjack game!! ");
      displayConsole.displayOnScreen("Click 'Start Game' to Play again or 'Exit Game' to end Play ");
      showElementById("start_id");
      break;
    } else {
      var dealerNextCard = deck.dealNextCard();
      dealer.addCard(dealerNextCard);
      sumOfDealerCards = dealer.sumOfHand();
      displayConsole.displayOnScreen("Dealer draws next card " + dealerNextCard.toString() + "</br>");
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

function displayInitialAmount(despositAmount) {
  document.getElementById("initial-amount-id").innerHTML = "Desposit Amount : " + despositAmount;
}

function displayCurrentAndBetAmount(currentAmount, betAmount) {
document.getElementById("current-amount-id").innerHTML = "Current Amount : " + parseInt(currentAmount, 10) ;
document.getElementById("bet-amount-id").innerHTML = "Bet Amount : " + parseInt(betAmount, 10) ;
}


function enterNameAmount() {
  var userName = document.getElementById("name-input-id").value;
  user = new Player(userName);
  despositAmount = parseFloat(document.getElementById("deposit-amount-input-id").value);
  currentAmount = currentAmount + despositAmount;
  displayInitialAmount(despositAmount);
  displayCurrentAndBetAmount(currentAmount, betAmount);
  document.getElementById("deposit-amount-input-id").value=0;
  showElementById("start_id");

}

function main() {
  // gameRunner = new GameRunner();
  if (displayConsole !== null) {
    displayConsole.cleanDisplay();
  }
  this.gameRunner.runGame();
}
hideElementById("hit_id");
hideElementById("stand_id");
hideElementById("start_id");
