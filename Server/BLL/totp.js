const express = require('express');
const app = express();
const router = express.Router();
module.exports = router;
var requestIP = require('request-ip');
var os = require('os');
var UAParser = require('ua-parser-js');
var parser = new UAParser();
const totpDll = require('../DLL/totpDll');
const audit = require('../auditlog');
var device = require('express-device');
router.use(device.capture());

/**
 * @swagger
 * /totp/addSmsBasedOtp:
 *  get:
 *    description: Add user mobile number to database.
 *    parameters:
 *       - in: query
 *         name: mobile
 *         schema:
 *           type: number
 *         required: true
 *         description: the user provided mobile number.
 *       - in: query
 *         name: key
 *         schema:
 *           type: string
 *         required: true
 *         description: A 20 charecter string which confirms a valid Rest Api.
 *    responses: 
 *      '200':
 *        description: verification and store of user provided mobile number.
 */
router.get('/addSmsBasedOtp', function(req, res) {
    data = { mobile: +req.query.mobile, key: req.query.key };
    totpDll.addSmsBasedOtp(data, function(result) {
        if (result.length == 0) {
            audit.addAuditLog(1, 1000000005, req.query, req.params, req.body, req.query.mobile, "mobile", "Adding mobile and sms based otp to database", "failed", req.url, req.route.path, req.ip, parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version, req.device.type.toUpperCase(), os.type());
            res.render('otpvalidpage', { mobile: result });
        } else {

            audit.addAuditLog(1, 1000000005, req.query, req.params, req.body, req.body.mobile, "mobile", "Adding mobile and sms based otp to database", "success", req.url, req.route.path, req.ip, parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version, req.device.type.toUpperCase(), os.type());
            res.render('otpvalidpage', { mobile: result });
        }
    });
});

/**
 * @swagger
 * /totp/addProjectMaster:
 *  post:
 *    description: Add user mobile number to database.
 *    parameters:
 *       - in: body
 *         name: protocol
 *         schema:
 *           type: string
 *         required: true
 *         description: the protocol in whih website will browse.
 *       - in: body
 *         name: url
 *         schema:
 *           type: url
 *         required: true
 *         description: the url of the rest api.
 *       - in: body
 *         name: IP
 *         schema:
 *           type: string
 *         required: true
 *         description: the IP of the server.
 *       - in: body
 *         name: FailoverIP
 *         schema:
 *           type: string
 *         required: true
 *         description: the backup server id provided by user.
 *       - in: body
 *         name: projectname
 *         schema:
 *           type: string
 *         required: true
 *         description: the name of the project.
 *       - in: body
 *         name: description
 *         schema:
 *           type: string
 *         required: true
 *         description: the description of the project.
 *    responses: 
 *      '200':
 *        description: verification and store of user provided mobile number.
 */
router.post('/addProjectMaster', function(req, res) {
    totpDll.addProjectMaster(req.body, function(result) {
        if (result.length == 0) {
            audit.addAuditLog(1, 1000000005, req.query, req.params, req.body, req.body.email, "email", "Adding project in the database", "failed", req.url, req.route.path, req.ip, parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version, req.device.type.toUpperCase(), os.type());
            res.send(result);
        } else {

            audit.addAuditLog(1, 1000000005, req.query, req.params, req.body, req.body.email, "email", "Adding project in the database", "success", req.url, req.route.path, req.ip, parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version, req.device.type.toUpperCase(), os.type());
            res.send(result);
        }
    });
});

/**
 * @swagger
 * /totp/addcompany:
 *  post:
 *    description: Add user mobile number to database.
 *    parameters:
 *       - in: body
 *         name: protocol
 *         schema:
 *           type: string
 *         required: true
 *         description: the protocol in whih website will browse.
 *       - in: body
 *         name: url
 *         schema:
 *           type: url
 *         required: true
 *         description: the url of the rest api.
 *       - in: body
 *         name: IP
 *         schema:
 *           type: string
 *         required: true
 *         description: the IP of the server.
 *       - in: body
 *         name: FailoverIP
 *         schema:
 *           type: string
 *         required: true
 *         description: the backup server id provided by user.
 *       - in: body
 *         name: projectname
 *         schema:
 *           type: string
 *         required: true
 *         description: the name of the project.
 *       - in: body
 *         name: description
 *         schema:
 *           type: string
 *         required: true
 *         description: the description of the project.
 *    responses: 
 *      '200':
 *        description: verification and store of user provided mobile number.
 */
