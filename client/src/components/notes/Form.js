import React from 'react'

class NoteForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title:'',
            body:'',
            tags:''
        }
        this.handleSubmit = this.handleSubmit.bind(this) 
    }

    handleTitleChange = (e) => {
        const title = e.target.value
        this.setState(() => ({title}))
    }
    handleBodyChange = (e) => {
        const body = e.target.value
        this.setState(() => ({body}))
    }
    handleTagsChange(e) {
        const tags = e.target.value
        this.setState(() => ({tags}))
    }
   
    handleSubmit(e) {
        e.preventDefault()
        const formData = {
            title : this.state.title,
            body : this.state.body,
            tags: this.state.tags,
        
        }
        this.props.handleSubmit(formData)

        this.setState(() => ({
            title:'',body :'', tags:''
        }))
    }
    componentWillReceiveProps(nextProps) {
        console.log('component will receive props - from', nextProps)
        const {title,body,tags} = nextProps.note
        this.setState(() => ({
            title,
            body,
            tags
      
        }))
    }
    render() {
        return(
            <div>
                <form onSubmit = {this.handleSubmit} >
                    <lable>
                        Title 
                        <input type = "text" value = {this.state.title} onChange={this.handleTitleChange} />
                    </lable> <br />
                    <lable>
                        Body 
                        <input type = "text" value = {this.state.body} onChange={this.handleBodyChange} />
                    </lable> <br />
                    <label>
                        Tags
                        <input type="text" value={this.state.tags} onChange={this.handleTagsChange.bind(this)} />
                    </label> <br /> 
                  
                    <input type = "submit" />
                </form>
            </div>
        )
    }
}

export default NoteForm