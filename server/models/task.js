"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define("Task", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
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

    Task.associate = (models) => {
        Task.belongsTo(models.User, {
            foreignKey: "userId",
        });
    };
    return Task;
};
