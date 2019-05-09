
const mongoose = require('mongoose')
const Schema = mongoose.Schema // const { Schema } = mongoose
    
    const contactSchema = new Schema({
        name : {
            type :String,
            required : true
        } ,
        email: {
            type : String ,
            //required : true
        },
        mob: {
            type : String,
            required : true,
            minlength : 10,
            maxlength :10

        },
        user : {
            type : Schema.Types.ObjectId,
            ref : 'User'
        }
    })
    const Contact = mongoose.model('Contact',contactSchema)

    module.exports= {
        Contact
    }
