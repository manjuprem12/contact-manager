import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

class NoteList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            notes: []

        }
    }
    componentDidMount() {
        axios.get('http://localhost:3005/notes')
            .then(response => this.setState(() => ({notes:response.data})))
    }
    render() {
        return (
            <div>
                {
                    this.state.notes.length === 0 ? (<p> No Note found add ur first note</p>):(
                        <div>
                            <h2> Listing Notes - {this.state.notes.length}</h2>
                            <ul>
                                {
                                    this.state.notes.map(note => {
                                        return (
                                            <li key = {note._id} ><Link to = {`/notes/${note._id}`}>{note.title}</Link></li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    )   
                }
                <Link to ='/notes/new'> Add Note</Link>
            </div>
        )
    }
}
export default NoteList