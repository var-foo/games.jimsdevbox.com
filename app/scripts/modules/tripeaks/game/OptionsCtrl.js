angular.module('tripeaks').controller('OptionsCtrl', function($scope, Options, Score, $modalInstance){
    $scope.options = Options.getOptions();
    console.log($scope.options);
    $scope.modalOptions = {
        closeButtonText: 'Cancel',
        actionButtonText: 'Save',
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
    }
});