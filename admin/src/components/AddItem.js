import React, { useState } from 'react'
import '../assets/styles/AddItem.css'
import { addItem } from '../api/itemApi.js'

const AddItem = () => {
  const [formData, setFormData] = useState({
    itemName: '',
    brand: '',
    category: '',
    color: '',
    rating: '',
    mrp: '',
    sp: '',
    itemdetail: '',
    stock: '',
    startDate: '',
    endDate: ''
  })

  const [images, setImages] = useState([])
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFileChange = e => {
    setImages(e.target.files)
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const data = new FormData()
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key])
    })

    Array.from(images).forEach(file => {
      data.append('images', file)
    })

    try {
      const response = await addItem(data)
      setSuccess(response.message)
      setError('')
      setFormData({
        itemName: '',
        brand: '',
        category: '',
        color: '',
        rating: '',
        mrp: '',
        sp: '',
        itemdetail: '',
        stock: '',
        startDate: '',
        endDate: ''
      })
      setImages([])
    } catch (err) {
      setError('Failed to add the item. Please check the fields and try again.')
      setSuccess('')
    }
  }

  return (
    <div className='add-item-form'>
      <h2>Add New Item</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Item Name:</label>
          <input
            type='text'
            name='itemName'
            value={formData.itemName}
            onChange={handleChange}
            required
          />
        </div>

        <div className='form-group'>
          <label>Brand:</label>
          <input
            type='text'
            name='brand'
            value={formData.brand}
            onChange={handleChange}
            required
          />
        </div>

        <div className='form-group'>
          <label>Category:</label>
          <input
            type='text'
            name='category'
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>

        <div className='form-group'>
          <label>Color (comma-separated):</label>
          <input
            type='text'
            name='color'
            value={formData.color}
            onChange={handleChange}
          />
        </div>

        <div className='form-group'>
          <label>Rating:</label>
          <input
            type='number'
            name='rating'
            value={formData.rating}
            onChange={handleChange}
            step='0.1'
            min='0'
            max='5'
          />
        </div>

        <div className='form-group'>
          <label>MRP:</label>
          <input
            type='number'
            name='mrp'
            value={formData.mrp}
            onChange={handleChange}
            required
          />
        </div>

        <div className='form-group'>
          <label>Selling Price (SP):</label>
          <input
            type='number'
            name='sp'
            value={formData.sp}
            onChange={handleChange}
            required
          />
        </div>

        <div className='form-group'>
          <label>Item Details:</label>
          <textarea
            name='itemdetail'
            value={formData.itemdetail}
            onChange={handleChange}
            required
          />
        </div>

        <div className='form-group'>
          <label>Stock:</label>
          <input
            type='number'
            name='stock'
            value={formData.stock}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className='form-group'>
          <label>Discount Start Date:</label>
          <input
            type='date'
            name='startDate'
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label>Discount End Date:</label>
          <input
            type='date'
            name='endDate'
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className='form-group'>
          <label>Images (max 10):</label>
          <input
            type='file'
            multiple
            accept='image/*'
            onChange={handleFileChange}
          />
        </div>

        <button type='submit'>Add Item</button>
      </form>
    </div>
  )
}

export default AddItem
