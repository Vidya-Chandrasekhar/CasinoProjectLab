# CASINO- BLACKJACK

### Blackjack casino game

## Objectives

1. Demonstrate the use of Jasmine testing framework to test Javascript
2. Demonstrate my knowledge in Object Oriented Javascript
3. Demonstrate DOM manipulation using JavaScript
4. Demonstrate the usage of Bootstrap CSS Library to style HTML elements

## About the game:

This project simulates the popular Casino game - Blackjack .
The following features are implemented

The program plays the part of the DEALER. The USER/PLAYER can sign in , enter an Initial amount for the game, then decide the amount he/she wants to use as a bet to participate in the game. He/ she can selected from features like HIT , STAND , START NEW GAME and EXIT the game. The System keeps track of the sum of the cards on hand, the current dollar amount in the users account and gives the user appropriate feedback.

## DESIGN

This application has a single HTML page, which imports the Bootstrap CSS library and the main JavaScript file (src/blackjack.js).

Domain Classes:
Card - domain Object that represents a card.
Suit - enumeration stands for Club, Diamond,Spade, Heart
Deck - which holds an  entire deck of cards (52 cards)
Player - is a domain object which stands for the individual player in the game(USER/DEALER).Player will have a name and a cardOnHand collection[]

Driver Program - GameRunner function class, this is a driver class which coordinates and controls the game

Extra additional methods are created which are called from HTML to manage the game.
