angular.module('app').controller('HomeCtrl', function($scope, Deck, Field, Hole, Hand){
    "use strict";

    $scope.fieldCards = [];

    $scope.hand = null;

    $scope.hole = [];

    $scope.score = 0;

    $scope.cardsLeft = 0;

    $scope.currentRun = 0;
    $scope.bestRun = 0;
    $scope.allTimeBestRun = 0;

    $scope.$watch(function() {
            return Hand.getCard();
        }, function(n){
            console.log('Hand card changed', n);
            $scope.hand = n;
        });


    $scope.deal = function(){
        var newDeal = Deck.shuffle().shuffle().deal();

        $scope.fieldCards = newDeal.field;
        $scope.hole = newDeal.hole;

        Field.registerFieldCards($scope.fieldCards);
        Hole.registerHoleCards($scope.hole).passCardToHand();
        $scope.hand = Hand.getCard();

    };

    $scope.fieldClick = function(){
        $scope.$broadcast('cardRemovedFromField');
    };

    $scope.getHandInfo = function(){
        return $scope.hand;
    };

    $scope.getCardInfo = function(idx){
        $scope.fieldCards[idx].index = idx;
        return $scope.fieldCards[idx];
    }

    $scope.flipHoleCard = function(){
        Hole.passCardToHand();
    }

});
