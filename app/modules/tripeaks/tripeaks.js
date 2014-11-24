angular.module('tripeaks', []).config(function ($stateProvider) {
    'use strict';
    console.log('tripeaks file running');
    $stateProvider
        .state('app.tripeaks', {
            url: 'tripeaks',
            templateUrl: '/modules/tripeaks/game/game.html',
            controller: 'TripeaksCtrl',
            onEnter: function(){console.log('in tripeaks');}
        });

});
