import React from 'react'
import axios from 'axios'
import NoteForm from './Form'

class NoteEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            note: {} 
            
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount() {
        const { id } = this.props.match.params
        axios.get(`http://localhost:3005/notes/${id}`)
            .then(response => {
                this.setState(() => ({ note: response.data}))
            })
    }

    handleSubmit(formData){
        // console.log('contact new component)
        axios.put(`http://localhost:3005/contacts/${this.state.note._id}`, formData)
            .then(() => this.props.history.push(`/contacts/${this.state.note._id}`))
            .catch(err => console.log(err))
    }
    
    render() {
        console.log('render- edit', this.state)
        return (
            <div>
                <h2> Edit Contact </h2>
                <NoteForm 
                    note = {this.state.note}
                    handleSubmit = {this.handleSubmit}
                    />
            </div>
        )
    }
}
export default NoteEdit