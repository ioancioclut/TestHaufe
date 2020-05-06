var express = require('express');
var router = express.Router();
const {User} = require('../db/connection');

/* GET users listing. */
router.get('/', (req, res, next) => {
    User.findAll().then(result => {
        res.status(200).send(result);
    });
});

/* Create new user. */
router.post('/', (req, res, next) => {
    User.create(req.body).then(user => {
        res.status(201).send(user);
    }).catch(err => next(err));
});

/* Login user. */
router.post('/login', (req, res, next) => {
    User.findOne({where: {'name': req.body.name, 'password': req.body.password}}).then(user => {
        user ? res.status(200).send(user) : res.status(400).json({message: 'Username or password is incorrect'});
    }).catch(err => next(err));
});

module.exports = router;