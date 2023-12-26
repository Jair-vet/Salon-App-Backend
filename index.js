import express from 'express'  //ESM
import servicesRoutes from './routes/servicesRoutes.js'
import authRoutes from './routes/authRoutes.js'
import appointmentRoutes from './routes/appointmentRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { db } from './config/db.js'
import dotenv from 'dotenv'
import cors from 'cors'

// Variables
dotenv.config()


// Set up App
const app = express()


// Read data
app.use(express.json())


// DB Conection
db()

// Configurar CORS
// const whitelist = [process.env.FRONTEND_URL]
const whitelist = [process.env.FRONTEND_URL]

if(process.argv[2] === '--postman'){
  whitelist.push(undefined)
}

const corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.includes(origin)) {
        // Puede consultar la API
        callback(null, true);
      } else {
        // No esta permitido
        callback(new Error("Error in Cors"));
      }
    },
};

app.use(cors(corsOptions))


// Define Route
// use to http request
app.use('/api/services', servicesRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/appointments', appointmentRoutes)
app.use('/api/users', userRoutes)


// Define Port
const PORT = process.env.PORT || 4000


// Start the app
app.listen(PORT, () => {
    console.log('The server is running on', PORT);
})

