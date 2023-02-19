const jwt = require('jsonwebtoken');
const User = require('../model/user');
require('dotenv').config();

const SALT = process.env.PORT || 'thisismynewcourse';

const auth = async (req, res, next) => {
    try {
        console.log(req.header('Authorization'));
        const token = req.header('Authorization').replace('Bearer ', '');
        console.log(token);
        const decoded = jwt.verify(token, SALT);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!user) {
            throw new Error();
        }
        
        req.token = token;
        req.user = user;
        next();
    } catch(e) {
        res.status(401).send({error: "Please authenticate"});
    }
};

module.exports = auth;