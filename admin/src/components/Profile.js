import React, { useState, useEffect } from 'react'
import '../assets/styles/Profile.css'
import { getUserById, updateUserById } from '../api/adminUserApi'
import user from '../assets/images/user.webp'
import { formatImageUrl } from '../utils/formatImageUrl'

const Profile = () => {
  const [userData, setUserData] = useState({
    name: '',
    username: '',
    email: '',
    image: null
  })
  const [isEditing, setIsEditing] = useState(false) // To toggle edit mode
  const [imagePreview, setImagePreview] = useState(null) // For displaying selected image
  const [loading, setLoading] = useState(true)

  const userId = localStorage.getItem('userId') // Get logged-in user ID from localStorage

  // Fetch user data from the backend on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserById(userId) // Fetch data using the API
        setUserData({
          name: data.user.name,
          username: data.user.username,
          email: data.user.email,
          image: data.user.image || user // Fallback image if no image is provided
        })
        setImagePreview(data.user.image || user) // Show image from data
        setLoading(false)
      } catch (error) {
        console.error('Error fetching user data:', error)
        setLoading(false)
      }
    }
    fetchUserData()
  }, [userId])

  // Handle input change for editing
  const handleChange = e => {
    const { name, value } = e.target
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  // Handle image selection
  const handleImageChange = e => {
    const file = e.target.files[0]
    if (file) {
      setUserData(prevState => ({
        ...prevState,
        image: file
      }))
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result) // Preview the selected image
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle form submission (update user data)
  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)

    try {
      const updatedUser = await updateUserById(userId, userData) // Update user data via API
      setUserData(updatedUser) // Update userData state with the new data
      setImagePreview(updatedUser.image || user) // Update image preview after save
      setIsEditing(false) // Toggle off edit mode after saving
      setLoading(false)
    } catch (error) {
      console.error('Error updating user data:', error)
      setLoading(false)
    }
  }

  // Handle toggle edit mode
  const toggleEditMode = () => {
    setIsEditing(!isEditing)
  }

  // Helper function to handle missing image URL
  const getImageUrl = image => {
    return image ? formatImageUrl(image) : user // If no image, use the fallback image
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className='profile_container'>
      <h2>My Profile</h2>
      <div className='profile-info'>
        <div className='profile-picture'>
          {/* Display the current image if not editing, otherwise show the image preview */}
          <img
            src={isEditing ? imagePreview : getImageUrl(userData.image)}
            alt='Profile Picture'
            width='150'
            height='150'
            style={{ borderRadius: '50%' }}
          />
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className='profile-form'>
            <div className='form-group'>
              <label>Name</label>
              <input
                type='text'
                name='name'
                value={userData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className='form-group'>
              <label>Username</label>
              <input
                type='text'
                name='username'
                value={userData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className='form-group'>
              <label>Email</label>
              <input
                type='email'
                name='email'
                value={userData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className='form-group'>
              <label>Profile Image</label>
              <input
                type='file'
                name='image'
                accept='image/*'
                onChange={handleImageChange}
              />
            </div>
            <button type='submit' disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        ) : (
          <div className='profile-details'>
            <p>
              <strong>Name:</strong> {userData.name}
            </p>
            <p>
              <strong>Username:</strong> {userData.username}
            </p>
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
            <button onClick={toggleEditMode}>Edit Profile</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile
