const jwt = require('jsonwebtoken');
const { userModel } = require('../models/user');
const { config } = require('dotenv');

config();

const auth = async (req, res, next) => {
    
    try 
        {
        const authHeader = req.header('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            console.log('Authorization header missing or invalid');
            return res.status(401).json({error: 'Access denied, please login'});
        }
        const token = authHeader.substring(7);
        console.log('Token:', token);

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log('Decoded:', decoded);

        if (!decoded) {
            console.log('Token verification failed');
            return res.status(401).json({error: 'Authentication failed: Invalid token'});
        }

        const user = await userModel.findById(decoded.userId);

        if (!user) {
            console.log('User not found');
            return res.status(404).json({error: 'User not found'});
        }

        req.user = user;

        next();
    } catch (error) {
        console.error('Authentication error:', error.message);
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
