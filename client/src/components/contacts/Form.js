import React from 'react' 

class ContactForm extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            name: '', 
            email: '', 
            mob: '' 
        }
        // bind methods, sets the context of the this keyword
        this.handleMobileChange = this.handleMobileChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this) 
    }

    // es6 arrow function
    handleNameChange = (e) => {
        const name = e.target.value 
        // console.log(this) 
        this.setState(() => ({ name }))
    }

    // es6 function - bind in constructor
    handleMobileChange(e) {
        const mob= e.target.value 
        // console.log(this)
        this.setState(() => ({ mob}))
    }

    // es6 function - bind when calling the function
    handleEmailChange(e) {
        const email = e.target.value 
        this.setState(() => ({ email }))
    }

    handleSubmit(e) {
        e.preventDefault() 
        const formData = {
            name: this.state.name, 
            email: this.state.email, 
            mob: this.state.mob
        }
        this.props.handleSubmit(formData)

        // clear form 

        this.setState(() => ({ 
            name: '', email: '', mob: ''
        }))
      
    }

    componentWillReceiveProps(nextProps) {
        console.log('component will receive props - form', nextProps)
        const {name, email, mob} = nextProps.contact
        this.setState(() => ({
            name,
            email,
            mob
        }))

    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name 
                        <input type="text" value={this.state.name} onChange={this.handleNameChange} /> 
                    </label> <br/> 

                    <label>
                        Mobile
                        <input type="text" value={this.state.mob} onChange={this.handleMobileChange} />
                    </label> <br /> 

                    <label>
                        Email
                        <input type="text" value={this.state.email} onChange={this.handleEmailChange.bind(this)} />
                    </label> <br /> 

                    <input type="submit" /> 
                </form> 
            </div>
        )
    }
}

export default ContactForm