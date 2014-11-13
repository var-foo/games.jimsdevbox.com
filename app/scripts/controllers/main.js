angular.module('app').controller('MainCtrl', function($scope){
    'use strict';

    $scope.pages = [
        {title: 'Home', href: '/', target: '_self'}
    ];
});
