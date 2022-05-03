'use strict';

angular.module('app.csc.services.sfdc', [])
.service('sfdcLiveagentService',
function ($http) {
    let prefix = '';
    let visitorname;
    let visitoremail;

    return {
        checkAvailability: checkChatAvailability,
        endChatSession,
        startChat,
        newMessage,
        newBinaryMessage,
        pollMessages,
        postChatActions,
        setEndpointPrefix,
        setNameAndEmail,
        generateTabId,
        informClientTyping,
        informClientNotTyping,
        sendSneakPeek,
    };

    function generateTabId() {
        return Math.random().toString(36).substr(2, 9);
    }

    function setEndpointPrefix(endpointPrefix) {
        if (endpointPrefix) {
            prefix = endpointPrefix;
        }
    }

    function setNameAndEmail(name, email) {
        visitorname = name;
        visitoremail = email;
    }

    function startChat(language, resolution) {
        const endpoint = `${prefix}/newsession`;
        const reqConfig = {
                method: 'POST',
                url: endpoint,
                data: {
                    browserLanguage: language,
                    screenResolution: resolution,
                    name: visitorname,
                    email: visitoremail,
                },
                withCredentials: true,
        };
        return $http(reqConfig);
    }

    function newMessage(sessionKey, message) {
        const endpoint = `${prefix}/newmessage`;
        const reqConfig = {
            method: 'POST',
            url: endpoint,
            headers: {
                'X-LIVEAGENT-SESSION-KEY': sessionKey.key,
                'X-LIVEAGENT-AFFINITY': sessionKey.affinityToken,
            },
            data: { text: message },
            withCredentials: true,
        };
        return $http(reqConfig);
    }

    function newBinaryMessage(sessionKey, message) {
        const endpoint = `${prefix}/newbinarymessage`;
        const reqConfig = {
            method: 'POST',
            url: endpoint,
            headers: {
                'X-LIVEAGENT-SESSION-KEY': sessionKey.key,
                'X-LIVEAGENT-AFFINITY': sessionKey.affinityToken,
            },
            data: { text: message },
            withCredentials: true,
        };
        return $http(reqConfig);
    }

    function pollMessages(sessionKey, ack, pollDeferrer) {
        const endpoint = `${prefix}/messages`;
        const reqConfig =  {
            method: 'GET',
            url: endpoint,
            timeout: pollDeferrer.promise,
            headers: {
                'X-LIVEAGENT-SESSION-KEY': sessionKey.key,
                'X-LIVEAGENT-AFFINITY': sessionKey.affinityToken,
                'X-LIVEAGENT-SEQUENCE': ack,
            },
            data: JSON.stringify(sessionKey),
            withCredentials: true,
        };
        return $http(reqConfig);
    }

    function endChatSession(sessionKey) {
        const message = `----- END CHAT SESSION REQUEST -----
        The customer closed the chat. Comments posted from now on will show up 
        in the chat transcript, but won't be visible to the client`;
        return newMessage(sessionKey, message);
    }

    function checkChatAvailability() {
        const endpoint = `${prefix}/chatavailable`;
        const reqConfig = {
                method: 'GET',
                url: endpoint,
        };
        return $http(reqConfig);
    }

    function postChatActions(sessionKey, feedback) {
        const message = `----- POST CHAT ACTIONS - START -----
        Close case: ${feedback.closeCase}
        Comments:
        ${feedback.feedback}
        ----- POST CHAT ACTIONS - END -----`;
        return newMessage(sessionKey, message);
    }

    function informClientTyping(sessionKey) {
        const endpoint = `${prefix}/chasitor/typing`;
        const reqConfig = {
            method: 'POST',
            url: endpoint,
            headers: {
                'X-LIVEAGENT-SESSION-KEY': sessionKey.key,
                'X-LIVEAGENT-AFFINITY': sessionKey.affinityToken,
            },
            withCredentials: true,
        };
        return $http(reqConfig);
    }

    function informClientNotTyping(sessionKey) {
        const endpoint = `${prefix}/chasitor/nottyping`;
        const reqConfig = {
            method: 'POST',
            url: endpoint,
            headers: {
                'X-LIVEAGENT-SESSION-KEY': sessionKey.key,
                'X-LIVEAGENT-AFFINITY': sessionKey.affinityToken,
            },
            withCredentials: true,
        };
        return $http(reqConfig);
    }

    function sendSneakPeek(sessionKey, position, message) {
        const endpoint = `${prefix}/chasitor/sneakpeek`;
        const reqConfig = {
            method: 'POST',
            url: endpoint,
            headers: {
                'X-LIVEAGENT-SESSION-KEY': sessionKey.key,
                'X-LIVEAGENT-AFFINITY': sessionKey.affinityToken,
            },
            data: { position, text: message },
            withCredentials: true,
        };
        return $http(reqConfig);
    }

});
