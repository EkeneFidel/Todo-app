const express = require("express");
const userRouter = express.Router();
const {
    updateUser,
    getOneUser,
    getAllUsers,
    deleteUser,
} = require("../controllers/user");

userRouter.route("/").get(getAllUsers);
userRouter.route("/:id").get(getOneUser).put(updateUser).delete(deleteUser);

module.exports = userRouter;