router.post('/addcompany', function(req, res) {
    audit.addcompany(req.body, function(result) {
        if (result.length == 0) {
            audit.addAuditLog(req.body.projectcode, 1000000006, req.query, req.params, req.body, req.body.email, "email", "Adding project in the database", "failed", req.url, req.route.path, req.ip, parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version, req.device.type.toUpperCase(), os.type());
            res.send(result);
        } else {

            audit.addAuditLog(req.body.projectcode, 1000000006, req.query, req.params, req.body, req.body.email, "email", "Adding project in the database", "success", req.url, req.route.path, req.ip, parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version, req.device.type.toUpperCase(), os.type());
            res.send(result);
        }
    });
});


/**
 * @swagger
 * /totp/totp-secret:
 *  get:
 *    description: verification of user provided number.
 *    parameters:
 *       - in: query
 *         name: mobile
 *         schema:
 *           type: number
 *         required: true
 *         description: the user provided mobile number.
 *       - in: query
 *         name: otp
 *         schema:
 *           type: number
 *         required: true
 *         description: A sms based otp provided user registered number.
 *    responses: 
 *      '200':
 *        description: verification mobile number and providing qrcode for totp.
 */
router.get('/totp-secret', function(req, res) {
    data = { mobile: +req.query.mobile, otp: req.query.otp }
    totpDll.totpsecret(data, function(result) {
        if (result.length == 0) {
            audit.addAuditLog(1, 1000000005, req.query, req.params, req.body, req.query.mobile, "mobile", "Generating the Qrcode for TOTP", "failed", req.url, req.route.path, req.ip, parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version, req.device.type.toUpperCase(), os.type());
            res.send(result.qrcode);
        } else {

            audit.addAuditLog(1, 1000000005, req.query, req.params, req.body, req.query.mobile, "mobile", "Genarating the Qrcode for TOTP", "success", req.url, req.route.path, req.ip, parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version, req.device.type.toUpperCase(), os.type());
            res.send(result.qrcode);
        }
    });
});


/**
 * @swagger
 * /totp/totp-validate:
 *  get:
 *    description: validation of user through TOTP.
 *    parameters:
 *       - in: query
 *         name: mobile
 *         schema:
 *           type: number
 *         required: true
 *         description: the user provided mobile number.
 *       - in: query
 *         name: userToken
 *         schema:
 *           type: number
 *         required: true
 *         description: A Time based otp provided user through qrcode.
 *    responses: 
 *      '200':
 *        description: verification of user for the use of application.
 */
router.get('/totp-validate', function(req, res) {
    data = { mobile: +req.query.mobile, userToken: req.query.userToken }
    totpDll.totpvalidate(data, function(result) {
        if (result.valid == true) {
            message = "OTP matched successfully";
            res.send(message);
        } else {
            message = "OTP matched unsuccessfully"
            res.send(message);
        }
    });
});


/**
 * @swagger
 * /totp/gettotpdetails:
 *  get:
 *    description: This API will retrive the list of users.  
 *    responses:
 *      '200':
 *        description: get a list of users
 *        content:
 *          application/Json:
 *          schema:
 *              type:Array
 *          description: A list of users details.
 */
router.get("/gettotpdetails/:email", function(req, res) {
    totpDll.gettotpdetails(req.params, function(result) {
        res.send(result);
    });
});


/**
 * @swagger
 * /totp/getauditlist:
 *  get:
 *    description: This API will retrive the list of users.  
 *    responses:
 *      '200':
 *        description: get a list of audit list
 *        content:
 *          application/Json:
 *          schema:
 *              type:Array
 *          description: A list of auditlog details.
 */
router.get("/getauditlist", function(req, res) {
    audit.getauditlist(function(result) {
        res.send(result);
    });
});


