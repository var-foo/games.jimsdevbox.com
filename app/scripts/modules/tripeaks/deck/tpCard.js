angular.module('tripeaks').directive('tpCard', function($timeout, Field, $animate){
    "use strict";

    return {
        require: '^tpField',
        scope: {
            card: '='
        },
        link: function(scope,elem,attrs,tpField){
            // Timeout is here because isPeak doesn't calculate right away, so this avoids the race condition
            $timeout(function(){
                tpField.registerCard(elem);
                scope.card.id = attrs.id;
                scope.card.isPeak = elem.hasClass('peak');
                elem.click(function(){
                    Field.removeFieldCard(scope.card);
                });
            });

            scope.$on('fieldCardRemoved', function(){
                $timeout(function(){
                    if(tpField.askToFlip(elem, scope.card.value) && elem.hasClass('back')){
                        $animate.removeClass(elem, 'back');
                        $animate.addClass(elem, 'front');
                    }
                });

            });
        }
    };
});
