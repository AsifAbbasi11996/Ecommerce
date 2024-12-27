// src/components/UpdateCategoryForm.js

import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getCategoryById, updateCategoryById } from '../api/categoryApi.js' // Import the update API function
import '../assets/styles/UpdateCategoryForm.css'

const UpdateCategoryForm = () => {
  const [categoryName, setCategoryName] = useState('')
  const [image, setImage] = useState(null)
  const [error, setError] = useState('')
  const { id } = useParams() // Get the category ID from the URL parameters
  const navigate = useNavigate() // For redirection after category is updated

  // Fetch the existing category data when the form loads
  useEffect(() => {
    // Fetch the category by ID (for example, using a function like getCategoryById)
    const fetchCategoryData = async () => {
      try {
        const response = await getCategoryById()
        setCategoryName(response.data.categoryName)
        // You could also set the image preview here, if needed
      } catch (error) {
        console.error('Error fetching category data:', error)
        setError('Failed to fetch category data')
      }
    }

    fetchCategoryData()
  }, [id])

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await updateCategoryById(id, categoryName, image) // Call the API to update the category
      navigate('/categories') // Navigate to another page (category list, for example)
    } catch (error) {
      setError('Failed to update category') // Show error message if API call fails
    }
  }

  return (
    <div className='category-form'>
      <h2>Update Category</h2>
      {error && <p className='error'>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Category Name</label>
          <input
            type='text'
            value={categoryName}
            onChange={e => setCategoryName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Category Image</label>
          <input type='file' onChange={e => setImage(e.target.files[0])} />
        </div>
        <button type='submit'>Update Category</button>
      </form>
    </div>
  )
}

export default UpdateCategoryForm
