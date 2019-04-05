import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import Navbar from './components/NavBar';
import Notes from './components/Notes';
import NoteEdit from './components/NoteEdit';
import NoteDetails from './components/NoteDetails'
import Authentification from './components/Authentification';
import Registration from './components/Registration';
import Axios from 'axios';


class App extends React.Component {
  state = {
    username: null
  }

  setUser = (data) => {
    Axios.defaults.headers.common['x-access-token'] = data.token;
    this.setState({ 
      username: data.username
    });
  }

  deleteUser = () => {
    Axios.defaults.headers.common['x-access-token'] = null;
    this.setState({
      username: null
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar username={ this.state.username } deleteUser= { this.deleteUser } />
          <Route exact path='/' component={ Notes }/>
          <Route path='/authentification/:notification' render={(props) => <Authentification {...props} setUser={ this.setUser } />}/>
          <Route path='/registration' component={ Registration }/>
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