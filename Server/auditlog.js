const mongo = require('mongodb');
const { request } = require('express');
const mongoClient = mongo.MongoClient;
const url = "mongodb://localhost:27017/";
const DB = "auditTrail";



// Audit Trail starts 

exports.addAuditLog = (projectcode, key, query, params, body, userId, usertype, action, status, refUrl, route, ip, bName, bVersion, dtype, os) => {
    try {
        var date = new Date();
        mongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("kitModule");
            dbo.collection("project_master").findOne({ projectcode: projectcode }, function(err, result) {
                if (err) throw err;
                var dbo = db.db(DB);
                if (result.apikey == key) {
                    if (result.inspection == true) {
                        let data = {
                            projectcode: projectcode,
                            apikey: key,
                            query: query,
                            params: params,
                            body: body,
                            datetime: date,
                            userId: userId,
                            usertype: usertype,
                            action: action,
                            status: status,
                            refUrl: refUrl,
                            url: route,
                            ip: ip,
                            browser: { name: bName, version: bVersion },
                            devicetype: dtype,
                            os: os
                        }
                        dbo.collection("auditLog").insertOne(data, function(err, response) {
                            if (err) throw err;
                            db.close();
                        });
                    } else {
                        console.log("auditlog")
                        let data = {
                            projectcode: projectcode,
                            apikey: key,
                            userId: userId,
                            usertype: usertype,
                            action: action,
                            datetime: date,
                            status: status,
                            refUrl: refUrl,
                            url: route,
                            ip: ip,
                            browser: { name: bName, version: bVersion },
                            devicetype: dtype,
                            os: os
                        }

                        dbo.collection("auditLog").insertOne(data, function(err, response) {
                            if (err) throw err;
                            db.close();
                        });
                    }

                }

            });
        });
    } catch (error) {
        db.close();
    }
}

// Error log starts...

// exports.addErrorLog = (projectcode, key, query, params, body, userId, usertype, action, status, refUrl, route, ip, bName, bVersion, dtype, os) => {

//     try {
//         var date = new Date();
//         mongoClient.connect(url, function(err, db) {
//             if (err) throw err;
//             var dbo = db.db("kitModule");
//             dbo.collection("project_master").findOne({ projectcode: projectcode }, function(err, result) {
//                 if (err) throw err;
//                 var dbo = db.db(DB);
//                 if (result.apikey == key) {
//                     if (result.debug == true) {
//                         let data = {
//                             projectcode: projectcode,
//                             apikey: key,
//                             query: query,
//                             params: params,
//                             body: body,
//                             datetime: date,
//                             userId: userId,
//                             usertype: usertype,
//                             action: action,
//                             status: status,
//                             refUrl: refUrl,
//                             url: route,
//                             ip: ip,
//                             browser: { name: bName, version: bVersion },
//                             devicetype: dtype,
//                             os: os
//                         }
//                         dbo.collection("errorLog").insertOne(data, function(err, response) {
//                             if (err) throw err;
//                             db.close();
//                         });
//                     } else {
//                         let data = {
//                             projectcode: projectcode,
//                             apikey: key,
//                             userId: userId,
//                             usertype: usertype,
//                             action: action,
//                             datetime: date,
//                             status: status,
//                             refUrl: refUrl,
//                             url: route,
//                             ip: ip,
//                             browser: { name: bName, version: bVersion },
//                             devicetype: dtype,
//                             os: os
//                         }

//                         dbo.collection("errorLog").insertOne(data, function(err, response) {
//                             if (err) throw err;
//                             db.close();
//                         });
//                     }

//                 }

//             });
//         });
//     } catch (error) {
//         db.close();
//     }
// }


exports.addcompany = (body, callback) => {
    mongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        dbo.collection("companydetails").insertOne(body, function(err, response) {
            if (err) throw err;
            db.close();
            let responsd = {
                message: "Data added successfully"
            }
            callback(responsd);
        });
    });
}

