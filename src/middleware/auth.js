const jwt = require('jsonwebtoken');

require('dotenv').config();


const SECRET_KEY = process.env.SECRET_KEY;

const auth = async (req, res, next) => {
    try {
        const clientToken = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(clientToken, SECRET_KEY);
        if (decoded) {
            res.decoded = decoded;
            next();
        } else {
            res.status(401).json({error: 'login failed, please authenticate'});
        }       
    } catch (error) {
        res.status(419).json({error: 'Session is expired. Please Login again.'});
    }
};


module.exports = {auth};