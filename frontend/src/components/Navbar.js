import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CiSearch, CiHeart, CiShoppingCart } from 'react-icons/ci'
import '../assets/styles/Navbar.css'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false) // Track whether the menu is open or closed

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen) // Toggle the menu state
  }

  return (
    <nav>
      <div className='logo'>Exclusive</div>

      <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <Link to='/'>Home</Link>
        <Link to='/contact'>Contact</Link>
        <Link to='/about'>About</Link>
        <Link to='/signup'>Sign Up</Link>
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
