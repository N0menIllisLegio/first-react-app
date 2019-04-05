import React from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import Loading from './Loading'
import { Select } from 'react-materialize'

class Notes extends React.Component {
    state = {
        notes: null,
        displayedNotes: null
    }

    componentDidMount() {
        Axios.get('http://localhost:5000/api/note/all')
            .then(response => {
                    this.setState({
                        notes: response.data,
                        displayedNotes: response.data })
                    })
            .catch(error => {
                    if (error.response.status === 401) {
                        this.props.history.push('/authentification/1');
                    }
                }
            )
    }

    handleCompleteCheckbox = (e) => {
        Axios.patch(`http://localhost:5000/api/complete/note?id=${ e.target.id }`, { status: e.target.checked })
            .then(response => 
                    this.setState({
                        notes: response.data })
                )
            .catch(error => {
                        if (error.response.status === 401) {
                            this.props.history.push('/authentification/1');
                        }
                    }
                )
    }

    handleSelectChange = (e) => {
        switch (e.target.value) {
            case '1':
                this.setState({
                    displayedNotes: this.state.notes.filter(note => new Date(note.date) <= new Date())
                })
                break;
            case '2':
                this.setState({
                    displayedNotes: this.state.notes.filter(note => new Date(note.date) > new Date())
                })
                break;
            case '3':
                this.setState({
                    displayedNotes: this.state.notes.filter(note => note.complete)
                })
                break;
            case '4':
                this.setState({
                    displayedNotes: this.state.notes.filter(note => note.date === '')
                })
                break;
            default:
                this.setState({
                    displayedNotes: [...this.state.notes]
                })
                break;
        }
    }

    createNotes() {
        return (
            this.state.displayedNotes.map(note => { return (
                <div className="card hoverable" key={ note.id }>                        
                    <div className="changeCursor card-content" onClick={ () => this.props.history.push('details/' + note.id) }>
                        <span className="card-title center">{ note.title }</span>
                        <pre>{ note.content }</pre>
                    </div>

                    <div className="card-action row valign-wrapper">
                        <div className="col s3 left-align">
                            <form>     
                                <label>
                                    <input id={note.id} type="checkbox" defaultChecked={note.complete} className="complete-checkbox" onClick={ this.handleCompleteCheckbox }/>
                                    <span>Complete</span>
                                </label>
                            </form>
                        </div>

                        <div className="col s6 center-align">
                            <p>{ note.date }</p>
                        </div>

                        <div className="col s3 right-align">
                            <Link to={ 'edit/' + note.id } className="btn-floating red">
                                <i className="material-icons">edit</i>
                            </Link>
                        </div>
                    </div>
                </div>
            )})
        )
    }

    createAdditionalElements() {
        return (
            <div className="additionals">
                <Select defaultValue="0" onChange={ this.handleSelectChange }>
                    <option value="0">
                        All notes
                    </option>
                    <option value="1">
                        Expired notes
                    </option>
                    <option value="2">
                        Notes in progress
                    </option>
                    <option value="3">
                        Completed notes
                    </option>
                    <option value="4">
                        Timeless notes
                    </option>
                </Select>

                <div className="fixed-action-btn">
                    <Link to={ 'add/-1' } className="btn-floating red">
                        <i className="large material-icons">add</i>
                    </Link>
                </div>
            </div>
        )
    }

    render() {
        let content = null;

        if (this.state.notes === null) { 
            content = <Loading />;
        } else if (this.state.notes === []) {
            content = <h2>There are no notes to display!</h2>;
        } else {
            content = (
                <div>
                    { this.createAdditionalElements() }
                    { this.createNotes() }
                </div>
            )
        }

        return (
            <div className="notes container">
                { content }
            </div>
        )
    }
}

export default Notes