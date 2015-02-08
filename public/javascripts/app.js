// Angular module, defining routes for the app
angular.module('protoapp', ['ngRoute', 'ngMaterial', 'protoapp_services']).
	config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'partials/chat',
                controller: ChatCtrl
            })
            .otherwise({ redirectTo: '/' });
	}]);
