import './App.css'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
import AddItem from './components/AddItem'
import Checkout from './components/Checkout'

function App () {
  return (
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
        <Route path='/myaccount' element={<MyAccount />} />
        <Route path='/v/:id' element={<ViewProduct />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/additem' element={<AddItem />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
