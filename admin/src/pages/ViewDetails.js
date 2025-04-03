import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { MdKeyboardDoubleArrowRight } from 'react-icons/md'
import { getProductById } from '../api/productsApi' // Adjust the import based on your file structure
import { formatImageUrl } from '../utils/formatImageUrl'
import '../assets/styles/ViewDetails.css'
import { formatPrice } from '../utils/formatPrice'

const ViewDetails = () => {
  const { id } = useParams() // Extract product ID from URL
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const data = await getProductById(id)
        setProduct(data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.error('Error fetching product details:', error)
      }
    }

    fetchProductDetails()
  }, [id])

  if (loading) {
    return <div className='loading'>Loading product details...</div>
  }

  if (!product) {
    return <div className='error'>Product not found.</div>
  }

  return (
    <div className='view-details'>
      <div className='head'>
        <p>Products</p>
        <MdKeyboardDoubleArrowRight />
        <p>
          <Link to='/viewproducts'>View Products</Link>
        </p>
        <MdKeyboardDoubleArrowRight />
        <p>Product Details</p>
      </div>
      <h2 className='product-name'>{product.productname}</h2>
      <div className='product-details'>
        <div className='details'>
          <div className='image-container'>
            {/* Display the first image of the product (main image) */}
            <img
              src={formatImageUrl(product.colors[0].images[0])}
              alt={product.productname}
              className='product-image'
            />
          </div>
          <div className='details-container'>
            <p>
              <strong>Name :</strong> {product.productname}
            </p>
            <p>
              <strong>Brand :</strong> {product.brand}
            </p>
            <p>
              <strong>Category :</strong> {product.category}
            </p>
            <p>
              <strong>Mrp :</strong> {formatPrice(product.mrp)}
            </p>
            <p>
              <strong>SP :</strong> {formatPrice(product.sp)}
            </p>
            <p>
              <strong>Rating :</strong> {product.rating}
            </p>
            <p>
              <strong>Sizefit :</strong> {product.sizefit}
            </p>
            <p>
              <strong>Product Details :</strong>{' '}
              {product.productdetail.join(', ')}
            </p>
            <p>
              <strong>Material Care :</strong> {product.materialcare.join(', ')}
            </p>
            <p>
              <strong>Specifications :</strong>
              {product.specification.map((spec, index) => (
                <span key={index}>
                  {spec.title} : {spec.data}
                </span>
              ))}
              <p>
                <strong>Status :</strong> {product.status}
              </p>
            </p>
          </div>
        </div>

        <div className='colors'>
          {product.colors.map(colorVariant => (
            <div key={colorVariant._id} className='color-variant'>
              <div className='color-details'>
                <p>
                  <strong>Color :</strong> {colorVariant.col}
                </p>
                <p>
                  <strong>Sizes :</strong>
                </p>
                {colorVariant.sizes.map(size => (
                  <p key={size._id}>
                    <span>size</span> : {size.size} , <span>stock</span> :{' '}
                    {size.count}
                  </p>
                ))}
              </div>

              {/* Display all images for the color variant */}
              <div className='color-images'>
                <p>
                  <strong>Images </strong>
                </p>
                <div className='img'>
                  {colorVariant.images.map((image, index) => (
                    <img
                      key={index}
                      src={formatImageUrl(image)}
                      alt={`Color: ${colorVariant.col} - Image ${index + 1}`}
                      className='color-image-img'
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ViewDetails
