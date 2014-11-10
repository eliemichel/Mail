
angular

.module('mail', ['ngRoute', 'mailControllers'])

.config(['$interpolateProvider', '$routeProvider', function($interpolateProvider, $routeProvider) {
	$interpolateProvider.startSymbol('[[');
	$interpolateProvider.endSymbol(']]');

	$routeProvider
	.when('/', {
		templateUrl: '/static/partials/login.html',
		controller: 'MessageListController',
        resolve: {load: ['imap', function (imap) {
            imap.reset();
        }]}
	})
	.when('/home', {
		templateUrl: '/static/partials/mails.html',
		controller: 'MessageListController',
        resolve: {load: ['imap', '$location', function (imap, $location) {
            if (imap.server == '' || imap.user == '' || imap.password == '') {
                $location.path('/');
            }
        }]}
	})
	.otherwise({
		redirectTo: '/'
	});
}])

;
