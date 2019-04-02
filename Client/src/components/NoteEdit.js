import React from 'react';
import Axios from 'axios';
import { DatePicker } from 'react-materialize'


class NoteEdit extends React.Component {
    state = {
        note: null
    }

    componentDidMount() {
        const id = this.props.match.params.note_id;
        Axios.get('https://jsonplaceholder.typicode.com/posts/' + id)
            .then(response => this.setState({
                    note: response.data
            }))
    }

    render() {
        const note = this.state.note ? this.state.note : <div>Loading...</div>;

        return (
            <div className="container">
                <div className="note card" key={ note.id }>

                    <div className="card-content">
                        <form>
                            <div className="input-field">
                                <input id="title" type="text" className="validate" value={ "" } />
                                <label for="title">Note's Title</label>
                            </div>
                            <div className="input-field">
                                <textarea id="body" className="materialize-textarea"></textarea>
                                <label for="body">Note's content</label>
                            </div>
                            <div className="input-field">
                                <DatePicker />
                            </div>
                        </form>
                    </div>

                    <div className="card-action">
                        <a>Save</a>
                        <a>Cancel</a>
                    </div>

                </div>
            </div>
        )
    }
}

export default NoteEdit