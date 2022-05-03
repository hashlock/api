'use strict';

angular.module('app.csc.directives.teChatWindow')
.directive('teRepeatFinished', function ($timeout) {
    return function (scope, element) {
        if (scope.$last){
            $timeout(function () {
                const messagesContainer = angular.element(element)[0].parentElement;
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }, 0, false);
        }
    };
});
