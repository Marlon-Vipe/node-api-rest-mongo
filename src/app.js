const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const { config } = require('dotenv')
config()

const customerRoutes = require('./routes/customers.routes')

// Usamos express para los middlewares
const app = express();
app.use(bodyParser.json()) //Parseador de bodies

// Conexion de base de datos:
mongoose.connect(process.env.MONGO_URL, { dbName: process.env.MONGO_DB_NAME})

const db = mongoose.connection;

app.use('/customers', customerRoutes)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Servidor iniciado: Puerto ${port}`);
})