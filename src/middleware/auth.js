const jwt = require('jsonwebtoken');

require('dotenv').config();


const SECRET_KEY = process.env.SECRET_KEY;

const auth = async (req, res, next) => {
    try {
        const clientToken = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(clientToken, SECRET_KEY);
        if (decoded) {
            res.decoded = decoded
            // req.user = await User.findById(decoded.id).select('-password');
            next();
        } else {
            res.status(401).json({error: 'login failed, please authenticate'});
        }       
    } catch (error) {
        res.status(419).json({error: 'Session is expired. Please Login again.'});
    }
};


module.exports = {auth};