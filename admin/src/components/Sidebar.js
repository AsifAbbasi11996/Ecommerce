import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaHome, FaUser, FaCog, FaShoppingCart } from 'react-icons/fa' // Import icons for sidebar
import { RiMenuUnfoldLine, RiMenuFoldLine } from 'react-icons/ri'
import { AiFillProduct } from 'react-icons/ai'
import '../assets/styles/Sidebar.css' // Your custom CSS for styling

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
              <FaHome className='sidebar-icon' />
              {!collapsed && <span className='sidebar-text'>Home</span>}
            </li>
          </Link>

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
                <Link>
                  <li className='dropdown-item'>View Orders</li>
                </Link>
                <Link>
                  <li className='dropdown-item'>Create Order</li>
                </Link>
                <Link>
                  <li className='dropdown-item'>Order History</li>
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
                <Link to='/viewusers'>
                  <li className='dropdown-item'>View Users</li>
                </Link>
                <Link to='/adduser'>
                  <li className='dropdown-item'>Add User</li>
                </Link>
                <Link>
                  <li className='dropdown-item'>Manage Users</li>
                </Link>
              </ul>
            )}
          </li>

          {/* Products Section with Dropdown */}
          <li
            className='sidebar-item'
            onClick={() => handleItemClick('products')}
          >
            <AiFillProduct className='sidebar-icon' />
            {!collapsed && <span className='sidebar-text'>Products</span>}
            {!collapsed && activeDropdown === 'products' && (
              <ul className='dropdown'>
                <Link to='/viewproducts'>
                  <li className='dropdown-item'>View Products</li>
                </Link>
                <Link to='/addproduct'>
                  <li className='dropdown-item'>Add Product</li>
                </Link>
              </ul>
            )}
          </li>

          <li className='sidebar-item' onClick={() => handleItemClick('items')}>
            <AiFillProduct className='sidebar-icon' />
            {!collapsed && <span className='sidebar-text'>Items</span>}
            {!collapsed && activeDropdown === 'items' && (
              <ul className='dropdown'>
                <Link to='/viewitems'>
                  <li className='dropdown-item'>View Items</li>
                </Link>
                <Link to='/additem'>
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
