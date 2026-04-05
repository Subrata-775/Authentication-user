const User = require('../model/AuthSchema');
const bcrypt = require('bcrypt');

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
}