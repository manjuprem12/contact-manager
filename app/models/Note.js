const mongoose= require('mongoose')


const Schema = mongoose.Schema
//create  note schema
const noteSchema = new Schema({
    title: {
        type :String,
        required:true
    },
    body: {
        type:String
    },
    tags: {
        type:[String]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

//create a model for note
const Note = mongoose.model('Note',noteSchema)

module.exports={
    Note
}