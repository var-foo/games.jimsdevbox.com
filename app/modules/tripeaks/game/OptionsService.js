angular.module('tripeaks').factory('Options', function(){
    "use strict";

    var optionsObj = {
        amountToDecrement: 5,
        peakBaseValue: 15,
        showConfirmationModal: true,
        showIncrementer: true,
        showStats: true
    };

    return {
        getOptions: function(){
            return optionsObj;
        },
        setOptions: function(obj){
            optionsObj = obj;
            return optionsObj;
        }
    };
});
