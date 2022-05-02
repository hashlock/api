'use strict';

angular.module('app.csc.directives.teChatWindowVisitorLogin', [])
.directive('teChatWindowVisitorLogin',
function ($window, sfdcLiveagentService, webStorageUtils) {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: window.location.pathname.substr(0, 3) + '/ngtemplates/teChatWindowVisitorLogin.html',
        link,
    };

    function link(scope) {
        Object.assign(scope, {
            minimized: true,
            chatAvailable: false,
            connected: false,
            toggleMinimizedState,
            hideForm,
            setNameAndEmail,
            model: {
                    nameinput: '',
                    emailinput: '',
            },
        });

        const appUrl = 'https://app.thousandeyes.com';
        sfdcLiveagentService.setEndpointPrefix(appUrl + '/sfdc/liveagent/visitor');
        checkAvailability();
        checkActiveChat();

        function checkAvailability() {
            sfdcLiveagentService.checkAvailability().then(response => {
                    scope.chatAvailable = response.data;
                });
        }

        // Check cookies for the indicative that a session is active.
        // If a match is found, the window is opened and the chat history is reloaded from the
        // http session.
        function checkActiveChat() {
            const sessionTabId = webStorageUtils.readSession('teLiveagentTabId');
            const localTabId = webStorageUtils.readLocal('teLiveagentTabId');

            if ((localTabId && localTabId === sessionTabId) || webStorageUtils.readLocal('teLiveagentExpanded')) {
                const lastIteration = webStorageUtils.readLocal('teLiveagentLast');
                const now = (new Date()).getTime();
                if (lastIteration && now - lastIteration < 60000) {
                    scope.connected = true;
                    return;
                }
            }
            cleanChatSession();

        }

        function toggleMinimizedState() {
            scope.minimized = !scope.minimized;
        }

        function hideForm() {
            scope.chatAvailable = false;
        }

        function setNameAndEmail() {
            scope.connected = true;
            const tabId = sfdcLiveagentService.generateTabId();
            webStorageUtils.saveSession('teLiveagentTabId', tabId);
            webStorageUtils.saveLocal('teLiveagentTabId', tabId);

            sfdcLiveagentService.setNameAndEmail(scope.model.nameinput, scope.model.emailinput);
        }

        function cleanChatSession() {
            webStorageUtils.removeSession('teLiveagentTabId');
            webStorageUtils.removeLocal('teLiveagentTabId');
            webStorageUtils.removeLocal('teLiveagentKey');
            webStorageUtils.removeLocal('teLiveagentFeedback');
            webStorageUtils.removeLocal('teLiveagentClientMsgSequence');
            webStorageUtils.removeLocal('teLiveagentMsgHistory');
            webStorageUtils.removeLocal('teLiveagentServerMsgSequence');
            webStorageUtils.removeLocal('teLiveagentExpanded');
        }
    }

});
