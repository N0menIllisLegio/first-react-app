import React from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'

class Notes extends React.Component {
    state = {
        notes: null
    }

    componentDidMount() {
        Axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => 
                this.setState({
                    notes: response.data.slice(0, 10)
                })
            )
    }

    render() {
        let notesList = null;

        if (this.state.notes === []) {
            notesList = <h2>There are no notes to display!</h2>
        } else {
            notesList = this.state.notes ? (
                this.state.notes.map(note => { return (
                    <div className="note card" key={ note.id }>

                        {/* <div className="card-image">
                            <img src="placeholder.jpeg" width="200px" height="400px"/>
                        </div> */}

                        <div className="card-content">
                            <span className="card-title">{ note.title }</span>
                            <p>{ note.body }</p>
                        </div>

                        <div className="card-action right-align">
                            <Link to={ 'details/' + note.id } className="btn"><i className="material-icons">info</i></Link>
                            <Link to={ 'edit/' + note.id } className="btn"><i className="material-icons">edit</i></Link>
                            {/* if complete or not! */}
                            <Link to="#" className="btn"><i className="material-icons">check_box</i></Link>
                            <Link to="#" className="btn"><i className="material-icons">check_box_outline_blank</i></Link>
                        </div>
                    </div>
                )})
            ) : (
                <h2>Loading notes...</h2>
            )
        }

        return (
            <div className="notes container">
                { notesList }
            </div>
        )
    }
}

export default Notes