import React from 'react';
import Axios from 'axios';
import Loading from './Loading';

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
        const content = this.state.note ? (
        <div className="note card">
            <div className="card-content">
                <span className="card-title center">{ this.state.note.title }</span>
                <p>{ this.state.note.body }</p>
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

                <div className="col s9 right-align">
                    <p>{ 'Tuesday, 16 April, 2019' }</p>
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