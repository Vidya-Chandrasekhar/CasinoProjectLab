//Testing method for card
describe("Card", function() {
  var card1;
  var card2;
  beforeEach(function() {
    card1 = new Card(Suit.Club, 1);
    card2 = new Card(Suit.Diamond, 13);
    //card1 = new Card(Suit.Club, 1);
    //  card2 = new Card(Suit.Diamond, 13);

    //TODO add more test cases
  });

  it("should be able to produce String Ace of Club", function() {
    expect(card1.toString()).toEqual("Ace of Club");
  });
  it("should be able to produce String King of Diamond", function() {
    expect(card2.toString()).toEqual("King of Diamond");
  });
})

// Testing methods for Deck
describe("Deck", function() {
  var deck1;
  var deck2;
  beforeEach(function() {
    deck1 = new Deck(1, false);
    deck2 = new Deck(2, false);
  });
  it("should be able to produce a Deck of 52 cards", function() {
    expect(deck1.cardsArray.length).toEqual(52);
  });
  it("should be able to produce a Deck of 104 cards", function() {
    expect(deck2.cardsArray.length).toEqual(104);
  });
  it("should be able to remove the first card on top, which should be Ace of club" +
    "then Two of Club followed by Three of Club ",
    function() {
      expect(deck1.dealNextCard().toString()).toEqual("Ace of Club");
      expect(deck1.dealNextCard().toString()).toEqual("Two of Club");
      expect(deck1.dealNextCard().toString()).toEqual("Three of Club");
    });
});

//Testing if sumOfHand hand works

describe("Player", function() {
  var player1;
  var player2;
  beforeEach(function() {

    player1 = new Player("Pranav");
    player2 = new Player("Adarsh");
    card1 = new Card(Suit.Club, 1);
    card2 = new Card(Suit.Diamond, 13);

    player1.addCard(card1);
    player1.addCard(card2);
  });
  it("should give the sum of the value of the player's cards ", function() {
    expect(player1.sumOfHand()).toEqual(14);
  });
});
