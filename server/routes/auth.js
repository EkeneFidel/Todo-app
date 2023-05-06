const express = require("express");
const { signup, login } = require("../controllers/auth");
const { checkUser } = require("../middleware/userAuth");

const authRouter = express.Router();

authRouter.post("/signup", checkUser, signup);
authRouter.post("/login", login);

module.exports = authRouter;
