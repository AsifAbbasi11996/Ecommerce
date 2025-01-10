import React, { useEffect, useState } from 'react'
import '../assets/styles/Dashboard.css'
import { MdKeyboardDoubleArrowRight } from 'react-icons/md'
import { PiDotsThreeOutlineVerticalFill } from 'react-icons/pi'
import { FiClock } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { totalUsers } from '../api/userApi'
import { getTotalItems } from '../api/itemApi'
import {
  getAllDeliveredOrders,
  getAllOrderPlacedOrders,
  getTotalOrders,
  getTotalSales
} from '../api/ordersApi'
import { formatPrice } from '../utils/formatPrice'

const Dashboard = () => {
  const navigate = useNavigate()
  const [totalusers, setTotalUsers] = useState([])
  const [totalItems, setTotalItems] = useState([])
  const [totalorders, setTotalOrders] = useState([])
  const [totalsales, setTotalSales] = useState([])
  const [totalOrderPlacedCount, setTotalOrderPlacedCount] = useState([])
  const [totalDeliveredCount, setTotalDeliveredCount] = useState([])

  const [dropdownOpen, setDropdownOpen] = useState({
    totalUsers: false,
    totalSales: false,
    orderplacedOrders: false,
    deliveredOrders: false,
    totalOrders: false
  })

  useEffect(() => {
    const FetchTotalUser = async () => {
      try {
        const response = await totalUsers()
        setTotalUsers(response)
      } catch (error) {
        console.log(error)
      }
    }

    const FetchTotalItems = async () => {
      try {
        const response = await getTotalItems()
        setTotalItems(response)
      } catch (error) {
        console.log(error)
      }
    }

    const FetchTotalSales = async () => {
      try {
        const response = await getTotalSales()
        setTotalSales(response)
      } catch (error) {
        console.log(error)
      }
    }

    const FetchTotalOrders = async () => {
      try {
        const response = await getTotalOrders()
        setTotalOrders(response)
      } catch (error) {
        console.log(error)
      }
    }

    const FetchTotalOrderPlacedCount = async () => {
      try {
        const response = await getAllOrderPlacedOrders()
        setTotalOrderPlacedCount(response)
      } catch (error) {
        console.log(error)
      }
    }

    const FetchTotalDeliveredCount = async () => {
      try {
        const response = await getAllDeliveredOrders()
        setTotalDeliveredCount(response)
      } catch (error) {
        console.log(error)
      }
    }

    FetchTotalUser()
    FetchTotalItems()
    FetchTotalSales()
    FetchTotalOrders()
    FetchTotalOrderPlacedCount()
    FetchTotalDeliveredCount()
  }, [])

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
      orderplacedOrders: 'Order Placed Orders',
      deliveredOrders: 'Delivered Orders',
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
                  <span>total registered users</span>
                  {totalusers.totalUsers}
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
                  <span>total Items</span>
                  {totalItems.totalItems}
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
                  <span>total sales</span>
                  {formatPrice(totalsales.totalSales)}
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

          {/* Order Placed Orders Card */}
          <div className='grid-item'>
            <div
              className='card yellow'
              onClick={() => toggleDropdown('orderplacedOrders')}
            >
              <div className='head'>
                <h4>
                  <span>Order Placed orders</span>
                  {totalOrderPlacedCount.count}
                </h4>
                <div className='icon'>
                  <PiDotsThreeOutlineVerticalFill />
                </div>
              </div>
            </div>
            {dropdownOpen.orderplacedOrders && (
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

          {/* Delivered Orders Card */}
          <div className='grid-item'>
            <div
              className='card green'
              onClick={() => toggleDropdown('deliveredOrders')}
            >
              <div className='head'>
                <h4>
                  <span>Delivered orders</span>
                  {totalDeliveredCount.count}
                </h4>
                <div className='icon'>
                  <PiDotsThreeOutlineVerticalFill />
                </div>
              </div>
            </div>
            {dropdownOpen.deliveredOrders && (
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
                  <span>total orders</span>
                  {totalorders.totalOrders}
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
