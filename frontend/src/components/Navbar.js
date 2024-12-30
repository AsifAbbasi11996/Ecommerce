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

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false) // Track whether the menu is open or closed
  const [isShow, setIsShow] = useState(false)
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false) // Track if the search bar outside is open
  const [screenWidth, setScreenWidth] = useState(window.innerWidth) // Track the screen width
  const [searchTerm, setSearchTerm] = useState('') // State for the search term
  const [products, setProducts] = useState([]) // State to store fetched products
  const [suggestions, setSuggestions] = useState([]) // State to store filtered suggestions
  const navigate = useNavigate()

  // Fetch all products from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllItems() // Fetch items from the API
        setProducts(response) // Set the fetched products
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
    if (screenWidth <= 768) {
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
    setSuggestions(filteredSuggestions) // Update the suggestions state
  }

  const handleClose = () => {
    setSuggestions(false)
    
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
          to='/'
          className={selectedLink === 'home' ? 'active' : ''}
          onClick={() => handleLinkClick('home')}
        >
          Home
        </Link>
        <Link
          to='/contact'
          className={selectedLink === 'contact' ? 'active' : ''}
          onClick={() => handleLinkClick('contact')}
        >
          Contact
        </Link>
        <Link
          to='/about'
          className={selectedLink === 'about' ? 'active' : ''}
          onClick={() => handleLinkClick('about')}
        >
          About
        </Link>
        <Link
          to='/signup'
          className={selectedLink === 'signup' ? 'active' : ''}
          onClick={() => handleLinkClick('signup')}
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
            onChange={handleSearchChange} // Handle search input change
          />
          <CiSearch />

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
        </div>
        <div className='wishlist'>
          <CiHeart />
        </div>
        <div className='cart'>
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
              <li>
                <Link>
                  <CiLogout /> Logout
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>

      {isSearchBarOpen && screenWidth <= 768 && (
        <div className='search_bar'>
          <input type='text' placeholder='What are you looking for?' />
        </div>
      )}
    </nav>
  )
}

export default Navbar
