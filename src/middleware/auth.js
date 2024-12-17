const jwt = require('jsonwebtoken');
const { userModel } = require('../models/user');

require('dotenv').config();

const auth = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({error: 'Access denied, please login'});
        }
        const token = authHeader.substring(7);

        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        if (!decoded) {
            return res.status(401).json({error: 'Authentication failed: Invalid token'});
        }

        const user = await userModel.findById(decoded.userId);

        if (!user) {
            return res.status(404).json({error: 'User not found'});
        }

        req.user = user;

        next();
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

module.exports = {auth};






//const SECRET_KEY = process.env.SECRET_KEY;

// const auth = async (req, res, next) => {
//         const clientToken = req.headers['authorization'];
//         if (!clientToken) {
//             return res.status(401).json({error: 'login failed, please authenticate'});
//         }
//         try {
//         const decoded = jwt.verify(clientToken, process.env.SECRET_KEY);
//             req.user = user;
//             next();
            
//         } catch (error) {
//         res.status(419).json({error: 'Session is expired. Please Login again.'});
//         }
//     };  
