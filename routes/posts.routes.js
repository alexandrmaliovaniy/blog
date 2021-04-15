const {Router} = require('express');
const User = require('../models/User');
const router = Router();
const Post = require('../models/Post');
const auth = require('../middleware/auth.middleware');



// /api/post
router.post('/new', auth, async (req, res) => {
    try {
        const {title, titleImage, description, content} = req.body;
        const userData = req.user;
        const user = await User.findById(userData.userId);
        const post = new Post({
            title,
            titleImage,
            description,
            content,
            publishDate: Date.now(),
            authorLogin: user.login,
            votes: 0
        })
        user.posts.push(post._id);
        await post.save();
        await user.save();
        res.json({id: post._id});
    } catch (e) {
        res.status(400).json({message: "Error"});
    }
})
router.post('/get', async (req, res) => {
    const posts = [];
    const postsId = req.body;
    for (let i = 0; i < postsId.length; i++) {
        const post = await Post.findById(postsId[i]);
        posts.push(post);
    }
    res.json(posts);
});
router.post('/getrecent', async (req, res) => {
    try {
        const offset = req.body.offset;
        const count = req.body.count < 20 ? req.body.count : 20;
        const data = await Post.find().sort({publishDate: -1}).skip(offset).limit(count);
        res.json(data);
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;