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
            message: 'El ID del libro no es valido'
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
            return res.status(204).json([])
        }
        res.json(customers)
    }catch(error){
        res.status(500).json({ message: error.message})
    }
})

//Crear un nuevo cliente (recurso) [POST]
router.post('/', async (req, res) => {
    const { name, lastname, age, gender, bornDate, email } = req?.body
    if(!name || !lastname || !age || !gender || !bornDate || !email){
        return res.status(400).json(
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

router.get('/:id', getCustomer, async(req, res) => {
    res.json(res.customer);
})

router.put('/:id', getCustomer, async(req, res) => {
    try {
        const customer = res.customer
        customer.name = req.body.name || customer.name
        customer.lastname = req.body.lastname || customer.lastname
        customer.age = req.body.age || customer.age
        customer.gender = req.body.gender || customer.gender
        customer.bornDate = req.body.bornDate || customer.bornDate
        customer.email = req.body.email || customer.email

        const updateCustomer = await customer.save()
        res.json(updateCustomer)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})

router.patch('/:id', getCustomer, async(req, res) => {
    
    if(!req.body.name && !req.body.lastname && !req.body.age && !req.body.gender && !req.body.bornDate && !req.body.email)
        {
            res.status(400).json({
                message: 'Al menos uno de estos campos debe ser enviado: Nombre, Apellido, Edad, Genero, Fecha de Nacimiento, Correo Electrónico'
            })
        }

    try {
        const customer = res.customer
        customer.name = req.body.name || customer.name
        customer.lastname = req.body.lastname || customer.lastname
        customer.age = req.body.age || customer.age
        customer.gender = req.body.gender || customer.gender
        customer.bornDate = req.body.bornDate || customer.bornDate
        customer.email = req.body.email || customer.email

        const updateCustomer = await customer.save()
        res.json(updateCustomer)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})

router.delete('/:id', getCustomer, async(req, res) => {
    try {
        const customer = res.customer
        await customer.deleteOne({
            _id: customer._id
        });
        res.json({
            message: `El cliente ${customer.name} fue eliminado correctamente`
        })
    } catch (error) {
        res.json({
            message: error.message
        })
    }
})



module.exports = router