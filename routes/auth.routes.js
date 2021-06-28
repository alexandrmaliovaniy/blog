const {Router} = require('express');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth.middleware');
const User = require('../models/User');
const router = Router();

router.post(
    "/register",
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
            {expiresIn: '2h' }
        );

        res.json({token, userId: user.id, userLogin: user.login});

    } catch(e) {
        res.status(500).json({message: "Something goes wrong ..."});
    }
})

router.post('/validate', auth, (req, res) => {
    if (req.user) {
        res.json({msg: true})
    } else {
        res.json({msg: false})
    }
})

module.exports = router;