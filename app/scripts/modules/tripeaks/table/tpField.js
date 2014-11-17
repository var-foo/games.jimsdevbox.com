angular.module('tripeaks').directive('tpField', function($timeout, defaults, Field){
    "use strict";

    return {
        transclude: true,
        restrict: "A",
        replace: true,
        template: '<div id="field" data-ng-transclude></div>',
        controller: function(){

            this.registerCard = function(card){
                $timeout(function(){
                    if(card.attr('id').split('-')[1] > 18){
                        card.removeClass('back').addClass('front');
                    }
                });
                return this;
            };

            this.askToFlip = function(cardToFlip, cardValue){
                var shouldFlip = true,
                    cards = Field.getCards(),
                    cardToFlipTop = (cardToFlip.css('top') != 0) ? parseInt(cardToFlip.css('top').slice(0, -2), 10) : 0,
                    cardToFlipLeft = (cardToFlip.css('left') != 0) ? parseInt(cardToFlip.css('left').slice(0, -2), 10) : 0;

                if(cardValue === null){
                    return false;
                }
                console.log('asking to flip card', cardToFlip);

                angular.forEach(cards, function(fieldCard){
                    var $card = $('#' + fieldCard.id),
                        fieldCardTop = ($card.css('top') && $card.css('top') != 0) ? parseInt($card.css('top').slice(0, -2), 10) : 0,
                        fieldCardLeft = ($card.css('left') && $card.css('left') != 0) ? parseInt($card.css('left').slice(0, -2), 10) : 0;

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
