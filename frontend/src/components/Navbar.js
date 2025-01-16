import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CiSearch,
  CiHeart,
  CiShoppingCart,
  CiUser,
  CiLogout,
  CiMenuFries
} from 'react-icons/ci'
import '../assets/styles/Navbar.css'
import { getAllNavbar } from '../api/navbarApi'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Navbar = () => {
  const [navbar, setNavbar] = useState([])
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isShow, setIsShow] = useState(false)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  const [searchTerm, setSearchTerm] = useState('')
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
  }, [])

  const handleResize = () => {
    setScreenWidth(window.innerWidth)
  }

  useEffect(() => {
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
      autoClose: 5000,
      hideProgressBar: false,
      draggable: false
    })

    setTimeout(() => {
      navigate('/login')
    }, 2000)
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

        <Link to='/signup'>Sign Up</Link>
      </div>

      <div className='right'>
        <div className='searchbar'>
          <input
            type='text'
            placeholder='What are you looking for?'
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleKeyPress} // Listen for Enter key press
          />
          <CiSearch onClick={handleSearchSubmit} />
        </div>

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
              <li onClick={handleLogout}>
                <CiLogout /> Logout
              </li>
            </ul>
          )}
        </div>
      </div>

      <ToastContainer />
    </nav>
  )
}

export default Navbar
