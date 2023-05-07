"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define("Task", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isCompleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    return Task;
};
