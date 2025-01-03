import React, { useEffect, useState } from 'react'
import '../assets/styles/Category.css'
import { getAllCategories } from '../api/categoryApi'
import { formatImageUrl } from '../utils/formatImage'

const Category = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const category = await getAllCategories()
        setCategories(category)
      } catch (error) {
        console.error('Error fetching category: ', error)
      }
    }

    fetchCategories()
  }, [])

  return (
    <>
      <div className='category_container'>
        <div className='category_header'>
          <p>Categories </p>
          <h2>Browse By Category</h2>
        </div>

        <div className='categories'>
          {categories.length > 0 ? (
            categories.map(category => (
              <div className='category' key={category._id}>
                {/* Ensure the image path is accessible */}
                <img
                  src={formatImageUrl(category.image)} // Assuming the images are served from the backend
                  alt={category.categoryName}
                  className='category-image'
                />
                <p>{category.categoryName}</p>
              </div>
            ))
          ) : (
            <p>No categories found.</p>
          )}
        </div>
      </div>
    </>
  )
}

export default Category