exports.cadminlogin = function(body, callback) {
    mongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        dbo.collection("companydetails").findOne({ email: body.email }, function(err, result) {
            if (err) throw err;
            callback(result);
        });

    });
}

exports.getauditlist = (callback) => {
    mongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        dbo.collection('auditLog').find().toArray(function(err, result) {
            if (err) throw err;
            var results = JSON.stringify(result);
            callback(results);
            db.close();
        });
    });
}

exports.cgeterrorlist = (projectcode, callback) => {
    mongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        dbo.collection('errorLog').find({ projectcode: +projectcode.projectcode }).toArray(function(err, result) {
            if (err) throw err;
            var results = JSON.stringify(result);
            callback(results);
            db.close();
        });
    });
}

exports.cgetauditlist = (projectcode, callback) => {
    mongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        dbo.collection('auditLog').find({ projectcode: +projectcode.projectcode }).toArray(function(err, result) {
            if (err) throw err;
            var results = JSON.stringify(result);
            callback(results);
            db.close();
        });
    });
}

exports.getemployeedetails = (callback) => {
    mongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("kitModule");
        dbo.collection('totp').find().toArray(function(err, result) {
            if (err) throw err;
            var results = JSON.stringify(result);
            callback(results);
            db.close();
        });
    });
}

exports.getfiliteremployeelist = (mobile, callback) => {
    mongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("kitModule");
        dbo.collection('totp').find({ mobile: +mobile.mobile }).toArray(function(err, result) {
            if (err) throw err;
            var results = JSON.stringify(result);
            callback(results);
            db.close();
        });
    });
}


exports.getpclist = function(callback) {
    mongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("kitModule");
        dbo.collection("project_master").find().toArray(function(err, result) {
            if (err) throw err;
            var results = JSON.stringify(result);
            callback(results);
        });

    });

}

exports.searchbycode = function(body, callback) {
    mongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        const aggregate = [{
            $match: {
                projectcode: +body.searchCode

            }
        }];

        dbo.collection("auditLog").aggregate(aggregate).toArray(function(err, result) {
            if (err) throw err;
            var results = JSON.stringify(result);
            callback(results);
        });
    });
}

exports.searchbystatus = function(body, callback) {
    mongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        const aggregate = [{
            $match: {
                status: body.searchstatus

            }
        }];
        dbo.collection("auditLog").aggregate(aggregate).toArray(function(err, result) {
            if (err) throw err;
            var results = JSON.stringify(result);
            callback(results);
        });

    });
}

exports.searchbydate = function(body, callback) {
    mongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        let sdate = new Date(body.datestart);
        let edate = new Date(body.dateend);
        const aggregate = [{
            $match: {
                datetime: { $gte: sdate, $lte: edate }

            }
        }];
        dbo.collection("auditLog").aggregate(aggregate).toArray(function(err, result) {
            if (err) throw err;
            var results = JSON.stringify(result);
            callback(results);
        });

    });

}

exports.searchbycs = function(body, callback) {
    mongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        const aggregate = [{
            $match: {
                "$and": [
                    { projectcode: +body.searchCode },
                    { status: body.searchstatus }
                ]
            }
        }];
        dbo.collection("auditLog").aggregate(aggregate).toArray(function(err, result) {
            if (err) throw err;
            var results = JSON.stringify(result);
            callback(results);
        });

    });
}

exports.searchbyds = function(body, callback) {
    mongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        let sdate = new Date(body.datestart);
        let edate = new Date(body.dateend);
        const aggregate = [{
            $match: {
                "$and": [
                    { status: body.searchstatus },
                    { datetime: { $gte: sdate, $lte: edate } }
                ]
            }
        }];
        dbo.collection("auditLog").aggregate(aggregate).toArray(function(err, result) {
            if (err) throw err;
            var results = JSON.stringify(result);
            callback(results);
        });

    });
}

