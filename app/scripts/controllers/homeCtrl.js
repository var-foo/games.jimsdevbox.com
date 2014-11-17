angular.module('app').controller('HomeCtrl', function($scope, Deck, Field, Hole, Hand, Score, modalService, $sce){
    "use strict";

    var adjustScoreForNewHand = function(){
        var cardsToCount = Field.getCards(true);
        Score.decrementScore(cardsToCount.length * 5);
    };

    var deal = function(){
        var newDeal = Deck.shuffle().shuffle().deal();

        Score.resetForNewHand();

        adjustScoreForNewHand();

        $scope.fieldCards = newDeal.field;
        $scope.hole = newDeal.hole;

        Field.registerFieldCards($scope.fieldCards);
        Hole.registerHoleCards($scope.hole).passCardToHand();
        $scope.hand = Hand.getCard();

    };

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

    $scope.newHand = function(){
        var pointsToLose = Field.getCards(true).length * 5;

        var modalOptions = {
            closeButtonText: 'No',
            actionButtonText: 'Yes',
            headerText: 'Start new Hand?',
            bodyText: $sce.trustAsHtml('Are you sure you want to Start a new hand? <strong>You will lose '+ pointsToLose +' points!</strong>')
        };

        if(Field.getCards(true).length){
            modalService.showModal({}, modalOptions).then(function () {
                deal();
            });
        } else{
            deal();
        }
    };
});
