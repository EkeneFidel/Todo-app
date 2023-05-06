"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
const useBcrypt = require("sequelize-bcrypt");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            isEmail: true,
        },
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    User.associate = (models) => {
        User.hasMany(models.Task, {
            foreignKey: "userId",
        });
    };

    useBcrypt(User),
        {
            field: "password",
            rounds: 12,
            compare: "authenticate",
        };
    return User;
};
