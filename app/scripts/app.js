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
    'tripeaks'
]).config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    'use strict';

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
        });

});
