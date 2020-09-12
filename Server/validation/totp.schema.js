const { validate, ValidationError, Joi } = require('express-validation')

const schema = {
    addSmsBasedOtp: Joi.object({
        mobile: Joi.number().required(),
        key: Joi.string().required(),
    }),

    totpsecret: Joi.object({
        mobile: Joi.number().required(),
        otp: Joi.number().required()
    }),

    totpvalidate: Joi.object({
        mobile: Joi.number().required(),
        userToken: Joi.number().required(),
    }),

}
module.exports = schema;