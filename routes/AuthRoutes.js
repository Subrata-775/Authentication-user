
const express = require('express');
const Router = express.Router();
const { signup } = require('../controllers/AuthControler');

Router.post('/signup', signup);
// Router.post('/login', login);



module.exports = Router;


// const express = require("express");
// const router = express.Router();

// const { registerUser } = require('../controllers/AuthControler');

// router.post("/register", registerUser);

// module.exports = router;