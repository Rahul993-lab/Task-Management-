const express = require("express");
const router = express.Router();
const taskController = require("../controller/task.controller");
const auth = require("../middleware/auth");

router.post("/create/task", auth, async (req, res) => {
    try {
        const data = req.body
        const user_id = req.user.id

        const task = await taskController.createTask(data, user_id);
        res.send({
            status: 200,
            message: "task created successfully",
            task
        });
    } catch (err) {
        res.send({
            status: 500,
            message: err.message
        });
    }
});

router.get("/get-all/tasks", auth, async (req, res) => {
    try {
        const user_id = req.user.id;

        const { status, priority, sortBy = "createdAt", order = "DESC", page = 1, limit = 10 } = req.query;

        const tasks = await taskController.getTasks(
            user_id,
            { status, priority },
            { sortBy, order },
            { page, limit }
        );

        res.send({
            status: 200,
            message: "Fetch tasks successfully",
            tasks,
        });
    } catch (err) {
        res.send({
            status: 500,
            message: err.message,
        });
    }
});


router.get("/task/:id", auth, async (req, res) => {
    try {
        const id = req.params.id;
        const user_id = req.user.id
        const task = await taskController.getTaskById(id, user_id);
        res.send({
            status: 200,
            message: "featch tasks successfully",
            task
        })
    } catch (err) {
        res.send({
            status: 500,
            message: err.message
        });
    }
});

router.put("/update/task/:id", auth, async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const user_id = req.user.id;

        const updated = await taskController.updateTask(id, data, user_id);
        res.send({
            status: 200,
            message: "Task updated",
            updated
        });
    } catch (err) {
        res.send({
            status: 500,
            message: err.message
        });
    }
});

router.delete("/delete/task/:id", auth, async (req, res) => {
    try {
        const id = req.params.id;
        const user_id = req.user.id;

        await taskController.deleteTask(id, user_id);
        res.send({
            status: 200,
            message: "Task deleted"
        });
    } catch (err) {
        res.send({
            status: 500,
            message: err.message
        });
    }
});

module.exports = router;
