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
        Axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => 
                    this.setState({
                        notes: response.data.slice(0, 10),
                        displayedNotes: response.data.slice(0, 10)
                    }))
    }

    handleSelectChange = (e) => {
        let selectedRow = e.target.value
        switch (selectedRow) {
            case '1':
                this.setState({
                    displayedNotes: [...this.state.notes.filter(note => note.title.length > 20)]
                })
                break;
            case '2':
                this.setState({
                    displayedNotes: [...this.state.notes.filter(note => note.title.length < 15)]
                })
                break;
            case '3':
                this.setState({
                    displayedNotes: [...this.state.notes.filter(note => note.body.length < 150)]
                })
                break;
            case '0':
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
                    <div className="card-content" onClick={ () => this.props.history.push('details/' + note.id) }>
                        <span className="card-title center">{ note.title }</span>
                        <p>{ note.body }</p>
                    </div>

                    <div className="card-action row valign-wrapper">
                        <div className="col s3 left-align">
                            <form>     
                                <label>
                                    <input type="checkbox" className="complete-checkbox"/>
                                    <span>Complete</span>
                                </label>
                            </form>
                        </div>

                        <div className="col s6 center-align">
                            <p>{ 'Tuesday, 16 April, 2019' }</p>
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