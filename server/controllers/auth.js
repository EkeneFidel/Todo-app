const { User } = require("../models");
const { generateAuthToken } = require("../utils/auth.utils");

const signup = async (req, res, next) => {
    try {
        const { userName, email, password } = req.body;
        if (!userName || !email || !password) {
            return res.status(500).json({
                success: false,
                message: "Credentials missing",
            });
        }
        const user = await User.create({ userName, email, password });
        const token = generateAuthToken(user);
        return res.status(200).json({
            success: true,
            message: "User created",
            user: user,
            token: token,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occured",
        });
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email) {
            return res.status(500).json({
                success: false,
                message: "Provide an email",
            });
        }

        if (!password) {
            return res.status(500).json({
                success: false,
                message: "Provide a password",
            });
        }

        const user = await User.findOne({
            where: { email: email },
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "user does not exist",
            });
        }

        const validate = user.authenticate(password);

        if (!validate) {
            return res.status(401).json({
                success: false,
                message: "Password incorrect",
            });
        }
        const token = generateAuthToken(user);

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: user,
            token: token,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "An error occured",
        });
    }
};

module.exports = {
    signup,
    login,
};
