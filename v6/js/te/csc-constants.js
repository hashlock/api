'use strict';

angular.module('app.csc.constants', [])
.constant('MAX_UPLOAD_SIZE', 6.8 * 1024 * 1024)
.constant('FILE_SIZE_LIMIT_EXCEEDED', 'Chat file upload limit is 6MB.  Please reduce your image size and try again.');