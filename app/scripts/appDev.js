// Secret Development Environment Bootstrap
// ---------------------------------------
// This file is included when we're in a development
// environment.

// Swap out the ng-app value for our fake back-end. Since this file is only included when run in a dev build, the app will only be set to dev
// for dev mode. Furthermore, we can tell immediately if we screwed up a build just by checking the ng-app attribute on the body.
document.getElementsByTagName("html")[0].setAttribute('data-ng-app', 'appDev');

angular.module('appDev', ['app', 'ngMockE2E', 'vf.mocks']).run(function (
    $httpBackend) {

    'use strict';

    // Allow views through
    $httpBackend.whenGET(/\.\.\/views\/.*/).passThrough();

}).config(function($provide) {
    "use strict";
    $provide.decorator('$httpBackend', function($delegate) {
        // Change your delay here...
        var amtToDelay = 0;
        var proxy = function(method, url, data, callback, headers) {
            var interceptor = function() {
                var _this = this,
                    _arguments = arguments;
                setTimeout(function() {
                    callback.apply(_this, _arguments);
                }, amtToDelay);
            };
            return $delegate.call(this, method, url, data, interceptor, headers);
        };
        for(var key in $delegate) {
            proxy[key] = $delegate[key];
        }
        return proxy;
    });
});
