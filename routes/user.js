const express = require('express');
const {handleUser , handleUserLogin} = require("../controller/user")
const router = express.Router();


router.post('/' , handleUser);
router.post('/login' , handleUserLogin);

module.exports = router;