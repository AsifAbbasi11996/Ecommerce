import React, { useEffect, useState } from 'react'
import { getUserById, updatePassword, updateUserById } from '../api/userApi' // Import the API
import '../assets/styles/MyProfile.css'
import { ToastContainer, toast } from 'react-toastify' // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css' // Import toast styles
import Loader from './Loader'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const MyProfile = () => {
  const userId = localStorage.getItem('userId') // Get the userId from localStorage
  const [userData, setUserData] = useState(null) // Store fetched user data
  const [initialUserData, setInitialUserData] = useState(null) // Store initial user data to reset form
  const [updatedData, setUpdatedData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  }) // Store form data (user changes)

  const [passwordVisibility, setPasswordVisibility] = useState({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false
  }) // State to manage visibility of passwords

  const [loading, setLoading] = useState(true) // Loading state while fetching data
  const [error, setError] = useState(null) // Error handling

  useEffect(() => {
    // If no userId found, return early and show message
    if (!userId) {
      setLoading(false)
      return
    }

    const fetchUserData = async () => {
      try {
        const data = await getUserById(userId) // Fetch user data by ID
        setUserData(data) // Set the fetched data
        setInitialUserData(data) // Store the initial user data
        setUpdatedData({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: ''
        })
        setLoading(false) // Set loading to false when data is fetched
      } catch (error) {
        setError('Error fetching user data')
        console.error('Error fetching user data:', error)
        setLoading(false) // Set loading to false in case of an error
      }
    }

    fetchUserData()
  }, [userId]) // Only re-run if userId changes

  // Handle form input changes
  const handleChange = e => {
    const { name, value } = e.target
    setUpdatedData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  // Handle form submission to update user data
  const handleSubmit = async e => {
    e.preventDefault() // Prevent page reload on form submit

    // Prepare the data to be sent to the API
    const updatedUser = {
      firstName: updatedData.firstName,
      lastName: updatedData.lastName,
      email: updatedData.email,
      phone: updatedData.phone
    }

    // Check if password fields are filled and need to be updated
    if (updatedData.newPassword && updatedData.confirmNewPassword) {
      // Ensure passwords match
      if (updatedData.newPassword !== updatedData.confirmNewPassword) {
        toast.error('New passwords do not match', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          draggable: false
        })
        return
      }

      // Proceed to update the password
      try {
        const passwordResponse = await updatePassword(userId, {
          currentPassword: updatedData.currentPassword,
          newPassword: updatedData.newPassword,
          confirmNewPassword: updatedData.confirmNewPassword
        })
        // If the backend sends a success message, show it using toast
        toast.success(
          passwordResponse.message || 'Password updated successfully!',
          {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            draggable: false
          }
        )
      } catch (error) {
        // If the backend returns a message in the error response, display it
        const errorMessage =
          error?.response?.data?.message || 'Error updating password'
        toast.error(errorMessage, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          draggable: false
        })
      }
    }

    // If no password change, update user profile only
    if (
      !updatedData.currentPassword &&
      !updatedData.newPassword &&
      !updatedData.confirmNewPassword
    ) {
      try {
        const updatedUserData = await updateUserById(userId, updatedUser) // Call the API to update user data
        setUserData(updatedUserData) // Update the local state with the new user data
        toast.success('Profile updated successfully!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          draggable: false
        })
      } catch (error) {
        // If the backend returns a message in the error response, display it
        const errorMessage =
          error?.response?.data?.message || 'Failed to update profile'
        toast.error(errorMessage, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          draggable: false
        })
        setError(errorMessage) // Optionally set an error state for displaying an error in the UI
        console.error('Error updating profile:', error)
      }
    }
  }

  // Handle cancel action: Reset the form to the initial data
  const handleCancel = () => {
    if (initialUserData) {
      setUpdatedData({
        firstName: initialUserData.firstName,
        lastName: initialUserData.lastName,
        email: initialUserData.email,
        phone: initialUserData.phone,
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      })
    }
  }

  // Toggle password visibility
  const togglePasswordVisibility = field => {
    setPasswordVisibility(prevState => ({
      ...prevState,
      [field]: !prevState[field]
    }))
  }

  // Loading state: Show a loading message until the user data is fetched
  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    )
  }

  // If no userId is found, display a message
  if (!userId) {
    return (
      <div className='no-user-message'>
        <p>No user data available. Please log in.</p>
        <Link to='/login'>Click here to Login</Link>
      </div>
    )
  }

  // If there's an error, display an error message
  if (error) {
    return <div>{error}</div>
  }

  return (
    <>
      <form className='editprofile' onSubmit={handleSubmit}>
        <p>Edit Your Profile</p>

        {/* Display any errors */}
        {error && <p className='error'>{error}</p>}

        <div className='two'>
          <div className='form-group'>
            <label>First Name</label>
            <input
              type='text'
              name='firstName'
              value={updatedData.firstName} // Bind the value to updatedData
              onChange={handleChange} // Update state when input changes
              placeholder='First Name'
            />
          </div>
          <div className='form-group'>
            <label>Last Name</label>
            <input
              type='text'
              name='lastName'
              value={updatedData.lastName} // Bind the value to updatedData
              onChange={handleChange} // Update state when input changes
              placeholder='Last Name'
            />
          </div>
        </div>

        <div className='two'>
          <div className='form-group'>
            <label>Email</label>
            <input
              type='email'
              name='email'
              value={updatedData.email} // Bind the value to updatedData
              onChange={handleChange} // Update state when input changes
              placeholder='Email'
            />
          </div>
          <div className='form-group'>
            <label>Phone</label>
            <input
              type='text'
              name='phone'
              value={updatedData.phone} // Bind the value to updatedData
              onChange={handleChange} // Update state when input changes
              placeholder='Phone'
            />
          </div>
        </div>

        <div className='form-group'>
          <label>Password Changes</label>
          <div className='password'>
            <input
              type={passwordVisibility.currentPassword ? 'text' : 'password'}
              name='currentPassword'
              value={updatedData.currentPassword}
              onChange={handleChange} // Update state when input changes
              placeholder='Current Password'
            />
            {passwordVisibility.currentPassword ? (
              <AiFillEyeInvisible
                onClick={() => togglePasswordVisibility('currentPassword')}
              />
            ) : (
              <AiFillEye
                onClick={() => togglePasswordVisibility('currentPassword')}
              />
            )}
          </div>
          <div className='password'>
            <input
              type={passwordVisibility.newPassword ? 'text' : 'password'}
              name='newPassword'
              value={updatedData.newPassword}
              onChange={handleChange} // Update state when input changes
              placeholder='New Password'
            />
            {passwordVisibility.newPassword ? (
              <AiFillEyeInvisible
                onClick={() => togglePasswordVisibility('newPassword')}
              />
            ) : (
              <AiFillEye
                onClick={() => togglePasswordVisibility('newPassword')}
              />
            )}
          </div>
          <div className='password'>
            <input
              type={passwordVisibility.confirmNewPassword ? 'text' : 'password'}
              name='confirmNewPassword'
              value={updatedData.confirmNewPassword}
              onChange={handleChange} // Update state when input changes
              placeholder='Confirm New Password'
            />
            {passwordVisibility.confirmNewPassword ? (
              <AiFillEyeInvisible
                onClick={() => togglePasswordVisibility('confirmNewPassword')}
              />
            ) : (
              <AiFillEye
                onClick={() => togglePasswordVisibility('confirmNewPassword')}
              />
            )}
          </div>
        </div>

        <div className='btns'>
          <button type='button' onClick={handleCancel}>
            Cancel
          </button>
          <button type='submit' className='save' disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
      <ToastContainer />
    </>
  )
}

export default MyProfile
