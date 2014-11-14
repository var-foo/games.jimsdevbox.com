angular.module('tripeaks').factory('Field', function(Hand, Score){
    "use strict";

    var handVal = null;

    var fieldCards = [];

    return {
        registerHandCard: function(val){
            handVal = val;
            return this;
        },

        getHandVal: function(){
            return handVal;
        },

        removeFieldCard: function(card){
            var fieldVal = card.value;
            console.log('field card to remove', card);

            // make a copy of the card so we can keep the field array the same length
            var cardForHand = $.extend({}, card);
            if((fieldVal === handVal + 1 || fieldVal === handVal -1) || (fieldVal === 1 && handVal === 13) || (fieldVal === 13 && handVal === 1)){
                Hand.receiveCard(cardForHand);
                fieldCards[card.index].value = null;
                Score.addToScore(card.isPeak);
                return true;
            } else{
                return false;
            }

        },
        registerFieldCards: function(cards){
            fieldCards = cards;
            console.log('field cards', fieldCards);
        },
        getCards: function(){
            return fieldCards;
        }
    }
});
