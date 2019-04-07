const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
var jwt = require('jsonwebtoken');
const users = require('./routes/users.js');
const notes = require('./routes/notes.js');
const server = express();

server.set('secretKey', 'nodeRestApi');

server.use(cors());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.use('/api', validateUser, notes);
server.use('/users', users);

server.use((request, response) => { response.status(404).send({}) });

server.listen(5000);

function validateUser(req, res, next) {
    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
      if (err) {
        res.status(401).send({status:"error", message: err.message, data: null});
      } else {
        // add user id to request
        req.body.userId = decoded.id;
        next();
      }
    });
}