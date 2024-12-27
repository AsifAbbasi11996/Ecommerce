import React, { useState } from 'react'
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
    stock: ''
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
        stock: ''
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
        <label>
          Item Name:
          <input
            type='text'
            name='itemName'
            value={formData.itemName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Brand:
          <input
            type='text'
            name='brand'
            value={formData.brand}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Category:
          <input
            type='text'
            name='category'
            value={formData.category}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Color (comma-separated):
          <input
            type='text'
            name='color'
            value={formData.color}
            onChange={handleChange}
          />
        </label>
        <label>
          Rating:
          <input
            type='number'
            name='rating'
            value={formData.rating}
            onChange={handleChange}
            step='0.1'
            min='0'
            max='5'
          />
        </label>
        <label>
          MRP:
          <input
            type='number'
            name='mrp'
            value={formData.mrp}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Selling Price (SP):
          <input
            type='number'
            name='sp'
            value={formData.sp}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Item Details:
          <textarea
            name='itemdetail'
            value={formData.itemdetail}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Stock:
          <input
            type='number'
            name='stock'
            value={formData.stock}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Images (max 10):
          <input
            type='file'
            multiple
            accept='image/*'
            onChange={handleFileChange}
          />
        </label>
        <button type='submit'>Add Item</button>
      </form>
    </div>
  )
}

export default AddItem
