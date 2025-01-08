import './App.css'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Homepage from './pages/Homepage'
import AddProductForm from './components/AddProduct'
import NotFound from './components/NotFound'
import Contact from './components/Contact'
import MyAccount from './components/MyAccount'
import AddCategoryForm from './components/AddCategoryForm'
import UpdateCategoryForm from './components/UpdateCategoryForm'
import ViewProduct from './components/ViewProduct'
import Checkout from './components/Checkout'
import Cart from './components/Cart'
import Wishlist from './components/Wishlist'
import TrackOrder from './components/TrackOrder'
import MyOrders from './components/MyOrders'
import MyProfile from './components/MyProfile'
import MyAddress from './components/MyAddress'
import MyReturnOrders from './components/MyReturnOrders'
import MyCancelOrders from './components/MyCancelOrders'
import CategoryProduct from './components/CategoryProduct'

function App () {
  return (
    <CartProvider>
      <WishlistProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/notfound' element={<NotFound />} />
            <Route path='/' element={<Homepage />} />
            <Route path='/add' element={<AddProductForm />} />
            <Route path='/addcategory' element={<AddCategoryForm />} />
            <Route path='/updatecategory' element={<UpdateCategoryForm />} />
            <Route path='/contact' element={<Contact />} />
            <Route
              path='/category/:categoryName'
              element={<CategoryProduct />}
            />
            <Route path='/myaccount' element={<MyAccount />} />
            <Route path='/v/:id/:itemName' element={<ViewProduct />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/wishlist' element={<Wishlist />} />
            <Route path='/track/:orderId' element={<TrackOrder />} />
            <Route path='/myaccount' element={<MyAccount />}>
              <Route path='profile' element={<MyProfile />} />
              <Route path='address' element={<MyAddress />} />
              <Route path='orders' element={<MyOrders />} />
              <Route path='returns' element={<MyReturnOrders />} />
              <Route path='cancellations' element={<MyCancelOrders />} />
            </Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </WishlistProvider>
    </CartProvider>
  )
}

export default App
