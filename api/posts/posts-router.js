// implement your posts router here
const express = require('express')
const Posts = require('./posts-model');
const router = express.Router();

router.get('/', (req, res) => {
    
    Posts.find()
        .then(posts =>{
            res.status(200).json(posts);
    })
    .catch(err => {
        res.status(500).json({
            message: "The posts information could not be retrieved",
            stack: err.stack,
        });
    });

});

router.get('/:id', (req, res) => {
    
    Posts.findById(req.params.id)
        .then(post => {
            if (post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({
                    message: `The post with the specified ID does not exist ID:${req.params.id}`
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "The post information could not be retrieved - Unspecified Error",
                stack: err.stack,
            })
        });
});

router.post('/', (req,res) => {
    const { title, contents } = req.body
    if (!title || ! contents){
        res.status(400).json({
            message:"Please provide title and contents for the post"
        })
    } else {
        Posts.insert({ title, contents })
        .then(({ id }) => {
            return Posts.findById(id)
        })
        .then(post =>{
            res.status(201).json(post)
        })
        .catch(err => {
            res.status(500).json({
                message: "The posts information could not be retrieved",
                err: err.message,
                stack:err.stack,
            })
        })
    }
})

router.put('/:id', (req, res) => {
    
    const updatedInfo = req.body;
    Posts.update(req.params.id, updatedInfo)
        .then( newPost => {
            if (newPost) {
                res.status(200).json(newPost)
            }else{
                res.status(404).json({message: "The post with the specified ID does not exist"})
            }
        })
        .catch(err => {
            res.status(400).json({message: "Please provide title and contents for the post", stack: err.stack})
        })
})
module.exports = router