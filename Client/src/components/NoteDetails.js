import React from 'react';
import Axios from 'axios';
import Loading from './Loading';


class NoteDetails extends React.Component {
    state = {
        note: null
    }

    handleCompleteCheckbox = (e) => {
        Axios.patch(`http://localhost:5000/api/complete/note?id=${ e.target.id }`, { status: e.target.checked })
            .then(response => 
                    this.setState({
                        notes: response.data 
                    })
                )
            .catch(error => {
                    if (error.response.status === 401) {
                        this.props.history.push('/authentification/1');
                    }
                }
            )
    }

    handleDelete = (e) => {
        Axios.delete(`http://localhost:5000/api/delete/note?id=${ this.state.note.id }`)
            .then(response => 
                    this.props.history.push('/')
                )
            .catch(error => {
                    if (error.response.status === 401) {
                        this.props.history.push('/authentification/1');
                    }
                }
            )
    }

    componentDidMount() {
        const id = this.props.match.params.note_id;
        Axios.get(`http://localhost:5000/api/note?id=${ id }`)
            .then(response => this.setState({
                    note: response.data
            }))
            .catch(error => {
                    if (error.response.status === 401) {
                        this.props.history.push('/authentification/1');
                    }
                }
            )
    }

    render() {
        const content = this.state.note ? (
        <div className="note card">
            <div className="card-content">
                <span className="card-title center">{ this.state.note.title }</span>
                <blockquote>
                <pre>{ this.state.note.content }</pre>
                </blockquote>
            </div>
            <div className="card-action row valign-wrapper">
                <div className="col s4 left-align">
                    <form>     
                        <label>
                            <input type="checkbox" id={ this.state.note.id } onClick={ this.handleCompleteCheckbox } defaultChecked={ this.state.note.complete } className="complete-checkbox"/>
                            <span>Complete</span>
                        </label>
                    </form>
                </div>

                <div className="col s4 center-align">
                    <p className="">{ this.state.note.date }</p>
                </div>
                <div className="col s4 right-align">
                    <button className="btn red darken-3 " onClick={ this.handleDelete }>
                        <i className="material-icons right">delete</i>
                        Delete
                    </button>
                </div>
            </div>
        </div>) : (<Loading />);

        return (
            <div className="container">
                { content }
            </div>
        )
    }
}

export default NoteDetails