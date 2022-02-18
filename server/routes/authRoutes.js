const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/authControllers');

router.post('/register', authControllers.register_post);
router.post('/login', authControllers.login_post);
router.post('/refresh-token', authControllers.refreshTokens_post);

module.exports = router;
