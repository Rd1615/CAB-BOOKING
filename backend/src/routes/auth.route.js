const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller.js');
const {protectRoute} = require('../middleware/auth.middleware.js');

router.post('/login',userController.login);
router.post('/signup',userController.signup);
router.post('/logout',userController.logout);

router.get('/check',protectRoute,userController.chakAuth);

module.exports = router;