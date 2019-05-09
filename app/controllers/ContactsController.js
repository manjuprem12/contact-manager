const express = require('express')
const router = express.Router()
const { authenticateUser } = require("../middleware/authenticationUser")
const {Contact} = require('../models/Contact')

//localhost:3000/contacts
router.get('/', authenticateUser, function(req,res){
    // will return all the documenst in the collection
    Contact.find({ user: req.user._id })
        .then(function(contacts){
            res.send(contacts)
        })
        .catch(function(err){
            res.send(err)
        })
    })

    router.post('/',authenticateUser, function(req,res){
        const body = req.body
        const contact = new Contact(body)
        contact.user = req.user._id
        contact.save()
    //_id ,name, email, mobile
        .then(function(contact){
            res.send(contact)
        })
        .catch(function(err){
            res.send(err)
        })
     })

     router.get('/:id', authenticateUser, function(req, res){
        const id = req.params.id
        //find operation
        Contact.findOne({
            user : req.user._id,
            _id: id
        })
        .then(function(contact){
        if(contact){   // if contanct is foundin DB, end empty {}
                res.send(contact)
        } else {
                res.send({})
        }
        })
        .catch(function(err){
            res.send(err)
        })
    }) 



    router.delete('/:id', authenticateUser ,function(req, res){
        const id = req.params.id
        //find operation
        Contact.findOneAndDelete({
            user : req.user._id,
            _id : id
        })
            .then(function(contact){
                res.send(contact)
            })
            .catch(function(err){
                res.send(err)
            })
    }) 

    router.put('/:id',authenticateUser,function(req,res){
        const id = req.params.id
        const body = req.body
        //findIdAndUpdate = by default will not run validation
        //new - return the newly updated record ,
        //runValidtaors- to run valdiations while updating
        Contact.findOneAndUpdate({user : req.user._id,
            _id : id } ,
            { $set : body},{new: true, runValidtaors:true})
            .then(function(contact){
                res.send(contact)
            })
            .catch(function(err){
                res.send(err)
            }) 
    })

    module.exports = {
        contactsRouter:router
    }