const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const cors = require('cors')

const bodyParser = require('body-parser')

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


app.use(require('./controllers/UserController'))
app.use(require('./controllers/ListController'))




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

