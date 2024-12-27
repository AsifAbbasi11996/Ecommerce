import React, { useState, useEffect, useRef } from 'react'
import { FaUserCircle, FaBell, FaCog } from 'react-icons/fa' // Font Awesome Icons
import '../assets/styles/Navbar.css' // Your custom CSS for styling
import { useNavigate } from 'react-router-dom' // Import the useNavigate hook for redirection
import { toast } from 'react-toastify' // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css' // Import toast styles

const Navbar = () => {
  const [show, setShow] = useState(false) // To control dropdown visibility
  const profileRef = useRef(null) // Reference to profile icon dropdown container
  const dropdownRef = useRef(null) // Reference to the dropdown itself
  const navigate = useNavigate() // Hook to navigate programmatically

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setShow(!show)
  }

  // Handle logout
  const handleLogout = () => {
    // Clear authentication token from localStorage
    localStorage.removeItem('authToken')

    // Optionally, clear other relevant user data (sessionStorage, cookies, etc.)
    // sessionStorage.removeItem("userSession");

    // Show toast for successful logout (optional)
    toast.success('Logged out successfully!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: true,
      draggable: false
    })

    // Redirect user to login page after logout
    navigate('/login')
  }

  // Close dropdown when clicking outside of the profile section
  useEffect(() => {
    const handleClickOutside = event => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShow(false) // Close dropdown if clicked outside
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside) // Cleanup
    }
  }, [])

  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        {/* Logo Section */}
        <div className='logo'>
          <span className='logo-text'>Exclusive</span> {/* Branding Text */}
        </div>

        {/* Right Side - User Profile and Notifications */}
        <div className='navbar-actions'>
          <button className='notification-btn'>
            <FaBell />
          </button>
          <button className='settings-btn'>
            <FaCog />
          </button>

          {/* Profile Section with Dropdown */}
          <div className='profile' onClick={toggleDropdown} ref={profileRef}>
            <FaUserCircle className='profile-icon' />
            {show && (
              <div className='profile-dropdown' ref={dropdownRef}>
                <ul>
                  <li>
                    <a href='/profile' className='dropdown-link'>
                      Profile
                    </a>
                  </li>
                  <li>
                    <button onClick={handleLogout} className='dropdown-link'>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
