import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import Navbar from './components/NavBar';
import Notes from './components/Notes';
import NoteEdit from './components/NoteEdit';
import NoteDetails from './components/NoteDetails'

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Route exact path='/' component={ Notes }/>
          <Route path='/add/:note_id' component={ NoteEdit }/>
          <Route path='/edit/:note_id' component={ NoteEdit } />
          <Route path='/details/:note_id' component={ NoteDetails }/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;


// GET - retrieve data from the server
// POST - send data to the server 
// PUT - update data
// DELETE - delete data