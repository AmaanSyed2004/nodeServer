const express= require('express');
const checkAuth = require('../middleware/authmiddleware');
const router= express.Router();
const protected= require("../controllers/protected");
const login = require('../controllers/login');
const register = require('../controllers/register');
router.post('/register',register);
router.post('/login', login);
router.get('/protected',checkAuth, protected)
module.exports= router;