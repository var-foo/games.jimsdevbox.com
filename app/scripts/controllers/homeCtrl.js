angular.module('app').controller('HomeCtrl', function($scope, Deck, Field, Hole, Hand, Score){
    "use strict";

    $scope.fieldCards = [];

    $scope.hand = null;

    $scope.hole = [];

    $scope.cardsLeft = $scope.hole.length;

    $scope.$watch('hole.length', function(n){
        $scope.cardsLeft = n;
    });

    // watch the hand card for changes
    $scope.$watch(function() {
            return Hand.getCard();
        }, function(n){
            console.log('Hand card changed', n);
            $scope.hand = n;
        });

    // watch the score for changes
    $scope.$watch(function(){
        return Score.getScore();
    }, function(n){
        console.log('score changed');
        $scope.score = n.score;
        $scope.thisRun = n.thisRun;
        $scope.currentRun = n.currentRun;
        $scope.bestRun = n.bestRun;
        $scope.allTimeBestRun = n.allTimeBestRun;
    }, true);

    $scope.deal = function(){
        var newDeal = Deck.shuffle().shuffle().deal();
        Score.resetForNewHand();
        $scope.fieldCards = newDeal.field;
        $scope.hole = newDeal.hole;

        Field.registerFieldCards($scope.fieldCards);
        Hole.registerHoleCards($scope.hole).passCardToHand();
        $scope.hand = Hand.getCard();

    };

    $scope.getHandInfo = function(){
        return $scope.hand;
    };

    $scope.getCardInfo = function(idx){
        $scope.fieldCards[idx].index = idx;
        return $scope.fieldCards[idx];
    };

    $scope.holeClick = function(){
        Score.decrementScore(5);
        Hole.passCardToHand();
    };

});
