const express = require('express')
const router = express.Router()

const Post = require('../models/post')

router.get('/', async (req, res) => {
    try{
        const posts = await Post.find()
        res.json(posts)
    }catch(err) {
        res.send('Error : ' + err)
    }
})

router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        desc: req.body.desc,
        likes: req.body.likes,
        dislikes: req.body.dislikes
    })

    try{
        const pst = await post.save()
        res.json(pst)
    }catch(err) {
        res.send('Error')
    }

})

router.get('/:id', async (req, res) => {
    try{
        const post = await Post.findById(req.params.id)
        res.json(post)
    }catch(err) {
        res.send('Error : ' + err)
    }
})

router.patch('/:id', async (req,res) => {
    try{
        const post = await Post.findById(req.params.id)
        post.likes = req.body.likes
        const pst = await post.save()
        res.json(pst)
    }catch(err) {
        res.send('Error')
    }
})

router.delete('/:id', async (req,res) => {
    try{
        const post = await Post.findById(req.params.id)
        const pst = await post.delete()
        res.json(pst)
    }catch(err) {
        res.send('Error')
    }
})

module.exports = router