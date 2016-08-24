var app = angular.module("tinyurlApp");

app.controller("urlController",
    ["$scope", "$http", "$routeParams", function ($scope, $http, $routeParams) {
        $http.get("/api/v1/urls/" + $routeParams.shortUrl)
            .success(function (data) {

                console.log("come here  urlController!  ");

               $scope.shortUrl = data.shortUrl;
                $scope.longUrl = data.longUrl;
            });

}]);



