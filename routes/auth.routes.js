const {Router} = require('express');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = Router();

router.post(
    "/register",
    [
        check('email', 'Wrong email format').isEmail(),
        check('password', 'Wrong password format')
        .isLength({min: 7, max: 24}),
        check('login', 'Wrong login format')
        .isLength({min: 3, max: 18})
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({erroes: errors.array()});
        }
        const {email, password, login, avatar} = req.body;


        const emailCopy = await User.findOne({email});
        if (emailCopy) {
            return res.status(400).json({email: `Email: "${email}" is already registered`});
        }
        const loginCopy = await User.findOne({login});
        if (loginCopy) {
            return res.status(400).json({login: `Login: ${loginCopy} is already registered`});
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User({
            email,
            login,
            avatar,
            password: hashedPassword           
        })

        await user.save();

        res.status(200).json({message: "Done"});

    } catch(e) {
        res.status(500).json({message: "Something goes wrong ..."});
    }
})

router.post(
    "/login",
    async (req, res) => {
    try {
        // const errors = validationResult(req);

        // if (!errors.isEmpty()) {
        //     return res.status(400).json({erroes: errors.array()});
        // }

        const {email, password} = req.body;

        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({server: 'Wrong email or password'});
        }

        const auth = await bcrypt.compare(password, user.password);

        if (!auth) {
            return res.status(400).json({server: 'Wrong email or password'});
        }

        const token = jwt.sign(
            {
                userId: user.id
            },
            config.get('jwtSecret'),
            {expiresIn: '1h' }
        );

        res.json({token, userId: user.id});

    } catch(e) {
        res.status(500).json({message: "Something goes wrong ..."});
    }
})

module.exports = router;