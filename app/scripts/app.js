/**
 * Angular Router and app config
 */

/** @namespace */
// Set up all the modules we are going to use in this application
angular.module('app', [
    'ui.router',
    'vfStyleResolve',
    'ngResource'
]).config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    'use strict';

    $locationProvider.html5Mode(true);

    $stateProvider
        .state('app', {
            abstract: true,
            url: '/',
            templateUrl: '../views/app.html',
            controller: 'MainCtrl'
        })
        .state('app.main', {
            url: '',
            templateUrl: '../views/partials/home.html',
            controller: 'HomeCtrl'
        });

    // Handles 404 and 401 errors.
    $httpProvider.interceptors.push(['$q', function($q) {
        return {
            'response': function(response) {
                // do something on success
                return response || $q.when(response);
            },

            'responseError': function(response) {
                var status = response.status,
                    loginUrl = "/login";

                // Unauthorized
                if(status === 401) {
                    window.location = loginUrl;
                    return;
                }
                // No results found, but the route is valid.
                if(status === 404 && typeof response.data !== "undefined") {
                    return response.data;
                }
                return $q.reject(response);
            }
        };
    }]);

}).run(function(){
    "use strict";
});