/**
 * @swagger
 * /totp/cgetauditlist:
 *  get:
 *    description: This API will retrive the list of users.  
 *    responses:
 *      '200':
 *        description: get a list of audit list
 *        content:
 *          application/Json:
 *          schema:
 *              type:Array
 *          description: A list of auditlog details.
 */
router.get("/cgetauditlist/:projectcode", function(req, res) {
    audit.cgetauditlist(req.params, function(result) {
        res.send(result);
    });
});

/**
 * @swagger
 * /totp/cgeterrorlist:
 *  get:
 *    description: This API will retrive the list of users.  
 *    responses:
 *      '200':
 *        description: get a list of audit list
 *        content:
 *          application/Json:
 *          schema:
 *              type:Array
 *          description: A list of auditlog details.
 */
router.get("/cgeterrorlist/:projectcode", function(req, res) {
    audit.cgeterrorlist(req.params, function(result) {
        res.send(result);
    });
});

/**
 * @swagger
 * /totp/getemployeedetails:
 *  get:
 *    description: This API will retrive the list of users.  
 *    responses:
 *      '200':
 *        description: get a list of audit list
 *        content:
 *          application/Json:
 *          schema:
 *              type:Array
 *          description: A list of auditlog details.
 */
router.get("/getemployeedetails", function(req, res) {
    audit.getemployeedetails(function(result) {
        res.send(result);
    });
});

/**
 * @swagger
 * /totp/getpclist:
 *  get:
 *    description: This API will retrive the list of users.  
 *    responses:
 *      '200':
 *        description: get a list of audit list
 *        content:
 *          application/Json:
 *          schema:
 *              type:Array
 *          description: A list of auditlog details.
 */
router.get("/getpclist", function(req, res) {
    audit.getpclist(function(result) {
        res.send(result);
    });
});

/**
 * @swagger
 * /totp/searchbycode:
 *  get:
 *    description: This API will retrive the list of users.  
 *    responses:
 *      '200':
 *        description: get a list of audit list
 *        content:
 *          application/Json:
 *          schema:
 *              type:Array
 *          description: A list of auditlog details.
 */
router.post("/searchbycode", function(req, res) {
    audit.searchbycode(req.body, function(result) {
        res.send(result);
    });
});

/**
 * @swagger
 * /totp/searchbydate:
 *  get:
 *    description: This API will retrive the list of users.  
 *    responses:
 *      '200':
 *        description: get a list of audit list
 *        content:
 *          application/Json:
 *          schema:
 *              type:Array
 *          description: A list of auditlog details.
 */
router.post("/searchbydate", function(req, res) {
    audit.searchbydate(req.body, function(result) {
        res.send(result);
    });
});

/**
 * @swagger
 * /totp/searchbystatus:
 *  get:
 *    description: This API will display a selected list of data.  
 *    parameters:
 *       - in: params
 *         name: status
 *         schema:
 *           type: string
 *         required: true
 *         description: Status of list of datas needed to be search.
 *    responses:
 *      '200':
 *        description: get a list of audit list
 *        content:
 *          application/Json:
 *          schema:
 *              type:Array
 *          description: A list of auditlog details.
 */
router.post("/searchbystatus", function(req, res) {
    audit.searchbystatus(req.body, function(result) {
        res.send(result);
    });
});

/**
 * @swagger
 * /totp/searchbycs:
 *  get:
 *    description: This API will retrive the list of users.  
 *    responses:
 *      '200':
 *        description: get a list of audit list
 *        content:
 *          application/Json:
 *          schema:
 *              type:Array
 *          description: A list of auditlog details.
 */
router.post("/searchbycs", function(req, res) {
    audit.searchbycs(req.body, function(result) {
        res.send(result);
    });
});

/**
 * @swagger
 * /totp/searchbyds:
 *  get:
 *    description: This API will retrive the list of users.  
 *    responses:
 *      '200':
 *        description: get a list of audit list
 *        content:
 *          application/Json:
 *          schema:
 *              type:Array
 *          description: A list of auditlog details.
 */
router.post("/searchbyds", function(req, res) {
    audit.searchbyds(req.body, function(result) {
        res.send(result);
    });
});

