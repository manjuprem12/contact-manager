// npm install --save express
const express = require('express')
//npm install --save mongoose
const {mongoose} = require('./config/database')
const {contactsRouter} = require('./app/controllers/ContactsController')
const {notesRouter} = require('./app/controllers/NotesController')
const {usersRouter} = require('./app/controllers/UserControllers')
//const {notesRouter} = require('./app/controllers/NotesController')
//const {Contact} = require('./app/models/Contact')
//const {Note} = require('./app/models/Note')

const port = 3005
const app = express()
const cors = require ('cors')
app.use(cors())

app.use(express.json())
app.use('/contacts',contactsRouter)
app.use('/notes',notesRouter)
app.use('/users',usersRouter)

app.listen(port, function(){        
    console.log('listing on port' , port)
})