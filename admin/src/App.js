import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Layout from './pages/Layout'
import Dashboardpage from './pages/Dashboardpage'
import ViewUsers from './components/ViewUsers'
import AddUser from './components/AddUser'
import ViewProducts from './components/ViewProducts'
import ViewDetails from './components/ViewDetails'
import AddProductForm from './components/AddProduct'

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/' element={<Login />} />

        <Route element={<Layout />}>
          <Route path='/dashboard' element={<Dashboardpage />} />
          <Route path='/viewusers' element={<ViewUsers />} />
          <Route path='/adduser' element={<AddUser />} />
          <Route path='/addproduct' element={<AddProductForm />} />
          <Route path='/viewproducts' element={<ViewProducts />} />
          <Route
            path='/product-details/:id/:productName'
            element={<ViewDetails />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
