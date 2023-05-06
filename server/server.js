const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
const { sequelize, connectToDb } = require("./models");
require("dotenv").config();

const userRouter = require("./routes/user");
const taskRouter = require("./routes/task");

const app = express();

const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);

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
