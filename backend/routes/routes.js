// backend/routes/routes.js

const express = require('express');
const checkAuth = require('../middleware/authmiddleware');
const router = express.Router();
const protected = require("../controllers/protected");
const login = require('../controllers/login');
const register = require('../controllers/register');

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Username Already exists
 */
router.post('/register', register);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login, Cookie is sent with the JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Username Not found / Invalid password
 */
router.post('/login', login);

/**
 * @swagger
 * /protected:
 *   get:
 *     summary: Access a protected route
 *     responses:
 *       200:
 *         description: Access granted
 *       401:
 *         description: Unauthorized
 */
router.get('/protected', checkAuth, protected);

module.exports = router;
