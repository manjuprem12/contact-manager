import React from 'react'
import {Link} from 'react-router-dom'
import axios from '../../config/axios'

class ContactShow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            contact : {}
        }
        this.handleDelete = this.handleDelete.bind(this)
    }

    handleDelete() {
        const confirmDelete = window.confirm("Are u sure ? ")
        if(confirmDelete) {
            // api call to delete 
            axios.delete(`/contacts/${this.state.contact._id}`)
                .then(() => this.props.history.push('/contacts'))
                .catch(err => window.alert(err))
        }
    }
    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(`/contacts/${id}`)
            .then(response => this.setState(() => ({contact : response.data })))
    }

    render() {
        return (
            <div>
                <h2> {this.state.contact.name}</h2>
                <p>Email - {this.state.contact.email}</p>
                <p> Mobile - {this.state.contact.mob}</p> 
                <Link to ={`/contacts/edit/${this.props.match.params.id}`}>Edit</Link>
                <button onClick = {this.handleDelete} >
                Delete 
                </button>
                
                <Link to = '/contacts' > Back </Link>
            </div>
        )
    }
}
export default ContactShow