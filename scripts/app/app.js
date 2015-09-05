var app = angular.module('vs', ['ui.router', 'uiGmapgoogle-maps', 'ngMaterial']);

//// Side navbar //////
app.controller('AppCtrl', function($scope, $timeout, $mdSidenav, $log) {
  $scope.toggleRight = function() {
    $mdSidenav('right').toggle();
  };
})
app.controller('RightCtrl', function($scope, $timeout, $mdSidenav, $log) {
  $scope.close = function() {
    $mdSidenav('right').close();
  };
});
///////////////

app.controller('socialCtrl', function($scope){
    $scope.googleUrl = 'http://google.com';
});

app.controller('mainCtrl', ['$scope',
    function ($scope) {
        $scope.name = "Vildan";

        $scope.map = {
            center: {
                latitude: 51.219053,
                longitude: 4.404418
            },
            zoom: 14
        };
        $scope.options = {
            scrollwheel: false
        };
    }]);

app.controller('contactCtrl' ,function ($scope) {
    $scope.user = {
        title: 'Developer',
        email: 'ipsum@lorem.com',
        firstName: '',
        lastName: '' ,
        company: 'Google' ,
        address: '1600 Amphitheatre Pkwy' ,
        city: 'Mountain View' ,
        state: 'CA' ,
        biography: 'Loves kittens, snowboarding, and can type at 130 WPM.\n\nAnd rumor has it she bouldered up Castle Craig!',
        postalCode : '94043'
    };
});

app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/");

    $stateProvider.state('about', {
        url: "/about",
        templateUrl: "templates/about.html",
        controller: "mainCtrl"
    })
    .state('contact', {
        url: "/contact",
        templateUrl: "templates/contact.html",
        controller: "contactCtrl"
    });
});