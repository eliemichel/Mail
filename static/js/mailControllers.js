angular

.module('mailControllers', [])

.value('Current', {
    'credentials': {
        'server': '',
        'user': '',
        'password': ''
    },
    'mails': [],
    'error': ''
})

.factory('imap', ['$http', 'Current', function ($http, Current) {
    var setCredentials = function (server, user, password) {
        Current.credentials.server = server;
        Current.credentials.user = user;
        Current.credentials.password = password;
    };

    var getCredentials = function () {
        return Current.credentials;
    }

    var reset = function () {
        Current.credentials.server = '';
        Current.credentials.user = '';
        Current.credentials.password = '';
    };

    var refresh = function () {
        if (Current.credentials.server == '' || Current.credentials.user == '' || Current.credentials.password == '') {
            return;
        }

        $http.get('mails/'+Current.credentials.server+'/'+Current.credentials.user+'/'+Current.credentials.password)
            .success(function(data) {
                Current.mails = data.mails;
            })
            .error(function(err) {
                Current.error = 'An error occured. Please check your credentials.';
            });
    };

    var getMessages = function () {
        return Current.mails;
    };

    var getError = function () {
        return Current.error;
    }


    return {
        // Credentials
        'setCredentials': setCredentials,
        'getCredentials': getCredentials,
        'reset': reset,

        // Emails list
        'getMessages': getMessages,
        'refresh': refresh,
        'getError': getError
    };
}])

.controller('MessageListController', ['$scope', '$http', '$location', 'imap', function($scope, $http, $location, imap) {
    $scope.messages = imap.getMessages;
    $scope.refresh = imap.refresh;
    $scope.getError = imap.getError;

	$scope.setIMAP = function () {
        imap.setCredentials($scope.server, $scope.user, $scope.password);
        imap.refresh();

        $location.path('/home');
	};
}])

;
