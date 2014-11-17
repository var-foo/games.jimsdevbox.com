angular.module('tripeaks').directive('tpCard', function($timeout, Field){
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
                    var handVal = Field.getHandVal();
                    Field.removeFieldCard(scope.card);
                    //console.log('hand value', handVal);
                });
            });


            scope.$on('fieldCardRemoved', function(){
                $timeout(function(){
                    console.log('fielCardClicked', scope);
                    if(tpField.askToFlip(elem, scope.card.value)){
                        elem.removeClass('back').addClass('front');
                    }
                });

            });
        }
    };
});
