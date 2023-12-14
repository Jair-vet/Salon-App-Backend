import express from 'express'  //ESM
import servicesRoutes from './routes/servicesRoutes.js'
import { db } from './config/db.js'
import dotenv from 'dotenv'


// Variables
dotenv.config()


// Set up App
const app = express()

// DB Conection
db()

// Define Route
// use to http request
app.use('/api/services', servicesRoutes)

// Define Port
const PORT = process.env.PORT || 4000


// Start the app
app.listen(PORT, () => {
    console.log('The server is running on', PORT);
})

