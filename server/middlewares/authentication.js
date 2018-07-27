const jwt = require('jsonwebtoken');
const fs = require('fs');

const SECRET = "typewar-jwt";

module.exports = function (req, res, next) {
    if (!req.cookie || !req.cookie.access_token) {
        res.send(401);
    }

    if (req.session && req.session.user) {
        next();
    } else {
        try {
            let token = req.cookie.access_token;
            let decoded = jwt.verify(token, SECRET);

            req.session = {
                user: decoded.user
            }

            next();
        } catch(err) {
            res.send(401);
        }
    }
}