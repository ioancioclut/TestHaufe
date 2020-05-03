var express = require('express');
var router = express.Router();
var healthCheck = require('express-healthcheck');

router.get('/', healthCheck());

module.exports = router;