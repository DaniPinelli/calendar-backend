/*
  User Authentication
  host + api/auth
 */

const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const { validateFields } = require('../middlewares/validar-campos');

const { createUser, login, renew } = require('../controllers/auth');


// Routes
router.post('/new',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('password', 'Password is required, 6 caracters at least').isLength({ min: 6 }),
        validateFields
    ],
    createUser);

// loguin
router.post('/',
    [
        check('email', 'Email is required').isEmail(),
        check('password', 'Password is required, 6 caracters at least').isLength({ min: 6 }),
        validateFields
    ],
    login);

// Token
router.get('/renew', renew);

module.exports = router