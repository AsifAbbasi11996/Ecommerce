import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { createUser } from '../api/userApi.js' // Assuming createUser is in a file under the api folder
import '../assets/styles/Signup.css' // Include your CSS file for styling
import { ToastContainer, toast } from 'react-toastify' // Importing ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css' // Importing Toastify CSS styles
import image from '../assets/images/cart_phone.jpeg'

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })

  const [pending, setPending] = useState(false) // For the loading state
  const [showPassword, setShowPassword] = useState(false)
  const [showconfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState(null) // State for any error message

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setPending(true) // Set pending to true when submitting the form
    setError(null) // Reset any previous errors

    try {
      // Call createUser to submit form data to the backend
      const response = await createUser(formData)
      console.log('User created:', response)

      // Show success toast
      toast.success('User created successfully!', {
        position: 'top-right', // Position at the top-right corner
        autoClose: 3000, // Toast stays for 3 seconds
        hideProgressBar: true, // Hide the progress bar
        draggable: false // Disable dragging
      })
    } catch (error) {
      console.error('Error creating user:', error)

      // Show error toast
      toast.error('Error creating user. Please try again.', {
        position: 'top-right', // Position at the top-right corner
        autoClose: 3000, // Toast stays for 3 seconds
        hideProgressBar: true, // Hide the progress bar
        draggable: false // Disable dragging
      })
    } finally {
      setPending(false) // Reset pending state after the request is completed
    }
  }

  return (
    <div className='main_signup'>
      <div className='image'>
        <img src={image} />
      </div>
      <div className='signup_container'>
        <div className='header'>
          <h1>Create an account</h1>
          <p>Enter your details below</p>
        </div>
        <form className='signup-form' onSubmit={handleSubmit}>
          <div className='two'>
            <div className='form-group'>
              <input
                type='text'
                id='firstName'
                name='firstName'
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder='First Name'
              />
            </div>

            <div className='form-group'>
              <input
                type='text'
                id='lastName'
                name='lastName'
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder='Last Name'
              />
            </div>
          </div>

          <div className='form-group'>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
              placeholder='Email'
            />
          </div>

          <div className='form-group'>
            <input
              type='text'
              id='phone'
              name='phone'
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder='Phone'
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

          <div className='form-group confirmPassword'>
            <input
              type={showconfirmPassword ? 'text' : 'password'}
              id='confirmPassword'
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder='Confirm Password'
            />
          </div>
          <p className='show_password'>
            <input
              type='checkbox'
              id='checkconfirm'
              checked={showconfirmPassword}
              onChange={() => setShowConfirmPassword(!showconfirmPassword)}
            />
            <label htmlFor='checkconfirm'>Show Confirm Password</label>
          </p>

          <button type='submit' disabled={pending}>
            {pending ? 'Creating...' : 'Create Account'}
          </button>

          {/* Displaying error message below the form */}
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <p>
            Already have an account ? <Link to='/login'>Login</Link>
          </p>
        </form>
      </div>

      {/* ToastContainer for displaying toast notifications */}
      <ToastContainer />
    </div>
  )
}

export default Signup
