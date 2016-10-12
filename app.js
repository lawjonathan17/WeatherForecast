//module
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

//route
weatherApp.config(function ($routeProvider){
    
    $routeProvider
    
    .when('/', {
        templateUrl: 'pages/homepage.html',
        controller: 'homeController'
    })
    
    .when('/forecast', {
        templateUrl: 'pages/forecast.html',
        controller: 'forecastController'
    })
    
    .when('/forecast/:days', {
        templateUrl: 'pages/forecast.html',
        controller: 'forecastController'
    })
});

//services

weatherApp.service('cityService', function() {
    this.city = "Los Angeles, CA";
});

//controllers
weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService){
    $scope.city = cityService.city;                       
    $scope.$watch('city', function() {
        cityService.city = $scope.city;
    });
}]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', function($scope, $resource, $routeParams, cityService){
        $scope.city = cityService.city;
    
        $scope.days = $routeParams.days || 
            '3'; //defaults to 3 days if param not provided
    
        $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily?APPID=7b8974bc45546138fd4db6e3a4eab33a", {callback: "JSON_CALLBACK"}, {get: {method: "JSONP"}});
    
        $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days });
    
        $scope.convertToFahrenheit = function(degK) {
            
            return Math.round((1.8 * (degK - 273)) + 32);
        }
        
        $scope.convertToDate = function(dt) {
            
            return new Date(dt * 1000);
        }
        
        $scope.getPicture = function(temp) {
            
            if (temp >= 78){
                
            }
            else if (temp <= 77 && temp >= 69){
                
            }
            else if (temp <= 68 && temp >= 59){
                
            }
            else if (temp <=58){
                
            }
        }
}]);