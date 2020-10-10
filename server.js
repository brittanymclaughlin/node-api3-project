require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const usersRouter = require('./users/userRouter.js');
const postRouter = require('./posts/postRouter');
const server = express();

server.use(helmet())
server.use(logger());
server.use(express.json());
server.use('/api/users', usersRouter);

server.use((err, req, res, next) => {
	console.log(err)
	
	res.status(500).json({
		message: "Something went wrong, please try again later",
	})
})


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger() {
  return function (req, res, next) {
    console.log( ` A ${req.method} has been made to ${req.url}`)
    next()
  }
}

module.exports = server;
