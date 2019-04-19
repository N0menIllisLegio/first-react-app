import React from 'react'
import Loading from './Loading';
import Axios from 'axios';
import gql from "graphql-tag";

class FileTable extends React.Component {
    uploader = null;
    _isMounted = false;

    state = {
        noteId: null,
        uploadingFile: null,
        uploadingFileName: '',
        files: null
    }

    getFiles(id) {
        Axios({
            url: 'http://localhost:5000/graphql',
            method: 'post',
            data: {
              query:`{ 
                    readFiles(noteId: "${id}")
                }`
            }}).then((result) => {
                // console.log(result);
                this.setState({
                    files: result.data.data.readFiles
                })
            });
    }

    upload = (file) => {
        console.log("TRY", file)

        const formData = new FormData();
        formData.append('myFile', file);
        formData.append('id', this.state.noteId);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        Axios.post('http://localhost:5000/uploadFile',
            formData, config
        ).then((result) => {
                console.log(result);
                this.getFiles(this.state.noteId)
            });
    }

    componentDidMount() {
        this._isMounted = true;

        if (this.props.client) {
            const id = this.props.id;

            this.getFiles(id);
            
            this.setState({
                noteId: id
            })

        } else {
            this.props.history.push('/authentification/1');
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleDeleteFile = (e) => {
        this.props.client.mutate({
            mutation: gql`
                mutation delFile($id: String!, $file: String!) {
                    deleteFile(fileName: $file, noteId: $id)
                }
            `,
            variables: {
                "file": e.target.id,
                "id": this.state.noteId
            },
        }).then(response => {if (response.data.deleteFile) { 
            this.getFiles(this.state.noteId)
        }});
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
                                <input id="upload_input" type="file" name="myFile" onChange={ (e) => this.upload(e.target.files[0])}/>
                            </div>
                            <div className="file-path-wrapper">
                                <input className="file-path validate" type="text" placeholder="Choose file to upload."/>
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