const express = require('express')
const app = express()
const Service = require('../utilities/Service');
const { Op } = require('sequelize');
const ListModel = require('../models/ListModel');




app.post('/dashboard/list', Service.isLogin, async (req, res) => {
    try {
        const start = new Date(req.body.date + " 00:00:00").toISOString()
        const end = new Date(req.body.date + " 23:59:59").toISOString()
        const incomeList = await ListModel.findAll({
            where: {
                userId: Service.getUserId(req),
                datetime: {
                    [Op.between]: [start, end]
                }
            },
            order: [['datetime', 'DESC']],
        })
        res.send({ message: "success", results: incomeList })
    } catch (error) {
        res.status(500).send({ message: error });
    }
})

app.post('/dashboard/add', Service.isLogin, async (req, res) => {
    try {
        const datainsert = { ...req.body, userId: Service.getUserId(req) }
        const result = await ListModel.create(datainsert).then(result => {
            res.send({ message: "success" })
        }).catch(err => {
            throw err
        })

    } catch (error) {
        res.status(500).send({ message: error });
    }
})

app.patch('/dashboard/update', Service.isLogin, async (req, res) => {
    try {
        const datainsert = { ...req.body }
        const result = await ListModel.update(datainsert, {
            where: {
                id: datainsert.id
            }
        }).then(result => {
            res.send({ message: "success" })
        }).catch(err => {
            throw err
        })

    } catch (error) {
        res.status(500).send({ message: error });
    }
})

app.delete('/dashboard/delete/:id', Service.isLogin, async (req, res) => {
    try {
        const result = await ListModel.destroy({
            where: {
                id: req.params.id
            }
        }).then(result => {
            res.send({ message: "success" })
        }).catch(err => {
            throw err
        })

    } catch (error) {
        res.status(500).send({ message: error });
    }
})

app.get('/dashboard/:id', Service.isLogin, async (req, res) => {
    try {
        const incomeList = await ListModel.findOne({
            attributes: ["id", "money", "name", "datetime", "actiontype"],
            where: {
                userId: Service.getUserId(req),
                id: req.params.id
            },
        })
        res.send({ message: "success", results: incomeList })


    } catch (error) {
        res.status(500).send({ message: error });
    }
})






module.exports = app;