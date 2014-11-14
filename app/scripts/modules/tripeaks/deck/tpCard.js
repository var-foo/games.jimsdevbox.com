angular.module('tripeaks').directive('tpCard', function($timeout, Field){
    "use strict";

    return {
        require: '^tpField',
        scope: {
            card: '='
        },
        link: function(scope,elem,attrs,tpField){
            tpField.registerCard(elem);
            scope.card.id = attrs.id;
            // TODO: isPeak is not working
            scope.card.isPeak = elem.hasClass('peak');
            elem.click(function(){
                var handVal = Field.getHandVal();
                Field.removeFieldCard(scope.card);
                console.log('hand value', handVal);
            });

            scope.$on('cardRemovedFromField', function(){
                $timeout(function(){
                    if(tpField.askToFlip(elem)){
                        elem.removeClass('back').addClass('front');
                    }
                });

            });
        }
    };
});
