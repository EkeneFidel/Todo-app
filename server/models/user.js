"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        password: {
            type: DataTypes.INTEGER,
        },
    });

    User.associate = (models) => {
        User.hasMany(models.Task, {
            foreignKey: "userId",
        });
    };
    return User;
};
