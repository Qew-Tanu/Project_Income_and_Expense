const { Sequelize } = require('sequelize');
require("dotenv").config()

// const sequelize = new Sequelize(process.env.db_database,
//     process.env.db_username,
//     process.env.db_password,
//     {
//         host: process.env.db_host,
//         dialect: 'postgres',
//         logging: false
//     });
const sequelize = new Sequelize("postgres://txulwprx:JmwYkXuA65HrgjSGovXAJFa-NZ2DW4wI@rosie.db.elephantsql.com/txulwprx", { logging: false });


module.exports = sequelize;