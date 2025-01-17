import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../api/userApi.js' // Assuming you have an api file with loginUser function
import '../assets/styles/Signup.css' // Include your CSS file for styling
import { ToastContainer, toast } from 'react-toastify' // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css' // Import toast styles
import image from '../assets/images/cart_phone.jpeg'

const Login = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [formData, setFormData] = useState({
    phoneOrEmail: '',
    password: ''
  })
  const [pending, setPending] = useState(false) // For loading state
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setPending(true) // Set loading state when submitting the form

    // Validate if username/email and password are provided
    if (!formData.phoneOrEmail || !formData.password) {
      // If fields are empty, show an error toast
      toast.error('Please fill in all fields.', {
        position: 'top-right', // Position the toast at the top-right
        autoClose: 5000, // Duration the toast stays visible
        hideProgressBar: false, // Hide progress bar
        draggable: false // Make the toast non-draggable
      })
      setPending(false) // Reset pending state
      return
    }

    try {
      // Call the loginUser function to submit form data to the backend
      const response = await loginUser(formData)
      const { token, userId, firstName, lastName } = response
      localStorage.setItem('userId', userId)
      localStorage.setItem('firstName', firstName)
      localStorage.setItem('lastName', lastName)
      // If login is successful, store the JWT token
      localStorage.setItem('token', token) // You can also store in cookies or sessionStorage

      // Display success toast message
      toast.success('Successfully logged in!', {
        position: 'top-right', // Position the toast at the top-right
        autoClose: 1000, // Duration the toast stays visible
        hideProgressBar: true, // Hide progress bar
        draggable: false // Make the toast non-draggable
      })

      // Wait for 3 seconds before navigating
      setTimeout(() => {
        navigate('/')
      }, 2000) // 3 seconds delay before navigating to the home page
    } catch (error) {
      // If an error occurs during login
      console.error('Error logging in:', error)

      // Show error toast for invalid credentials or other errors
      toast.error('Invalid phone/email or password. Please try again.', {
        position: 'top-right', // Position the toast at the top-right
        autoClose: 5000, // Duration the toast stays visible
        hideProgressBar: true, // Hide progress bar
        draggable: false // Make the toast non-draggable
      })
    } finally {
      setPending(false) // Reset loading state
    }
  }

  return (
    <div className='main_login'>
      <div className='image'>
        <img src={image} />
      </div>
      <div className='login_container'>
        <div className='header'>
          <h1>Log in to Exclusive</h1>
          <p>Enter your details below</p>
        </div>
        <form className='login-form' onSubmit={handleSubmit}>
          <div className='form-group'>
            <input
              type='text'
              id='phoneOrEmail'
              name='phoneOrEmail'
              value={formData.phoneOrEmail}
              onChange={handleChange}
              required
              placeholder='Email or Phone Number'
            />
          </div>

          <div className='form-group password'>
            <input
              type={showPassword ? 'text' : 'password'}
              id='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              required
              placeholder='Password'
            />
          </div>
          <p className='show_password'>
            <input
              type='checkbox'
              id='check'
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label htmlFor='check'>Show Password</label>
          </p>

          <p className='forgot_password'>
            <Link>Forgot Password ?</Link>
          </p>

          <button type='submit' disabled={pending}>
            {pending ? 'Logging in...' : 'Login'}
          </button>

          <p>
            Don't have an account ? <Link to='/signup'>Signup</Link>{' '}
          </p>
        </form>
      </div>

      {/* ToastContainer is required to display toast messages */}
      <ToastContainer />
    </div>
  )
}

export default Login
