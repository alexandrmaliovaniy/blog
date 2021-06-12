const {Router} = require('express');
const User = require('../models/User');
const router = Router();
const Post = require('../models/Post');
const auth = require('../middleware/auth.middleware');
const Comments = require('../models/Comments');
const Types = require('mongodb');
const Comment = require('../models/Comment');


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
            author: userData.userId,
            votes: 0,
            records: {"0": null}
        })
        user.posts.push(post._id);
        await post.save();
        await user.save();
        res.json({id: post._id});
    } catch (e) {
        console.log(e);
        res.status(400).json({message: "Error"});
    }
})
router.post('/rate', auth, async(req, res) => {
    try {
        const {userId, postId, vote} = req.body;
        const post = await Post.findById(postId);
        const votes = post.votes + vote;
        const records = {...post.records, [userId]: Math.sign(vote)};
        post.votes = votes;
        post.records = records;
        await post.save();
        res.json({msg: "success"})
    } catch(e) {
        console.log(e);
    }
});
router.post('/get', async (req, res) => {
    const posts = [];
    const postsId = req.body.map(el => Types.ObjectId(el));
    const out = await Post.aggregate([
        {
            $match: {
                _id: {$in: postsId}
            },
        },
        {
            $lookup: {
                from: 'users',
                localField: 'author',
                foreignField: '_id',
                as: 'author'
            }
        },
        {
            $addFields: {
                author: {$first: "$author"}
            }
        },
        {
            $project: {
                _id: 1,
                title: 1,
                titleImage: 1,
                description: 1,
                content: 1,
                publishDate: 1,
                author: {
                    _id: 1,
                    login: 1
                },
                records: 1,
                votes: 1
            }
        }
    ])
    res.json(out);
});
router.post('/getrecent', async (req, res) => {
    try {
        const offset = req.body.offset;
        const count = req.body.count < 20 ? req.body.count : 20;
        const recentPosts = await Post.aggregate([
            {
                $sort: {
                    publishDate: -1
                }
            },
            {
                $skip: offset
            },
            {
                $limit: count
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'author',
                    foreignField: '_id',
                    as: 'author'
                }
            },
            {
                $addFields: {
                    author: {$first: "$author"}
                }
            }
        ])
        res.json(recentPosts);
    } catch (e) {
        console.log(e);
    }
});

router.post('/getcomments', async(req, res) => {
    const {postId} = req.body;
    const comments = await Comments.findOne({postId});
    if (!comments) {
        const cm = new Comments({
            postId,
            comments: []
        })
        await cm.save();
        res.json(cm);
    } else {
        const out = await Comment.aggregate([
            {
                $match: {
                    postId: {$eq: Types.ObjectId(postId)}
                }
            },
            {
                $lookup: {
                    from: 'comments',
                    localField: 'comments',
                    foreignField: '_id',
                    as: 'comments'
                }
            }
        ])
        const a = out[0];
        for(let i = 0; i < a.comments.length; i++) {
            a.comments[i].author = await User.findById(a.comments[i].author, {_id: 1, login: 1});
        }
        res.json(out[0]);
    }
});

router.post('/commentsText', async(req, res) => {
    const {comments} =  req.body;
    const response = [];
    for (let i = 0; i < comments.length; i++) {
        const comment = await Comment.findById(comments[i]);
        response.push(comment);
    }
    res.json(response);
});


router.post('/comment', auth, async(req, res) => {
    try {
        const {postId, text} = req.body;
        const user = await User.findById(req.user.userId);
        const commentRecod = new Comment({
            publishDate: Date.now(),
            text: text,
            author: req.user.userId
        })
        await commentRecod.save();
        const comments = await Comments.findOne({postId});
        if (!comments) {
            const newComment = new Comments({
                postId,
                comments: [commentRecod._id]
            })
            await newComment.save();
        } else {
            comments.comments.push(commentRecod._id);
            await comments.save();
        }
        res.json(commentRecod);
    } catch(e) {
        console.log(e);
    }
});

module.exports = router;