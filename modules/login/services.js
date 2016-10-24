'use strict';

angular.module('Authentication')

.factory('AuthenticationService',
    ['$http', '$cookieStore', '$rootScope',
    function ($http, $cookieStore, $rootScope) {
        var service = {};

        service.Login = function (username, password, callback) {

            $http({
                method : "POST",
                url : "https://mxlab.s.gigigoapps.com/examen/login",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function(obj) {
                        var str = [];
                        for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    },
                data: { email: username, password: password },
              }).then(function success(response) {
                    callback(response);
                }, function error(response) {
                    callback(response);
              });

        };
        //Agregar token en cookie
        service.SetCredentials = function (username, password, response) {
            var token = response.data.user.token;
            console.log('token-',token);
            $rootScope.globals = {
                currentUser: {
                    token: token
                }
            };
            $cookieStore.put('token',token);
        };
        //Elimina cookie
        service.ClearCredentials = function () {
            $rootScope.globals = {};
            $cookieStore.remove('token');
        };

        return service;
    }])