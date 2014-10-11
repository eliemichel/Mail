angular

.module('mailControllers', [])

.controller('MessageListController', ['$scope', '$http', function($scope, $http) {
	$scope.messages = [];

	$scope.getMails = function() {
		$http.get('mails/'+$scope.user+'/'+$scope.passwd)
		.success(function(data) {
			$scope.messages = data.mails;
		})
		.error(function(err) {
			alert('An error occured. Please check your credentials.');
		});
	};
}])

;