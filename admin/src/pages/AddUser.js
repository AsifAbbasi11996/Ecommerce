import React, { useState } from 'react'
import { createUser } from '../api/userApi' // Adjust based on your file structure
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { MdKeyboardDoubleArrowRight } from 'react-icons/md'
import '../assets/styles/AddProduct.css'

const AddUser = () => {
  // State to manage form data
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    image: null
  })

  // Handle input field changes
  const handleChange = e => {
    const { name, value } = e.target
    setUserData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  // Handle file upload change
  const handleFileChange = e => {
    setUserData(prevData => ({
      ...prevData,
      image: e.target.files[0]
    }))
  }

  // Handle form submission
  const handleSubmit = async e => {
    e.preventDefault()

    // Validate if passwords match
    if (userData.password !== userData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    // Prepare FormData to send the request
    const formData = new FormData()
    Object.keys(userData).forEach(key => {
      formData.append(key, userData[key])
    })

    try {
      // Call the API to create a user
      const response = await createUser(formData)
      console.log(response)
      if (response.message === 'User created successfully') {
        toast.success('User created successfully')
      }
    } catch (error) {
      toast.error('Failed to create user')
    }
  }

  return (
    <div className='add-user'>
      <div className='head'>
        <p>Users</p>
        <MdKeyboardDoubleArrowRight />
        <p>Add User</p>
      </div>
      <h2>Add New User</h2>

      <form onSubmit={handleSubmit}>
        <div className='two'>
          <div className='form-group'>
            <label>First Name</label>
            <input
              type='text'
              name='firstName'
              value={userData.firstName}
              onChange={handleChange}
              placeholder='Enter First Name'
              required
            />
          </div>
          <div className='form-group'>
            <label>Last Name</label>
            <input
              type='text'
              name='lastName'
              value={userData.lastName}
              onChange={handleChange}
              placeholder='Enter Last Name'
              required
            />
          </div>
        </div>

        <div className='two'>
          <div className='form-group'>
            <label>Email</label>
            <input
              type='email'
              name='email'
              value={userData.email}
              onChange={handleChange}
              placeholder='Enter email'
              required
            />
          </div>

          <div className='form-group'>
            <label>Phone</label>
            <input
              type='text'
              name='phone'
              value={userData.phone}
              onChange={handleChange}
              placeholder='Enter phone number'
              required
            />
          </div>
        </div>

        <div className='two'>
          <div className='form-group'>
            <label>Password</label>
            <input
              type='password'
              name='password'
              value={userData.password}
              onChange={handleChange}
              placeholder='Enter password'
              required
            />
          </div>

          <div className='form-group'>
            <label>Confirm Password</label>
            <input
              type='password'
              name='confirmPassword'
              value={userData.confirmPassword}
              onChange={handleChange}
              placeholder='Confirm password'
              required
            />
          </div>
        </div>

        <div className='form-group'>
          <label>Profile Image</label>
          <input
            type='file'
            name='image'
            onChange={handleFileChange}
            accept='image/*'
          />
        </div>

        <button type='submit' className='btn-submit'>
          Create User
        </button>
      </form>

      <ToastContainer className='custom-toast-container' />
    </div>
  )
}

export default AddUser
