const express = require("express");
const { User } = require("../models");

const checkUser = async (req, res, next) => {
    //search the database to see if user exist
    try {
        const username = await User.findOne({
            where: {
                userName: req.body.userName,
            },
        });
        //if username exist in the database respond with a status of 409
        if (username) {
            return res.status(400).json({
                success: false,
                message: "username already taken",
            });
        }

        //checking if email already exist
        const email = await User.findOne({
            where: {
                email: req.body.email,
            },
        });

        //if email exist in the database respond with a status of 409
        if (email) {
            return res.status(400).json({
                success: false,
                message: "email already registered",
            });
        }

        next();
    } catch (error) {
        console.log(error.message)
        return res.status(400).json({
            success: false,
            message: "Authentication failed",
        });
    }
};

//exporting module
module.exports = {
    checkUser,
};
