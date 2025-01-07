import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MyProfile from './MyProfile' // Import the components
import MyAddress from './MyAddress'
import MyOrders from './MyOrders'
import MyReturnOrders from './MyReturnOrders'
import MyCancelOrders from './MyCancelOrders'
import '../assets/styles/MyAccount.css'

const MyAccount = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [selectedSection, setSelectedSection] = useState('profile') // Default to 'profile'

  // Get user data from localStorage
  const firstName = localStorage.getItem('firstName')
  const lastName = localStorage.getItem('lastName')

  // Function to handle sidebar clicks
  const handleSidebarClick = section => {
    setSelectedSection(section)
  }

  // Function to apply active class
  const getActiveClass = section => {
    return selectedSection === section ? 'active' : ''
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

      <div className='myaccount_content'>
        <div className='left'>
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
        </div>

        <div className='right'>
          {selectedSection === 'profile' && <MyProfile />}
          {selectedSection === 'address' && <MyAddress />}
          {selectedSection === 'orders' && <MyOrders />}
          {selectedSection === 'returns' && <MyReturnOrders />}
          {selectedSection === 'cancellations' && <MyCancelOrders />}
          {/* Add more conditions here for other sections */}
        </div>
      </div>
    </div>
  )
}

export default MyAccount
