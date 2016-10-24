'use strict';

angular.module('Authentication')

.controller('LoginController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService',
    function ($scope, $rootScope, $location, AuthenticationService) {
        //Elimina cookie
        AuthenticationService.ClearCredentials();

        $scope.login = function () {
            $scope.dataLoading = true;
            AuthenticationService.Login($scope.username, $scope.password, function (response) {
                if (response.status === 200) {
                    console.log(response);
                    AuthenticationService.SetCredentials($scope.username, $scope.password, response);
                    $location.path('/');
                } else {
                    $scope.error = response.data.message;
                    $scope.dataLoading = false;
                }
            });
        };
    }]);