angular

.module('mailControllers', [])

.factory('imap', ['$http', function ($http) {
    var server = '';
    var user = '';
    var password = '';

    var getEmails = function () {
        if (this.server == '' || this.user == '' || this.password == '') {
            return null;
        }

        return $http.get('mails/'+this.server+'/'+this.user+'/'+this.password);
    };

    var reset = function () {
        this.server = '';
        this.user = '';
        this.password = '';
    };

    return {
        'server': server,
        'user': user,
        'password': password,
        'getEmails': getEmails,
        'reset': reset
    };
}])

.controller('MessageListController', ['$scope', '$http', '$location', 'imap', function($scope, $http, $location, imap) {
    var getEmailsPremise = imap.getEmails();
    if (getEmailsPremise !== null) {
        getEmailsPremise.success(function(data) {
            $scope.messages = data.mails;
        })
        .error(function(err) {
            alert('An error occured. Please check your credentials.');
        });
    }

	$scope.setIMAP = function () {
        imap.server = $scope.server;
        imap.user = $scope.user;
        imap.password = $scope.password;

        $location.path('/home');
	};
}])

;
