const express = require("express");
const taskRouter = express.Router();

const {
    addTask,
    updateTask,
    getOneTask,
    getAllTasks,
    deleteTask,
} = require("../controllers/task");

taskRouter.route("/").get(getAllTasks).post(addTask);
taskRouter.route("/:id").get(getOneTask).delete(deleteTask);
taskRouter.put("/:id", updateTask)

module.exports = taskRouter;
