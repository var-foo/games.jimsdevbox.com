angular.module('tripeaks').directive('tpCard', function(Field, $animate){
    "use strict";

    return {
        require: '^tpField',
        scope: {
            card: '=',
            tpCard: '='
        },
        link: function(scope,elem,attrs,tpField){
            tpField.registerCard(elem, scope.tpCard);
            scope.card.id = attrs.id;
            scope.card.isPeak = scope.tpCard < 3;
            elem.click(function(){
                Field.removeFieldCard(scope.card);
            });

            scope.$on('fieldCardRemoved', function(){
                if(tpField.askToFlip(elem, scope.card.value) && elem.hasClass('back')){
                    $animate.removeClass(elem, 'back');
                    $animate.addClass(elem, 'front');
                }
            });
        }
    };
});
