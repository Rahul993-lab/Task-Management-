const Task = require("../model/task.model");

const taskController = {

    async createTask(data, userId) {

        const result = await Task.create({
            title: data.title,
            description: data.description,
            priority: data.priority,
            status: data.status,
            user_id: userId,
        });

        return result
    },

    async getTasks(user_id, filters, sorting, pagination) {
        const { status, priority } = filters;
        const { sortBy = "createdAt", order = "DESC" } = sorting;
        const { page = 1, limit = 10 } = pagination;

        const where = { user_id };

        if (status) {
            where.status = status;
        }

        if (priority) {
            where.priority = priority;
        }

        const offset = (page - 1) * limit;

        const validSortFields = ["createdAt", "priority", "updatedAt", "status"];
        const sortField = validSortFields.includes(sortBy) ? sortBy : "createdAt";

        const result = await Task.findAll({
            where,                
            order: [[sortField, order]], 
            limit: Number(limit),
            offset: Number(offset),
        });

        return result;
    },



    async getTaskById(id, userId) {

        const result = await Task.findOne({
            where: { id, userId },
        });

        return result
    },

    async updateTask(id, data, userId) {

        await Task.update(data, {
            where: { id, userId }
        });
        const result = await Task.findOne({ where: { id, userId } });

        return result
    },

    async deleteTask(id, userId) {
        const result = await Task.destroy({
            where: { id, userId }
        });

        return result
    }
};

module.exports = taskController;
