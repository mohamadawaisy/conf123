/**
 * Created by wael on 07/10/2016.
 */

var cryptos = require('../utils/cryptos');
var strSplit = '_!!_';
var expirationPeriodInMillis = 3600000; //one hour expiration
var Config=require('../config');
function UserToken(isNew,token,username, password, role){
    if (isNew) {//this is a request for a new token sent by user, so the input is the user
        this.username = username;
        this.password = password;
        this.creationTime = (new Date()).getTime();
        this.role = role;
        // this.careProvider = careProvider;
        this.token = cryptos().getEncrypted('kblanemServer' + strSplit + this.username + strSplit + this.password + strSplit + this.creationTime + strSplit + this.role );
        // this.token = cryptos().getEncrypted('uniperServer' + strSplit + this.username + strSplit + this.password + strSplit + this.creationTime + strSplit + this.role );

    }
    else {//this is a server token for already logged in User, so the input is the token itself.
        this.token = token;
        this.username = cryptos().getDecrypted(token).split(strSplit)[1];
        this.password = cryptos().getDecrypted(token).split(strSplit)[2];
        this.creationTime = parseInt(cryptos().getDecrypted(token).split(strSplit)[3]);
        this.role = cryptos().getDecrypted(token).split(strSplit)[4];
        this.careProvider = cryptos().getDecrypted(token).split(strSplit)[5];
    }
}

UserToken.prototype = {
    constructor: UserToken,
    getCreationTime: function () {
        return this.creationTime
    },
    getUserName: function () {
        return this.username
    },
    isNotExpired: function () {
        var expirationPeriodInMillis =Config.careTokenExpirationPeriodInMillis || 3600000;//one hour expiration
        console.log("this.creationTime:"+this.creationTime);
        console.log("expirationPeriodInMillis:"+expirationPeriodInMillis);
        console.log("(new Date).getTime()"+(new Date).getTime());
        if ((this.creationTime + expirationPeriodInMillis) <(new Date).getTime()) {
            console.log("log-in time expired");
            return false;
        } else {

            return true;
        }
    },
    getToken: function () {
        return this.token
    },
    getRole: function () {
        return this.role
    },
    // getCareProvider: function () {
    //     return this.careProvider
    // },
    getPassword: function () {
        return this.password
    }
};

module.exports = UserToken;