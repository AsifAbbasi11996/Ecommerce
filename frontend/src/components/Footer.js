import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import '../assets/styles/Footer.css'

const Footer = () => {
  return (
    <div className='footer_container'>
      <div className='footer_content'>
        <div className='list'>
          <h2>Exclusive</h2>
          <p>Subscribe</p>
          <div className='social_icons'>
            <Link>
              <FaFacebook />
            </Link>
            <Link>
              <FaXTwitter />
            </Link>
            <Link>
              <FaInstagram />
            </Link>
            <Link>
              <FaLinkedin />
            </Link>
          </div>
        </div>
        <div className='list'>
          <h3>Support</h3>
          <p>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</p>
          <p>exclusive@gmail.com</p>
          <p>+88015-88888-9999</p>
        </div>
        <div className='list'>
          <h3>Account</h3>
          <ul>
            <li>
              <Link to='/myaccount/profile'>My Account</Link>
            </li>
            <li>
              <Link to='/login'>Login</Link> / <Link to='/signup'>Register</Link>
            </li>
            <li>
              <Link to='/cart'>Cart</Link>
            </li>
            <li>
              <Link to='/wishlist'>Wishlist</Link>
            </li>
            <li>
              <Link to='/'>Shop</Link>
            </li>
          </ul>
        </div>
        <div className='list'>
          <h3>Quick Link</h3>
          <ul>
            <li>
              <Link to='privacy'>Privacy</Link>
            </li>
            <li>
              <Link to='/terms'>Terms Of Use</Link>
            </li>
            <li>
              <Link to='/faq'>FAQ</Link>
            </li>
            <li>
              <Link to='/contact'>Contact</Link>
            </li>
          </ul>
        </div>
      </div>

      <hr />

      <div className='footer_bottom'>
        <p>&copy; Copyright Exclusive 2024, All right reserved</p>
      </div>
    </div>
  )
}

export default Footer
