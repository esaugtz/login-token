'use strict';

angular.module('Home')

.controller('HomeController',
    ['$http', '$scope', '$cookieStore',
    function ($http, $scope, $cookieStore) {

    	var token = $cookieStore.get('token');
    	console.log("token: ",token);
        $scope.showProducts = false;
    	$scope.editing = false;

    	$scope.getProducts = function(){

    		$http({
    		    method : "GET",
    		    url : "https://mxlab.s.gigigoapps.com/examen/products?token=" + token,
    		  }).then(function success(response) {
    		        console.log("success: ",response.data.products);
    		        $scope.allProducts = response.data.products;
    		        $scope.showProducts = true;
    		    }, function error(response) {
    		        console.log("error: ",response);
    		  });

    	};

        $scope.addProduct = function(newName){
            $scope.addNew = true;
        }

        $scope.saveProduct = function(newName){
            console.log('newName',$scope.newName);
            $http({
                method : "POST",
                url : "https://mxlab.s.gigigoapps.com/examen/product?token=" + token,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function(obj) {
                        var str = [];
                        for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    },
                data: { name: $scope.newName },
              }).then(function success(response) {
                    console.log("success: ",response);
                    alert(response.data.message);
                    $scope.getProducts();
                }, function error(response) {
                    console.log("error: ",response);
              });
        }

        $scope.editItem = function () {
            $scope.editing = true;
        }

        $scope.doneEditing = function (products) {
            $scope.editing = false;
            console.log(products);
            $scope.nameProduct = products;
            //dong some background ajax calling for persistence...
        };

        $scope.edit = function(nameProduct){
            console.log('nameProduct',this.products.name);
            var idProduct = this.products.id;
            console.log(idProduct);

            $http({
                method : "PUT",
                url : "https://mxlab.s.gigigoapps.com/examen/product/" + idProduct + "?token=" + token,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function(obj) {
                        var str = [];
                        for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    },
                data: { name: this.products.name },
              }).then(function success(response) {
                    console.log("success: ",response);
                    alert("El producto con ID: "+idProduct+" se actualizó correctamente");
                }, function error(response) {
                    console.log("error: ",response);
              });
        }

        $scope.delete = function(){
            var idProduct = this.products.id;
            console.log(idProduct);

            $http({
                method : "DELETE",
                url : "https://mxlab.s.gigigoapps.com/examen/product/" + idProduct + "?token=" + token,
              }).then(function success(response) {
                    console.log("success: ",response);
                    alert("El producto con ID: "+idProduct+" se eliminó correctamente");
                    $scope.getProducts();
                }, function error(response) {
                    console.log("error: ",response);
              });
        }

    }]);