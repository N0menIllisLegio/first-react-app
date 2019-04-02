import React from 'react';
import Axios from 'axios';
import { DatePicker } from 'react-materialize';
import { Link } from 'react-router-dom'
import Loading from './Loading'
import $ from "jquery";
import M from "materialize-css";

class NoteEdit extends React.Component {
    state = {
        status: null,
        id: null,
        title: null,
        content: null,
        date: null
    }

    componentDidMount() {    
        const id = this.props.match.params.note_id;
        if (id !== '-1') {
            Axios.get('https://jsonplaceholder.typicode.com/posts/' + id)
                .then(response => {this.setState({
                        status: 'OLD',
                        id: response.data.id,
                        title: response.data.title,
                        content: response.data.body
                        //date: response.data.date
                });  M.textareaAutoResize($('#body_text')); })
        } else {
            this.setState({
                status: 'NEW',
                id: null,
                title: '',
                content: ''
            })
        }          
    }

    handleDateChange = e => {
        let date = e.target.value;       
        this.setState({ date: date });
    };

    handleTitleChange = e => {
        let title = e.target.value;       
        this.setState({ title: title });
    };

    handleContentChange = e => {
        let content = e.target.value;       
        this.setState({ content: content });
        
    };

    render() {
        const { title, content, date } = this.state;
        const displayedCard = this.state.status !== null ? (
            <div className="note card">
                <div className="card-content">
                    <form>
                        <div className="input-field">
                            <i className="material-icons prefix">text_format</i>
                            <input id="title" type="text" className="validate" value={ title } onChange={ this.handleTitleChange }/>
                            <label htmlFor="title" className="active">Note's Title</label>
                        </div>

                        <div className="input-field">
                            <i className="material-icons prefix">mode_edit</i>
                            <textarea id="body_text" className="materialize-textarea" value={ content } onChange={ this.handleContentChange }/>
                            <label htmlFor="body_text" className="active">Note's content</label>
                        </div>
                        
                        <div className="input-field">
                            <i className="material-icons prefix">date_range</i>
                            <label htmlFor="date" className="active">Note's date</label>
                            <DatePicker value={ date } onChange={ this.handleDateChange } 
                            options={{   
                                        format: 'dddd, mmmm dd, yyyy', 
                                        defaultDate: new Date(), 
                                        setDefaultDate: date === null 
                                    }}/>
                        </div>
                    </form>
                </div>

                <div className="card-action center">
                    <Link to="/">Save</Link>
                    <Link to="/">Cancel</Link>
                </div>
            </div>
        ) : (
            <Loading />
        )
       
        return (
            <div className="container">
                { displayedCard }
            </div>
        )
    }
}

export default NoteEdit