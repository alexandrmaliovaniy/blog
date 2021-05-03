const {Router} = require('express');
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = Router();
const auth = require('../middleware/auth.middleware');


router.get('/:login', async (req, res) => {
    try {
        const user = await User.findOne({login: req.params.login});
        res.json(user);
    } catch (e) {
        res.status(404).json({message: "404 user not found"});
    }
})
router.post('/follow', auth, async(req, res) => {
    try {
        const {userId} = req.body;
        const target = await User.findById(userId);
        if (!target.followers.includes(req.user.userId)) {
            target.followers.push(userId);
            await target.save();
        }
        const user = await User.findById(req.user.userId);
        if (!user.follows.includes(userId)) {
            user.follows.push(userId);
            await user.save();
        }
        res.json({msg: "success"});
    } catch(e) {
        console.log(e);
    }
});
router.post('/unfollow', auth, async(req, res) => {
    try {
        const {userId} = req.body;
        const target = await User.findById(userId);
        target.followers = target.followers.filter((el) => {
            return el != req.user.userId;
        })
        await target.save();
        const user = await User.findById(req.user.userId);
        user.follows = user.follows.filter((el) => {
            return el != userId;
        });
        await user.save();
        res.json({msg: "success"});
    } catch(e) {
        console.log(e);
    }
});
module.exports = router;