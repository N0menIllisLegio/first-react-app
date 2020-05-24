const fs = require("fs-extra");
const notesDB = "notes.json";

function GetNote(noteId) {
	let content = fs.readFileSync(notesDB, "utf8");
	let notes = JSON.parse(content);
	let note = null;

	for (var i = notes.length - 1; i >= 0; i--) {
		if (notes[i].id == noteId) {
			note = notes[i];
			break;
		}
	}

	return note;
}

function GetNotes() {
	let data = "";
	let notes = [];

	try {
		data = fs.readFileSync(notesDB, "utf8");
	} catch(error) {
		console.error(error);	
	}

	try {
		notes = JSON.parse(data);
	} catch(error) {
		console.error(error);
		fs.writeFileSync(notesDB, '[]');
		notes = [];
	}

	return notes;
}

function RewriteNotes(notes) {
	let data = JSON.stringify(notes);
	fs.writeFileSync(notesDB, data);
}

module.exports.initializeNotesFile = function() {
	fs.createFile(notesDB, function(err) {
		if (err !== undefined && err !== null) {
			console.log('Initalize file error: ' + err); 
		} else {
			let data = fs.readFileSync(notesDB, "utf8");
			if (data.length == 0) {
				fs.writeJson(notesDB, [], function(err) { });
			}
		}
	})
}

module.exports.getNote = function(request, response) {
	if(!request.query) return response.status(400).send({status: 'error', msg: 'Empty query of request'});
	let note = GetNote(request.query.id);

	if (note != null) {
		response.status(200).send(note);
	} else {
		response.status(404).send({status: 'error', msg: 'Such note doesnt exists'});
	}
}

module.exports.getAllNotes = function(request, response) {
	let notes = GetNotes();
	response.status(200).send(notes);
}

module.exports.complete = function(request, response) {
	if(!request.body || !request.query) return response.status(400).send({status: 'error', msg: 'Empty query of request'});
	let notes = GetNotes();
	let id = request.query.id;
	let status = request.body.status;

	for (var i = notes.length - 1; i >= 0; i--) {
		if (notes[i].id == id) {
			notes[i].complete = status;
			console.log('COMPLETE STATUS CHANGED', notes[i]);
			break;
		}
	}
	
	RewriteNotes(notes);
	response.status(200).send(notes);
}

module.exports.addNote = function(request, response) {
	if(!request.body) return response.status(400).send({status: 'error', msg: 'Empty body of request'});

	let notes = GetNotes();
	let note = {
		id: null,
		title: request.body.note.title,
		content: request.body.note.content,
		date: request.body.note.date,
		complete: false
	};

	let maxId = Math.max.apply(Math, notes.map(parseNote => parseNote.id));

	if (maxId == Infinity || maxId == -Infinity) {
		maxId = 0;
	}

	note.id = maxId + 1;
	notes.push(note);
	console.log('ADDED', note);
	RewriteNotes(notes);
	response.status(200).send(note);
}

module.exports.updateNote = function(request, response) {
	if(!request.body) return response.status(400).send({status: 'error', msg: 'Empty body of request'});
	let notes = GetNotes();

	for (var i = notes.length - 1; i >= 0; i--) {
		if (notes[i].id == request.body.note.id) {
			notes[i].title = request.body.note.title;
			notes[i].content = request.body.note.content;
			notes[i].date = request.body.note.date;
			console.log('UPDATED', notes[i]);
			break;
		}
	}	
	
	
	RewriteNotes(notes);
	response.status(200).send({status: 'success', msg: 'Note changed'});
}

module.exports.deleteNote = function(request, response) {
	if(!request.query) return response.status(400).send({status: 'error', msg: 'Empty query of request'});
    let id = request.query.id;
    let notes = GetNotes();
    let index = -1;

    for(var i = 0; i < notes.length; i++) {
        if(notes[i].id == id){
			console.log('DELETED', notes[i]);
            index = i;
            break;
        }
    }

    if(index > -1){
        notes.splice(index, 1)[0];
		RewriteNotes(notes);
	
        response.status(200).send({status: 'success', msg: 'Note deleted'});
    } else {
        response.status(404).send({status: 'error', msg: 'Such note doesnt exists'});
    }
}