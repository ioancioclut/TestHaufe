const jwt = require("jsonwebtoken");

const secretKey = "ThisIsATestForHaufe";


const generateToken = (data) => {
    return jwt.sign(data, secretKey);
};

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.sendStatus(401);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(403);
    }
};

module.exports = {authenticate, generateToken}