import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CiSearch,
  CiHeart,
  CiShoppingCart,
  CiUser,
  CiLogout
} from 'react-icons/ci'
import '../assets/styles/Navbar.css'
import { LuShoppingBag } from 'react-icons/lu'
import { MdOutlineCancel } from 'react-icons/md'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false) // Track whether the menu is open or closed
  const [isShow, setIsShow] = useState(false)
  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen) // Toggle the menu state
  }

  const showDropdown = () => {
    setIsShow(!isShow)
  }

  const handleNavigate = () => {
    navigate('/')
  }

  const [selectedLink, setSelectedLink] = useState('home') // Default selected link

  // Function to handle selected link
  const handleLinkClick = link => {
    setSelectedLink(link) // Set selected link
  }

  const [dropdownselectedLink, setDropdownSelectedLink] = useState('')

  const handleDropdownClick = link => {
    setDropdownSelectedLink(link)
  }

  return (
    <nav>
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
        <div className='searchbar'>
          <input type='text' placeholder='What are you looking for?' />
          <CiSearch />
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

      {/* Hamburger Button */}
      <div className='hamburger' onClick={toggleMenu}>
        <div className='bar'></div>
        <div className='bar'></div>
        <div className='bar'></div>
      </div>
    </nav>
  )
}

export default Navbar
