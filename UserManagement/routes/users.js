var express = require('express');
const Roles = require("../db/models/Roles");
var router = express.Router();
const {User} = require('../db/connection');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const {authenticate, generateToken} = require('../services/AuthenticationService')

/* Get all users.
* @deprecated Only for backward compatibility
*  */
router.get('/', (req, res, next) => {
    User.findAll().then(result => {
        res.status(200).send(result);
    });
});

/* Create new user.
* @deprecated Only for backward compatibility
* */
router.post('/', (req, res, next) => {
    User.create(req.body).then(user => {
        res.status(201).send(user);
    }).catch(err => next(err));
});

/* Registers new user with 'internal' role and generates a JWT token  */
router.post('/register', (req, res, next) => {
    registerUser(req, res, next, Roles.INTERNAL);
});

/* Login user and generate a JWT token */
router.post('/login', (req, res, next) => {
    User.findOne({where: {'name': req.body.name, 'password': req.body.password}}).then(user => {
        user ? res.status(200).send(buildUserWithToken(user)) : res.status(400).json({message: 'Username or password is incorrect'});
    }).catch(err => next(err));
});

/* Get external users. */
router.get('/externals', authenticate, (req, res, next) => {
    if (req.user.role === Roles.INTERNAL) {
        User.findAll({where: {role: Roles.EXTERNAL}}).then(dbUsers => {
            const users = [];
            dbUsers.forEach(dbUser => {
                users.push({name: dbUser.name, role: dbUser.role})
            });
            res.status(200).send(users);
        }).catch(err => next(err));
        ;
    } else {
        res.status(401).send();
    }
});

/* Create user with 'external' role */
router.post('/externals/register', authenticate, (req, res, next) => {
    if (req.user.role === Roles.INTERNAL) {
        registerUser(req, res, next, Roles.EXTERNAL);
    } else {
        res.status(401).send();
    }
});

registerUser = (req, res, next, role) => {
    const user = {
        name: req.body.name,
        role: role,
        password: req.body.password
    }
    if (user.name && user.password) {
        User.create(user).then(user => {
            res.status(201).send(buildUserWithToken(user));
        }).catch(err => next(err));
    } else {
        throw "User or password is missing";
    }
}

buildUserWithToken = (userDB) => {
    const token = generateToken({name: userDB.name, role: userDB.role});
    const user = {
        name: userDB.name,
        role: userDB.role,
        token: token
    }
    return user;
}
buildUser = (userDB) => {
    const user = {
        name: userDB.name,
        role: userDB.role
    }
    return user;
}

module.exports = router;