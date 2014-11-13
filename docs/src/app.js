angular.module('app', [
  'ngSanitize',
  'DocsController'
])


.config(function($locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
});
