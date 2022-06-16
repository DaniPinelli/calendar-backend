const { response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/User');

const createUser = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'User already exists'
            });
        }

        user = new User(req.body)

        // Encrypt password
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);

        await user.save();

        res.status(201).json({
            ok: true,
            uid: user.id,
            msg: 'User created successfully'

        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error, please contact the administrator'
        })
    }
}


const login = (req, res = response) => {

    const { email, password } = req.body;

    res.status(201).json({
        ok: true,
        msg: 'Login Successful',
        email,
        password
    })
}

const renew = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Renew Token Successful'
    })
}


module.exports = {
    createUser, login, renew
}