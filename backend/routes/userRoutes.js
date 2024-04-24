const express = require('express');
const { registerUser, allUser } = require('../controllers/userController.js');
const {authUser} = require('../controllers/userController.js');
const { protect } = require('../utils/authMiddilewere.js');

const router = express.Router();

router.route('/').post(registerUser).get(protect , allUser);
router.post('/login' , authUser);

module.exports = router;