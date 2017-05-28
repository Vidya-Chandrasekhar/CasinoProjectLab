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
        j = 0,
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
    total = 0;
    numberOfAces = 0;
    //adding all the card values taking ace value as 11
    for (i = 0; i < this.cardHandCurrentIndex; i++) {
      if (this.cardHand[i].number == 1) {
        total += 11;
        numberOfAces++;
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
   for (var i=0; i<this.cardHand.length; i++) {
     returnString+= this.cardHand[i].toString();
}
    return returnString;
  }
}

function userInput() {
    var txt;
    var person = prompt("Please enter your name:", "Harry Potter");
    if (person == null || person == "") {
        txt = "User cancelled the prompt.";
    } else {
        txt = "Hello " + person + "! How are you today?";
    }
    document.getElementById("demo").innerHTML = txt;
}


// all test
// //Create an instance of card.
//var card1 = new Card(Suit.Club, 1);
//var card2 = new Card(Suit.Diamond, 2);
//console.log("created card1 " + card1);
//console.log("created card2  " + card2);
//var deck1 = new Deck(1, false);
// console.log("created Deck with size  " + deck1.cardsArray);
