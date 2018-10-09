const Jimp = require("jimp");
const QrCode = require("qrcode-reader");
const fs = require("fs");
module.exports = (client, message, args) => {

    if (message.attachments.size > 0) {
        message.attachments.every(qrScanner);
    }

    function qrScanner(attach) {
        if (attach.url.indexOf(".png") < 0 || attach.url.indexOf(".jpeg") < 0 || attach.url.indexOf(".jpg") < 0) return message.channel.send("That isn\'t even an image");
        var buffer = fs.readFileSync(attach.url);
        Jimp.read(buffer, function (err, image) {
            if (err) {
                console.error(err);
            }
            let qr = new QrCode();
            qr.callback = function (err, value) {
                if (err) {
                    console.error(err);
                }
                console.log(value.result);
                console.log(value);
            };
            let qrData = qr.decode(image.bitmap);
            message.reply("Status")
        });
    }
}

exports.conf = {
    enabled: true,
    name: "QR Scanner"
};