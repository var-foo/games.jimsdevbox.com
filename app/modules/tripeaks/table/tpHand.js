angular.module('tripeaks').directive('tpHand', function(Field){
    "use strict";

    return {
        scope: {
            card: '='
        },
        link: function(scope){
            scope.$watch('card', function(){
                if(scope.card){
                    Field.registerHandCard(scope.card.value);
                }
            });
        }
    };
});
