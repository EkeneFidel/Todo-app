const { Task } = require("../models");

const addTask = async (req, res, next) => {
    try {
        const { id } = req.user;
        const { description } = req.body;
        const task = await Task.create({
            userId: id,
            description: description,
        });
        return res.status(200).json({
            success: true,
            message: "task added",
            task: task.toJSON(),
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            success: false,
        });
    }
};

const updateTask = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { isCompleted, description } = req.body;
        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(400).json({
                message: "task not found",
                success: false,
            });
        }
        const updatedTask = await Task.update(
            { isCompleted, description },
            { where: { id: id } }
        );
        return res.status(200).json({
            success: true,
            message: "task updated",
            task: updatedTask,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: error.message,
            success: false,
        });
    }
};

const getOneTask = async (req, res, next) => {
    try {
        const id = req.params.id;
        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(400).json({
                message: "task not found",
                success: false,
            });
        }

        return res.status(200).json({
            success: true,
            message: "task found",
            task: task,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            success: false,
        });
    }
};

const getAllTasks = async (req, res, next) => {
    try {
        const { id } = req.user;
        const tasks = await Task.findAll({ where: { userId: id } });
        return res.status(200).json({
            success: true,
            message: "tasks found",
            tasks: tasks,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            success: false,
        });
    }
};

const deleteTask = async (req, res, next) => {
    try {
        const id = req.params.id;
        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(400).json({
                message: "task not found",
                success: false,
            });
        }

        await task.destroy();
        return res.status(200).json({
            success: true,
            message: "task deleted",
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: error.message,
            success: false,
        });
    }
};

module.exports = {
    addTask,
    updateTask,
    getOneTask,
    getAllTasks,
    deleteTask,
};
