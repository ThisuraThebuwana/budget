const express = require('express')
const mongoose = require('mongoose')
const postRouter = require('./routes/posts')
const contactRouter = require('./routes/contacts')
const imageRouter = require('./routes/images')
const cors = require('cors')

//initialize app
const app = express()

//db connection
const url = 'mongodb://localhost/budgetDB'

mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection

con.on('open', () =>{
    console.log('connected...')
})

app.use(cors())

//get access for the public folder
app.use(express.static('public'));

app.use(express.json())

//routers
app.use('/posts', postRouter)
app.use('/contacts', contactRouter)
app.use('/images', imageRouter)

app.listen(9000, () =>{
    console.log('Server started')
})