/**
 * @swagger
 * /totp/searchbycd:
 *  get:
 *    description: This API will retrive the list of users.  
 *    responses:
 *      '200':
 *        description: get a list of audit list
 *        content:
 *          application/Json:
 *          schema:
 *              type:Array
 *          description: A list of auditlog details.
 */
router.post("/searchbycd", function(req, res) {
    audit.searchbycd(req.body, function(result) {
        res.send(result);
    });
});

/**
 * @swagger
 * /totp/searchbycsd:
 *  get:
 *    description: This API will display a selected list of data.  
 *    parameters:
 *       - in: params
 *         name: status
 *         schema:
 *           type: string
 *         required: true
 *         description: Status of list of datas needed to be search.
 *    responses:
 *      '200':
 *        description: get a list of audit list
 *        content:
 *          application/Json:
 *          schema:
 *              type:Array
 *          description: A list of auditlog details.
 */
router.post("/searchbycsd", function(req, res) {
    audit.searchbycsd(req.body, function(result) {
        res.send(result);
    });
});

/**
 * @swagger
 * /totp/csearchbydate:
 *  post:
 *    description: This API will retrive the list of users.  
 *    responses:
 *      '200':
 *        description: get a list of audit list
 *        content:
 *          application/Json:
 *          schema:
 *              type:Array
 *          description: A list of auditlog details.
 */
router.post("/csearchbydate", function(req, res) {
    audit.csearchbydate(req.body, function(result) {
        res.send(result);
    });
});

/**
 * @swagger
 * /totp/csearchbystatus:
 *  post:
 *    description: This API will display a selected list of data.  
 *    parameters:
 *       - in: params
 *         name: status
 *         schema:
 *           type: string
 *         required: true
 *         description: Status of list of datas needed to be search.
 *    responses:
 *      '200':
 *        description: get a list of audit list
 *        content:
 *          application/Json:
 *          schema:
 *              type:Array
 *          description: A list of auditlog details.
 */
router.post("/csearchbystatus", function(req, res) {
    audit.csearchbystatus(req.body, function(result) {
        res.send(result);
    });
});


/**
 * @swagger
 * /totp/csearchbyds:
 *  post:
 *    description: This API will retrive the list of users.  
 *    responses:
 *      '200':
 *        description: get a list of audit list
 *        content:
 *          application/Json:
 *          schema:
 *              type:Array
 *          description: A list of auditlog details.
 */
router.post("/csearchbyds", function(req, res) {
    audit.csearchbyds(req.body, function(result) {
        res.send(result);
    });
});

/**
 * @swagger
 * /totp/csearchbydateE:
 *  post:
 *    description: This API will retrive the list of users.  
 *    responses:
 *      '200':
 *        description: get a list of audit list
 *        content:
 *          application/Json:
 *          schema:
 *              type:Array
 *          description: A list of auditlog details.
 */
router.post("/csearchbydateE", function(req, res) {
    audit.csearchbydateE(req.body, function(result) {
        res.send(result);
    });
});

/**
 * @swagger
 * /totp/csearchbystatusE:
 *  post:
 *    description: This API will display a selected list of data.  
 *    parameters:
 *       - in: params
 *         name: status
 *         schema:
 *           type: string
 *         required: true
 *         description: Status of list of datas needed to be search.
 *    responses:
 *      '200':
 *        description: get a list of audit list
 *        content:
 *          application/Json:
 *          schema:
 *              type:Array
 *          description: A list of auditlog details.
 */
router.post("/csearchbystatusE", function(req, res) {
    audit.csearchbystatusE(req.body, function(result) {
        res.send(result);
    });
});


/**
 * @swagger
 * /totp/csearchbydsE:
 *  post:
 *    description: This API will retrive the list of users.  
 *    responses:
 *      '200':
 *        description: get a list of audit list
 *        content:
 *          application/Json:
 *          schema:
 *              type:Array
 *          description: A list of auditlog details.
 */
router.post("/csearchbydsE", function(req, res) {
    audit.csearchbydsE(req.body, function(result) {
        res.send(result);
    });
});


