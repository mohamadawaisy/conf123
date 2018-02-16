/**
 * Created by Joe on 07/10/2016.
 */

var CryptoJS = require("crypto-js");

var encryptionKey = "erhlhvnFS#4392DFSs12FR12pnm,v3$#";

var cryptos = function () {

    var getEncrypted = function (input) {
        var encrypted = CryptoJS.AES.encrypt(input, encryptionKey);
        return encrypted.toString();
    };

    var getDecrypted = function (input) {
        var bytes  = CryptoJS.AES.decrypt(input.toString(), encryptionKey);
        var plaintext = bytes.toString(CryptoJS.enc.Utf8);
        return plaintext;
    };


    return {
        getEncrypted: getEncrypted,
        getDecrypted: getDecrypted
    };
};

module.exports = cryptos;