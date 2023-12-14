import express from 'express'


const router = express.Router()

router.get('/', (req, res) => {

    const products = [
        {
            id: 1,
            price: 50,
            name: 'Laptop'
        },
        {   
            id: 2,
            price: 89,
            name: 'Camara'

        }
    ]

    res.json(products)
})

export default router