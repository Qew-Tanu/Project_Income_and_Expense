const conn = require("../connect")

const { DataTypes } = require('sequelize');

const UserModel = conn.define('user', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    firstname: {
        type: DataTypes.STRING(255),
    },
    lastname: {
        type: DataTypes.STRING(255),
    },
    email: {
        type: DataTypes.STRING(255),
    },
    username: {
        type: DataTypes.STRING(255),
    },
    password: {
        type: DataTypes.STRING(255),
    }

})

// UserModel.sync({ alter: true })

module.exports = UserModel;