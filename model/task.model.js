const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Task = sequelize.define('Task', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },

    title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    description: {
        type: DataTypes.STRING,
        allowNull: true
    },

    priority: {
        type: DataTypes.ENUM('Low', 'Medium', 'High'),
        allowNull: false,
        defaultValue: 'Low'
    },

    status: {
        type: DataTypes.ENUM('Pending', 'In Progress', 'Done'),
        allowNull: false,
        defaultValue: 'Pending'
    },

    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    }
},
    {
        timestamps: true,
        tableName: 'Tasks'
    }
);

module.exports = Task;
