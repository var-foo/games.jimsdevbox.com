/**
 * Angular Router and app config
 */

/** @namespace */
// Set up all the modules we are going to use in this application
angular.module('app', [
    'ngAnimate',
    'ui.router',
    'ui.bootstrap',
    'LocalStorageModule',
    'oc.lazyLoad'
]).config(function ($stateProvider, $urlRouterProvider, $locationProvider, $ocLazyLoadProvider) {
    'use strict';

    //$ocLazyLoadProvider.config({
    //    debug: true
    //});

    $locationProvider.html5Mode(true);

    $stateProvider
        .state('app', {
            abstract: true,
            url: '/',
            templateUrl: '../views/app.html'
        })
        .state('app.main', {
            url: '',
            templateUrl: '../views/partials/home.html',
            controller: 'MainCtrl'
        })

        .state('app.tripeaks', {
            url: 'tripeaks',
            templateUrl: '/views/partials/tripeaks.html',
            controller: 'TripeaksCtrl',
            resolve: {
                loadTripeaks: function($ocLazyLoad){
                    return $ocLazyLoad.load({
                        name: 'tripeaks',
                        files: ['/modules/tripeaks/tripeaks.js', '/modules/tripeaks/defaults.js', '/modules/tripeaks/deck/CardService.js', '/modules/tripeaks/deck/DeckService.js', '/modules/tripeaks/deck/tpCard.js', '/modules/tripeaks/game/ModalService.js', '/modules/tripeaks/game/OptionsService.js', '/modules/tripeaks/game/OptionsCtrl.js', '/modules/tripeaks/game/ScoreService.js', '/modules/tripeaks/newHand/newHandCtrl.js', '/modules/tripeaks/table/FieldService.js', '/modules/tripeaks//table/HandService.js', '/modules/tripeaks/table/HoleService.js', '/modules/tripeaks/table/tpField.js', '/modules/tripeaks/table/tpHand.js']
                    });
                }

            },
            onEnter: function(){console.log('in tripeaks state');}
        });

});
