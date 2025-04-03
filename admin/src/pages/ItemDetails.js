import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { MdKeyboardDoubleArrowRight } from 'react-icons/md'
import { formatImageUrl } from '../utils/formatImageUrl'
import '../assets/styles/ViewDetails.css'
import { formatPrice } from '../utils/formatPrice'
import { getItemById } from '../api/itemApi'
import { formatDate } from '../utils/formatDate'
import UpdateBestSeller from '../components/UpdateBestSeller'

const ItemDetails = () => {
  const { id } = useParams() // Extract item ID from URL
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const data = await getItemById(id)
        setItem(data)
        setLoading(false)
        console.log(data)
      } catch (error) {
        setLoading(false)
        console.error('Error fetching item details:', error)
      }
    }

    fetchItemDetails()
  }, [id])

  if (loading) {
    return <div className='loading'>Loading item details...</div>
  }

  if (!item) {
    return <div className='error'>item not found.</div>
  }

  return (
    <div className='view-details'>
      <div className='head'>
        <p>Items</p>
        <MdKeyboardDoubleArrowRight />
        <p>
          <Link to='/view-items'>View Items</Link>
        </p>
        <MdKeyboardDoubleArrowRight />
        <p>Item Details</p>
      </div>
      <h2 className='item-name'>{item.itemName}</h2>
      <div className='item-details'>
        <div className='details'>
          <div className='image-container'>
            <img
              src={formatImageUrl(item.images[0])}
              alt={item.itemName}
              className='item-image'
            />
          </div>
          <div className='details-container'>
            <p>
              <strong>Name :</strong> {item.itemName}
            </p>
            <p>
              <strong>Brand :</strong> {item.brand}
            </p>
            <p>
              <strong>Category :</strong> {item.category}
            </p>
            <p>
              <strong>Color :</strong> {item.color.join(',')}
            </p>
            <p>
              <strong>Mrp :</strong> {formatPrice(item.mrp)}
            </p>
            <p>
              <strong>SP :</strong> {formatPrice(item.sp)}
            </p>
            <p>
              <strong>Rating :</strong> {item.rating}
            </p>
            <p>
              <strong>Item Details :</strong>
              {item.itemdetail}
            </p>
            {/* Display discount details */}
            {item.discount && (
              <div className='discount-details'>
                <p>
                  <strong>Discount :</strong> {item.discount.percentage}%
                </p>
                <p>
                  <strong>Discount Start Date :</strong>{' '}
                  {formatDate(item.discount.startDate)}
                </p>
                <p>
                  <strong>Discount End Date :</strong>{' '}
                  {formatDate(item.discount.endDate)}
                </p>
              </div>
            )}

            <p>
              <strong>Status :</strong> {item.status}
            </p>
            <p>
              <strong>Stock :</strong> {item.stock}
            </p>
            <p>
              <strong>Best Seller :</strong> {item.bestseller ? 'Yes' : 'No'}
            </p>
          </div>
        </div>
        <div className='images'>
          {item.images.map((image, index) => {
            return <img key={index} src={formatImageUrl(image)} />
          })}
        </div>
      </div>

      <UpdateBestSeller itemId={item._id} />
    </div>
  )
}

export default ItemDetails
