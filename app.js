const express = require("express");
const bodyParser = require("body-parser");
const userRoute = require("./route/user.route");
const taskRoute = require("./route/task.route");
const sequelize = require("./db/connection");

const app = express();

app.use(express.json());
app.use(bodyParser.json());

app.use('/user', userRoute);
app.use('/task', taskRoute);

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connected successfully.");

        await sequelize.sync({ alter: true });

        const PORT = process.env.PORT || 8009;

        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
        });
    } catch (err) {
        console.error("Database connection failed:", err.message);
    }
};

startServer();
