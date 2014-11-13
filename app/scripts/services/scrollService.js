/**
 * @ngdoc service
 * @name scrollService
 * @description Basic anchorscroll (overrides what angular does natively)
 */
angular.module('app').service('scrollService', function scrollService($anchorScroll, $location) {
    'use strict';

    /**
     * @ngdoc method
     * @name scrollService#scroll
     * @param {string} hashToScroll The hash to scroll to
     * @description Scrolls to the given hash without messing up `$location.hash()`
     */
    this.scroll = function (hashToScroll) {
        var old = $location.hash();

        $location.hash(hashToScroll);
        $anchorScroll();
        // Without doing this, angular picks up a route change. I would like to fix that.
        $location.hash(old);
    };
});
