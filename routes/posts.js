const express = require('express')
const router = express.Router()
const multer = require('multer')
const Post = require('../models/post')

//initializing disk storage using multer tool
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../budget_ui/src/components/images/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

//image upload function
const upload = multer({ storage: storage }).single('file')

// get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find()
        res.json(posts)
    } catch (err) {
        res.send('Error : ' + err)
    }
})

// create a new post
router.post('/', (req, res) => {

    upload(req, res, (err) => {
        if (err) {
            res.send(err);
        }
        
        //post data
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

// get post by id
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.json(post)
    } catch (err) {
        res.send('Error : ' + err)
    }
})

//increment likes
router.patch('/increment-likes/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        post.likes = req.body.likes
        const pst = await post.save()
        res.json(pst)
    } catch (err) {
        res.send('Error')
    }
})

// increment dislikes
router.patch('/increment-dislikes/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        post.dislikes = req.body.dislikes
        const pst = await post.save()
        res.json(pst)
    } catch (err) {
        res.send('Error')
    }
})

//delete post
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