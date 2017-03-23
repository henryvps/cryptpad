define([
    '/common/cryptpad-common.js',
    '/common/cryptget.js',
    '/common/mergeDrive.js',
    '/bower_components/file-saver/FileSaver.min.js',
    '/bower_components/jquery/dist/jquery.min.js',
], function (Cryptpad, Crypt, Merge) {
    var $ = window.jQuery;

    $(function () {
        Cryptpad.ready(function () {


            var onMessage = function (evt) {
                var message = {};
                if (evt.origin !== "https://acounts.cryptpad.fr") {
                    message.error = "Invalid origin";
                } else {

                    message.value = "Auth cookie created";
                }
            };

            if (window.addEventListener) {
                window.addEventListener("message", onMessage, false);
            } else {
                window.attachEvent("onmessage", onMessage);
            }


            });
        });

        window.addEventListener('storage', function (e) {
            var key = e.key;
            if (e.key !== Cryptpad.userHashKey) { return; }
            var o = e.oldValue;
            var n = e.newValue;
            window.location.reload();
            if (o && !n) { // disconnect
                //redirectToMain();
            }
        });
    });

