angular.module('tripeaks').controller('newHandCtrl', function($scope, Field, Options, $modalInstance, $sce){
    "use strict";
    $scope.options = Options.getOptions();
    var pointsToLose = Field.getCards(true).length * $scope.options.amountToDecrement;

    $scope.modalOptions = {
        closeButtonText: 'No',
        actionButtonText: 'Yes',
        headerText: 'Start new Hand?',
        bodyText: $sce.trustAsHtml('Are you sure you want to Start a new hand? <strong>You will lose '+ pointsToLose +' points!</strong>'),
        ok: function (result) {
            $modalInstance.close(result);
        },
        close: function () {
            $modalInstance.dismiss('cancel');
        }
    };
});
