import React, { useState } from 'react'
import '../assets/styles/Dashboard.css'
import { MdKeyboardDoubleArrowRight } from 'react-icons/md'
import { PiDotsThreeOutlineVerticalFill } from 'react-icons/pi'
import { FiClock } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()

  const [dropdownOpen, setDropdownOpen] = useState({
    totalUsers: false,
    totalSales: false,
    pendingOrders: false,
    completedOrders: false,
    totalOrders: false
  })

  // Handle dropdown toggle for the clicked card
  const toggleDropdown = key => {
    setDropdownOpen(prev => {
      const updatedDropdownState = { ...prev }
      // Close all dropdowns except the one clicked
      for (let dropdownKey in updatedDropdownState) {
        updatedDropdownState[dropdownKey] =
          dropdownKey === key ? !updatedDropdownState[dropdownKey] : false
      }
      return updatedDropdownState
    })
  }

  const handleOptionClick = option => {
    const typeMap = {
      totalUsers: 'Total Users',
      totalSales: 'Total Sales',
      pendingOrders: 'Pending Orders',
      completedOrders: 'Completed Orders',
      totalOrders: 'Total Orders'
    }

    const type =
      typeMap[Object.keys(dropdownOpen).find(key => dropdownOpen[key])] // Get the type based on the active dropdown
    navigate(`/filtered-data?type=${type}&period=${option}`) // Use navigate instead of history.push

    // Close all dropdowns after selection
    setDropdownOpen({
      totalUsers: false,
      totalSales: false,
      pendingOrders: false,
      completedOrders: false,
      totalOrders: false
    })
  }

  return (
    <div className='main_dashboard'>
      <div className='head'>
        <p>Home</p>
        <MdKeyboardDoubleArrowRight />
        <p>Dashboard</p>
      </div>

      <div className='six-cards'>
        <div className='cards grid-container'>
          {/* Total Registered Users Card */}
          <div className='grid-item'>
            <div
              className='card orange'
              onClick={() => toggleDropdown('totalUsers')}
            >
              <div className='head'>
                <h4>
                  <span>total registered users</span>500
                </h4>
                <div className='icon'>
                  <PiDotsThreeOutlineVerticalFill />
                </div>
              </div>
            </div>
            {dropdownOpen.totalUsers && (
              <div className='dropdown'>
                <ul>
                  <li onClick={() => handleOptionClick('Today')}>
                    <FiClock /> Today
                  </li>
                  <li onClick={() => handleOptionClick('Last Day')}>
                    <FiClock /> Last Day
                  </li>
                  <li onClick={() => handleOptionClick('Last Week')}>
                    <FiClock /> Last Week
                  </li>
                  <li onClick={() => handleOptionClick('Last Month')}>
                    <FiClock /> Last Month
                  </li>
                  <li onClick={() => handleOptionClick('Last Year')}>
                    <FiClock /> Last Year
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Total Products Card */}
          <div className='grid-item'>
            <div className='card blue'>
              <div className='head'>
                <h4>
                  <span>total products</span>62
                </h4>
              </div>
            </div>
          </div>

          {/* Total Sales Card */}
          <div className='grid-item'>
            <div
              className='card indigo'
              onClick={() => toggleDropdown('totalSales')}
            >
              <div className='head'>
                <h4>
                  <span>total sales</span>1,69,523
                </h4>
                <div className='icon'>
                  <PiDotsThreeOutlineVerticalFill />
                </div>
              </div>
            </div>
            {dropdownOpen.totalSales && (
              <div className='dropdown'>
                <ul>
                  <li onClick={() => handleOptionClick('Today')}>
                    <FiClock /> Today
                  </li>
                  <li onClick={() => handleOptionClick('Last Day')}>
                    <FiClock /> Last Day
                  </li>
                  <li onClick={() => handleOptionClick('Last Week')}>
                    <FiClock /> Last Week
                  </li>
                  <li onClick={() => handleOptionClick('Last Month')}>
                    <FiClock /> Last Month
                  </li>
                  <li onClick={() => handleOptionClick('Last Year')}>
                    <FiClock /> Last Year
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Pending Orders Card */}
          <div className='grid-item'>
            <div
              className='card yellow'
              onClick={() => toggleDropdown('pendingOrders')}
            >
              <div className='head'>
                <h4>
                  <span>pending orders</span>15
                </h4>
                <div className='icon'>
                  <PiDotsThreeOutlineVerticalFill />
                </div>
              </div>
            </div>
            {dropdownOpen.pendingOrders && (
              <div className='dropdown'>
                <ul>
                  <li onClick={() => handleOptionClick('Today')}>
                    <FiClock /> Today
                  </li>
                  <li onClick={() => handleOptionClick('Last Day')}>
                    <FiClock /> Last Day
                  </li>
                  <li onClick={() => handleOptionClick('Last Week')}>
                    <FiClock /> Last Week
                  </li>
                  <li onClick={() => handleOptionClick('Last Month')}>
                    <FiClock /> Last Month
                  </li>
                  <li onClick={() => handleOptionClick('Last Year')}>
                    <FiClock /> Last Year
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Completed Orders Card */}
          <div className='grid-item'>
            <div
              className='card green'
              onClick={() => toggleDropdown('completedOrders')}
            >
              <div className='head'>
                <h4>
                  <span>completed orders</span>43
                </h4>
                <div className='icon'>
                  <PiDotsThreeOutlineVerticalFill />
                </div>
              </div>
            </div>
            {dropdownOpen.completedOrders && (
              <div className='dropdown'>
                <ul>
                  <li onClick={() => handleOptionClick('Today')}>
                    <FiClock /> Today
                  </li>
                  <li onClick={() => handleOptionClick('Last Day')}>
                    <FiClock /> Last Day
                  </li>
                  <li onClick={() => handleOptionClick('Last Week')}>
                    <FiClock /> Last Week
                  </li>
                  <li onClick={() => handleOptionClick('Last Month')}>
                    <FiClock /> Last Month
                  </li>
                  <li onClick={() => handleOptionClick('Last Year')}>
                    <FiClock /> Last Year
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Total Orders Card */}
          <div className='grid-item'>
            <div
              className='card purple'
              onClick={() => toggleDropdown('totalOrders')}
            >
              <div className='head'>
                <h4>
                  <span>total orders</span>64
                </h4>
                <div className='icon'>
                  <PiDotsThreeOutlineVerticalFill />
                </div>
              </div>
            </div>
            {dropdownOpen.totalOrders && (
              <div className='dropdown'>
                <ul>
                  <li onClick={() => handleOptionClick('Today')}>
                    <FiClock /> Today
                  </li>
                  <li onClick={() => handleOptionClick('Last Day')}>
                    <FiClock /> Last Day
                  </li>
                  <li onClick={() => handleOptionClick('Last Week')}>
                    <FiClock /> Last Week
                  </li>
                  <li onClick={() => handleOptionClick('Last Month')}>
                    <FiClock /> Last Month
                  </li>
                  <li onClick={() => handleOptionClick('Last Year')}>
                    <FiClock /> Last Year
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
