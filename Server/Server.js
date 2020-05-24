const bodyParser = require('body-parser');
const server = require('express')();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const users = require('./routes/users.js');

const files = require('./controllers/controllerFiles');
const controllerNotes = require('./controllers/controllerNotes');
const controllerUsers = require('./controllers/controllerUsers');

const multer = require('multer')

const graphqlHTTP = require('express-graphql');
const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');
const uploaderDir =  __dirname + '/uploadedFiles';
const upload = multer({ dest: uploaderDir });

const PORT = 5000;

files.initializeUploadDir(uploaderDir);
controllerNotes.initializeNotesFile();
controllerUsers.initializeUsersFile();

server.set('secretKey', 'nodeGraphQL');
server.use(cors());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.use('/users', users);
server.post('/downloadFile', files.downloadFile);
server.post('/uploadFile', upload.single('myFile'), files.uploadFile);

server.use('/graphql', graphqlHTTP({
  schema: typeDefs,
  rootValue: resolvers,
  graphiql: true,
}));

server.use((request, response) => {
  response.status(404).send('Nope, nothing here.')
})     

server.listen(PORT, function() {
  console.log(`Express server is running on http://localhost:${PORT} in ${server.get('env')} mode.`);
});

server.use((req, res, next) => {
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), (err, decoded) => {
    if (err) {
      res.status(401).send({ status: 'error', message: err.message })
    } else {
      next()
    }
  })
})

// Как лабораторные 3 и 4, но на сервере сделать API на GraphQL.