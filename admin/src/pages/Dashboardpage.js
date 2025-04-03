import React from 'react'
import '../assets/styles/Dashboardpage.css'
import Dashboard from '../components/Dashboard'
import TopSellingProducts from '../components/TopSellingProducts'

const Dashboardpage = () => {
  return (
    <div className='main_dashboard'>
      <Dashboard />
      <TopSellingProducts />
    </div>
  )
}

export default Dashboardpage
