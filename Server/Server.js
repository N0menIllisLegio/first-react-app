const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const path = require('path');

const server = express();
const http = require('http').Server(server);
const io = require('socket.io')(http);

const uploaderDir = path.join(__dirname, 'uploadedFiles');
var siofu = require("socketio-file-upload");
const uploader = new siofu();
      uploader.dir = uploaderDir;

const files = require('./controllers/controllerFiles');
const notes = require('./controllers/controllerNotes');
const usersController = require('./controllers/controllerUsers');
const users = require('./routes/users.js');

const PORT = 5000;

notes.initializeNotesFile();
usersController.initializeUsersFile();
files.initializeUploadDir(uploaderDir);

files.dirname = __dirname;
server.set('secretKey', 'nodeRestApi');
server.use(cors());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use('/users', users);
server.use(siofu.router);

server.post('/downloadFile', files.downloadFile);

io.use((socket, next) => {
  jwt.verify(socket.handshake.query.token, server.get('secretKey'), (err, decoded) => {
    if (err) {
      next(new Error('Authentication error'));
    } else {
      socket.handshake.query.userId = decoded.id;
      next();
    }
  })
})

io.on('connection', (client) => {
  console.log('Client connected.');

  // ---NOTES---

  client.on('get all notes', function() {
    let userId = client.handshake.query.userId;
    client.emit('notes', notes.getAllUserNotes(userId))
  });

  client.on('get note', function(id) {
    client.emit('note', notes.getNote(id));
  });

  client.on('add note', function(newNote) {
    let userId = client.handshake.query.userId;
    client.emit('new note', notes.addNote(userId, newNote));
  });

  client.on('update note', function(id, data) {
    client.emit('updated', notes.updateNote(id, data));
  });

  client.on('delete note', function(id){
    client.emit('deleted', notes.deleteNote(id));
  });

  client.on('change note status', function(id, status) {
    client.emit('notes', notes.complete(id, status));
  });

  // ---FILES---

  uploader.listen(client);

  uploader.on('saved', function(event) {
    files.moveFile(event.file.meta.noteId, event.file.pathName, event.file.name);
    client.emit('files', files.readFilesInDir(event.file.meta.noteId));
  });

  client.on('get files', function(noteId) {
    client.emit('files', files.readFilesInDir(noteId));
  });

  client.on('delete file', function(fileName, noteId) {
    files.deleteFile(fileName, noteId);
    client.emit('files', files.readFilesInDir(noteId));
  });

  uploader.on('error', function(event) {
    console.log('Error from uploader', event);
  });

  client.on('disconnect', function(){
    console.log('Client disconnected.');
  });
});

server.use((request, response) => {
  response.status(404).send('Nope, nothing here.')
})     

http.listen(PORT, function() {
  console.log(`Express server is running on http://localhost:${PORT} in ${server.get('env')} mode.`);
});