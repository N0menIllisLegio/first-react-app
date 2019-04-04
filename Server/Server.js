const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const controllerNotes = require('./controllerNotes.js');
const server = express();

server.use(cors());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.patch('/api/complete/note', controllerNotes.complete);
server.delete('/api/delete/note', controllerNotes.deleteNote);
server.put('/api/update/note', controllerNotes.updateNote);
server.post('/api/add/note', controllerNotes.addNote);

server.get('/api/note/all', controllerNotes.getAllNotes);
server.get('/api/note', controllerNotes.getNote);

server.listen(5000);