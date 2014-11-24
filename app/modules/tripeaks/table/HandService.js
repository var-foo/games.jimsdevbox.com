angular.module('tripeaks').factory('Hand', function(){
    "use strict";
    var card = null;

    return {
        receiveCard: function(c){
            card = c;
            return this;
        },
        getCard: function(){
            return card;
        }
    };


});
