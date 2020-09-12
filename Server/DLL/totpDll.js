const mongo = require('mongodb');
var fs = require('fs');
const Speakeasy = require("speakeasy");
var QRCode = require('qrcode');
var base32 = require('base32');
const { response } = require('express');
const { decode } = require('querystring');
const mongoClient = mongo.MongoClient;
const url = "mongodb://localhost:27017/";
const DB = "kitModule";


exports.addSmsBasedOtp = (dataobj, callback) => {
    var apikey = "12345678901234567890";
    console.log(dataobj);
    if (dataobj.key.length == 20) {
        if (apikey == dataobj.key) {
            mongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db(DB);
                var data = { otp: 0, mobile: 0 };
                dbo.collection("totp").find().sort({ "otp": -1 }).toArray(function(err, result) {
                    if (err) throw err;
                    let newotp;
                    if (result.length == 0) {
                        newotp = 10000;
                    } else {
                        newotp = result[0].otp + 1;
                    }
                    data.otp = newotp;
                    data.mobile = dataobj.mobile;
                    data.datetime = new Date();
                    data.block = false;
                    dbo.collection("totp").insertOne(data, function(err, responsd) {
                        if (err) throw err;
                        callback(dataobj.mobile)
                        db.close();
                    });
                })
            })

        }
    } else {
        console.log("enter a 20 digit number key");
        let response = {
            message: "enter a 20 digit number key."
        }
        callback(response)

    }

}

exports.addProjectMaster = (data, callback) => {
    mongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        dbo.collection("project_master").find().sort({ "projectcode": -1 }).toArray(function(err, result) {
            if (err) throw err;
            let newprojectcode;
            if (result.length == 0) {
                newprojectcode = 1;
            } else {
                newprojectcode = result[0].otp + 1;
            }
            data.projectcode = newprojectcode;
            data.datetime = new Date();
            dbo.collection("project_master").find().sort({ "apikey": -1 }).toArray(function(err, result) {
                if (err) throw err;
                let newapikey;
                if (result.length == 0) {
                    newapikey = 1000000000;
                } else {
                    newapikey = result[0].apikey + 1;
                }
                data.apikey = newapikey;
                dbo.collection("project_master").insertOne(data, function(err, responsd) {
                    if (err) throw err;
                    let response = {
                        message: "Project details added successfully",
                        apikey: data.apikey
                    }
                    callback(response);
                    db.close();
                });
            });
        });
    });
}

exports.changeApiKey = (projectcode, callback) => {
    mongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        dbo.collection("project_master").find().sort({ "apikey": -1 }).toArray(function(err, result) {
            if (err) throw err;
            let newapikey;
            if (result.length == 0) {
                newapikey = 1000000000;
            } else {
                newapikey = result[0].apikey + 1;
            }
            let data = { apikey: newapikey }
            dbo.collection("project_master").updateOne({ projectcode: +projectcode.projectcode }, { $set: data }, function(err, result) {
                if (err) throw err;
                let response = {
                    key: newapikey,
                    message: "Api key changes successfully"
                }

                callback(response);
                db.close();
            });
        });
    });
}


exports.totpsecret = (dataobj, callback) => {
    mongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        dbo.collection("totp").findOne({ mobile: dataobj.mobile }, function(err, result) {
            if (err) throw err;
            if (result.otp == dataobj.otp) {
                var secret = Speakeasy.generateSecret();
                var data = { secretcode: secret.base32 };

                dbo.collection("totp").updateOne({ mobile: dataobj.mobile }, { $set: data }, function(err, result) {
                    if (err) throw err;
                    db.close();
                });

                QRCode.toDataURL(secret.otpauth_url, function(err, data_url) {
                    let response = {
                        qrcode: '<img src="' + data_url + '">'
                    };
                    callback(response);
                });
            } else {
                var message = "please enter a valid OTP";
                console.log(message);
            }
        });

    });
}

exports.totpvalidate = (dataobj, callback) => {
    mongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        dbo.collection("totp").findOne({ mobile: dataobj.mobile }, function(err, result) {
            if (err) throw err;
            let response = {
                "valid": Speakeasy.totp.verify({
                    secret: result.secretcode,
                    encoding: "base32",
                    token: dataobj.userToken,
                    window: 0
                })
            }

            callback(response);
            db.close();
        });
    });
}

exports.getfilitertotpdetails = function(mobile, callback) {
    mongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        dbo.collection("totp").find({ mobile: +mobile.mobile }).toArray(function(err, result) {
            if (err) throw err;
            var results = JSON.stringify(result);
            callback(results);
            db.close();
        });
    });
}

exports.showQrcode = function(mobile, callback) {
    mongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        console.log(mobile);
        dbo.collection("totp").findOne({ mobile: +mobile.mobile }, function(err, result) {
            if (err) throw err;
            console.log(result.secretcode);
            // var secret = base32.decode(result.secretcode);
            var secret = result.secretcode;
            QRCode.toDataURL(secret.otpauth_url, function(err, data_url) {
                let response = {
                    qrcode: data_url
                };
                callback(response);
            });

        });
    });
}

exports.adminlogin = function(body, callback) {
    mongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        dbo.collection("totpadmin").findOne({ email: body.email }, function(err, result) {
            if (err) throw err;
            callback(result);
        });

    });
}


exports.gettotpdetails = (email, callback) => {
    mongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        dbo.collection('totp').find().toArray(function(err, result) {
            if (err) throw err;
            var results = JSON.stringify(result);
            callback(results);
            db.close();
        });
    });
}

exports.getProjectMasterList = (email, callback) => {
    mongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        dbo.collection('project_master').find().toArray(function(err, result) {
            if (err) throw err;
            var results = JSON.stringify(result);
            callback(results);
            db.close();
        });
    });
}

exports.updateblockstatus = function(mobile, updateBody, callback) {
    mongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        dbo.collection("totp").updateOne({ mobile: +mobile.mobile }, { $set: updateBody }, function(err, result) {
            if (err) throw err;
            let response = {
                message: "Block Status updated successfully."
            }
            callback(response);
            db.close();
        });
    });
}

exports.updateprojectmaster = function(projectcode, updateBody, callback) {
    mongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        dbo.collection("project_master").updateOne({ projectcode: +projectcode }, { $set: updateBody }, function(err, result) {
            if (err) throw err;
            let response = {
                message: "Project details updated successfully."
            }
            callback(response);
            db.close();
        });
    });
}

exports.changepswd = function(username, updateBody, callback) {
    mongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        dbo.collection("totpadmin").findOne({ email: username.username }, function(err, result) {
            if (err) throw err;
            if (result.password == updateBody.oldpswd) {
                let newUpdateBody = { password: updateBody.newpswd }
                dbo.collection("totpadmin").updateOne({ email: username.username }, { $set: newUpdateBody }, function(err, result) {
                    if (err) throw err;
                    let response = {
                        message: "Password changes Succcessfully"
                    }
                    callback(response);
                    db.close();
                });
            }

        });
    });
}

exports.deleteuser = function(mobile, callback) {
    mongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        dbo.collection("totp").deleteOne({ mobile: +mobile.mobile }, function(err, result) {
            if (err) throw err;
            let response = {
                message: "Deleted successfully."
            }
            callback(response);
            db.close();
        });
    });
}

exports.deleteproject = function(projectcode, callback) {
    mongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        dbo.collection("project_master").deleteOne({ projectcode: +projectcode.projectcode }, function(err, result) {
            if (err) throw err;
            let response = {
                message: "Deleted successfully."
            }
            callback(response);
            db.close();
        });
    });
}