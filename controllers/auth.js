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


const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'User and password do not match'
            });
        }

        // Compare password
        const validPassword = bcryptjs.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'User and password do not match'
            })
        }

        // Generate token
        //     const token = await user.generateToken();

        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            email: user.email,
            //       token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error, please contact the administrator'
        })
    }

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