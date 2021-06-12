const {Router} = require('express');
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = Router();
const Types = require('mongodb');
const auth = require('../middleware/auth.middleware');


router.get('/:login', async(req, res) => {
    const out = await User.aggregate([
        {
            $match: {
                login: {$eq: req.params.login}
            }
        },
        {
            $lookup: {
                from: 'posts',
                localField: 'posts',
                foreignField: '_id',
                as: 'posts'
            }
        }
    ]);
    res.json(out[0]);
})
router.post('/follow', auth, async(req, res) => {
    try {
        const {userId} = req.body;
        const target = await User.findById(userId);
        if (!target.followers.includes(req.user.userId)) {
            target.followers.push(req.user.userId);
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

router.post("/subscribecontent", auth, async(req, res) => {
    // const outArr = [];
    //const user = await User.findById(req.user.userId);
    // for (let i = 0; i < user.follows.length; i++) {
    //     const follower = await User.findById(user.follows[i]);
    //     outArr.push(...follower.posts.slice(0, 10));
    // }
    const out = await User.aggregate([
        {
            $match: {
                _id: {$eq: Types.ObjectId(req.user.userId)}
            }
        },
        {
            $lookup: {
                from: 'posts',
                localField: 'follows',
                foreignField: 'author',
                as: 'follows'
            }
        }
        
    ]);
    const a = out[0];
    for (let i = 0; i < a.follows.length; i++) {
        a.follows[i].author = await User.findById(a.follows[i].author, {_id: 1, login: 1});
    }
    res.json(a.follows);
});
router.post('/update', auth, async(req, res) => {
    // if req.user.userId == req.body._id or req.user is admin
    const data = req.body;
    if (data._id == req.user.userId) {
        await User.findByIdAndUpdate(data._id, data);
        const token = jwt.sign(
            {
                userId: data._id
            },
            config.get('jwtSecret'),
            {expiresIn: '1h' }
        );
        res.json({token, userId: data._id, userLogin: data.login});
    } else {
        res.status(505).json({message: "Permition denied"});
    }
})

module.exports = router;