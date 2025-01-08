import React, { useEffect, useState } from 'react'
import { getOrdersByUserId } from '../api/orderApi.js'
import { Link } from 'react-router-dom'
import Loader from './Loader.js'
import '../assets/styles/MyOrders.css'
import { formatPrice } from '../utils/formatPrice.js'
import { formatDate } from '../utils/formatDate.js'
import { truncateText } from '../utils/formatText.js'
import { formatItemNameForUrl } from '../utils/formatItemName.js'

const MyOrders = () => {
  const [orders, setOrders] = useState([]) // State to store orders
  const [loading, setLoading] = useState(true) // State to track loading state
  const [error, setError] = useState(null) // State to track errors

  // Get userId from local storage
  const userId = localStorage.getItem('userId') // Replace this with the actual logic for getting the logged-in user's ID

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrdersByUserId(userId)
        setOrders(response)
        setError(response.message)
        console.log(response)
      } catch (err) {
        setError('An error occurred while fetching orders.') // Handle any unexpected errors
      } finally {
        setLoading(false) // Stop loading after the request completes
      }
    }

    fetchOrders()
  }, [userId]) // Dependency array to re-run the effect if userId changes

  // Display loading state or error message
  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    )
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className='orders_container'>
      <p className='header_text'>My Orders</p>

      {/* Render orders if available */}
      <div className='orders_content'>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <div className='orders'>
            <ul>
              {orders.map(order => (
                <li key={order._id} className='order-card'>
                  <div className='order-card-header'>
                    <div className='order-status'>
                      <p>{order.orderStatus} date</p>
                      {order.orderStatus === 'delivered' &&
                        order.deliveredDate && (
                          <p>{formatDate(order.deliveredDate)}</p>
                        )}
                      {order.orderStatus === 'shipped' && order.shippedDate && (
                        <p>{formatDate(order.shippedDate)}</p>
                      )}
                      {order.orderStatus === 'out for delivery' &&
                        order.outfordeliveryDate && (
                          <p>{formatDate(order.outfordeliveryDate)}</p>
                        )}
                      {order.orderStatus === 'order placed' &&
                        order.orderplacedDate && (
                          <p>{formatDate(order.orderplacedDate)}</p>
                        )}
                    </div>
                    <div className='order-shipping-date'>
                      <p>Delivery Date</p>
                      <p>{formatDate(order.deliveryDate)}</p>
                    </div>
                  </div>

                  <div className='order-items-list'>
                    <ul>
                      {order.orderDetails.map((item, index) => (
                        <li key={index}>
                          <Link
                            to={`/v/${item.itemId}/${formatItemNameForUrl(
                              item.itemName
                            )}`}
                          >
                            <div className='item-info'>
                              <img
                                src={item.selectedImage}
                                alt={item.itemName}
                              />
                              <p className='name'>
                                {truncateText(item.itemName)}
                              </p>
                            </div>
                          </Link>
                          <div className='item-price'>
                            <p>Price: {formatPrice(item.price)}</p>
                            <p>Qty: {item.quantity}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className='order-summary'>
                    <p>Total Price: {formatPrice(order.total)}</p>

                    {/* Add button to view track status */}
                    <div className='track-status'>
                      <Link to={`/track/${order._id}`} className='track-button'>
                        View Your Track Status
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyOrders
