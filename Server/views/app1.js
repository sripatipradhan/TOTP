const ex = require("express");
var fs = require('fs');
const BodyParser = require("body-parser");
const Speakeasy = require("speakeasy");
var QRCode = require('qrcode');
const mongo = require('mongodb');
const mongoClient = mongo.MongoClient;
const url = "mongodb://localhost:27017/";
const DB = "kitModule";
var app = ex();

app.set('view engine', "ejs");
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

app.get("/login", function(req, res) {
    res.render('index');
});

app.get("/totp-secret", (request, response, next) => {

    mongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        dbo.collection("totp").findOne({ mobile: request.query.mobile }, function(err, result) {
            if (err) throw err;
            if (result.otp == request.query.otp) {
                var secret = Speakeasy.generateSecret();
                // var data = { username: request.query.name, mobile: request.query.mobile, secretcode: secret.base32 };
                var data = { secretcode: secret.base32 };

                dbo.collection("totp").updateOne({ mobile: request.query.mobile }, { $set: data }, function(err, result) {
                    if (err) throw err;
                    db.close();
                });
                fs.writeFile('key.txt', secret.base32, function(err) {
                    if (err) throw err;
                    // console.log('Saved!');
                });
                // var token = Speakeasy.totp({
                //     secret: secret.base32,
                //     encoding: "base32"
                // });
                QRCode.toDataURL(secret.otpauth_url, function(err, data_url) {
                    response.send('<img src="' + data_url + '">');
                });
            } else {
                var message = "please enter a valid OTP";
                console.log(message);
            }
        });

    });
});




app.get("/validate", function(req, res) {
    res.render('valid');
});

app.get("/mobilevalid", function(req, res) {
    res.render('mobile', { mobile: req.query.mobile });
});
//done
app.get("/otpvalid", function(req, res) {
    var apikey = "12345678901234567890";
    if (req.query.key.length == 20) {
        if (apikey == req.query.key) {
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
                    data.mobile = req.query.mobile;
                    dbo.collection("totp").insertOne(data, function(err, responsd) {
                        if (err) throw err;
                        res.render('otpvalidpage', { mobile: req.query.mobile });
                        db.close();
                    });
                })
            })

        }
    } else {
        console.log("enter a 20 digit number key");
    }
});

app.get("/totp-validate", (request, response, next) => {

    mongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        dbo.collection("totp").findOne({ mobile: request.query.mobile }, function(err, result) {
            if (err) throw err;
            response.send({
                "valid": Speakeasy.totp.verify({
                    secret: result.secretcode,
                    encoding: "base32",
                    token: request.query.userToken,
                    window: 0
                })
            });

            db.close();
        });
    })

    // fs.readFile('key.txt', function(err, data) {

    //     response.send({
    //         "valid": Speakeasy.totp.verify({
    //             secret: "O42TCPRZIBDUOM3ZEYYGKKTPIM2WCKJSJRJXCOJEK5MDAUZ4HJCA",
    //             encoding: "base32",
    //             token: request.query.userToken,
    //             window: 0
    //         })
    //     });

    // });
});

app.listen(3000, () => {
    console.log("Listening at :3000...");
});