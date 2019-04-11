const fs = require('fs-extra');
const path = require('path')
const dirname = path.dirname(__dirname);

module.exports.deleteDir = function(dir) {
    let dirPath = dirname + '/files/' + dir;
    console.log(dirPath);
    fs.removeSync(dirPath);
}

module.exports.deleteFile = function(fileName, noteId) {
	let file = dirname + '/files/' + noteId + '/' + fileName;

	if (fs.existsSync(file)) {
		fs.removeSync(file);
	}
}

module.exports.downloadFile = function(request, response) {
    if (!request.body) response.sendStatus(403);
    let noteId = request.body.noteId;
    let fileName = request.body.fileName;
  
    let file = dirname + '/files/' + noteId + '/' + fileName;
  
    if (fs.existsSync(file)) {
      console.log("download:", file);
      response.download(file);
    } else {
      response.sendStatus(404);
    }
}

module.exports.moveFile = function(noteId, pathToFile, fileName) {
	if (!fs.existsSync(dirname + '/files/' + noteId)) {
        fs.mkdirSync(dirname + '/files/' + noteId, {recursive: true});
    }
    if (fs.existsSync(pathToFile)) {
        fs.renameSync(pathToFile, dirname + '/files/' + noteId + '/' + fileName);
    }
}

module.exports.readFilesInDir = function(noteId) {
    let path = dirname + '/files/' + noteId;
    let files = [];

    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(file => {
            files.push(file);
        });
    }

    return files;
} 