exports.searchbycd = function(body, callback) {
    mongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        let sdate = new Date(body.datestart);
        let edate = new Date(body.dateend);
        const aggregate = [{
            $match: {
                "$and": [
                    { projectcode: +body.searchCode },
                    { status: body.searchstatus },
                    { datetime: { $gte: sdate, $lte: edate } }
                ]
            }
        }];
        dbo.collection("auditLog").aggregate(aggregate).toArray(function(err, result) {
            if (err) throw err;
            var results = JSON.stringify(result);
            callback(results);
        });

    });
}

exports.searchbycsd = function(body, callback) {
    mongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        let sdate = new Date(body.datestart);
        let edate = new Date(body.dateend);
        const aggregate = [{
            $match: {
                "$and": [
                    { projectcode: +body.searchCode },
                    { status: body.searchstatus },
                    { datetime: { $gte: sdate, $lte: edate } }
                ]
            }
        }];
        dbo.collection("auditLog").aggregate(aggregate).toArray(function(err, result) {
            if (err) throw err;
            var results = JSON.stringify(result);
            callback(results);
        });

    });
}

exports.csearchbystatus = function(body, callback) {
    mongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        const aggregate = [{
            $match: {
                "$and": [
                    { status: body.searchstatus },
                    { projectcode: +body.searchCode }
                ]
            }
        }];
        dbo.collection("auditLog").aggregate(aggregate).toArray(function(err, result) {
            if (err) throw err;
            var results = JSON.stringify(result);
            callback(results);
        });

    });
}

exports.csearchbydate = function(body, callback) {
    mongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        let sdate = new Date(body.datestart);
        let edate = new Date(body.dateend);
        const aggregate = [{
            $match: {
                "$and": [
                    { datetime: { $gte: sdate, $lte: edate } },
                    { projectcode: +body.searchCode }
                ]
            }
        }];
        dbo.collection("auditLog").aggregate(aggregate).toArray(function(err, result) {
            if (err) throw err;
            var results = JSON.stringify(result);
            callback(results);
        });

    });

}


exports.csearchbyds = function(body, callback) {
    mongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        let sdate = new Date(body.datestart);
        let edate = new Date(body.dateend);
        const aggregate = [{
            $match: {
                "$and": [
                    { status: body.searchstatus },
                    { datetime: { $gte: sdate, $lte: edate } },
                    { projectcode: +body.searchCode }
                ]
            }
        }];
        dbo.collection("auditLog").aggregate(aggregate).toArray(function(err, result) {
            if (err) throw err;
            var results = JSON.stringify(result);
            callback(results);
        });

    });
}

exports.csearchbystatusE = function(body, callback) {
    mongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        const aggregate = [{
            $match: {
                "$and": [
                    { status: body.searchstatus },
                    { projectcode: +body.searchCode }
                ]
            }
        }];
        dbo.collection("errorLog").aggregate(aggregate).toArray(function(err, result) {
            if (err) throw err;
            var results = JSON.stringify(result);
            callback(results);
        });

    });
}

exports.csearchbydateE = function(body, callback) {
    mongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        let sdate = new Date(body.datestart);
        let edate = new Date(body.dateend);
        const aggregate = [{
            $match: {
                "$and": [
                    { datetime: { $gte: sdate, $lte: edate } },
                    { projectcode: +body.searchCode }
                ]
            }
        }];
        dbo.collection("errorLog").aggregate(aggregate).toArray(function(err, result) {
            if (err) throw err;
            var results = JSON.stringify(result);
            callback(results);
        });

    });

}


exports.csearchbydsE = function(body, callback) {
    mongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        let sdate = new Date(body.datestart);
        let edate = new Date(body.dateend);
        const aggregate = [{
            $match: {
                "$and": [
                    { status: body.searchstatus },
                    { datetime: { $gte: sdate, $lte: edate } },
                    { projectcode: +body.searchCode }
                ]
            }
        }];
        dbo.collection("errorLog").aggregate(aggregate).toArray(function(err, result) {
            if (err) throw err;
            var results = JSON.stringify(result);
            callback(results);
        });

    });
}


exports.updateblock = function(mobile, updateBody, callback) {
    mongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("kitModule");
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