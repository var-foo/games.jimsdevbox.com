angular.module('tripeaks').directive('tpField', function(defaults, Field){
    "use strict";

    return {
        transclude: true,
        restrict: "A",
        replace: true,
        template: '<div id="field" data-ng-transclude></div>',
        controller: function(){

            this.registerCard = function(card, idx){
                if(idx > 17){
                    card.removeClass('back').addClass('front');
                }
                return this;
            };

            this.askToFlip = function(cardToFlip){
                var shouldFlip = true,
                    cards = Field.getCards(true),
                    cardToFlipTop = (cardToFlip.css('top') !== 0) ? parseInt(cardToFlip.css('top').slice(0, -2), 10) : 0,
                    cardToFlipLeft = (cardToFlip.css('left') !== 0) ? parseInt(cardToFlip.css('left').slice(0, -2), 10) : 0;

                angular.forEach(cards, function(fieldCard){
                    var $card = $('#' + fieldCard.id),
                        fieldCardTop = ($card.css('top') && $card.css('top') !== 0) ? parseInt($card.css('top').slice(0, -2), 10) : 0,
                        fieldCardLeft = ($card.css('left') && $card.css('left') !== 0) ? parseInt($card.css('left').slice(0, -2), 10) : 0;

                    // if ! the top of the fieldCard is one level below the cardToFlip and the fieldCard is immediately adjacent to the cardToFlip (meaning the fieldCard is covering the cardToFlip
                    if(fieldCardTop === (cardToFlipTop + defaults.topOffset) && (fieldCardLeft === (cardToFlipLeft + defaults.leftOffset) || fieldCardLeft === (cardToFlipLeft - defaults.leftOffset))){
                        shouldFlip = false;
                    }
                });

                return shouldFlip;
            };
        }
    };
});
