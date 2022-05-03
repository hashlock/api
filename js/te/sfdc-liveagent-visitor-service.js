(function() {
'use strict';

angular.module('te.services.sfdc.liveagent.visitor', [])
.service('sfdcLiveagentVisitorService', [
        '$rootScope','$interval','$log','$http',
function($rootScope , $interval , $log , $http) {
    var online;
    var appUrl = '';

    $log.log('starting sfdcLiveagentService');

    return {
        isOnline : isOnline,
        checkAvailability : checkChatAvailability,
        openChatWindow : openChatWindow,
        closeChatWindow : closeChatWindow,
        endChatSession : endChatSession,
        startChat : startChat,
        newMessage : newMessage,
        newBinaryMessage : newBinaryMessage,
        pollMessages : pollMessages,
        getMessageHistory : getMessageHistory,
        setAppUrl  : setAppUrl
    };


    function isOnline() {
        $log.log('isOnline visitor: ' + online);
        return online;
    }

    function setOnline() {
        online = true;
        broadcastStatusChange();
    }

    function setOffline() {
        online = false;
        broadcastStatusChange();
    }

    function checkChatAvailability(callback) {
        var endpoint = 'https://app.thousandeyes.com/sfdc/liveagent/visitor/chatavailable';
        var reqConfig = {
                method: 'GET',
                url: endpoint
        };
        $http(reqConfig).then(function(response) {
            $log.log('availability check success:', response);
            callback(response.data);
        }, function(error) {
            availabilityCallback(false);
        });
    }

    function openChatWindow() {
        if (online) {
            $log.log('opening chat window');
            $rootScope.$broadcast('liveagent-window-open', { open: true });
        } else {
            $log.log('Could not open chat window. Agent is offline');
        }
    }

    function closeChatWindow() {
        $rootScope.$broadcast('liveagent-window-open', { open: false });
    }

    function broadcastStatusChange() {
        $rootScope.$broadcast('sfdcLiveagentStatusChange');
    }

    function startChat(name, email, callback) {
        var reqConfig = {
                method: 'POST',
                url: appUrl + '/sfdc/liveagent/visitor/newsession',
                data: {
                    name : name,
                    email : email
                },
                withCredentials: true
        }
        $http(reqConfig).then(function(response) {
            callback(true);
        }, function(error) {
            callback(false);
        });
    }

    function newMessage(message, callback) {
        var reqConfig = {
            method: 'POST',
            url: appUrl + '/sfdc/liveagent/visitor/newmessage',
            data: { text: message },
            withCredentials: true
        };
        $http(reqConfig).then(function(response) {
            $log.log('success: ', response);
            callback(true);
        }, function(error) {
            $log.log('error: ', error);
            callback(false);
        });
    }

    function pollMessages(callback) {
        var endpoint = appUrl + '/sfdc/liveagent/visitor/messages';
        var reqConfig =  {
            method: 'GET',
            url: endpoint,
            withCredentials: true
        };
        $http(reqConfig).then(function(response) {
            $log.log('success: ', response);
            callback(response.data);
            // keeps checking messages until an error occur
        }, function(error) {
            $log.log('error: ', error);
        });
    }

    function newBinaryMessage(message, callback) {
        var reqConfig = {
            method: 'POST',
            url: appUrl + '/sfdc/liveagent/visitor/newbinarymessage',
            data: { text: message },
            withCredentials: true
        };
        $http(reqConfig).then(function(response) {
            $log.log('success: ', response);
            callback(true, response.data);
        }, function(error) {
            $log.log('error: ', error);
            callback(false, null);
        });
    }

    function getMessageHistory(successCallback, errorCallback) {
        var endpoint = appUrl + '/sfdc/liveagent/visitor/recoversession';
        var reqConfig = {
            method: 'GET',
            url: endpoint,
            withCredentials: true
        };
        $http(reqConfig).then(function(response) {
            $log.log('success: ', response);
            successCallback(response.data);
        }, function(error) {
            $log.log('error loading message history: ', error);
            errorCallback();
        });
    }

    function endChatSession(callback) {
        var endpoint = appUrl + '/sfdc/liveagent/visitor/endsession';
        var reqConfig = {
            method: 'POST',
            url: endpoint,
            withCredentials: true
        };
        $http(reqConfig).then(function(response) {
            $log.log('success: ', response);
            callback(response.data);
        }, function(error) {
            $log.log('error closing chat session: ', error);
        });

    }

    function availabilityCallback(success) {
        if (success) {
            online = true;
        }
        else {
            online = false;
        }
    }

    function setAppUrl(teAppUrl) {
        if (teAppUrl !== undefined) {
            appUrl = teAppUrl;
        }
    }

}]);

})();