/**
 * @swagger
 * /totp/getProjectMasterList:
 *  get:
 *    description: This API will retrive the list of project details.  
 *    parameters:
 *       - in: params
 *         name: email
 *         schema:
 *           type: email
 *         required: true
 *         description: the user registred email.
 *    responses:
 *      '200':
 *        description: get a list of project details
 *        content:
 *          application/Json:
 *          schema:
 *              type:Array
 *          description: A list of project details.
 */
router.get("/getProjectMasterList/:email", function(req, res) {
    totpDll.getProjectMasterList(req.params, function(result) {
        res.send(result);
    });
});

/**
 * @swagger
 * /totp/getfilitertotpdetails:
 *  get:
 *    description: This API will retrive the list of users.
 *    parameters:
 *       - in: params
 *         name: mobile
 *         schema:
 *           type: number
 *         required: true
 *         description: the user registred mobile number.
 *    responses:
 *      '200':
 *        description: get the dtails of selected users
 *        content:
 *          application/Json:
 *          schema:
 *              type:object
 *          description: A user details.
 */
router.get("/getfilitertotpdetails/:mobile", function(req, res) {
    totpDll.getfilitertotpdetails(req.params, function(result) {
        res.send(result);
    });
});


/**
 * @swagger
 * /totp/getfiliteremployeelist:
 *  get:
 *    description: This API will retrive the list of users.
 *    parameters:
 *       - in: params
 *         name: mobile
 *         schema:
 *           type: number
 *         required: true
 *         description: the user registred mobile number.
 *    responses:
 *      '200':
 *        description: get the dtails of selected users
 *        content:
 *          application/Json:
 *          schema:
 *              type:object
 *          description: A user details.
 */
router.get("/getfiliteremployeelist/:mobile", function(req, res) {
    audit.getfiliteremployeelist(req.params, function(result) {
        res.send(result);
    });
});


/**
 * @swagger
 * /totp/getfilitertotpdetails:
 *  get:
 *    description: This API will retrive the list of users.
 *    parameters:
 *       - in: params
 *         name: mobile
 *         schema:
 *           type: number
 *         required: true
 *         description: The user registred mobile number.
 *    responses:
 *      '200':
 *        description: Get the dtails of selected users
 *        content:
 *          application/Json:
 *          schema:
 *              type:object
 *          description: A user details.
 */
router.get("/showQrcode/:mobile", function(req, res) {
    totpDll.showQrcode(req.params, function(result) {
        res.send(result);
    });
});


/**
 * @swagger
 * /totp/adminlogin:
 *  post:
 *    description: This API will valid user for login.
 *    parameters:
 *       - in: body
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: The user registred email of user.
 *       - in: body
 *         name: password
 *         schema:
 *           type: string
 *         required: true
 *         description: The user registred password of user.
 *    responses:
 *      '200':
 *        description: If verified procced to admin page.
 */
router.post("/adminlogin/", function(req, res) {
    totpDll.adminlogin(req.body, function(result) {
        res.send(result);
    });
});

/**
 * @swagger
 * /totp/cadminlogin:
 *  post:
 *    description: This API will valid user for login.
 *    parameters:
 *       - in: body
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: The user registred email of user.
 *       - in: body
 *         name: password
 *         schema:
 *           type: string
 *         required: true
 *         description: The user registred password of user.
 *    responses:
 *      '200':
 *        description: If verified procced to admin page.
 */
router.post("/cadminlogin/", function(req, res) {
    audit.cadminlogin(req.body, function(result) {
        res.send(result);
    });
});

/**
 * @swagger
 * /totp/changeApiKey:
 *  get:
 *    description: This API will valid user for login.
 *    parameters:
 *       - in: params
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: The user registred email of user.
 *    responses:
 *      '200':
 *        description: If verified procced to admin page.
 */
router.get("/changeApiKey/:projectcode", function(req, res) {
    totpDll.changeApiKey(req.params, function(result) {
        if (result.length == 0) {
            audit.addAuditLog(1, 1000000002, req.query, req.params, req.body, req.params.projectcode, "projectcode", "Chnaging of Apikey in database", "failed", req.url, req.route.path, req.ip, parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version, req.device.type.toUpperCase(), os.type());
            res.send(result);
        } else {

            audit.addAuditLog(1, 1000000002, req.query, req.params, req.body, req.params.projectcode, "projectcode", "Changing of Apikey in database", "success", req.url, req.route.path, req.ip, parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version, req.device.type.toUpperCase(), os.type());
            res.send(result);
        }
    });
});


