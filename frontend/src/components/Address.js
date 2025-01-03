import React, { useState } from 'react'
import '../assets/styles/MyProfile.css'

const Address = () => {
  const [loading, setLoading] = useState(true) // Loading state while fetching data

  return (
    <>
      <form className='address'>
        <p>Address</p>

        <div className='form-group'>
          <label>Street Address</label>
          <input type='text' required />
        </div>
        <div className='form-group'>
          <label>Apartment, Floor, etc.</label>
          <input type='text' required />
        </div>
        <div className='form-group'>
          <label>Town/City</label>
          <input type='text' required />
        </div>
        <div className='form-group'>
          <label>Pincode</label>
          <input type='text' required />
        </div>

        <div className='btns'>
          <button type='button'>Cancel</button>
          <button type='submit' className='save' disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </>
  )
}

export default Address
