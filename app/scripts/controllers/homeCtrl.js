angular.module('app').controller('HomeCtrl', function($scope, Deck){
    "use strict";

    $scope.fieldCards = [];

    $scope.hand = [];

    $scope.score = 0;

    $scope.cardsLeft = 0;

    $scope.currentRun = 0;
    $scope.bestRun = 0;
    $scope.allTimeBestRun = 0;


    $scope.deal = function(){
        var newDeal = Deck.shuffle().shuffle().deal();

        $scope.fieldCards = newDeal.field;
        $scope.hand = newDeal.hand;
    };

});
