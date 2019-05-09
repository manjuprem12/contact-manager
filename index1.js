
// npm install --save express
const express = require('express')
//npm install --save mongoose
const mongoose = require('mongoose')
const port = 3000
const app = express()

app.use(express.json())

//DB configuration
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/contact-manager-jan',{useNewUrlParser:true})
    .then(function(){
        console.log('connected to db')
    })
    .catch(function(){
        console.log('oops something wrong in db connection')
    })
    
    // NOSQL terminologies
    //DataBase -contact-manager-jan
    //collection - [] = [{},{},{}]  (Table - in sql)
    //document - {} = {id:1,name :'arjun',email:'abc@gmail.com',mobile:'0123456789'} (Row in sql)
    // field - property of an objuct = id,name,email,mob (Column in sql)

   // create a schema
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

        }
    })

    //create a model based on the scehema
    const Contact = mongoose.model('contact',contactSchema)
    // Contact becomes our object construction function


  
    const noteSchema = new Schema({
        title: {
            type: String,
            required : true
        },
        body: {
            type : String
        } ,
        tags : {
            type : [String]
        } ,
        createdAt :{
            type: Date ,
            default :Date.now
        }
    })

      // create a model based on the same schema
      const Note = mongoose.model('note',noteSchema)

      app.get('/notes',function(req,res){
          Note.find()
            .then(function(notes){
                res.send(notes)
            })
            .catch(function(err){
                res.send(err)
            })
      })

        app.post('/notes',function(req,res){
            const body = req.body
            const note = new Note(body)
            note.save()
            .then(function(notes){
                res.send(notes)
            })
            .catch(function(err){
                res.send(err)
            })
        })

        app.get('/notes/:id',function(req,res){
            const id = req.params.id
            Note.findById(id)
                .then(function(note){
                    if(note) {
                        res.send(note)
                    }
                    else {
                        res.send({})
                    }
    
                })
                .catch(function(err){
                    res.send(err)
                })
        })

        app.delete('/notes/:id',function(req,res){
            const id = req.params.id
            Note.findByIdAndDelete(id)
                .then(function(note){
                    res.send(note)
                })
                .catch(function(err){
                    res.send(err)
                })
        })


        // update note
        app.put('/notes/:id',function(req,res){
            const id = req.params.id
            const body = req.body
            Note.findByIdAndUpdate(id,{$set:body},{new:true , runVAlidators:true})
                .then(function(note){
                    res.send(note)
                })
                .catch(function(err){
                    res.send(err)
                })
        })
    //localhost:3000/contacts
    
    // get all contacts

    app.get('/contacts',function(req,res){
        // will return all the documents in the collection
        Contact.find()      //find is mongoo method
            .then(function(contacts){
                res.send(contacts)
            })
            .catch(function(err){
                res.send(err)
            })

    })
    //create a contact
    app.post('/contacts',function(req,res){
        const body = req.body
        const contact = new Contact(body)       // insted of creating each property we are manually assigning values , mongo is automatically creating
        contact.save()
        .then(function(contact){
            res.send(contact)
        })
        .catch(function(err){
            res.send(err)
        })
    })
    // get contact by id
    app.get('/contacts/:id',function(req,res){
        const id = req.params.id
        // find operation
        Contact.findById(id)
            .then(function(contact){
                if(contact) {
                    res.send(contact)
                }
               
                else { 
                    res.send({})
                }
            })
           
            .catch(function(err){
                res.send(err)
            })
    })

    // delete contact by id
    app.delete('/contacts/:id',function(req,res){
        const id = req.params.id
        Contact.findByIdAndDelete(id)
            .then(function(contact){
                res.send(contact)
            })
            .catch(function(err){
                res.send(err)
            })
    })

    
    //update contact by id
    app.put('/contacts/:id',function(req,res){
        const id = req.params.id
        const body = req.body
        // findByIdAndUpdate -- by default will not run validations
        //new -- return the newly updated record, runValidators - to run validations while updating

        Contact.findByIdAndUpdate(id,{$set: body},{new:true, runValidators:true})
            .then(function(contact){
                res.send(contact)
            })
            .catch(function(err){
                res.send(err)
            })
    })
    
    
   

    app.listen(port, function(){        
        console.log('listing on port' , port)
    })