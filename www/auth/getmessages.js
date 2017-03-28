var CryptPad_post = {
    buffer: [],
    // origin: "https://acounts.cryptpad.fr",
    origin: "http://localhost:3001",
};

CryptPad_post.sendMessage = function (msg) {
    if (!CryptPad_post.window) { throw new Error("Message not sent: unknown source window.", msg); }
    console.log("CryptPad: Sending", msg);
    CryptPad_post.window.postMessage(msg, CryptPad_post.origin);
};

CryptPad_post.registerHandler = function (h) {
    if (window.addEventListener) {
        window.addEventListener("message", h, false);
    }
};

CryptPad_post.checkMessage = function (evt) {
    var message = {};
    console.log("CryptPad: Receiving", evt.data);
    if (evt.origin !== CryptPad_post.origin) {
        message.status = 0;
        message.error = "Invalid origin";
    } else {
        message.status = 1;
        message.value = "Valid Cryptpad Auth Page";
    }
    if (!CryptPad_post.window) { CryptPad_post.window = evt.source; }
    return message;
};

CryptPad_post.onMessage = function (evt) {
    var message = CryptPad_post.    checkMessage(evt);
    CryptPad_post.buffer.push(message);
};

CryptPad_post.registerHandler(CryptPad_post.onMessage);
