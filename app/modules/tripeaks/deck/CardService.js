angular.module('tripeaks').factory('Card', function(defaults){
    "use strict";
    var suit, number;

    var getSuit = function(){
        var suitName = '';
        switch (suit) {
            case 1:
                suitName = "Hearts";
                break;
            case 2:
                suitName = "Clubs";
                break;
            case 3:
                suitName = "Spades";
                break;
            case 4:
                suitName = "Diamonds";
                break;
        }
        return suitName;
    };

    var getSymbol = function(){
        var suitName = '';
        switch (suit) {
            case 1:
                suitName = "&hearts;";
                break;
            case 2:
                suitName = "&clubs;";
                break;
            case 3:
                suitName = "&spades;";
                break;
            case 4:
                suitName = "&diams;";
                break;
        }
        return suitName;
    };

    var getValue = function(){
        return number;
    };

    var getName = function(){
        var cardName = '';
        switch (number) {
            case 1:
                cardName = "A";
                break;
            case 13:
                cardName = "K";
                break;
            case 12:
                cardName = "Q";
                break;
            case 11:
                cardName = "J";
                break;
            default:
                cardName = number;
                break;
        }
        return cardName;
    };

    var getBackgroundPosition = function(){
        var bgp,
            posX = 0,
            posY = 0,
            borderWidth = 1;
        switch (getSuit()) {
            case "Clubs":
                // Nothing to do here.
                break;
            case "Diamonds":
                posX = defaults.cardWidth;
                break;
            case "Hearts":
                posX = defaults.cardWidth * 2;
                break;
            case "Spades":
                posX = defaults.cardWidth * 3;
                break;
        }
        switch (getName()) {
            case 2:
                // Nothing to do here.
                break;
            case 3:
                posY = defaults.cardHeight;
                break;
            case 4:
                posY = defaults.cardHeight * 2;
                break;
            case 5:
                posY = defaults.cardHeight * 3;
                break;
            case 6:
                posY = defaults.cardHeight * 4;
                break;
            case 7:
                posY = defaults.cardHeight * 5;
                break;
            case 8:
                posY = defaults.cardHeight * 6;
                break;
            case 9:
                posY = defaults.cardHeight * 7;
                break;
            case 10:
                posY = defaults.cardHeight * 8;
                break;
            case "J":
                posY = defaults.cardHeight * 9;
                break;
            case "Q":
                posY = defaults.cardHeight * 10;
                break;
            case "K":
                posY = defaults.cardHeight * 11;
                break;
            case "A":
                posY = defaults.cardHeight * 12;
                break;
        }
        posX += borderWidth;
        posY += borderWidth;
        bgp = "-" + posX + "px -" + posY + "px";
        return bgp;
    };


    return {
        getCard: function(s, n){
            suit = s;
            number = n;

            return {
                suit: getSuit(),
                symbol: getSymbol(),
                value: getValue(),
                name: getName(),
                backgroundPosition: getBackgroundPosition()
            };

        }
    };
});
