const express = require('express');
const { getALLUsers, registerController, loginController } = require('../controllers/userController');

//router object create
const router = express.Router()

//creating all routes

//GET ALL USERS || GET
router.get('/all-users', getALLUsers);

//CREATE USER || POST
router.post('/register',registerController);

//LOGIN USER || POST
router.post('/login',loginController)

module.exports = router;