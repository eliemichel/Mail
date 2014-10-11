
angular

.module('mail', ['ngRoute', 'mailControllers'])

.config(['$interpolateProvider', '$routeProvider', function($interpolateProvider, $routeProvider) { 
	$interpolateProvider.startSymbol('[[');
	$interpolateProvider.endSymbol(']]');

	$routeProvider
	.when('/', {
		templateUrl: ROOT_URL + 'static/partials/mails.html',
		controller: 'MessageListController'
	})
	.otherwise({
		redirectTo: '/'
	});
}])

;