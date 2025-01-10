import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaHome, FaUser, FaCog, FaShoppingCart } from 'react-icons/fa' // Import icons for sidebar
import { RiMenuUnfoldLine, RiMenuFoldLine } from 'react-icons/ri'
import { AiFillProduct } from 'react-icons/ai'
import '../assets/styles/Sidebar.css' // Your custom CSS for styling
import { MdSpaceDashboard } from 'react-icons/md'

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false) // To manage sidebar collapsed state
  const [activeDropdown, setActiveDropdown] = useState(null) // State to track the active dropdown

  const toggleSidebar = () => {
    setCollapsed(!collapsed) // Toggle the collapsed state
  }

  const handleItemClick = dropdown => {
    // If the clicked item is the active dropdown, we close it
    if (activeDropdown === dropdown) {
      setActiveDropdown(null) // Close the dropdown
    } else {
      setActiveDropdown(dropdown) // Open the new dropdown
    }
  }

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      {/* Sidebar Content */}
      <div className='sidebar-content'>
        <div className='head'>
          <h3>Pages</h3>
          {/* Sidebar Toggle Button placed inside sidebar-content */}
          <button className='toggle-btn' onClick={toggleSidebar}>
            {collapsed ? <RiMenuUnfoldLine /> : <RiMenuFoldLine />}
          </button>
        </div>

        <ul>
          <Link to='/dashboard'>
            <li className='sidebar-item' onClick={() => handleItemClick(null)}>
              <MdSpaceDashboard className='sidebar-icon' />
              {!collapsed && <span className='sidebar-text'>Dashboard</span>}
            </li>
          </Link>

          <li
            className='sidebar-item'
            onClick={() => handleItemClick('ecommerce')}
          >
            <FaHome className='sidebar-icon' />
            {!collapsed && <span className='sidebar-text'>Ecommerce</span>}
            {!collapsed && activeDropdown === 'ecommerce' && (
              <ul className='dropdown'>
                <Link to='/navbar'>
                  <li className='dropdown-item'>Navbar</li>
                </Link>
                <Link to='/slider'>
                  <li className='dropdown-item'>Slider</li>
                </Link>
                <Link to='/category'>
                  <li className='dropdown-item'>Category</li>
                </Link>
                <Link to='/policy'>
                  <li className='dropdown-item'>Policy</li>
                </Link>
              </ul>
            )}
          </li>

          {/* Orders Section with Dropdown */}
          <li
            className='sidebar-item'
            onClick={() => handleItemClick('orders')}
          >
            <FaShoppingCart className='sidebar-icon' />
            {!collapsed && <span className='sidebar-text'>Orders</span>}
            {/* Show dropdown if orders is active */}
            {!collapsed && activeDropdown === 'orders' && (
              <ul className='dropdown'>
                <Link to='/view-orders'>
                  <li className='dropdown-item'>View Orders</li>
                </Link>
                <Link to='/orderplaced-orders'>
                  <li className='dropdown-item'>Order Placed</li>
                </Link>
                <Link to='/shipped-orders'>
                  <li className='dropdown-item'>Shipped</li>
                </Link>
                <Link to='/outfordelivery-orders'>
                  <li className='dropdown-item'>Out for Delivery</li>
                </Link>
                <Link to='/delivered-orders'>
                  <li className='dropdown-item'>Delivered</li>
                </Link>
                <Link to='/canceled-orders'>
                  <li className='dropdown-item'>Canceled Orders</li>
                </Link>
                <Link to='/returned-orders'>
                  <li className='dropdown-item'>Returned Orders</li>
                </Link>
              </ul>
            )}
          </li>

          {/* Users Section with Dropdown */}
          <li className='sidebar-item' onClick={() => handleItemClick('users')}>
            <FaUser className='sidebar-icon' />
            {!collapsed && <span className='sidebar-text'>Users</span>}
            {/* Show dropdown if users is active */}
            {!collapsed && activeDropdown === 'users' && (
              <ul className='dropdown'>
                <Link to='/view-users'>
                  <li className='dropdown-item'>View Users</li>
                </Link>
                <Link to='/add-user'>
                  <li className='dropdown-item'>Add User</li>
                </Link>
                <Link>
                  <li className='dropdown-item'>Manage Users</li>
                </Link>
              </ul>
            )}
          </li>

          <li className='sidebar-item' onClick={() => handleItemClick('items')}>
            <AiFillProduct className='sidebar-icon' />
            {!collapsed && <span className='sidebar-text'>Items</span>}
            {!collapsed && activeDropdown === 'items' && (
              <ul className='dropdown'>
                <Link to='/view-items'>
                  <li className='dropdown-item'>View Items</li>
                </Link>
                <Link to='/add-item'>
                  <li className='dropdown-item'>Add Item</li>
                </Link>
              </ul>
            )}
          </li>

          <Link>
            <li className='sidebar-item' onClick={() => handleItemClick(null)}>
              <FaCog className='sidebar-icon' />
              {!collapsed && <span className='sidebar-text'>Settings</span>}
            </li>
          </Link>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
