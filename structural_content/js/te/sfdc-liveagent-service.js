(function() {
'use strict';

angular.module('te.services.sfdc.liveagent', [])
.service('sfdcLiveagentService', [
        '$rootScope','$interval','$log','$http',
function($rootScope , $interval , $log , $http) {
    var online;
    var prefix;
    
    $log.log('starting sfdcLiveagentService');

    return {
        isOnline : isOnline,
        checkAvailability : checkChatAvailability,
        openChatWindow : openChatWindow,
        closeChatWindow : closeChatWindow,
        endChatSession : endChatSession,
        startChat : startChat,
        startPublicChat : startPublicChat,
        newMessage : newMessage,
        newBinaryMessage : newBinaryMessage,
        sendCustomEvent : sendCustomEvent,
        pollMessages : pollMessages,
        getMessageHistory: getMessageHistory,
        postChatActions: postChatActions,
        resetSession: resetSession,
        setEndpointPrefix : setEndpointPrefix
    };
    
    
    // private endpoint: /ajax/sfdc/liveagent
    // public endpoint: /sfdc/liveagent/visitor
    function setEndpointPrefix(endpointPrefix) {
        if (endpointPrefix !== undefined)
        prefix = endpointPrefix;
    }

    function isOnline() {
        return online;
    }
    
    function setOnline() {
        online = true;
    }
    
    function setOffline() {
        online = false;
    }
    
    function openChatWindow() {
        if (online) {
            $log.log('opening chat window');
            $rootScope.$broadcast('liveagent-window-open', { open : true, connected : false });
        } else {
            $log.log('Could not open chat window. Agent is offline');
        }
    }

    function closeChatWindow() {
        $rootScope.$broadcast('liveagent-window-open', { open: false });
    }

    function startChat(callback) {
        var endpoint = prefix + '/newsession';
        var reqConfig = {
            method: 'GET',
            url: endpoint,
            withCredentials: true
        };
        $http(reqConfig).then(function(response) {
            $log.log('success: ', response);
            callback();
        }, function(error) {
            $log.log('error: ', error);
        });
    }
    
    function startPublicChat(name, email, callback) {
        var endpoint = prefix + '/newsession';
        var reqConfig = {
                method: 'POST',
                url: endpoint,
                data: {
                    name : name,
                    email : email
                },
                withCredentials: true
        };
        $http(reqConfig).then(function(response) {
            callback(true);
        }, function(error) {
            callback(false);
        });
    }
    
    function newMessage(message, callback) {
        var endpoint = prefix + '/newmessage';
        $log.log('Sending new message: ', message);
        var reqConfig = {
            method: 'POST',
            url: endpoint,
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

    function newBinaryMessage(message, callback) {
        var endpoint = prefix + '/newbinarymessage';
        var reqConfig = {
            method: 'POST',
            url: endpoint,
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

    function pollMessages(callback) {
        var endpoint = prefix + '/messages';
        var reqConfig =  {
            method: 'GET',
            url: endpoint,
            withCredentials: true
        };
        $http(reqConfig).then(function(response) {
            $log.log('success: ', response);
            callback(true, response.data);
            // keeps checking messages until an error occur
        }, function(error) {
            $log.log('error: ', error);
            callback(false, error);
        });
    }
    
    function getMessageHistory(successCallback, errorCallback) {
        var endpoint = prefix + '/recoversession';
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
        var message = '----- END CHAT SESSION REQUEST -----\n';
        message += 'The customer closed the chat. Comments posted from now on will show up ';
        message += 'in the chat transcript, but won\'t be visible to the client';
        newMessage(message, callback);
    }
    
    function checkChatAvailability(callback) {
        if (!callback) {
            callback = availabilityCallback;
        }
        var endpoint = prefix + '/chatavailable';
        var reqConfig = {
                method: 'GET',
                url: endpoint
        };
        $http(reqConfig).then(function(response) {
            $log.log('availability check success:', response);
            callback(response.data);
        }, function(error) {
            callback(false);
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
    
    function resetSession() {
        var endpoint = prefix + '/resetsession';
        var reqConfig = {
            method: 'GET',
            url: endpoint,
            withCredentials: true
        };
        $http(reqConfig).then(function(response) {
            $log.log('success resetting session: ', response);
        }, function(error) {
            $log.log('error resetting session: ', error);
        });
    }

    function postChatActions(feedback, callback) {
        var message = '----- POST CHAT ACTIONS - START -----\n';
        message += 'Suppress notifications: ' + feedback.suppressNotification + '\n';
        message += 'Close case: ' + feedback.closeCase + '\n';
        message += 'Comments:\n' + feedback.feedback + '\n';
        message += '----- POST CHAT ACTIONS - END -----\n';
        newMessage(message, callback);
    }
    
    function sendCustomEvent(type, data, callback) {
        var endpoint = prefix + '/customevent';
        var reqConfig = {
                method: 'POST',
                url: endpoint,
                data: {
                    type : type,
                    data : data
                },
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
    
}]);

})();