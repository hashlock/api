'use strict';

angular.module('app.csc.directives.teChatWindow', [
    'ngSanitize',
    'te-templates',
    'app.csc.constants',
    'app.csc.services.sfdc',
    'te.ui.enter',
])
.directive('teChatWindow',
function ($window, $timeout, $q, sfdcLiveagentService, webStorageUtils, MAX_UPLOAD_SIZE, FILE_SIZE_LIMIT_EXCEEDED) {
    return {
        restrict: 'E',
        scope: {
            tePublicChat: '<',
            teExpanded: '<',
        },
        link: linkFn,
        templateUrl: window.location.pathname.substr(0, 4) + '/ngtemplates/teChatWindow.html',
    };

    function linkFn(scope) {
        const newMsgSnd = browserSupportsSounds() ? new Audio(window.location.pathname.substr(0, 3) + '/sounds/notification.mp3') : null;
        const typingCheckInterval = 3000;
        let sessionTimeout;
        let onFocus = false;
        let pollDeferrer;
        let sessionKey;
        let serverMessageNumber = 0;
        let lastKeyPressedTimestamp = 0;
        let keyPressedTimeout;
        let sendInProgress = false;

        // This flag indicates that the client failed to submit a request to the server.
        // When the chat window is focused, the server messages polling is started, to
        // either inform the timeout or continue the polling loop.
        let clientDisconnected;

        Object.assign(scope, {
            newMessage,
            endChatSession,
            toggleMinimizedState,
            handlePaste,
            showRestoreIcon,
            onFileDropped,
            connected: false,
            windowOpen: false,
            minimized: false,
            chatWindowSwitch: 'chat',
            dragOver: false,
            expandedWindow: false,
            postChatActions,
            expandWindow,
            restoreExpandedWindow,
            keyPressed,
            startChatSession,
            restartChatSession,
            sessionTabId,
            model: {
                systemMessage: '',
                messages: [],
                msginput: '',
                feedbackMsg: '',
                closeCase: true,
            },
        });

        const appUrl = 'https://app.thousandeyes.com';
        sfdcLiveagentService.setEndpointPrefix(appUrl + '/sfdc/liveagent/visitor');

        if (scope.teExpanded) {
            scope.expandedWindow = true;
            $window.addEventListener('beforeunload', confirmExpandedWindowClose);
            $window.addEventListener('unload', unloadExpandedWindow);
            if (activeChatSessionExists()) {
                loadChatWindow();
            }
        }
        else {
            watchWindowStatus();
            $window.addEventListener('storage', tabIdListener);
            checkExpandedWindow();
        }

        function sessionTabId() {
            return webStorageUtils.readSession('teLiveagentTabId');
        }

        function showRestoreIcon() {
            return !!webStorageUtils.readLocal('teLiveagentTabId');
        }

        function tabIdListener(event) {
            if (event.key !== 'teLiveagentTabId') {
                return;
            }
            if (webStorageUtils.readSession('teLiveagentTabId') === readLocalTabId()) {
                loadChatWindow();
            }
            else {
                scope.windowOpen = false;
            }
        }

        function watchWindowStatus() {
            scope.$watch(readLocalTabId, function (newTabId, oldTabId) {
                if (!newTabId || newTabId === oldTabId || newTabId !== webStorageUtils.readSession('teLiveagentTabId')) {
                    return;
                }
                // When an old tab id exists it means that an existing chat session was transfered
                // to a new tab or window
                if (oldTabId && activeChatSessionExists()) {
                    loadChatWindow();
                }
                else {
                    scope.windowOpen = true;
                    scope.model.systemMessage = 'Send a message to start the chat session';
                }

            });
        }

        function loadChatWindow() {
            scope.windowOpen = true;
            scope.connected = true;
            scope.chatWindowSwitch = 'chat';
            sessionKey = webStorageUtils.readLocal('teLiveagentKey');
            pollDeferrer = $q.defer();
            loadMessageHistory();
            $window.addEventListener('focus', setFocus);
            $window.addEventListener('blur', removeFocus);
            scope.$on('$destroy', removeListeners);
        }

        function confirmExpandedWindowClose(event) {
            // when the window is closed by clicking in the arrow pointing to the lower
            // corner, first scope.expandedWindow is set to false, so it won't botter
            // the users with confirmations. When the user closes the window any other
            // way, the value will be true, so the confirmation will be triggered
            if (scope.expandedWindow && scope.connected) {
                const dialogText = 'This will end the chat session. Are you sure?';
                event.returnValue = dialogText;
                return dialogText;
            }
        }

        function unloadExpandedWindow() {
            if (!scope.expandedWindow) {
                // scope.expandedWindow === false occurs when the user clicked the restore arrow.
                // the unload event shouldn't clean anything, and the notification was already
                // taken care of in the restoreExpandedWindow method
                return;
            }
            if (scope.connected) {
                // user closed the expanded window without clicking the X to end the
                // chat session. Should open the feedback form in the opener window
                webStorageUtils.saveLocal('teLiveagentFeedback', true);
                webStorageUtils.removeLocal('teLiveagentExpanded');
            }
            else {
                // clicked the X to end the chat session in the blue bar but closed the
                // chat window without submitting the feedback form. Should clean the
                // local storage to allow future chat sessions in the application
                cleanChatSession();
            }
        }

        function checkExpandedWindow() {
            const tabId = webStorageUtils.readSession('teLiveagentTabId');
            if (!tabId) {
                return;
            }
            if (webStorageUtils.readLocal('teLiveagentKey')) {
                // There is an active chat session, so the user probably navigated to another page
                // or reloaded the current page.
                // Checking only the tabId in the browser session is not enough because the user
                // might have closed the session from the popup window.
                webStorageUtils.saveLocal('teLiveagentTabId', tabId);
            }
            if (webStorageUtils.readLocal('teLiveagentExpanded')) {
                scope.windowOpen = false;
                $window.addEventListener('storage', expandedWindowListener);
                $window.addEventListener('beforeunload', removeTabId);
                scope.$on('$destroy', removeListeners);
            }
            else if (activeChatSessionExists()) {
                loadChatWindow();
            }
        }

        function activeChatSessionExists() {
            const sessionTabId = webStorageUtils.readSession('teLiveagentTabId');
            const localTabId = readLocalTabId();
            if (!localTabId || localTabId !== sessionTabId || !webStorageUtils.readLocal('teLiveagentKey')) {
                return false;
            }
            return true;
        }

        function setFocus() {
            onFocus = true;
            if (clientDisconnected && scope.windowOpen) {
                checkMessages();
            }
        }
        function removeFocus() {
            onFocus = false;
        }
        function removeListeners() {
            $window.removeEventListener.bind($window, 'focus', setFocus);
            $window.removeEventListener.bind($window, 'blur', removeFocus);
            $window.removeEventListener.bind($window, 'onbeforeunload', confirmExpandedWindowClose);
            $window.removeEventListener.bind($window, 'onunload', unloadExpandedWindow);
            $window.removeEventListener.bind($window, 'storage', tabIdListener);
            $window.removeEventListener.bind($window, 'storage', expandedWindowListener);
            $timeout.cancel(sessionTimeout);
        }

        function newMessage() {
            if (!scope.model.msginput) {
                return;
            }
            if (!sessionKey) {
                startChatSession();
                return;
            }
            sendInProgress = true;
            const message = scope.model.msginput;
            scope.model.msginput = '';
            sfdcLiveagentService.newMessage(sessionKey, message)
            .then(() => {
                    scope.model.messages.push( { type: 'fromme', from: 'Me', msg: message } );
                    webStorageUtils.saveLocal('teLiveagentMsgHistory', scope.model.messages);
                    scope.model.systemMessage = '';
                    lastKeyPressedTimestamp = 0;
                    $timeout.cancel(keyPressedTimeout);
                },
                response => {
                    scope.model.systemMessage = 'Error sending message';
                    if (response.status === 408) {
                        clientTimedOut();
                    }
                    if (response.status === 500) {
                        clientDisconnected = true;
                    }
                })
                .finally(() => sendInProgress = false);
        }

        function checkMessages() {
            if (!scope.connected) {
                return;
            }
            sfdcLiveagentService.pollMessages(sessionKey, serverMessageNumber, pollDeferrer)
            .then(response => {
                    clientDisconnected = false;
                    processMessages(response.data);
                    webStorageUtils.saveLocal('teLiveagentLast', (new Date()).getTime());
                    if (scope.windowOpen) {
                        checkMessages();
                    }
                },
                response => {
                    // When the window is expanded, more than one window may be querying the messages
                    // polling endpoint at the same time. In that case Salesforce will return a 409
                    // error for the original request. Only that error should interrupt the polling loop.
                    if (!scope.windowOpen) {
                        return;
                    }
                    checkClientRequestError(response);
                });
        }

        function loadMessageHistory() {
            scope.model.messages = webStorageUtils.readLocal('teLiveagentMsgHistory') || [];
            serverMessageNumber = webStorageUtils.readLocal('teLiveagentServerMsgSequence') || 0;
            checkMessages();
        }

        function endChatSession(skipConfirmation) {
            if (!scope.connected) {
                // user closed the window after the session ended. Should remove the chat session data
                cleanChatSession();
                if (scope.teExpanded) {
                    $window.close();
                }
                return;
            }
            if (skipConfirmation || $window.confirm('This will end the chat session. Are you sure?')) {
                scope.connected = false;
                scope.minimized = false;
                sfdcLiveagentService.endChatSession(sessionKey)
                .then(chatEnded, cleanChatSession);
            }
        }

        function chatEnded() {
            scope.connected = false;
            scope.chatWindowSwitch = 'feedback';
            pollDeferrer.resolve();
        }

        function toggleMinimizedState() {
            scope.minimized = !scope.minimized;
        }

        function expandWindow() {
            if (sendInProgress) {
                return;
            }

            webStorageUtils.saveLocal('teLiveagentExpanded', true);
            scope.expandedWindow = true;
            scope.windowOpen = false;
            scope.minimized = false;
            pollDeferrer.resolve();
            $window.open('/publicExpandedLiveagent.html', 'liveagent-chat', 'status=0,toolbar=0,menubar=0,location=0,top=100,left=100,width=600,height=400');
            $window.addEventListener('storage', expandedWindowListener);
            $window.addEventListener('beforeunload', removeTabId);
        }

        function removeTabId() {
            webStorageUtils.removeLocal('teLiveagentTabId');
        }

        function expandedWindowListener(event) {
            // IE calls this listener when the event is registered. have to check that here
            if (event.key !== 'teLiveagentExpanded' || webStorageUtils.readLocal('teLiveagentExpanded')) {
                return;
            }
            if (!activeChatSessionExists()) {
                // chat session ended and closed in the external window
                scope.expandedWindow = false;
                removeListeners();
                return;
            }
            scope.expandedWindow = false;
            if (webStorageUtils.readLocal('teLiveagentFeedback')) {
                // the user closed the pop-up browser window without clicking in the live agent
                // X button. This should close the window but the feedback form must te displayed
                // in the opener window. As the user already confirmed that wanted to close the
                // chat in the expanded window, we are passing a parameter to endChatSession()
                // to skip the session ending confirmation
                scope.windowOpen = true;
                endChatSession(true);
            }
            else {
                // the expanded window was restored and the session is still active.
                // the chat window should be opened and the conversation history loaded
                loadChatWindow();
            }
        }

        function restoreExpandedWindow() {
            if (sendInProgress) {
                return;
            }
            scope.expandedWindow = false;
            webStorageUtils.removeLocal('teLiveagentExpanded');
            $window.close();
        }

        function handlePaste($event) {
            if (scope.tePublicChat || !scope.connected) {
                return;
            }
            const items = ($event.clipboardData  || $event.originalEvent.clipboardData).items;
            let blob = null;
            // Arrays.forEach() not possible on DataTransferItemList objects
            for (let i = 0; i < items.length; i++) {
                if (items[i].type.indexOf('image') === 0) {
                    blob = items[i].getAsFile();
                    if (blob.size > MAX_UPLOAD_SIZE) {
                        scope.model.messages
                            .push({ type: 'system', from: '', msg: FILE_SIZE_LIMIT_EXCEEDED });
                        continue;
                    }
                }
            }
            // load image if there is a pasted image
            if (!blob) {
                return;
            }
            const reader = new FileReader();
            reader.onload = function (event) {
                sendInProgress = true;
                scope.model.systemMessage = 'Uploading image';
                sfdcLiveagentService.newBinaryMessage(sessionKey, event.target.result)
                .then(response => {
                        const fileLink = `<a href="${response.data.fileUrl}" target="_blank">${response.data.fileUrl}</a>`;
                        scope.model.messages.push( { type: 'fromme', from: 'Me', rich: true, msg: fileLink } );
                        scope.model.msginput = '';
                        scope.model.systemMessage = '';
                    }, () => {
                        scope.model.systemMessage = 'Error uploading image';
                    }
                )
                .finally(() => sendInProgress = false);
            };
            reader.readAsDataURL(blob);
        }

        function notifyNewMsg(messageContents) {
            if (!$window.Notification) {
                return;
            }
            if (newMsgSnd) {
                newMsgSnd.play();
            }
            const notificationOptions = {
                body: messageContents,
                icon: '/static/images/logo_180x110.png',
            };
            if (Notification.permission === 'granted') {
                const notification = new Notification('New message', notificationOptions);
                notification.onclick = function (event) {
                    event.preventDefault();
                    $window.focus();
                    notification.close();
                };
            }
            else if (Notification.permission === 'default') {
                Notification.requestPermission(permission => {
                    if (permission === 'granted') {
                        const notification = new Notification('New message', notificationOptions);
                        notification.onclick = function (event) {
                            event.preventDefault();
                            $window.focus();
                            notification.close();
                        };
                    }
                });
            }
        }

        function processMessages(responseData) {
            if (!responseData.messages) {
                return;
            }
            serverMessageNumber = responseData.sequence;
            webStorageUtils.saveLocal('teLiveagentServerMsgSequence', serverMessageNumber);
            const serverMessages = responseData.messages;
            if (serverMessages) {
                serverMessages.forEach(message => {
                    processMessage(message);
                });
                webStorageUtils.saveLocal('teLiveagentMsgHistory', scope.model.messages);
            }
        }

        function processMessage(message) {
            switch (message.type) {
                case 'ChatEstablished':
                    scope.connected = true;
                    $timeout.cancel(sessionTimeout);
                    break;
                case 'ChatMessage':
                    const fromAgent = message.message.text.replace('<a ', '<a target="_blank" ');
                    scope.model.systemMessage = '';
                    scope.model.messages.push({ type: 'agent', from: message.message.name, rich: true, msg: fromAgent });
                    if (!onFocus || scope.minimized) {
                        notifyNewMsg(fromAgent);
                    }
                    break;
                case 'AgentJoinedConference':
                    scope.model.messages
                    .push({ type: 'system', from: '', msg: `Agent ${message.message.name} joined the conversation` });
                    break;
                case 'AgentLeftConference':
                    scope.model.messages
                    .push({ type: 'system', from: '', msg: `Agent ${message.message.name} left the conversation` });
                    break;
                case 'AgentTyping':
                    scope.model.systemMessage = 'The agent is typing';
                    break;
                case 'AgentNotTyping':
                    scope.model.systemMessage = '';
                    break;
                case 'AgentDisconnect':
                    scope.model.systemMessage = 'Agent disconnected. Transfering session to a new agent';
                    sessionTimeout = $timeout(sessionTimedOut, 60000);
                    break;
                case 'ChatEnded':
                    const endedMsg = message.message;
                    if (endedMsg.reason !== undefined) {
                        scope.model.systemMessage = `Chat ended by ${endedMsg.reason}`;
                        scope.chatWindowSwitch = 'feedback';
                    }
                    scope.connected = false;
                    break;
                case 'ChatTransferred':
                    scope.model.messages
                    .push({ type: 'system', from: '', msg: `Chat transfered to ${message.message.name}` });
                    $timeout.cancel(sessionTimeout);
                    break;
            }
        }

        function readLocalTabId() {
            return webStorageUtils.readLocal('teLiveagentTabId');
        }

        function checkClientRequestError(response) {
            if (response.status === -1 || response.status === 500) {
                clientDisconnected = true;
            }
            else if (response.status === 408) {
                clientDisconnected = true;
                clientTimedOut();
            }
            else if (response.status === 502) {
                // Bad Gateway error. Probaly Salesforce replied with a wrong message.
                // Should try again.
                checkMessages();
            }
        }

        // The client failed to poll the messages for longer than the timeout threshold.
        // Most likely the computer entered sleep mode or the client lost connection.
        // In that case the client is informed that the chat ended due to inactivity.
        function clientTimedOut() {
            scope.connected = false;
            scope.chatWindowSwitch = 'clientEnded';
            removeTabId();
            pollDeferrer.resolve();
        }

        function sessionTimedOut() {
            scope.connected = false;
            scope.chatWindowSwitch = 'serverEnded';
            removeTabId();
            pollDeferrer.resolve();
        }

        function postChatActions() {
            const feedback = {
                    feedback: scope.model.feedbackMsg,
                    closeCase: scope.model.closeCase,
            };
            sfdcLiveagentService.postChatActions(sessionKey, feedback)
            .then(feedbackSubmitted, cleanChatSession);
        }

        function feedbackSubmitted() {
            cleanChatSession();
            if (scope.teExpanded) {
                scope.expandedWindow = false;
                $window.close();
            }

        }

        function cleanChatSession() {
            Object.assign(scope, {
                chatWindowSwitch: 'chat',
                chatEndedSummary: false,
                windowOpen: false,
                model: {
                    systemMessage: '',
                    messages: [],
                    msginput: '',
                    feedbackMsg: '',
                    closeCase: true,
                },
            });
            sessionKey = null;
            serverMessageNumber = 0;
            removeTabId();
            webStorageUtils.removeLocal('teLiveagentKey');
            webStorageUtils.removeLocal('teLiveagentFeedback');
            webStorageUtils.removeLocal('teLiveagentClientMsgSequence');
            webStorageUtils.removeLocal('teLiveagentServerMsgSequence');
            webStorageUtils.removeLocal('teLiveagentMsgHistory');
            webStorageUtils.removeLocal('teLiveagentExpanded');
        }

        function keyPressed() {
            if (!webStorageUtils.readLocal('teLiveagentKey')) {
                return;
            }
            if (!lastKeyPressedTimestamp) {
                keyPressedTimeout = $timeout(clientTyping, typingCheckInterval, false);
            }
            lastKeyPressedTimestamp = Date.now();
        }

        function clientTyping() {
            if (!lastKeyPressedTimestamp) {
                return;
            }
            keyPressedTimeout = $timeout(clientNotTyping, typingCheckInterval, false);
            sfdcLiveagentService.informClientTyping(sessionKey)
            .catch(response => {
                    checkClientRequestError(response);
                });

        }

        function clientNotTyping() {
            if (!lastKeyPressedTimestamp) {
                return;
            }
            if (Date.now() - lastKeyPressedTimestamp < typingCheckInterval) {
                keyPressedTimeout = $timeout(clientNotTyping, typingCheckInterval, false);
            }
            else {
                lastKeyPressedTimestamp = 0;
                sfdcLiveagentService.informClientNotTyping(sessionKey)
                .catch(response => {
                    checkClientRequestError(response);
                });
            }
        }

        // Starts a new chat session from inside the existing chat window. This should be used
        // on chat ended  messages to start a chat session again.
        function restartChatSession() {
            cleanChatSession();
            if (scope.expandedWindow) {
                scope.windowOpen = true;
                scope.chatWindowSwitch = 'chat';
                scope.model.systemMessage = 'Send a message to start the chat session';
            }
            else {
                const tabId = sfdcLiveagentService.generateTabId();
                webStorageUtils.saveSession('teLiveagentTabId', tabId);
                webStorageUtils.saveLocal('teLiveagentTabId', tabId);
            }
        }

        function startChatSession() {
            const language = $window.navigator.language || $window.navigator.userLanguage;
            const resolution = `${$window.screen.width} x ${$window.screen.height}`;

            scope.model.systemMessage = 'Starting chat session';

            sfdcLiveagentService.startChat(language, resolution).then(response => {
                webStorageUtils.saveLocal('teLiveagentLast', (new Date()).getTime());
                webStorageUtils.saveLocal('teLiveagentKey', response.data);
                loadChatWindow();
                newMessage();
            });
        }

        function onFileDropped(files) {
            if (!scope.connected) {
                return;
            }
            if (files.length > 0) {
                sendInProgress = true;
                scope.model.systemMessage = `Uploading ${files.length} file${files.length > 1 ? 's' : ''}`;
                sfdcLiveagentService.newBinaryMessage(sessionKey, files[0])
                .then(response => {
                        const fileLink = `<a href="${response.data.fileUrl}" target="_blank">${response.data.fileUrl}</a>`;
                        scope.model.messages.push( { type: 'fromme', from: 'Me', rich: true, msg: fileLink } );
                        scope.model.msginput = '';
                    },
                    () => {
                        scope.model.messages.push({ type: 'system', from: '', msg: 'Error uploading file. Please try again.' });
                    })
                .finally(() => {
                    files.shift();
                    onFileDropped(files);
                    sendInProgress = false;
                });
            }
            else {
                scope.model.systemMessage = '';
            }
        }

        function browserSupportsSounds() {
            const a = document.createElement('audio');
            return !!(a.canPlayType && a.canPlayType('audio/mpeg;').replace(/no/, ''));
        }
    }

});
