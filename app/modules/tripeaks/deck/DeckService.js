angular.module('tripeaks').factory('Deck', function(Card){
    "use strict";
    var cards = [],
        newCards = function () {
            var i,
                suit,
                number;
            for (i = 0; i < 52; i++) {
                suit = i % 4 + 1;
                number = i % 13 + 1;
                cards.push(Card.getCard(suit, number));
            }

        };

    newCards();

    return {
        /**
         * Shuffles the deck. This method is chainable.
         * @returns this
         */
        shuffle: function(){
            for (var j, x, i = cards.length; i; j = parseInt(Math.random() * i, 10), x = cards[--i], cards[i] = cards[j], cards[j] = x) {
                // Crazy shuffle routine.
            }
            // Make the API fluent!
            return this;
        },

        /**
         * Deals to the array of hands.
         * @param {object} hands The object of key value pairs. The keys should be the player names and the values should be how many cards to deal that player.
         * This will return the same object except instead of the number of cards as the value, there will simply be an array of that many cards
         * @returns {object}
         *
         * {playerOne: 7, playerTwo: 7, playerThree: 7, dealer: 31}
         */
        deal: function(hands){
            var i, arrCards;
            for(var prop in hands){
                if(hands.hasOwnProperty(prop)){
                    arrCards = [];
                    for(i = 0; i < hands[prop]; i++){
                        if(cards.length){
                            arrCards.push(cards.pop());
                        }else{
                            throw new Error('There are no cards left in the deck, but you are asking me to deal ' + (hands[prop] - i) + ' more cards to ' + prop + '! Aborting...');
                        }

                    }
                    hands[prop] = arrCards;
                }
            }
            return hands;
        }
    };
});