/**
 * @swagger
 * /totp/updateblockstatus:
 *  put:
 *    description: This API will change the status of login access for user.
 *    parameters:
 *       - in: params
 *         name: mobile
 *         schema:
 *           type: number
 *         required: true
 *         description: The user registred email of user.
 *       - in: body
 *         name: block
 *         schema:
 *           type: boolean
 *         required: true
 *         description: The status for login access of a user.
 *    responses:
 *      '200':
 *        description: change the login access for a user.
 */
router.put("/updateblockstatus/:mobile", function(req, res) {
    totpDll.updateblockstatus(req.params, req.body, function(result) {
        if (result.length == 0) {
            audit.addAuditLog(1, 1000000002, req.query, req.params, req.body, req.params.mobile, "mobile", "Chnaging the blockstatus of user in database", "failed", req.url, req.route.path, req.ip, parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version, req.device.type.toUpperCase(), os.type());
            res.send(result);
        } else {

            audit.addAuditLog(1, 1000000002, req.query, req.params, req.body, req.params.mobile, "mobile", "Changing the blockstatus of the user in database", "success", req.url, req.route.path, req.ip, parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version, req.device.type.toUpperCase(), os.type());
            res.send(result);
        }
    });
});

/**
 * @swagger
 * /totp/updateblockstatus:
 *  put:
 *    description: This API will change the status of login access for user.
 *    parameters:
 *       - in: params
 *         name: mobile
 *         schema:
 *           type: number
 *         required: true
 *         description: The user registred email of user.
 *       - in: body
 *         name: block
 *         schema:
 *           type: boolean
 *         required: true
 *         description: The status for login access of a user.
 *    responses:
 *      '200':
 *        description: change the login access for a user.
 */
router.put("/updateblock/:mobile", function(req, res) {
    audit.updateblock(req.params, req.body, function(result) {
        if (result.length == 0) {
            audit.addAuditLog(2, 1000000006, req.query, req.params, req.body, req.params.mobile, "mobile", "Chnaging the blockstatus of user in database", "failed", req.url, req.route.path, req.ip, parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version, req.device.type.toUpperCase(), os.type());
            res.send(result);
        } else {

            audit.addAuditLog(2, 1000000006, req.query, req.params, req.body, req.params.mobile, "mobile", "Changing the blockstatus of the user in database", "success", req.url, req.route.path, req.ip, parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version, req.device.type.toUpperCase(), os.type());
            res.send(result);
        }
    });
});

/**
 * @swagger
 * /totp/updateprojectmaster:
 *  put:
 *    description: This API will change the status of login access for user.
 *    parameters:
 *       - in: params
 *         name: projectcode
 *         schema:
 *           type: number
 *         required: true
 *         description: System generated project code.
 *       - in: body
 *         name: protocol
 *         schema:
 *           type: string
 *         required: true
 *         description: protocol used by the project.
 *       - in: body
 *         name: url
 *         schema:
 *           type: string
 *         required: true
 *         description: url of the project.
 *       - in: body
 *         name: IP
 *         schema:
 *           type: string
 *         required: true
 *         description: IP address .
 *       - in: body
 *         name: Failover IP
 *         schema:
 *           type: string
 *         required: true
 *         description: Failover IP address/ Backup server IP address.
 *       - in: body
 *         name: project name
 *         schema:
 *           type: string
 *         required: true
 *         description: Name of the project.
 *       - in: body
 *         name: description
 *         schema:
 *           type: string
 *         required: true
 *         description: A brife description about the project.
 *    responses:
 *      '200':
 *        description: change the login access for a user.
 */
