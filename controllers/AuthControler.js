const User = require('../model/AuthSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


// sign Up Page

exports.signup = async (req, res) => {
    try {
        // fetch Data from DB
        const { name, email, password, role } = req.body;
        // check if user already exist or not

        const existUser = await User.findOne({ email });

        // if exist
        if (existUser) {
            return res.status(400).json({
                success: false,
                message: "User already Exist.."
            });
        }

        let hassedPassword;
        try {
            hassedPassword = await bcrypt.hash(password, 10);

        } catch (e) {
            return res.status(500).json({
                success: false,
                message: "Error in Hassed Password"
            });
        }
        // new user entry create
        const newuser = await User.create({
            name, email, password: hassedPassword, role
        });
        return res.status(200).json({
            success: true,
            message: "User Create Successfull"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "User can't registered ,please try again"
        });
    }
};



// login page 

exports.login = async (req, res) => {

    try {

        // data fetch name and password
        const { email, password } = req.body;
        // all filed
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please Filled all details carefully"
            });
        }
        // exist user or not
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "UnAuthorized User"
            })
        };

        // password validation and jwt token generation
        const payload = {
            email: user.email,
            id: user._id,
            role: user.role,
        };
        if (await bcrypt.compare(password, user.password)) {
            // generate tokens
            const token = jwt.sign(payload,
                process.env.JWT_SECRET,
                {
                    "expiresIn": '10h',
                }
            )

            // stringify  to obj
            // This converts the Mongoose document → plain JavaScript object.
            const userObj = user.toObject();
            // is because user is a Mongoose document, 
            // not a normal JavaScript object.
            console.log(userObj);
            userObj.token = token;
            console.log(userObj);
            userObj.password = undefined;
            console.log(userObj);
            // send token with cookies 
            const option = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            }

            res.cookie("SubrataCookie", token, option).status(200).json({
                success: true,
                message: "User  Logged In successfull",
                token,
                user: userObj,
            });
        } else {
            return res.status(403).json({
                success: false,
                message: "Password Incorrect"
            });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "feaild logged in process"
        });

    }

};




