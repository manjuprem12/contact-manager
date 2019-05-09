import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

class NoteShow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            note : {}
        }
        this.handleDelete = this.handleDelete.bind(this)
    }

    handleDelete() {
        const confirmDelete = window.confirm("Are u sure ? ")
        if(confirmDelete) {
            // api call to delete 
            axios.delete(`http://localhost:3005/notes/${this.state.note._id}`)
                .then(() => this.props.history.push('/notes'))
                .catch(err => window.alert(err))
        }
    }
    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(`http://localhost:3005/notes/${id}`)
            .then(response => this.setState(() => ({note : response.data })))
    }

    render() {
        return (
            <div>
                <h2> {this.state.note.title}</h2>
                <p>Body - {this.state.note.body}</p>
                <p> Tags - {this.state.note.tags}</p> 
                <Link to ={`/notes/edit/${this.props.match.params.id}`}>Edit</Link>
                <button onClick = {this.handleDelete} >
                Delete 
                </button>
                
                <Link to = '/notes' > Back </Link>
            </div>
        )
    }
}
export default NoteShow