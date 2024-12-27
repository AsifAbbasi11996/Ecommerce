import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar.js'
import Sidebar from '../components/Sidebar.js'
import '../assets/styles/Layout.css'
// import company_logo from '../assets/images/our_logo.png'

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className='layout'>
        <Sidebar />
        <div className='main-content'>
          <Outlet />
          <div className='company'>
            <p>Designed By</p>
            <div className='img'>
              {/* <img src={company_logo} className='company_logo' /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout
