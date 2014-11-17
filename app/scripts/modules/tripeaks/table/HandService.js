angular.module('tripeaks').factory('Hand', function(){
    "use strict";
    var card = null;

    return {
        receiveCard: function(c){
            card = c;
            //console.log('hand has received card', card);
            return this;
        },
        getCard: function(){
            return card;
        }
    };


});
