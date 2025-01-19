import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, Routes, Route } from 'react-router-dom'
import MyProfile from './MyProfile'
import MyAddress from './MyAddress'
import MyOrders from './MyOrders'
import MyReturnOrders from './MyReturnOrders'
import MyCancelOrders from './MyCancelOrders'
import '../assets/styles/MyAccount.css'
import { BiUser } from 'react-icons/bi'
import { IoCloseOutline } from 'react-icons/io5'

const MyAccount = () => {
  const location = useLocation() // Get the current location (URL)
  const navigate = useNavigate()
  const [isAccountOpen, setIsAccountOpen] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Get user data from localStorage
  const firstName = localStorage.getItem('firstName')
  const lastName = localStorage.getItem('lastName')

  const openMyAccount = () => {
    setIsAccountOpen(!isAccountOpen)
  }

  const closeAccount = () => {
    setIsAccountOpen(false)
  }

  // Function to handle sidebar clicks
  const handleSidebarClick = section => {
    navigate(`/myaccount/${section}`)
  }

  // Function to apply active class
  const getActiveClass = section => {
    return location.pathname.includes(section) ? 'active' : ''
  }

  return (
    <div className='myaccount_container'>
      <div className='myaccount_header'>
        <div className='nav'>
          <Link to='/'>Home</Link>
          <p>/</p>
          <Link>My Account</Link>
        </div>
        <p>
          Welcome!{' '}
          <span>
            {firstName} {lastName}
          </span>
        </p>
      </div>

      <div className='your_account' onClick={openMyAccount}>
        <button>
          <BiUser /> My Account
        </button>
      </div>

      <div className='myaccount_content'>
        <div className={`left ${isAccountOpen ? 'active' : ''}`}>
          <p>Manage My Account</p>
          <ul>
            <li
              className={getActiveClass('profile')}
              onClick={() => handleSidebarClick('profile')}
            >
              My Profile
            </li>
            <li
              className={getActiveClass('address')}
              onClick={() => handleSidebarClick('address')}
            >
              Address Book
            </li>
          </ul>
          <p>Manage My Orders</p>
          <ul>
            <li
              className={getActiveClass('orders')}
              onClick={() => handleSidebarClick('orders')}
            >
              My Orders
            </li>
            <li
              className={getActiveClass('returns')}
              onClick={() => handleSidebarClick('returns')}
            >
              My Returns
            </li>
            <li
              className={getActiveClass('cancellations')}
              onClick={() => handleSidebarClick('cancellations')}
            >
              My Cancellations
            </li>
          </ul>

          <button className='close_account' onClick={closeAccount}>
            <IoCloseOutline />
          </button>
        </div>

        <div className='right'>
          <Routes>
            <Route path='profile' element={<MyProfile />} />
            <Route path='address' element={<MyAddress />} />
            <Route path='orders' element={<MyOrders />} />
            <Route path='returns' element={<MyReturnOrders />} />
            <Route path='cancellations' element={<MyCancelOrders />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default MyAccount
