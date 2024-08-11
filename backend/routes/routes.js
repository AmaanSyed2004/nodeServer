const express = require("express");
const checkAuth = require("../middleware/authmiddleware");
const protected = require("../controllers/protected");
const login = require("../controllers/login");
const logout = require("../controllers/logout");
const requestOtp = require("../controllers/requestOtp");
const verifyOTP = require("../controllers/verifyOtp");
const { verifySuper, verifyAdmin } = require("../middleware/rolemiddleware");
const inviteAdmin = require("../controllers/Invitation/inviteAdmin");
const acceptAdmin = require("../controllers/Invitation/acceptAdmin");
const inviteUser = require("../controllers/Invitation/inviteUser");
const acceptUser = require("../controllers/Invitation/acceptUser");
const getUnderAdmin = require("../controllers/getUnderAdmin");
const getUnderSuper = require("../controllers/getUnderSuper");

const router = express.Router();

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
 *         description: Successful login, now verify 2FA
 *       401:
 *         description: Username Not found / Invalid password
 */
router.post("/login", login);

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
router.get("/protected", checkAuth, protected);

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
router.get("/logout", logout);
/**
 * @swagger
 * /send-otp:
 *  post:
 *      summary: Send an otp to the email of the user to verify the account.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                           email:
 *                              type: string
 *      responses:
 *          200:
 *              description: Otp is sent to the input email
 *          400:
 *              description: Email not attached to the content
 *          404:
 *              description: Account is not found, need to register the email first.
 *          409:
 *              description: Email is already verified
 */
router.post("/send-otp", requestOtp);
/**
 * @swagger
 * /verify-otp:
 *  post:
 *      summary: Verify the otp recieved on the email.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                          otp:
 *                              type: string
 *      responses:
 *          200:
 *              description: Otp is correct, the user is now verified.
 *          400:
 *              description: Email or otp is not found
 *          403:
 *              description: Invalid otp has been sent.
 *          404:
 *              description: Account not found (invalid email)
 */
router.post("/verify-otp", verifyOTP);

/**
 * @swagger
 * /invite-admin:
 *   post:
 *     summary: Invite a new admin to join the application. The user inviting must be a super-admin.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                  type: string
 *     responses:
 *       201:
 *         description: Invitation code sent successfully
 *       403:
 *         description: Invalid role i.e. the user is not super admin.
 *       404:
 *         description: Role not found in cookie, need to login first.
 *       500:
 *         description: Internal Server Error
 */

router.post("/invite-admin", verifySuper, inviteAdmin);

/**
 * @swagger
 * /accept-admin:
 *   post:
 *     summary: Register a new user with the given role (admin).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *               mobileNumber:
 *                 type: integer
 *               addressLine1:
 *                 type: string
 *               addressLine2:
 *                 type: string
 *               pincode:
 *                 type: integer
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *                 qrCodeUrl:
 *                   type: string
 *                   description: URL to the generated QR code for 2FA.
 *                   example: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...
 *       400:
 *         description: Username/email/mobile number already exists
 *       403:
 *         description: Invalid invite code.
 *       500:
 *         description: Internal Server Error
 */
router.post("/accept-admin", acceptAdmin);
/**
 * @swagger
 * /invite-user:
 *   post:
 *     summary: Invite a new user to join the application. The user inviting must be a super-admin OR a client-admin.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                  type: string
 *     responses:
 *       201:
 *         description: Invitation code sent successfully
 *       403:
 *         description: Invalid role i.e. the user is not super admin or client-admin.
 *       404:
 *         description: Role not found in cookie, need to login first.
 *       500:
 *         description: Internal Server Error
 */

router.post("/invite-user", verifySuper || verifyAdmin, inviteUser);
/**
 * @swagger
 * /accept-user:
 *   post:
 *     summary: Register a new user with the given role(user).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *                 qrCodeUrl:
 *                   type: string
 *                   description: URL to the generated QR code for 2FA.
 *                   example: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...
 *       400:
 *         description: Username/email/mobile number already exists
 *       403:
 *         description: Invalid invite code.
 *       500:
 *         description: Internal Server Error
 */
router.post("/accept-user", acceptUser);

router.get("/under-client-admin", verifyAdmin, getUnderAdmin);

router.get("/under-super-admin", verifySuper, getUnderSuper);
module.exports = router;
