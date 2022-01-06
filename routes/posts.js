const express = require('express')
const router = express.Router()
const multer = require('multer')

const Post = require('../models/post')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage }).single('file')

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find()
        res.json(posts)
    } catch (err) {
        res.send('Error : ' + err)
    }
})

router.post('/', (req, res) => {

    upload(req, res, (err) => {
        if (err) {
            res.sendStatus(500);
        }
        
        const post = new Post({
            title: req.body.title,
            desc: req.body.desc,
            likes: req.body.likes,
            dislikes: req.body.dislikes,
            filename: req.file.filename
        })

        try {
            const pst = post.save()
            pst.then((data) => {
                res.json(data)
            })

        } catch (err) {
            res.send('Error : ' + err)
        }
    });
})

router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.json(post)
    } catch (err) {
        res.send('Error : ' + err)
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        post.likes = req.body.likes
        const pst = await post.save()
        res.json(pst)
    } catch (err) {
        res.send('Error')
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        const pst = await post.delete()
        res.json(pst)
    } catch (err) {
        res.send('Error')
    }
})

module.exports = router