import React, { useEffect, useState } from 'react'
import '../assets/styles/Category.css'
import { getAllCategories } from '../api/categoryApi'
import { formatImageUrl } from '../utils/formatImage'
import { Link } from 'react-router-dom'

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
              <Link
                to={`/category/${category.categoryName}`} // Link to CategoryProduct.js with category name
                key={category._id}
                className='category-link'
              >
                <div className='category'>
                  {console.log(
                    'Formatted Image URL:',
                    formatImageUrl(category.image)
                  )}
                  <img
                    src={formatImageUrl(category.image)} // Assuming the images are served from the backend
                    alt={category.categoryName}
                    className='category-image'
                  />
                  <p>{category.categoryName}</p>
                </div>
              </Link>
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
