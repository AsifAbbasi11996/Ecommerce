import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Layout from './pages/Layout'
import Dashboardpage from './pages/Dashboardpage'
import ViewUsers from './pages/ViewUsers'
import AddUser from './pages/AddUser'
import ViewDetails from './pages/ViewDetails'
import AddItem from './pages/AddItem'
import ViewItems from './pages/ViewItems'
import ItemDetails from './pages/ItemDetails'
import EditItem from './pages/EditItem'
import ViewOrders from './pages/ViewOrders'
import CanceledOrders from './pages/CanceledOrders'
import ReturnedOrders from './pages/ReturnedOrders'
import DeliveredOrders from './pages/DeliveredOrders'
import OutForDeliveryOrders from './pages/OutForDeliveryOrders'
import ShippedOrders from './pages/ShippedOrders'
import OrderPlacedOrders from './pages/OrderPlacedOrders'
import Profile from './components/Profile'
import Navlinks from './components/Navlinks'
import Slider from './components/Slider'
import Category from './components/Category'

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/' element={<Login />} />

        <Route element={<Layout />}>
          <Route path='/dashboard' element={<Dashboardpage />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/view-users' element={<ViewUsers />} />
          <Route path='/add-user' element={<AddUser />} />
          <Route path='/view-items' element={<ViewItems />} />
          <Route path='/add-item' element={<AddItem />} />
          <Route path='/view-orders' element={<ViewOrders />} />
          <Route path='/orderplaced-orders' element={<OrderPlacedOrders />} />
          <Route path='/shipped-orders' element={<ShippedOrders />} />
          <Route
            path='/outfordelivery-orders'
            element={<OutForDeliveryOrders />}
          />
          <Route path='/delivered-orders' element={<DeliveredOrders />} />
          <Route path='/canceled-orders' element={<CanceledOrders />} />
          <Route path='/returned-orders' element={<ReturnedOrders />} />
          <Route path='/navbar' element={<Navlinks />} />
          <Route path='/slider' element={<Slider />} />
          <Route path='/category' element={<Category />} />
          <Route
            path='/product-details/:id/:productName'
            element={<ViewDetails />}
          />
          <Route path='/item-details/:id/:itemName' element={<ItemDetails />} />
          <Route path='/edit-item/:id/:itemName' element={<EditItem />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
