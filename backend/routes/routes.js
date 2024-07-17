// backend/routes/routes.js

const express = require('express');
const checkAuth = require('../middleware/authmiddleware');
const router = express.Router();
const protected = require("../controllers/protected");
const login = require('../controllers/login');
const register = require('../controllers/register');
const logout = require('../controllers/logout');
const requestOtp = require('../controllers/requestOtp');
const verifyOTP = require('../controllers/verifyOtp');
const { verifySuper } = require('../middleware/rolemiddleware');
const inviteAdmin = require('../controllers/inviteAdmin');

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
 *               email:
 *                  type: string 
 *               mobileNumber:
 *                  type: integer
 *               addressLine1:
 *                  type: string
 *               addressLine2:
 *                  type: string
 *               pincode:
 *                  type: integer
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Username Already exists
 *       500:
 *         description: Internal Server Error
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

/**
 * @swagger
 * /logout:
 *  get:
 *      summary: Logout the user by removing the auth token cookie
 *      responses:
 *          200:
 *              description: User successfully logged out
 *          404:
 *              description: No cookie found
 */
router.get('/logout',logout)

router.post('/send-otp',requestOtp)

router.post('/verify-otp', verifyOTP)

router.post('/invite-admin', verifySuper, inviteAdmin )
module.exports = router;
