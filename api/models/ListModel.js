const conn = require("../connect")

const { DataTypes } = require('sequelize');
const UserModel = require("./UserModel");

const ListModel = conn.define('list', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.BIGINT,
        references: {
            model: UserModel,
            key: "id"
        }
    },
    name: {
        type: DataTypes.STRING(255),
    },
    money: {
        type: DataTypes.STRING(255),
    },
    datetime: {
        type: DataTypes.DATE,
    },
    actiontype: {
        type: DataTypes.STRING(255),
    },

})

// ListModel.sync({ alter: true })

module.exports = ListModel;