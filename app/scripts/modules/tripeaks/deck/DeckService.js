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
        shuffle: function(){
            for (var j, x, i = cards.length; i; j = parseInt(Math.random() * i, 10), x = cards[--i], cards[i] = cards[j], cards[j] = x) {
                // Crazy shuffle routine.
            }
            // Make the API fluent!
            return this;
        },
        deal: function(){
            var i, field = [], hole = [];
            if (!cards.length) {
                newCards();
                this.shuffle();
            }
            for (i = 0; i < 30; i++) {
                field.push(cards.pop());
            }
            for (i = 0; i < 22; i++) {
                hole.push(cards.pop());
            }

            return {
                field: field,
                hole: hole
            };
        }
    };
});
