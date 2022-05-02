'use strict';

angular.module('te.ui.enter', [])
.directive('teEnter', function () {
    return function (scope, element, attrs) {
        element.on('keydown keypress', function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.teEnter);
                });
                event.preventDefault();
            }
        });
    };
});