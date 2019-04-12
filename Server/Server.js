const bodyParser = require('body-parser');
const server = require('express')();
const cors = require('cors');
const jwt = require('jsonwebtoken');

const files = require('./controllers/controllerFiles');
const notes = require('./controllers/controllerNotes');
const users = require('./routes/users.js');

const PORT = 5000;

server.set('secretKey', 'nodeGraphQL');
server.use(cors());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use('/users', users);


server.use((request, response) => {
  response.status(404).send('Nope, nothing here.')
})     

http.listen(PORT, function() {
  console.log(`Express server is running on http://localhost:${PORT} in ${server.get('env')} mode.`);
});

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

//Как лабораторные 3 и 4, но на сервере сделать API на GraphQL.