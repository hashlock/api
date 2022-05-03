'use strict';

angular.module('common.utils.webStorageUtils', [])
.factory('webStorageUtils', function ($window) {
    return {
        saveLocal,
        readLocal,
        removeLocal,
        saveSession,
        readSession,
        removeSession,
    };

    // the tab parameter is used by the live agent chat when an expanded window needs to
    // read and write values in the opener window tab
    function saveLocal(key, item) {
        $window.localStorage.setItem(key, JSON.stringify(item));
    }

    function readLocal(key) {
        return JSON.parse($window.localStorage.getItem(key));
    }

    function removeLocal(key) {
        $window.localStorage.removeItem(key);
    }

    function saveSession(key, item) {
        $window.sessionStorage.setItem(key, JSON.stringify(item));
    }

    function readSession(key) {
        return JSON.parse($window.sessionStorage.getItem(key));
    }

    function removeSession(key) {
        $window.sessionStorage.removeItem(key);
    }


});
