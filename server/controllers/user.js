const { User } = require("../models");

const updateUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(400).json({
                message: "user not found",
                success: false,
            });
        }
        user = await User.update({}, { where: { id: id } });
        return res.status(200).json({
            success: true,
            message: "user updated",
            user: user,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            success: false,
        });
    }
};

const getOneUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(400).json({
                message: "user not found",
                success: false,
            });
        }

        return res.status(200).json({
            success: true,
            message: "user found",
            user: user,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            success: false,
        });
    }
};

const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.findAll();
        return res.status(200).json({
            success: true,
            message: "users found",
            users: users,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            success: false,
        });
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(400).json({
                message: "user not found",
                success: false,
            });
        }

        await user.destroy();
        return res.status(200).json({
            success: true,
            message: "user deleted",
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            success: false,
        });
    }
};

module.exports = {
    updateUser,
    getOneUser,
    getAllUsers,
    deleteUser,
};
