import dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import connectDB from './database/db.js'
import userRoutes from './routes/user.routes.js'

dotenv.config()

const app = express()

//Middleware
app.use(cors())
app.use(bodyParser.json())

// Serve static files from the "uploads" directory
app.use('/uploads', express.static('uploads'))

//Connect to MongoDB
connectDB()

// Routes
app.use('/user', userRoutes)

app.get('/api', (req, res) => {
  res.send('API is running')
})

// Server Listening
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
