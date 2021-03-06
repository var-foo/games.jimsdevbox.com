angular.module('app').controller('TripeaksCtrl', function($scope, Deck, Field, Hole, Hand, Options, Score, Modal){
    "use strict";
    console.log('controller loaded');
    var adjustScoreForNewHand = function(){
        var cardsToCount = Field.getCards(true);
        return Score.resetForNewHand().decrementScore(cardsToCount.length * 5);
    };

    var deal = function(){
        var hands = {field: 30, hole: 26};
        var newDeal = Deck.shuffle().shuffle().deal(hands);

        $scope.score = adjustScoreForNewHand();

        $scope.fieldCards = newDeal.field;
        $scope.hole = newDeal.hole;

        Field.registerFieldCards($scope.fieldCards);
        Hole.registerHoleCards($scope.hole).passCardToHand();
        $scope.hand = Hand.getCard();

    };

    $scope.options = Options.getOptions();

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
        $scope.hand = n;
    });

    // watch the score for changes
    $scope.$watch(function(){
        return Score.getScore();
    }, function(n){
        $scope.score = n;
    }, true);


    $scope.getHandInfo = function(){
        return $scope.hand;
    };

    $scope.getCardInfo = function(idx){
        $scope.fieldCards[idx].index = idx;
        return $scope.fieldCards[idx];
    };

    $scope.holeClick = function(){
        $scope.score = Score.decrementScore(5);
        Hole.passCardToHand();
    };

    $scope.newHand = function(){
        var modalDefaults = {
            templateUrl: '/modules/tripeaks/newHand/newHandModal.html',
            controller: 'newHandCtrl'
        };

        if(Field.getCards(true).length && $scope.hole.length && $scope.options.showConfirmationModal){

            Modal.showModal(modalDefaults, {}).then(function () {
                deal();
            });
        } else{
            deal();
        }
    };

    $scope.setOptions = function(){
        var modalDefaults = {
            templateUrl: '/modules/tripeaks/game/optionsModal.html',
            controller: 'OptionsCtrl'
        };

        Modal.showModal(modalDefaults, {}).then(function (data) {
            $scope.options = Options.setOptions(data);
        });
    };

    // Warn the user and adjust the score if they leave the page
    $(window).on('beforeunload', function(e){

        if(Field.getCards(true).length && $scope.hole.length) {
            e.preventDefault();
            return 'If you leave this page, you will lose ' + (Field.getCards(true).length * $scope.options.amountToDecrement) + ' points!';
        }
    });
    $(window).on('unload', function(){
        adjustScoreForNewHand();
    });
});
