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
    }).catch(err=>next(err));
});

module.exports = router;