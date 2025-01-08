import React, { useEffect, useState } from 'react'
import { FiHeart } from 'react-icons/fi'
import { useWishlist } from '../context/WishlistContext'
import { viewWishlist } from '../api/wishlistApi'
import { Link, useNavigate } from 'react-router-dom'
import Loader from './Loader'
import { formatImageUrl } from '../utils/formatImage'
import { formatPrice } from '../utils/formatPrice'
import '../assets/styles/Wishlist.css'
import { MdOutlineClose } from 'react-icons/md'
import { PiShoppingCartSimple } from 'react-icons/pi'
import { ToastContainer, toast } from 'react-toastify' // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css' // Import toast styles
import { useCart } from '../context/CartContext'
import { truncateText } from '../utils/formatText'
import { formatItemNameForUrl } from '../utils/formatItemName'

const Wishlist = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { handleAddToCart } = useCart()
  const { handleRemoveFromWishlist, handleClearWishlist } = useWishlist()

  const [fullWishlistItems, setFullWishlistItems] = useState([]) // To store the detailed Wishlist items (with item data)
  const [loading, setLoading] = useState(true) // For loading state
  const [error, setError] = useState(null) // For handling errors
  const navigate = useNavigate()
  const userId = localStorage.getItem('userId')

  useEffect(() => {
    const fetchWishlistData = async () => {
      try {
        const WishlistData = await viewWishlist(userId) // Call the viewWishlist API
        // If the API returns an empty wishlist, handle it here
        if (
          WishlistData &&
          WishlistData.wishlist &&
          WishlistData.wishlist.items
        ) {
          const updatedItems = WishlistData.wishlist.items.map(item => ({
            ...item
          }))
          setFullWishlistItems(updatedItems) // Store the updated items
        } else {
          // If there are no items, just set an empty array
          setFullWishlistItems([])
        }
        setLoading(false)
      } catch (err) {
        if (err.response && err.response.status === 404) {
          // If the API responds with 404, handle it as an empty wishlist
          setFullWishlistItems([]) // Set the wishlist as empty
          setLoading(false)
        } else {
          // Handle other errors
          setError(err.message) // Set the error message
          setLoading(false)
        }
      }
    }

    if (userId) {
      fetchWishlistData() // Fetch the Wishlist data if userId is available
    }
  }, [userId])

  const handleRemove = async itemId => {
    try {
      const updatedWishlist = await handleRemoveFromWishlist(userId, itemId)
      if (
        updatedWishlist &&
        updatedWishlist.wishlist &&
        updatedWishlist.wishlist.items
      ) {
        // Update the state only with the remaining items (excluding the removed one)
        setFullWishlistItems(updatedWishlist.wishlist.items)
      } else {
        console.error(
          'Updated Wishlist structure is incorrect',
          updatedWishlist
        )
      }
    } catch (error) {
      console.error('Error removing item from Wishlist:', error)
    }
  }

  // Function to clear the entire Wishlist
  const handleClear = async () => {
    try {
      await handleClearWishlist(userId) // Use the handleClearWishlist from context
      setFullWishlistItems([]) // Clear the Wishlist items in the UI
    } catch (error) {
      console.error('Error clearing the Wishlist:', error)
    }
  }

  // Function to handle adding product to the cart
  const handleAddToCartClick = item => {
    if (!userId) {
      toast.error('Please log in to add items to the cart.')
      return
    }

    handleAddToCart(userId, item.item._id) // Add the product to the global cart state
    toast.success('Added to Cart!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      draggable: false
    })
  }

  if (loading) return <Loader />
  if (error) return <p>{error}</p>

  const handleNavigate = () => {
    navigate('/')
  }

  return (
    <div className='wishlist_container'>
      <div className='wishlist_header'>
        <div className='nav'>
          <Link to='/'>Home</Link>
          <p>/</p>
          <Link>Wishlist</Link>
        </div>
      </div>

      <div className='wishlist_content'>
        {fullWishlistItems.length > 0 ? (
          <>
            <div className='wishlist_items'>
              {fullWishlistItems.map(item => (
                <div className='product'>
                  <Link
                    to={`/v/${item.item._id}/${formatItemNameForUrl(
                      item.item.itemName
                    )}`}
                    className='view-details'
                    key={item._id}
                  >
                    <div className='wishlist_item'>
                      <div className='wishlist_item_image'>
                        {item.item &&
                        item.item.images &&
                        item.item.images.length > 0 ? (
                          <img
                            src={formatImageUrl(item.item.images[0])} // Assuming images are stored locally
                            alt={item.item.itemName}
                          />
                        ) : (
                          <img
                            src='default_image_url' // Provide a default image if images array is empty or undefined
                            alt='default image'
                          />
                        )}
                      </div>

                      <div className='wishlist_item_details'>
                        <p className='item_name'>
                          {item.item
                            ? truncateText(item.item.itemName)
                            : 'Item name unavailable'}
                        </p>
                        <p className='item_price'>
                          <span className='sp'>
                            {formatPrice(item.item.sp)}
                          </span>
                          <span className='mrp'>
                            {formatPrice(item.item.mrp)}
                          </span>
                          <span className='discount'>
                            (
                            {item.item.discount
                              ? `${item.item.discount.percentage}% off`
                              : 'No discount'}
                            )
                          </span>
                        </p>
                      </div>
                    </div>
                  </Link>
                  <div className='wishlist_item_remove'>
                    <div className='icon'>
                      <MdOutlineClose onClick={() => handleRemove(item._id)} />
                    </div>
                  </div>
                  <div className='wishlist_item_cart'>
                    <div className='icon'>
                      <PiShoppingCartSimple
                        onClick={() => handleAddToCartClick(item)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className='empty_wishlist'>
              <p>
                <FiHeart /> Your Wishlist is empty.
              </p>
              <button className='continue_shopping' onClick={handleNavigate}>
                Add in your Wishlist
              </button>
            </div>
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  )
}

export default Wishlist
