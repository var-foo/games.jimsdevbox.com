/**
 * @ngdoc directive
 * @name link
 * @restrict A
 * @replace
 * @scope
 * @description Creates an anchor using an object literal for data. The element you use will be replaced by the
 * generated anchor.
 * @param {object} link An object containing a title and href property.
 * @param {string} class Optional class name to use on the anchor
 * @example
 <span class="customClass" data-link="{title:'I am the title attribute',href:'/link/to/page'}"></span>
 */
angular.module('app').directive('link', function () {
    'use strict';

    return {
        restrict: 'A',
        replace: true,
        scope: {
            link: '=' // {title:'',href:''}
        },
        template: '<a href="{{link.href}}" title="Click to view {{link.title}}">{{link.title}}</a>',
        link: function (scope, el, attr) {
            if (!!attr.target) {
                if(scope.link.href.indexOf('/v2') === -1){
                    el.attr('target', attr.target);
                } else{
                    el.removeAttr('target');
                }

            } else {
                el.removeAttr('target');
            }
        }
    };
});
