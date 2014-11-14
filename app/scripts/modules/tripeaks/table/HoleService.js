angular.module('tripeaks').factory('Hole', function(Hand){
    "use strict";
    var cards = [];

    return {
        registerHoleCards: function(c){
            cards = c;
            return this;
        },

        passCardToHand: function(){
            Hand.receiveCard(cards.pop());
            return cards;
        }
    };
});
