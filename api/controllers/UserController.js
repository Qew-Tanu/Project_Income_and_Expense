const express = require('express')
const app = express()
const jwt = require('jsonwebtoken');
const Service = require('../utilities/Service');
const UserModel = require('../models/UserModel');
const encrypt = require('../utilities/encrypt');


app.post('/user/signin', async (req, res) => {
    try {
        const member = await UserModel.findOne({
            where: {
                username: req.body.username,
            }
        })
        if (member !== null) {
            const comparePassword = await encrypt.comparePassword(req.body.password, member.password)
            if (comparePassword === true) {
                let token = jwt.sign({ id: member.id }, process.env.secret)
                res.send({ message: "success", token: token })
            } else {
                res.status(401).send({ message: "Password wrong" })
            }
        } else {
            res.status(401).send({ message: "Don't have this username, Please check username" })
        }
    } catch (error) {
        res.statusCode = 500;
        res.send({ message: error });
    }
})


app.post('/user/signup', async (req, res) => {
    try {
        const usernameCheck = await UserModel.findAll({
            where: {
                username: req.body.username
            }
        })
        if (usernameCheck.length > 0) {
            res.status(401).send({ message: 'This username is already used' });
        } else {
            const datasend = {
                ...req.body,
                password: await encrypt.hashPassword(req.body.password)
            }
            const results = await UserModel.create(datasend);
            res.send({ message: 'success', results: results });
        }
    } catch (error) {
        res.statusCode = 500;
        res.send({ message: error });
    }



})

app.get('/user/detail', Service.isLogin, async (req, res) => {
    try {
        const user = await UserModel.findOne({
            attributes: ["id", "firstname", "lastname"],
            where: {
                id: Service.getUserId(req),
            }
        })
        if (user !== null) {
            res.send({ message: "success", user: user })
        } else {
            res.status(401).send({ message: "Fail to load user" })
        }
    } catch (error) {
        res.statusCode = 500;
        res.send({ message: error });
    }
})




module.exports = app;