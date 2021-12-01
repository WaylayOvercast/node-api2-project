// implement your server here
// require your posts router and connect it here
const express = require('express');
const postRouter = require('./posts/posts-router');

const server = express();

server.use(express.json());

server.use(`/api/posts`, postRouter);
server.use(`/api/posts:id`, postRouter);

server.get('/', (req, res) => {
    res.send(`<h1> welcome to my API, navigate to /api/posts for data'<h1>`)
})

module.exports = server;