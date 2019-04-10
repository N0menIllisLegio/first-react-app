import io from 'socket.io-client';

class DataController {
    socket = null;
    notes = null;

    static connect(history) {
        this.socket = io('http://localhost:5000', {
            query: {
              token: localStorage.getItem('authToken')
            }
        });
        
        this.socket.on('error', (err) => {
            localStorage.removeItem('authToken');
            history.push('/');
        });

        this.socket.on('notes', (data) => {
            this.notes = data;
        })
    }

    static getNotes(A) {
        this.socket.emit('get all notes');
        while (this.notes === null) {}
        A.setState({
            notes: this.notes,
            displayedNotes: this.notes
        });
        this.notes = null;
    }



}


export default DataController