import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getOrderByOrderId } from '../api/orderApi.js'
import '../assets/styles/TrackOrder.css'
import Loader from './Loader.js'
import { formatDate } from '../utils/formatDate.js'
import { FaCheck, FaBox, FaTruck, FaHome } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { Tooltip } from 'react-tooltip' // Use named import here
import { truncateText } from '../utils/formatText.js'

const TrackOrder = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { orderId } = useParams() // Get orderId from URL parameters
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await getOrderByOrderId(orderId)
        setOrder(response)
      } catch (err) {
        setError('An error occurred while fetching the order.')
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [orderId])

  // Display loading state or error message
  if (loading) {
    return <Loader />
  }

  if (error) {
    return <div>{error}</div>
  }

  const getOrderStatusIndex = status => {
    const statuses = [
      'order placed',
      'shipped',
      'out for delivery',
      'delivered'
    ]
    return statuses.indexOf(status) === -1 ? 0 : statuses.indexOf(status)
  }

  const getIconColor = (status, index) => {
    // If the status is completed (order status index >= current index), return green color
    return getOrderStatusIndex(order.order.orderStatus) >= index
      ? '#db4444'
      : 'gray'
  }

  return (
    <div className='track-order-container'>
      <h2>Track Your Order</h2>

      {order && (
        <>
          {/* Status Points */}
          <div className='track-status'>
            <div className='status-container'>
              {['order placed', 'shipped', 'out for delivery', 'delivered'].map(
                (status, index) => (
                  <motion.div
                    key={status}
                    className={`status-point ${
                      getOrderStatusIndex(order.order.orderStatus) >= index
                        ? 'completed'
                        : ''
                    }`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    data-tip={`Status: ${status}`} // Tooltip on hover
                  >
                    <div
                      className='status-icon'
                      style={{ color: getIconColor(status, index) }}
                    >
                      {status === 'order placed' && <FaBox />}
                      {status === 'shipped' && <FaTruck />}
                      {status === 'out for delivery' && <FaHome />}
                      {status === 'delivered' && <FaCheck />}
                    </div>
                    <div className='status-label'>{status}</div>
                    {/* Display the relevant date under each status */}
                    {status === 'order placed' &&
                      order.order.orderplacedDate && (
                        <p className='status-date'>
                          {formatDate(order.order.orderplacedDate)}
                        </p>
                      )}
                    {status === 'shipped' && order.order.shippedDate && (
                      <p className='status-date'>
                        {formatDate(order.order.shippedDate)}
                      </p>
                    )}
                    {status === 'out for delivery' &&
                      order.order.outfordeliveryDate && (
                        <p className='status-date'>
                          {formatDate(order.order.outfordeliveryDate)}
                        </p>
                      )}
                    {status === 'delivered' && order.order.deliveredDate && (
                      <p className='status-date'>
                        {formatDate(order.order.deliveredDate)}
                      </p>
                    )}
                  </motion.div>
                )
              )}
            </div>
            {/* Progress Bar */}
            <div className='status-progress'>
              <div
                className='progress-bar'
                style={{
                  width: `${
                    (getOrderStatusIndex(order.order.orderStatus) + 1) * 25
                  }%`
                }}
              ></div>
            </div>
          </div>

          {/* Order Details */}
          <div className='order-details'>
            <h3>Order Details</h3>
            <p>
              <span>Status:</span> {order.order.orderStatus}
            </p>
            <p>
              <span>
                {order.order.orderStatus === 'delivered'
                  ? 'Delivered Date'
                  : 'Delivery Date'}
                :
              </span>{' '}
              {order.order.orderStatus === 'delivered' &&
              order.order.deliveredDate
                ? formatDate(order.order.deliveredDate) // Show deliveredDate if status is delivered
                : order.order.deliveryDate
                ? formatDate(order.order.deliveryDate) // Otherwise, show deliveryDate
                : 'N/A'}
            </p>

            {/* Display Items in Order (Image and Name only) */}
            <div className='order-items'>
              <p>Item in this Order</p>
              {order.order.orderDetails.map(item => (
                <div key={item.itemId} className='order-item'>
                  <img
                    src={item.selectedImage}
                    alt={item.itemName}
                    className='item-image'
                  />
                  <div className='item-info'>
                    <p className='item-name'>{truncateText(item.itemName)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      <Tooltip place='top' effect='solid' />
    </div>
  )
}

export default TrackOrder
