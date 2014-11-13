/**
 * @ngdoc module
 * @name vfStyleResolve
 * @description
 *
 * This will resolve a stylesheet for a route.
 *
 * In your $routeProvider, pass a 'css' property that will be used to load the stylesheet(s) unique to that route.
 *
 * ```
 * $routeProvider.when('', {
 *  templateUrl: 'path/to/template.html',
 *  controller: 'SomeController',
 *  css: 'path/to/style.css'
 * });
 * ```
 * An array of paths can be used:
 *
 * ```
 * $routeProvider.when('', {
 *  templateUrl: 'path/to/template.html',
 *  controller: 'SomeController',
 *  css: ['path/to/style1.css', 'path/to/style2.css']
 * });
 * ```
 *
 */
angular
    .module('vfStyleResolve', ['ui.router'])
    .factory('sheet', function sheetFactory($compile) {
        'use strict';

        var sheets = {},
            forceArray = function (input) {
                return (angular.isArray(input)) ? input : [input];
            };

        return {
            html: '<link rel="stylesheet" data-ng-repeat="(routeCtrl, cssUrl) in routeStyles" data-ng-href="{{cssUrl}}">',
            add: function (stylesToAdd){
                stylesToAdd = forceArray(stylesToAdd);
                angular.forEach(stylesToAdd, function(sheet){
                    sheets[sheet] = sheet;
                });
            },
            delete: function (stylesToDelete){
                stylesToDelete = forceArray(stylesToDelete);

                angular.forEach(stylesToDelete, function(sheet){
                    delete sheets[sheet];
                });
            },
            inject: function (scope){
                angular.element('head').append($compile(this.html)(scope));
            },
            styles: sheets
        };
    })
    .run(function($rootScope, $compile, sheet){
        'use strict';

        var scope = $rootScope.$new();

        sheet.inject(scope);

        // An object that will contain the styles for this route
        scope.routeStyles = sheet.styles;

        $rootScope.$on('$stateChangeSuccess', function (e, toState, toParams, fromState) {
            if(fromState && fromState.css){
                sheet.delete(fromState.css);
            }
            if(toState && toState.css){
                sheet.add(toState.css);
            }
        });
    });
