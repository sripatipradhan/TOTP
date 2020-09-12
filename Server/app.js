const express = require('express');
const app = express();
const path = require('path');
var cor = require('cors');


const bodyParser = require('body-parser');
app.set('view engine', "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cor());

const totpBll = require('./BLL/totp');

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

// Swagger set up
const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "TOTP Module",
            version: "1.0.0",
            description: "A detail description about TOTP module",
            contact: {
                name: "Sripati Kumar Pradhan",
                email: "sripatipradhan80@gmail.com"
            }
        },
        servers: [{
            url: "http://localhost:3000"
        }]
    },
    apis: ["app.js", "E:/totp/BLL/totp.js"]
};
const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve);
app.get("/api-docs", swaggerUI.setup(specs, { explorer: true }));

app.use('/totp', totpBll);

app.use('/', (req, res, next) => {
    res.json({
        status: 200,
        message: "Welcome to the application"
    })
})


app.listen(3000);
console.log('Server started on Port 3000...!')
module.exports = app;