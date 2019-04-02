import React from 'react';
import Axios from 'axios'

class NoteDetails extends React.Component {
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
            <div className="container center">
                <h1>{ note.title }</h1>
            </div>
        )
    }
}

export default NoteDetails