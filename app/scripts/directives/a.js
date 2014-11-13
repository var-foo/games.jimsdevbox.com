/**
 * @ngdoc directive
 * @name a
 * @restrict E
 * @transclude
 * @description
 * Extend the angular anchor directive to allow for disabled hrefs and also remove any click events.
 *
 * @element a
 * @scope
 * @example
 <example>
 <a href="http://example.com" ng-disabled="true">Example Disabled</a>
 </example>
 */
angular.module('app').directive('a', function () {
    'use strict';

    return {
        restrict: 'E',
        link: function (scope, element, attrs) {
            var appliedEvents = $._data(element[0], 'events'),
            // store events in case we re-enable
                eventsToBind = {
                    click: [] // This is the only event that I think we need to target, but if not we can extend it.
                },
            // remove any click events, and add an event that prevents following hrefs
                disable = function () {
                    var type,
                        i,
                        eventCount;

                    // Gather up any click events that are applied.
                    if (typeof appliedEvents === 'object') {
                        for (type in appliedEvents) {
                            if (appliedEvents.hasOwnProperty(type) && type === 'click') {
                                for (i = 0, eventCount = appliedEvents.click.length; i < eventCount; i++) {
                                    eventsToBind.click.push(appliedEvents.click[i].handler);
                                }
                                element.off('click');
                            }
                        }
                    }
                    // Bind an event that will effectively disable this anchor.
                    element.on('click.prevent', function (e) {
                        e.preventDefault();
                        return false;
                    });
                },
            // Remove the event that prevents following hrefs and reapply removed events
                enable = function () {
                    var i,
                        eventCount = eventsToBind.click.length;

                    // re-bind intended click events
                    for (i = 0; i < eventCount; i++) {
                        element.on('click', eventsToBind.click[i]);
                    }
                    element.off('click.prevent');
                };
            /**
             * Watch the ngDisabled property and react accordingly.
             */
            if(attrs.ngDisabled){
                scope.$watch(attrs.ngDisabled, function (newVal) {
                    if (newVal) {
                        disable();
                    } else {
                        enable();
                    }
                });
            }
        }
    };
});