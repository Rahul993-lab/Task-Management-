const express = require("express");
const userController = require("../controller/user.controller");
const app = express();

app.use(express.json());

app.post("/register", async (req, res) => {
    try {
        const result = await userController.createUser(req.body);
        res.send({
            status: 200,
            message: "User register successfully",
            result
        });
    } catch (error) {
        res.status(400).send({
            status: 400,
            message: error.message
        });
    }
});

app.post("/login", async (req, res) => {
    try {
        const result = await userController.loginUser(req.body);
        res.send({
            status: 200,
            message: "User login successful",
            result
        });
    } catch (error) {
        res.status(400).send({
            status: 400,
            message: error.message
        });
    }
});

app.get("/get-user", async (req, res) => {
    try {
        const result = await userController.getUser();
        res.send({
            status: 200,
            message: "Users fetched successfully",
            result
        });
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: error.message
        });
    }
});

module.exports = app;
