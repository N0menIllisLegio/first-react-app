const express = require('express')
const router = express.Router()
const controllerNotes = require('../controllers/controllerNotes.js');

router.patch('/complete/note', controllerNotes.complete);
router.delete('/delete/note', controllerNotes.deleteNote);
router.put('/update/note', controllerNotes.updateNote);
router.post('/add/note', controllerNotes.addNote);
router.get('/note/all', controllerNotes.getAllNotes);
router.get('/note', controllerNotes.getNote);

module.exports = router