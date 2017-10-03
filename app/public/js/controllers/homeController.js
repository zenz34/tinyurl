var app = angular.module("tinyurlApp");

app.controller("homeController", ["$scope", "$http", "$location", function ($scope, $http, $location) {
    $scope.submit = function () {

        //console.log("homeController.js            longUrl = " + longUrl);



        $http.post("/api/v1/urls", {


            longUrl: $scope.longUrl
        })
            .success(function (data) {
                $location.path("/urls/" + data.shortUrl);
            });
    };
}]);



