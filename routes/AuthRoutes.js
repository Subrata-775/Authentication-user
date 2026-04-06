
const express = require('express');
const Router = express.Router();
const { signup, login } = require('../controllers/AuthControler');
const { Auth, isStudent, isAdmin } = require('../middlewares/Auth')

Router.post('/signup', signup);
Router.post('/login', login);

// middleware routes
Router.get('/test', Auth, (req, res) => {
    res.send('Welcome to the protected test routed');
})
Router.get('/student', Auth, isStudent, (req, res) => {
    res.send('Welcome to the protected student routed');
})
Router.get('/admin', Auth, isAdmin, (req, res) => {
    res.send('Welcome to the protected admin  routed');
})


module.exports = Router;


// const express = require("express");
// const router = express.Router();

// const { registerUser } = require('../controllers/AuthControler');

// router.post("/register", registerUser);

// module.exports = router;