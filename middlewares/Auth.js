

const jwt = require('jsonwebtoken');
require("dotenv").config();
// Auth Middlewares
exports.Auth = (req, res, next) => {
    try {
        // extract token from body || keys||cookies
        const token = req.body.token;
        // check  token  present or not
        if (!token) {
            return res.send(401).json({
                success: false,
                message: "Token is missing..."
            })
        }
        // Verify token
        try {
            // verifies the token is valid
            // decodes the token
            // returns the payload data
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log(payload)
            // Request → Middleware verifies token →
            //  req.user created → Controller uses user data
            req.user = payload
        } catch (e) {
            return res.send(401).json({
                success: false,
                message: "Token In valid..."
            })
        }
        next();


    } catch (error) {
        console.error(error);
        return res.send(401).json({
            success: false,
            message: "Something went wrong while verify the token"
        })
    }
}

// isStudent Middleware

exports.isStudent = (req, res, next) => {
    try {
        if (req.user.role !== "Student") {
            return res.status(401).json({
                success: false,
                message: "This is Protected Routed for student"
            });
        }
        next();

    } catch (e) {
        console.error(error);
        return res.send(500).json({
            success: false,
            message: "User role is not matching"
        })
    }
}
// isAdmin Middleware

exports.isAdmin = (req, res, next) => {
    try {
        if (req.user.role !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "This is Protected Routed for Admin"
            });
        }
        next();

    } catch (e) {
        console.error(error);
        return res.send(500).json({
            success: false,
            message: "User role is not matching"
        })
    }
}