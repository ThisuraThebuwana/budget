const express = require('express')
const mongoose = require('mongoose')
const postRouter = require('./routes/posts')
const contactRouter = require('./routes/contacts')
const imageRouter = require('./routes/images')

const url = 'mongodb://localhost/budgetDB'

const app = express()

mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection

con.on('open', () =>{
    console.log('connected...')
})

const cors = require('cors')

app.use(cors())

app.use(express.static('public'));

app.use(express.json())

app.use('/posts', postRouter)
app.use('/contacts', contactRouter)
app.use('/images', imageRouter)

app.listen(9000, () =>{
    console.log('Server started')
})