// src/components/AddCategoryForm.js
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addCategory } from '../api/categoryApi'
import { IoArrowForward } from 'react-icons/io5'
import '../assets/styles/AddCategoryForm.css'

const AddCategoryForm = () => {
  const [categoryName, setCategoryName] = useState('')
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  // Handle category name change
  const handleCategoryNameChange = e => {
    setCategoryName(e.target.value)
  }

  // Handle image file change
  const handleImageChange = e => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
    }
  }

  // Handle form submit
  const handleSubmit = async e => {
    e.preventDefault()

    setLoading(true)
    setError(null)

    try {
      const categoryData = await addCategory(categoryName, image)

      // If category is added successfully
      alert('Category added successfully!')
    //   navigate('/categories') // Redirect to categories list page
    } catch (error) {
      // If error occurs
      setError('Failed to add category. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='add-category-form'>
      <h2>Add New Category</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='categoryName'>Category Name</label>
          <input
            type='text'
            id='categoryName'
            value={categoryName}
            onChange={handleCategoryNameChange}
            required
          />
        </div>
        <div>
          <label htmlFor='image'>Category Image</label>
          <input
            type='file'
            id='image'
            accept='image/*'
            onChange={handleImageChange}
            required
          />
        </div>
        {error && <p className='error-message'>{error}</p>}
        <div>
          <button type='submit' disabled={loading}>
            {loading ? 'Adding...' : 'Add Category'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddCategoryForm
