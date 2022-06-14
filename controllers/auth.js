const { response } = require('express');

const createUser = (req, res = response) => {

    const { name, email, password } = req.body;

    res.status(201).json({
        ok: true,
        msg: 'Successful',
        name,
        email,
        password
    })
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