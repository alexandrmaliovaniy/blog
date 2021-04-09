const {Router} = require('express');
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = Router();


router.get('/:login', async (req, res) => {
    try {
        const user = await User.findOne({login: req.params.login});
        res.json(user);
    } catch (e) {
        res.status(404).json({message: "404 user not found"});
    }
})


module.exports = router;