const express = require('express');
const app = express()
var http = require('http')
const server = http.Server(app)


const swaggerUi = require('swagger-ui-express');
const yamljs = require('yamljs');
const swaggerDocument = yamljs.load('./swagger/swagger.yaml')
swaggerDocument.host = process.env.HOST;
app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {}));

const port = 3001;
server.listen(port);
console.log(`reTrip server listening on port ${port}`);
module.exports = app;
