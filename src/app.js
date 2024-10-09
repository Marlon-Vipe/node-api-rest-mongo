const express = require('express')
const mongoose = require('mongoose')
const { config } = require('dotenv')
config()

const customerRoutes = require('./routes/customers.routes')
const app = express();
const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Servidor iniciado: Puerto ${port}`);
})