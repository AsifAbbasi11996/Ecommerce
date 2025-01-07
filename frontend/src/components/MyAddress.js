import React, { useState, useEffect } from 'react'
import '../assets/styles/MyProfile.css'
import {
  getAddressByUserId,
  updateAddress,
  addAddress
} from '../api/addressApi'
import { BsPencilFill } from 'react-icons/bs'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const MyAddress = () => {
  const userId = localStorage.getItem('userId')
  const [loading, setLoading] = useState(true)
  const [addressId, setAddressId] = useState(null)
  const [addressData, setAddressData] = useState({
    fullName: '',
    street: '',
    apartment: '',
    city: '',
    pincode: '',
    phone: '',
    email: ''
  })
  const [isEditing, setIsEditing] = useState(false) // Flag to toggle between view and edit modes

  // Fetch address data when the component mounts or userId changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAddressByUserId(userId)
        if (data && data.length > 0) {
          const address = data[0] // Assuming the first address is what we need
          setAddressId(address._id)
          setAddressData({
            fullName: address.fullName,
            street: address.street,
            apartment: address.apartment,
            city: address.city,
            pincode: address.pincode,
            phone: address.phone,
            email: address.email
          })
        }
        setLoading(false)
      } catch (error) {
        console.error('Error fetching address data:', error)
        setLoading(false)
      }
    }

    fetchData()
  }, [userId])

  const handleChange = e => {
    const { name, value } = e.target
    setAddressData({
      ...addressData,
      [name]: value
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)

    const updatedData = { ...addressData, userId }

    try {
      if (addressId) {
        // Update address
        await updateAddress(addressId, updatedData)
        toast.success('Address updated successfully!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          draggable: false
        })
      } else {
        // Add new address
        await addAddress(updatedData)
        toast.success('Address added successfully!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          draggable: false
        })
      }
      setIsEditing(false) // Switch to view mode after saving
      setLoading(false)
    } catch (error) {
      console.error('Error saving address:', error)
      setLoading(false)
    }
  }

  return (
    <>
      <div className='address'>
        <div className='header'>
          <p>Address</p>
          <button
            type='button'
            onClick={() => setIsEditing(true)} // Open form when Edit is clicked
          >
            <BsPencilFill /> Edit Address
          </button>
        </div>

        {/* If there is address data, show details or show form if no address exists */}
        {addressData.fullName ? (
          // Display the address details if addressData is populated
          !isEditing ? (
            <div className='address-details'>
              <div>
                <p>
                  <strong>Full Name:</strong> {addressData.fullName}
                </p>
                <p>
                  <strong>Street:</strong> {addressData.street}
                </p>
                <p>
                  <strong>Apartment:</strong> {addressData.apartment}
                </p>
                <p>
                  <strong>City:</strong> {addressData.city}
                </p>
                <p>
                  <strong>Pincode:</strong> {addressData.pincode}
                </p>
                <p>
                  <strong>Phone:</strong> {addressData.phone}
                </p>
                <p>
                  <strong>Email:</strong> {addressData.email}
                </p>
              </div>
            </div>
          ) : (
            // Show form if editing
            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <label>Full Name</label>
                <input
                  type='text'
                  name='fullName'
                  value={addressData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='form-group'>
                <label>Street Address</label>
                <input
                  type='text'
                  name='street'
                  value={addressData.street}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='form-group'>
                <label>Apartment, Floor, etc.</label>
                <input
                  type='text'
                  name='apartment'
                  value={addressData.apartment}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label>Town/City</label>
                <input
                  type='text'
                  name='city'
                  value={addressData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='form-group'>
                <label>Pincode</label>
                <input
                  type='text'
                  name='pincode'
                  value={addressData.pincode}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='form-group'>
                <label>Phone Number</label>
                <input
                  type='text'
                  name='phone'
                  value={addressData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='form-group'>
                <label>Email Address</label>
                <input
                  type='text'
                  name='email'
                  value={addressData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className='btns'>
                <button type='button' onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
                <button type='submit' disabled={loading}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          )
        ) : (
          // Always show the form if no address exists (and allow for adding a new one)
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label>Full Name</label>
              <input
                type='text'
                name='fullName'
                value={addressData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div className='form-group'>
              <label>Street Address</label>
              <input
                type='text'
                name='street'
                value={addressData.street}
                onChange={handleChange}
                required
              />
            </div>
            <div className='form-group'>
              <label>Apartment, Floor, etc.</label>
              <input
                type='text'
                name='apartment'
                value={addressData.apartment}
                onChange={handleChange}
              />
            </div>
            <div className='form-group'>
              <label>Town/City</label>
              <input
                type='text'
                name='city'
                value={addressData.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className='form-group'>
              <label>Pincode</label>
              <input
                type='text'
                name='pincode'
                value={addressData.pincode}
                onChange={handleChange}
                required
              />
            </div>
            <div className='form-group'>
              <label>Phone Number</label>
              <input
                type='text'
                name='phone'
                value={addressData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className='form-group'>
              <label>Email Address</label>
              <input
                type='text'
                name='email'
                value={addressData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className='btns'>
              <button type='button' onClick={() => setIsEditing(false)}>
                Cancel
              </button>
              <button type='submit' disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        )}
      </div>

      <ToastContainer />
    </>
  )
}

export default MyAddress
