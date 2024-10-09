const express = require('express')
const router = express.Router()
const Customer = require('../models/customers.model')

//Middleware (verifica si corresponde a un ID valido)
const getCustomer = async(req,res,next) => {
    let customer;
    const {id} = req.params;

    if(!id.match(/^[0-9a-fA-F]{24}$/))
        {
            return res.status(404).json({
            message: 'el ID del libro no es valido'
        }
    )}

    try {
        customer = await Customer.findById(id);
        if(!customer){
            return res.status(404).json(
            {
                message: 'El cliente no fue encontrado'
            }
        )}
        } catch (error) {
            return res.status(500).json(
        {
            message: error.message
        }
    )}

    res.customer = customer;
    next()
}

// Obtener todos los clientes [GET ALL]
router.get('/', async (req, res) => {
    try{
        const customers = await Customer.find()
        console.log('GET ALL', customers)
        if(customers.length === 0){
            res.status(204).json([])
        }
        res(customers)
    }catch(error){
        res.status(500).json({ message: error.message})
    }
})

//Crear un nuevo cliente (recurso) [POST]
router.post('/', async (req, res) => {
    const { name, lastname, age, gender, bornDate, email } = req?.body
    if(!name || !lastname || !age || !gender || !bornDate || !email){
        return res.satus(400).json(
        {
            message: 'Se deben llenar todos los campos obligatoriamente'
        }
    )}

    const customer = new Customer(
    {
        name, 
        lastname, 
        age, 
        gender, 
        bornDate, 
        email
    })

    try {
        const newCustomer = await customer.save()
        console.log(newCustomer);
        res.status(201).json(newCustomer)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})
