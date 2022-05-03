'use strict';

angular.module('te.ui.enter', [])
.directive('teEnter', ['$log',
                       function ($log) {
    return function (scope, element, attrs) {
        $log.log('te-enter called ');
        element.on('keydown keypress', function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.teEnter);
                    $log.log('teEnter value: ' + attrs.teEnter);
                });
                event.preventDefault();
            }
        });
    };
}]);