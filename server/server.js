const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
const { sequelize, connectToDb } = require("./models");
require("dotenv").config();

const { verifyToken } = require("./utils/auth.utils");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const taskRouter = require("./routes/task");

const app = express();

const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", verifyToken, taskRouter);

app.get("/", (req, res) => {
    res.send("To do app!");
});

// Handle errors.
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({ message: err.message });
    next();
});

app.listen(PORT, async () => {
    console.log(`Listening on port: ${PORT}`);
    await connectToDb();
});

module.exports = app;
