import React from 'react'
import '../assets/styles/MyProfile.css'

const MyProfile = () => {
  return (
    <form className='editprofile'>
      <p>Edit Your Profile</p>
      <div className='two'>
        <div className='form-group'>
          <label>First Name</label>
          <input placeholder='Name' />
        </div>
        <div className='form-group'>
          <label>Last Name</label>
          <input placeholder='Name' />
        </div>
      </div>

      <div className='two'>
        <div className='form-group'>
          <label>Email</label>
          <input placeholder='Name' />
        </div>
        <div className='form-group'>
          <label>Address</label>
          <input placeholder='Name' />
        </div>
      </div>

      <div className='form-group'>
        <label>Password Changes</label>
        <input placeholder='Current Password' />
        <input placeholder='New Password' />
        <input placeholder='Confirm New Password' />
      </div>

      <div className='btns'>
        <button>Cancel</button>
        <button type='submit' className='save'>
          Save Changes
        </button>
      </div>
    </form>
  )
}

export default MyProfile
