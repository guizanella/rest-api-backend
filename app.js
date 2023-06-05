const express = require('express')
const routes = require('./routes/route')
const db = require('./config/db')
const app = express()
const port = 8081
const session = require('express-session')
const swaggerUI = require('swagger-ui-express');
const path = require('path');

app.use(session({ secret: 'password', saveUninitialized: true, cookie: { maxAge: 30 * 60 * 1000 } }))

app.use(express.static(path.join(__dirname, 'public')));
const swaggerDocument = require('./swagger_output.json');
app.use("/api-docs",swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes)

db.sequelize.sync({alter: true})

app.listen(port, function () {
    console.log(`Server is running on: http://localhost:${port}`)
})