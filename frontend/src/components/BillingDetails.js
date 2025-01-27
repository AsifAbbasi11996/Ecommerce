import React from 'react'
import { BsPencilFill } from 'react-icons/bs'

const BillingDetails = ({
  address,
  name,
  apartment,
  city,
  pincode,
  phone,
  email,
  isEditing,
  setIsEditing,
  handleAddressSubmit,
  setName,
  setAddress,
  setApartment,
  setCity,
  setPincode,
  setPhone,
  setEmail
}) => {
  return (
    <div className='billing-details'>
      <div className='header'>
        <h2>Billing Details</h2>
        <button
          className='edit-btn'
          type='button'
          onClick={() => setIsEditing(true)}
        >
          <BsPencilFill /> Edit Address
        </button>
      </div>

      {/* Show address or form */}
      {address ? (
        !isEditing ? (
          <div className='address-details'>
            <p className='name'>{name}</p>
            <p>{address}</p>
            <p>{apartment}</p>
            <p>{city}</p>
            <p>{pincode}</p>
            <p>{phone}</p>
            <p>{email}</p>
          </div>
        ) : (
          <form onSubmit={handleAddressSubmit}>
            <label>Full Name*</label>
            <input
              type='text'
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
            <label>Street Address*</label>
            <input
              type='text'
              value={address}
              onChange={e => setAddress(e.target.value)}
              required
            />
            <label>Apartment, Floor, etc. (optional)</label>
            <input
              type='text'
              value={apartment}
              onChange={e => setApartment(e.target.value)}
            />
            <label>Town/City*</label>
            <input
              type='text'
              value={city}
              onChange={e => setCity(e.target.value)}
              required
            />
            <label>Pincode*</label>
            <input
              type='text'
              value={pincode}
              onChange={e => setPincode(e.target.value)}
              required
            />
            <label>Phone Number*</label>
            <input
              type='text'
              value={phone}
              onChange={e => setPhone(e.target.value)}
              required
            />
            <label>Email Address*</label>
            <input
              type='text'
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <div className='btns'>
              <button
                className='cancel-btn'
                type='button'
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button className='save_address' type='submit'>
                Save Address
              </button>
            </div>
          </form>
        )
      ) : (
        <form onSubmit={handleAddressSubmit}>
          <label>Full Name*</label>
          <input
            type='text'
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <label>Street Address*</label>
          <input
            type='text'
            value={address}
            onChange={e => setAddress(e.target.value)}
            required
          />
          <label>Apartment, Floor, etc. (optional)</label>
          <input
            type='text'
            value={apartment}
            onChange={e => setApartment(e.target.value)}
          />
          <label>Town/City*</label>
          <input
            type='text'
            value={city}
            onChange={e => setCity(e.target.value)}
            required
          />
          <label>Pincode*</label>
          <input
            type='text'
            value={pincode}
            onChange={e => setPincode(e.target.value)}
            required
          />
          <label>Phone Number*</label>
          <input
            type='text'
            value={phone}
            onChange={e => setPhone(e.target.value)}
            required
          />
          <label>Email Address*</label>
          <input
            type='text'
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <div className='btns'>
            <button
              className='cancel-btn'
              type='button'
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
            <button className='save_address' type='submit'>
              Save Address
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default BillingDetails
