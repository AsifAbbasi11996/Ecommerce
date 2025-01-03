import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MyProfile from './MyProfile' // Import the components
import MyOrders from './MyOrders'
import MyReturns from './MyReturns'
import '../assets/styles/MyAccount.css'
import Address from './Address'

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
            <li
              className={getActiveClass('paymentOptions')}
              onClick={() => handleSidebarClick('paymentOptions')}
            >
              My Payment Options
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
          {selectedSection === 'address' && <Address />}
          {selectedSection === 'orders' && <MyOrders />}
          {selectedSection === 'returns' && <MyReturns />}
          {/* Add more conditions here for other sections */}
        </div>
      </div>
    </div>
  )
}

export default MyAccount
