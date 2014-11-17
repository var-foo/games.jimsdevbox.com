/**
 * https://github.com/adamalbrecht/ngModal
 *
 * ## Inline Options

 There are a few options that be configured inline with attributes.

 | Option         | Default | Description                                                       |
 | -------------- | ------- | ----------------------------------------------------------------- |
 | dialog-title   | null    | Title placed in the header of the modal dialog.                   |
 | width          | 50%     | Width of the dialog. Can be specified in px or %.                 |
 | height         | 50%     | Height of the dialog. Can be specified in px or %.                |
 | on-close       | null    | Call a function when the dialog is closed. Ex: `on-close='foo()'` |

 **Example:**

 ```html
 <modal-dialog show='dialogShown' dialog-title='My Dialog' height='400px' width='75%'>
 <p>Dialog content goes in here</p>
 </modal-dialog>
 ```
 */
angular.module('app').directive('modalDialog', function() {
    "use strict";

    return {
        restrict: 'E',
        scope: {
            show: '=',
            dialogTitle: '@',
            onClose: '&?'
        },
        replace: true,
        transclude: true,
        link: function(scope, element, attrs) {
            scope.hideModal = function() {
                return scope.show = false;
            };
            scope.$watch('show', function(newVal, oldVal) {
                if (newVal && !oldVal) {
                    document.getElementsByTagName("body")[0].style.overflow = "hidden";
                } else {
                    document.getElementsByTagName("body")[0].style.overflow = "";
                }
                if ((!newVal && oldVal) && (scope.onClose !== null)) {
                    return scope.onClose();
                }
            });
            scope.dialogStyle = {};
            if (attrs.width) {
                scope.dialogStyle.width = attrs.width;
            }
            if (attrs.height) {
                scope.dialogStyle.height = attrs.height;
            }
        },
        template: "<div class='ng-modal' ng-show='show'>\n  <div class='ng-modal-overlay' ng-click='hideModal()'></div>\n  <div class='ng-modal-dialog' ng-style='dialogStyle'>\n    <span class='ng-modal-title' ng-show='dialogTitle && dialogTitle.length' ng-bind='dialogTitle'></span>\n    <div class='ng-modal-close' ng-click='hideModal()'>\n      <div><span class='ng-modal-close-x'>X</span></div>\n    </div>\n    <div class='ng-modal-dialog-content' ng-transclude></div>\n  </div>\n</div>"
    };
});
