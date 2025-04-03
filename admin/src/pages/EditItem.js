import React, { useState, useEffect } from 'react'
import { deleteImageById, getItemById, updateItemById } from '../api/itemApi'
import { Link, useParams } from 'react-router-dom'
import '../assets/styles/EditItem.css'
import { formatDate } from '../utils/formatDate'
import { formatImageUrl } from '../utils/formatImageUrl'
import { MdKeyboardDoubleArrowRight } from 'react-icons/md'

const EditItem = () => {
  const { id } = useParams()
  const [formData, setFormData] = useState({
    itemName: '',
    brand: '',
    category: '',
    color: '',
    mrp: '',
    sp: '',
    itemdetail: '',
    discount: { startDate: '', endDate: '' },
    rating: '',
    stock: '',
    status: '',
    images: [] // Added images field
  })

  const [isDateFocused, setIsDateFocused] = useState({
    startDate: false,
    endDate: false
  })

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const response = await getItemById(id)
        // Assuming response contains item data including discount fields
        setFormData({
          ...response,
          discount: response.discount || { startDate: '', endDate: '' }
        }) // Set the form data with response data
      } catch (error) {
        console.error('Error fetching item data:', error)
      }
    }

    fetchItemData()
  }, [id])

  const handleChange = e => {
    const { name, value } = e.target
    const nameParts = name.split('.')

    if (nameParts.length === 2) {
      // Handle nested field (discount startDate or endDate)
      setFormData(prevState => ({
        ...prevState,
        [nameParts[0]]: {
          ...prevState[nameParts[0]],
          [nameParts[1]]: value
        }
      }))
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }))
    }
  }

  const handleImageChange = e => {
    const files = Array.from(e.target.files)
    setFormData(prevState => ({
      ...prevState,
      images: files
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (formData.mrp && formData.sp) {
      const discountPercentage =
        ((formData.mrp - formData.sp) / formData.mrp) * 100
      formData.discount.percentage = Math.round(discountPercentage) // Round to the nearest integer
    }

    try {
      const response = await updateItemById(id, formData)
      console.log('Item updated successfully:', response)
    } catch (error) {
      console.error('Error updating item:', error)
    }
  }

  const handleFocus = field => {
    setIsDateFocused(prevState => ({
      ...prevState,
      [field]: true
    }))
  }

  const handleBlur = field => {
    setIsDateFocused(prevState => ({
      ...prevState,
      [field]: false
    }))
  }

  // Handle image deletion
  const handleImageDelete = async imagePath => {
    try {
      // Call the delete API with the itemId and formatted imagePath
      const response = await deleteImageById(id, imagePath)

      if (response.message === 'Image removed successfully') {
        // Remove the image from the state
        setFormData(prevState => ({
          ...prevState,
          images: prevState.images.filter(image => image !== imagePath)
        }))
        console.log('Image deleted successfully')
      }
    } catch (error) {
      console.error('Error deleting image:', error)
      alert('Error deleting image')
    }
  }

  return (
    <div className='edit-item-container'>
      <div className='head'>
        <p>Items</p>
        <MdKeyboardDoubleArrowRight />
        <p>
          <Link to='/view-items'>View Items</Link>
        </p>
        <MdKeyboardDoubleArrowRight />
        <p>Edit Item</p>
      </div>
      <h2>Update Item</h2>
      <form
        onSubmit={handleSubmit}
        className='edit-item-form'
        encType='multipart/form-data'
      >
        <div className='form-group'>
          <label>Item Name:</label>
          <input
            type='text'
            name='itemName'
            value={formData.itemName}
            onChange={handleChange}
          />
        </div>

        <div className='three'>
          <div className='form-group'>
            <label>Brand:</label>
            <input
              type='text'
              name='brand'
              value={formData.brand}
              onChange={handleChange}
            />
          </div>

          <div className='form-group'>
            <label>Category:</label>
            <input
              type='text'
              name='category'
              value={formData.category}
              onChange={handleChange}
            />
          </div>

          <div className='form-group'>
            <label>Color:</label>
            <input
              type='text'
              name='color'
              value={formData.color}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className='four'>
          <div className='form-group'>
            <label>MRP:</label>
            <input
              type='number'
              name='mrp'
              value={formData.mrp}
              onChange={handleChange}
            />
          </div>

          <div className='form-group'>
            <label>SP:</label>
            <input
              type='number'
              name='sp'
              value={formData.sp}
              onChange={handleChange}
            />
          </div>

          <div className='form-group'>
            <label>Stock:</label>
            <input
              type='number'
              name='stock'
              value={formData.stock}
              onChange={handleChange}
            />
          </div>

          <div className='form-group'>
            <label>Status:</label>
            <select
              name='status'
              value={formData.status}
              onChange={handleChange}
            >
              <option value='available'>Available</option>
              <option value='unavailable'>Unavailable</option>
            </select>
          </div>
        </div>

        <div className='form-group'>
          <label>Item Details:</label>
          <textarea
            name='itemdetail'
            value={formData.itemdetail}
            onChange={handleChange}
          />
        </div>

        <div className='three'>
          <div className='form-group'>
            <label>Rating:</label>
            <input
              type='number'
              name='rating'
              value={formData.rating}
              onChange={handleChange}
            />
          </div>

          <div className='form-group'>
            <label>Discount Start Date:</label>
            <input
              type={isDateFocused.startDate ? 'date' : 'text'}
              name='discount.startDate'
              value={formatDate(formData.discount.startDate)}
              onChange={handleChange}
              onFocus={() => handleFocus('startDate')}
              onBlur={() => handleBlur('startDate')}
            />
          </div>

          <div className='form-group'>
            <label>Discount End Date:</label>
            <input
              type={isDateFocused.endDate ? 'date' : 'text'}
              name='discount.endDate'
              value={formatDate(formData.discount.endDate)}
              onChange={handleChange}
              onFocus={() => handleFocus('endDate')}
              onBlur={() => handleBlur('endDate')}
            />
          </div>
        </div>

        <div className='form-group'>
          <label>Upload Images:</label>
          <input
            type='file'
            name='images'
            onChange={handleImageChange}
            multiple
          />
          <div className='image-preview'>
            {formData.images.length > 0 &&
              formData.images.map((image, index) => (
                <div key={index} className='image-item'>
                  <div className='image'>
                    <img
                      src={formatImageUrl(image)}
                      alt={`uploaded-image-${index}`}
                    />
                  </div>
                  <button
                    type='button'
                    onClick={() => handleImageDelete(image)}
                    className='delete-image-btn'
                  >
                    Delete
                  </button>
                </div>
              ))}
          </div>
        </div>

        <button type='submit'>Update Item</button>
      </form>
    </div>
  )
}

export default EditItem
