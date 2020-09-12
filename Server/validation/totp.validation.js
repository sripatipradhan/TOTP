const { addSmsBasedOtp } = require('./totp.schema')
const { totpsecret } = require('./totp.schema')
const { totpvalidate } = require('./totp.schema')

module.exports = {
    addSmsBasedOtpValidation: async(req, res, next) => {
        const value = await addSmsBasedOtp.validate(req.body);
        if (value.error) {
            res.json({
                success: 0,
                message: value.error.details[0].message
            })
        } else {
            next();
        }
    },

    totpvalidateValidation: async(req, res, next) => {
        const value = await totpvalidate.validate(req.body);
        if (value.error) {
            res.json({
                success: 0,
                message: value.error.details[0].message
            })
        } else {
            next();
        }
    },

    totpsecretValidation: async(req, res, next) => {
        const value = await totpsecret.validate(req.body);
        if (value.error) {
            res.json({
                success: 0,
                message: value.error.details[0].message
            })
        } else {
            next();
        }
    },


}