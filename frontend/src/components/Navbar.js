import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CiSearch,
  CiHeart,
  CiShoppingCart,
  CiUser,
  CiLogout,
  CiMenuFries,
  CiBoxes,
  CiLogin
} from 'react-icons/ci'
import '../assets/styles/Navbar.css'
import { getAllNavbar } from '../api/navbarApi'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { IoCloseOutline } from 'react-icons/io5'

const Navbar = () => {
  const [navbar, setNavbar] = useState([])
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isShow, setIsShow] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearchbarVisible, setIsSearchbarVisible] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchNavbar = async () => {
      try {
        const navbarData = await getAllNavbar()
        setNavbar(navbarData)
      } catch (error) {
        console.error('Error fetching navbar:', error)
      }
    }
    fetchNavbar()

    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const showDropdown = () => {
    setIsShow(!isShow)
  }

  const handleNavigate = () => {
    navigate('/')
  }

  const handleSearchChange = e => {
    setSearchTerm(e.target.value)
  }

  // Handle search submission when clicking the search icon or pressing Enter
  const handleSearchSubmit = () => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm}`) // Navigate to search page with query
      setIsSearchbarVisible(false) // Close the search bar after search
    }
  }

  // Handle Enter key press for search
  const handleKeyPress = e => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      handleSearchSubmit() // Trigger the search on Enter press
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('userId')
    localStorage.removeItem('firstName')
    localStorage.removeItem('lastName')
    localStorage.removeItem('token')
    toast.success('Logged out successfully!', {
      position: 'top-right',
      autoClose: 1000,
      hideProgressBar: false,
      draggable: false
    })
  }

  const navigateToWishlist = () => {
    navigate('/wishlist')
  }

  const navigateToCart = () => {
    navigate('/cart')
  }

  const handleNavlinkClose = () => {
    setIsMenuOpen(false)
  }

  // Check if user is logged in by the presence of token in localStorage
  const isLoggedIn = localStorage.getItem('token') !== null

  // Function to toggle search bar visibility
  const toggleSearchbar = () => {
    setIsSearchbarVisible(!isSearchbarVisible) // Toggle visibility on smaller screens
  }

  const handleCloseSearchbar = () => {
    setIsSearchbarVisible(false)
  }

  return (
    <nav>
      <div className='hamburger' onClick={toggleMenu}>
        <CiMenuFries />
      </div>

      <div className='logo' onClick={handleNavigate}>
        Exclusive
      </div>

      <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        {navbar.length > 0 ? (
          navbar.map(navItem => (
            <Link
              key={navItem._id}
              to={`/category${navItem.link}`}
              onClick={() => {
                handleNavlinkClose()
              }}
            >
              {navItem.nav}
            </Link>
          ))
        ) : (
          <p>No found.</p>
        )}
      </div>

      <div className='right'>
        {/* Show the search bar only when windowWidth <= 946 and isSearchbarVisible is true */}
        {windowWidth <= 946 && isSearchbarVisible && (
          <div
            className='searchbar'
            style={{
              backgroundColor: isSearchbarVisible ? '#f1f1f1' : 'transparent', // Change color when active
              height: isSearchbarVisible ? '100vh' : 'auto', // Set height to 100% of the viewport when visible
              position: 'absolute', // Make it occupy full screen width/height
              top: 0, // Align at the top of the page
              left: 0, // Align to the left edge
              width: '100%', // Full width of the screen
              zIndex: 1000 // Ensure it's above other content
            }}
          >
            {/* Conditionally render a message when the search bar is visible */}
            {isSearchbarVisible && (
              <div className='search-message'>
                <p>Search for products, categories, or brands...</p>
                <button onClick={handleCloseSearchbar}>
                  <IoCloseOutline />
                </button>
              </div>
            )}

            <input
              type='text'
              placeholder='What are you looking for?'
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleKeyPress} // Listen for Enter key press
            />
            <CiSearch className='searchicon' onClick={handleSearchSubmit} />
          </div>
        )}

        {/* Show search icon that toggles the search bar */}
        {windowWidth <= 946 && (
          <div className='search_icon' onClick={toggleSearchbar}>
            <CiSearch />
          </div>
        )}

        <div className='wishlist' onClick={navigateToWishlist}>
          <CiHeart />
        </div>
        <div className='cart' onClick={navigateToCart}>
          <CiShoppingCart />
        </div>
        <div className='account' onClick={showDropdown}>
          <CiUser />
          {isShow && (
            <ul className='dropdown'>
              {isLoggedIn ? (
                <>
                  <li>
                    <Link to='/myaccount/profile'>
                      <CiUser /> My Account
                    </Link>
                  </li>
                  <li>
                    <Link to='/myaccount/orders'>
                      <CiBoxes /> My Orders
                    </Link>
                  </li>
                  <li onClick={handleLogout}>
                    <Link>
                      <CiLogout /> Logout
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to='/login'>
                      <CiLogin /> Login
                    </Link>
                  </li>
                  <li>
                    <Link to='/signup'>
                      <CiUser /> Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          )}
        </div>
      </div>

      {/* <ToastContainer /> */}
    </nav>
  )
}

export default Navbar
