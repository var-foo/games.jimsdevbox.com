angular.module('tripeaks').factory('Options', function(){
    "use strict";

    var optionsObj = {
        amountToDecrement: 5,
        showConfirmationModal: true,
        peakBaseValue: 15
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
})
