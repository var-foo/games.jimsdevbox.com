angular.module('tripeaks').controller('OptionsCtrl', function($scope, Options, Score, $modalInstance){
    "use strict";

    $scope.options = Options.getOptions();

    $scope.modalOptions = {
        actionButtonText: 'Ok',
        headerText: 'Game Options',
        ok: function (result) {
            $modalInstance.close(result);
        },
        close: function () {
            $modalInstance.dismiss('cancel');
        }
    };

    $scope.resetScore = function(){
        Score.resetScore();
    };
});
