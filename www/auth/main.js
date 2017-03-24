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
            console.log('IFRAME READY');

            var onAuthMessage = function (evt) {
                var message = CryptPad_post.checkMessage(evt);
                if (message.status === 0) { throw new Error("Invalid source origin"); }
                if (evt.data && typeof(evt.data) === "object" && evt.data.getCookie) {
                    message.status = 2;
                    message.value = {"cookie": "ok"};
                }
                CryptPad_post.sendMessage(message);
            };

            CryptPad_post.registerHandler(onAuthMessage);
            window.removeEventListener("message", CryptPad_post.onMessage);
            CryptPad_post.buffer.forEach(CryptPad_post.sendMessage);
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

