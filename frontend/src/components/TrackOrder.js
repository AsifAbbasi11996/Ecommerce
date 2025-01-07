import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getOrderByOrderId } from '../api/orderApi.js'
import '../assets/styles/TrackOrder.css'
import Loader from './Loader.js'
import { formatDate } from '../utils/formatDate.js'

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
        console.log(response)
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
                  <div
                    key={status}
                    className={`status-point ${
                      getOrderStatusIndex(order.order.orderStatus) >= index
                        ? 'completed'
                        : ''
                    }`}
                  >
                    <div className='status-label'>{status}</div>
                  </div>
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
              <strong>Status:</strong> {order.order.orderStatus}
            </p>
            <p>
              <strong>Ordered Date:</strong> {formatDate(order.order.createdAt)}
            </p>
            <p>
              <strong>Delivery Date:</strong>{' '}
              {order.order.shippingDate
                ? formatDate(order.order.shippingDate)
                : 'N/A'}
            </p>
          </div>
        </>
      )}
    </div>
  )
}

export default TrackOrder
