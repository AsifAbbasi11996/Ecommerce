import dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import connectDB from './database/db.js'
import userRoutes from './routes/user.routes.js'
import adminUserRoutes from './routes/adminUser.routes.js'
import productRoutes from './routes/product.routes.js'
import sliderRoutes from './routes/slider.routes.js'
import categoryRoutes from './routes/category.routes.js'
import itemRoutes from './routes/item.routes.js'
import cartRoutes from './routes/cart.routes.js'
import wishlistRoutes from './routes/wishlist.routes.js'

dotenv.config()

const app = express()

//Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) // For URL-encoded data

// Serve static files from the "uploads" directory
app.use('/uploads', express.static('uploads'))

//Connect to MongoDB
connectDB()

// Routes
app.use('/user', userRoutes)
app.use('/admin', adminUserRoutes)
app.use('/product', productRoutes)
app.use('/slider', sliderRoutes)
app.use('/category', categoryRoutes)
app.use('/item', itemRoutes)
app.use('/cart', cartRoutes)
app.use('/wishlist', wishlistRoutes)

app.get('/api', (req, res) => {
  res.send('API is running')
})

// Server Listening
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
