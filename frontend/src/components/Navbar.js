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
import { LuShoppingBag } from 'react-icons/lu'
import { MdOutlineCancel } from 'react-icons/md'
import { getAllItems } from '../api/itemApi'
import { ToastContainer, toast } from 'react-toastify' // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css' // Import toast styles

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isShow, setIsShow] = useState(false)
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  const [searchTerm, setSearchTerm] = useState('')
  const [products, setProducts] = useState([])
  const [suggestions, setSuggestions] = useState([])
  const navigate = useNavigate()

  // Fetch all products from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllItems()
        setProducts(response)
      } catch (error) {
        console.error('Error fetching the items:', error.message)
      }
    }

    fetchData()
  }, [])

  // Function to update the screen width state on window resize
  const handleResize = () => {
    setScreenWidth(window.innerWidth)
  }

  useEffect(() => {
    // Attach resize event listener
    window.addEventListener('resize', handleResize)

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Function to toggle the menu open or close
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Function to show the dropdown menu for the account
  const showDropdown = () => {
    setIsShow(!isShow)
  }

  // Function to handle navigation to home
  const handleNavigate = () => {
    navigate('/')
  }

  // Function to handle selected link
  const [selectedLink, setSelectedLink] = useState('home')

  const handleLinkClick = link => {
    setSelectedLink(link)
  }

  const [dropdownselectedLink, setDropdownSelectedLink] = useState('')

  const handleDropdownClick = link => {
    setDropdownSelectedLink(link)
  }

  // Function to toggle the search bar visibility outside
  const toggleSearchBarOutside = () => {
    if (screenWidth <= 946) {
      setIsSearchBarOpen(!isSearchBarOpen)
    }
  }

  // Function to handle the search term change and filter suggestions
  const handleSearchChange = event => {
    const query = event.target.value
    setSearchTerm(query)

    // Filter suggestions based on the search term
    const filteredSuggestions = products.filter(product => {
      return (
        product.itemName.toLowerCase().includes(query.toLowerCase()) ||
        product.brand.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      )
    })
    setSuggestions(filteredSuggestions)
  }

  // Function to handle logout
  const handleLogout = () => {
    // Clear all credentials from localStorage
    localStorage.removeItem('userId')
    localStorage.removeItem('firstName')
    localStorage.removeItem('lastName')
    localStorage.removeItem('token')

    // Show toast message after logout
    toast.success('Logged out successfully!', {
      position: 'top-right', // Position at the top-right
      autoClose: 5000, // Duration of 5 seconds
      hideProgressBar: false, // Hide the progress bar
      draggable: false // Non-draggable
    })

    // Optionally, navigate to the login page after logout
    setTimeout(() => {
      navigate('/login')
    }, 2000) // Adding a slight delay before navigation
  }

  const handleClose = () => {
    setSuggestions(false)
  }

  const navigateToWishlist = () => {
    navigate('/wishlist')
  }

  const navigteToCart = () => {
    navigate('/cart')
  }

  const handleNavlinkClose = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav>
      {/* Hamburger Button */}
      <div className='hamburger' onClick={toggleMenu}>
        <CiMenuFries />
      </div>

      <div className='logo' onClick={handleNavigate}>
        Exclusive
      </div>

      <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <Link
          to='/kitchens'
          className={selectedLink === 'kitchens' ? 'active' : ''}
          onClick={() => {
            handleLinkClick('kitchens')
            handleNavlinkClose()
          }}
        >
          Kitchens
        </Link>
        <Link
          to='/electronics'
          className={selectedLink === 'electronics' ? 'active' : ''}
          onClick={() => {
            handleLinkClick('electronics')
            handleNavlinkClose()
          }}
        >
          Electronics
        </Link>
        <Link
          to='/bags'
          className={selectedLink === 'bags' ? 'active' : ''}
          onClick={() => {
            handleLinkClick('bags')
            handleNavlinkClose()
          }}
        >
          Bags
        </Link>
        <Link
          to='/signup'
          className={selectedLink === 'signup' ? 'active' : ''}
          onClick={() => {
            handleLinkClick('signup')
            handleNavlinkClose()
          }}
        >
          Sign Up
        </Link>
      </div>

      <div className='right'>
        <div className='searchbar' onClick={toggleSearchBarOutside}>
          <input
            type='text'
            placeholder='What are you looking for?'
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <CiSearch />
        </div>
        <div className='wishlist' onClick={navigateToWishlist}>
          <CiHeart />
        </div>
        <div className='cart' onClick={navigteToCart}>
          <CiShoppingCart />
        </div>
        <div className='account' onClick={showDropdown}>
          <CiUser />

          {isShow && (
            <ul className='dropdown'>
              <li>
                <Link
                  to='/myaccount'
                  className={
                    dropdownselectedLink === 'myaccount' ? 'active' : ''
                  }
                  onClick={() => handleDropdownClick('myaccount')}
                >
                  <CiUser /> Manage My Account
                </Link>
              </li>
              <li>
                <Link
                  to='/myorder'
                  className={dropdownselectedLink === 'myorder' ? 'active' : ''}
                  onClick={() => handleDropdownClick('myorder')}
                >
                  <LuShoppingBag /> My Order
                </Link>
              </li>
              <li>
                <Link
                  to='/mycancellations'
                  className={
                    dropdownselectedLink === 'mycancellations' ? 'active' : ''
                  }
                  onClick={() => handleDropdownClick('mycancellations')}
                >
                  <MdOutlineCancel />
                  My Cancellations
                </Link>
              </li>
              <li onClick={handleLogout}>
                <Link>
                  <CiLogout /> Logout
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>

      {isSearchBarOpen && screenWidth <= 946 && (
        <div className='search_bar'>
          <input
            type='text'
            placeholder='What are you looking for?'
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      )}

      {/* Suggestions */}
      {searchTerm && suggestions.length > 0 && (
        <div className='suggestions'>
          {suggestions.map(product => (
            <Link to={`/v/${product._id}`} onClick={handleClose}>
              <div key={product._id} className='suggestion-item'>
                <p>{product.itemName}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* ToastContainer to display toast messages */}
      <ToastContainer />
    </nav>
  )
}

export default Navbar