router.put("/updateprojectmaster/:projectcode", function(req, res) {
    totpDll.updateprojectmaster(req.params, req.body, function(result) {
        if (result.length == 0) {
            audit.addAuditLog(1, 1000000005, req.query, req.params, req.body, req.params.projectcode, "projectcode", "Updating project master in database", "failed", req.url, req.route.path, req.ip, parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version, req.device.type.toUpperCase(), os.type());
            res.send(result);
        } else {

            audit.addAuditLog(1, 1000000005, req.query, req.params, req.body, req.params.projectcode, "projectcode", "Updating project master in database", "success", req.url, req.route.path, req.ip, parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version, req.device.type.toUpperCase(), os.type());
            res.send(result);
        }
    });
});


/**
 * @swagger
 * /totp/changepswd:
 *  put:
 *    description: This API will change the password for login for user.
 *    parameters:
 *       - in: params
 *         name: mobile
 *         schema:
 *           type: number
 *         required: true
 *         description: the user registred email of user.
 *       - in: body
 *         name: oldpswd
 *         schema:
 *           type: string
 *         required: true
 *         description: the old password of user used for login.
 *       - in: body
 *         name: newpswd
 *         schema:
 *           type: string
 *         required: true
 *         description: the new password of user wants for login.
 *       - in: body
 *    responses:
 *      '200':
 *        description: chnange of password used for login of user.
 */
router.put("/changepswd/:username", function(req, res) {
    totpDll.changepswd(req.params, req.body, function(result) {
        if (result.length == 0) {
            audit.addAuditLog(1, 1000000005, req.query, req.params, req.body, req.params.username, "email", "Changing of password of admin in database", "failed", req.url, req.route.path, req.ip, parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version, req.device.type.toUpperCase(), os.type());
            res.send(result);
        } else {

            audit.addAuditLog(1, 1000000005, req.query, req.params, req.body, req.params.username, "email", "Changing of password of admin in database", "success", req.url, req.route.path, req.ip, parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version, req.device.type.toUpperCase(), os.type());
            res.send(result);
        }
    });
});


/**
 * @swagger
 * /totp/deleteuser:
 *  delete:
 *    description: This API will delete user details from database.
 *    parameters:
 *       - in: params
 *         name: mobile
 *         schema:
 *           type: number
 *         required: true
 *         description: the user registred email of user.
 *    responses:
 *      '200':
 *        description: Delete a user from database.
 */
router.delete("/deleteuser/:mobile", function(req, res) {
    totpDll.deleteuser(req.params, function(result) {
        if (result.length == 0) {
            audit.addAuditLog(1, 1000000005, req.query, req.params, req.body, req.params.mobile, "mobile", "Deletion of user from database", "failed", req.url, req.route.path, req.ip, parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version, req.device.type.toUpperCase(), os.type());
            res.send(result);
        } else {

            audit.addAuditLog(1, 1000000005, req.query, req.params, req.body, req.params.mobile, "mobile", "Deletion of user from database", "success", req.url, req.route.path, req.ip, parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version, req.device.type.toUpperCase(), os.type());
            res.send(result);
        }
    });
});

/**
 * @swagger
 * /totp/deleteproject:
 *  delete:
 *    description: This API will delete user details from database.
 *    parameters:
 *       - in: params
 *         name: mobile
 *         schema:
 *           type: number
 *         required: true
 *         description: the user registred email of user.
 *    responses:
 *      '200':
 *        description: Delete a user from database.
 */
router.delete("/deleteproject/:projectcode", function(req, res) {
    totpDll.deleteproject(req.params, function(result) {
        if (result.length == 0) {
            audit.addAuditLog(req.params.projectcode, 1000000005, req.query, req.params, req.body, req.params.projectcode, "projectcode", "Deletion of project from database", "failed", req.url, req.route.path, req.ip, parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version, req.device.type.toUpperCase(), os.type());
            res.send(result);
        } else {

            audit.addAuditLog(req.params.projectcode, 1000000005, req.query, req.params, req.body, req.params.projectcode, "projectcode", "Deletion of project from database", "success", req.url, req.route.path, req.ip, parser.setUA(req.headers['user-agent']).getBrowser().name, parser.setUA(req.headers['user-agent']).getBrowser().version, req.device.type.toUpperCase(), os.type());
            res.send(result);
        }
        res.send(result);
    });
});
module.exports = router;