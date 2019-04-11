import React from 'react'
import Loading from './Loading';
import SocketIOFileUpload from 'socketio-file-upload';
import Axios from 'axios';

class FileTable extends React.Component {
    uploader = null;

    state = {
        noteId: null,
        uploadingFile: null,
        uploadingFileName: '',
        files: null
    }

    componentDidMount() {
        if (this.props.socket) {
            const id = this.props.id;

            this.props.socket.on('files', (data) => {
                this.setState({
                    files: data
                });
            })

            this.setState({
                noteId: id
            })

            this.uploader = new SocketIOFileUpload(this.props.socket);

            this.uploader.listenOnInput(document.getElementById('upload_input'));
            this.uploader.addEventListener('start', function(event) {
                event.file.meta.noteId = id;
            });
            this.props.socket.emit('get files', id);

        } else {
            this.props.history.push('/authentification/1');
        }
    }

    componentWillUnmount() {
        // console.
        // this.uploader.removeEventListener('start', function(event) {
        //     event.file.meta.noteId = this.state.noteId;
        // })
        // this.uploader.destroy();
        // this.uploader = null;
    }

    handleDeleteFile = (e) => {
        this.props.socket.emit('delete file', e.target.id, this.state.noteId);
    }

    handleDownloadFile = (e) => {
        let fileName = e.target.id;
        let noteId = this.state.noteId;

        Axios({
                method: 'post',
                url: 'http://localhost:5000/downloadFile',
                responseType: 'blob',
                data: {
                    fileName: fileName,
                    noteId: noteId
                }})
            .then(function (response) {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();
            });
    }

    loadTable() {
        const rows = this.state.files.map(file => (
            <tr key={file}>   
                <td>
                    { file }
                </td>                     
                <td>
                    <button className="btn-floating btn waves-effect waves-light red" 
                        id={file} onClick={this.handleDeleteFile}>
                        <i className="material-icons" id={file}>delete</i>
                    </button>
                </td>
                <td>    
                    <button className="btn-floating btn waves-effect waves-light red" id={file}
                        onClick={this.handleDownloadFile}>
                        <i className="material-icons" id={file}>file_download</i>
                    </button>
                </td>
            </tr>))

        return(
            <table className="highlight centered row">
                <thead>
                    <tr>
                        <th>File Name</th>
                        <th>Delete File</th>
                        <th>Download File</th>
                    </tr>
                </thead>
                <tbody>
                    { rows }
                </tbody>
            </table>
        )
    }

    loadContent() {
        const table = this.state.files.length > 0 ? (
            this.loadTable()
        ) : (
            <div>
                No files...
            </div>
        )
        
        return (
            <div>
                { table }
            </div>
        )
    } 

    render() {
        const content = this.state.files ? ( 
            this.loadContent()
        ) : (
            <Loading />
        );

        return (
            <div className="card hoverable" key={'FILETABLE'}>
                <div className="changeCursor card-content">
                    <span className="card-title center">{ 'FILES' }</span>

                    <div className="row">
                        <div className="file-field input-field">
                            <div className="btn red">
                                <span>Upload Files</span>
                                <input id="upload_input" type="file" 
                                multiple />
                            </div>
                            <div className="file-path-wrapper">
                                <input className="file-path validate" type="text"/>
                            </div>
                        </div>
                    </div>
                    { content }
                </div>
            </div>
        )
    }
}

export default FileTable