import express from 'express'  //ESM
import servicesRoutes from './routes/servicesRoutes.js'

// Set up App
const app = express()

// Define Route
// use to http request
app.use('/api/services', servicesRoutes)

// Define Port
const PORT = process.env.PORT || 4000


// Start the app
app.listen(PORT, () => {
    console.log('The server is running on', PORT);
})

