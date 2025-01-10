import React, { useEffect, useState } from 'react'
import { useTrail, animated } from '@react-spring/web'
import { getAllOrderPlacedOrders, updateOrderStatus } from '../api/ordersApi' // Ensure correct path
import { MdKeyboardDoubleArrowRight } from 'react-icons/md'
import '../assets/styles/ViewProductsandUsers.css'
import { truncateText } from '../utils/formatText'
import { formatPrice } from '../utils/formatPrice'
import { formatDate } from '../utils/formatDate'

const OrderPlacedOrders = () => {
  const [orders, setOrders] = useState([]) // Holds the order placed orders
  const [loading, setLoading] = useState(true)

  // States for filtering and pagination
  const [searchQuery, setSearchQuery] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(15) // Default: 15 orders per page
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getAllOrderPlacedOrders()

      if (data.success !== false) {
        setOrders(data.orderplacedOrders) // Access the correct data
      }

      setLoading(false)
    }

    fetchOrders()
  }, [])

  // React Spring `useTrail` to animate the rows
  const trails = useTrail(orders.length, {
    opacity: 1,
    x: 0,
    from: { opacity: 0, x: 20 },
    config: { tension: 250, friction: 25 }
  })

  // Filter orders based on itemName search query
  const filteredOrders = orders.filter(order => {
    return order.orderDetails.some(item =>
      item.itemName.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  // Paginate filtered orders based on rowsPerPage and currentPage
  const totalOrders = filteredOrders.length
  const totalPages = Math.ceil(totalOrders / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const currentOrders = filteredOrders.slice(
    startIndex,
    startIndex + rowsPerPage
  )

  // Handle page changes
  const goToPage = page => {
    if (page < 1) return
    if (page > totalPages) return
    setCurrentPage(page)
  }

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      // Call API to update the order status
      const result = await updateOrderStatus(orderId, newStatus)
      if (result.success) {
        // Update the status of the order in the local state after successful API call
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order._id === orderId ? { ...order, orderStatus: newStatus } : order
          )
        )
        console.log('Order status updated successfully:', newStatus) // Success log
      } else {
        console.error('Error updating status:', result.message)
      }
    } catch (error) {
      console.error('Failed to update order status:', error)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (filteredOrders.length === 0) {
    return <div>No orders found matching the search criteria.</div>
  }

  return (
    <div className='view-orders'>
      <div className='head'>
        <p>Orders</p>
        <MdKeyboardDoubleArrowRight />
        <p>Order Placed Orders</p>
      </div>
      <h2>Order Placed Orders</h2>

      {/* Filters Section */}
      <div className='filters'>
        <select
          className='rows'
          value={rowsPerPage}
          onChange={e => setRowsPerPage(Number(e.target.value))}
        >
          <option value={15}>15 orders</option>
          <option value={30}>30 orders</option>
          <option value={50}>50 orders</option>
        </select>
        <input
          type='text'
          placeholder='Search by Item Name'
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className='search-bar'
        />
      </div>

      <table className='orders-table'>
        <thead>
          <tr>
            <th>Sr No.</th>
            <th>User</th>
            <th>Item Name</th>
            <th>Item Price</th>
            <th>Total Quantity</th>
            <th>Total Price</th>
            <th>Order Status</th>
            <th>Delivery Date</th>
          </tr>
        </thead>
        <tbody>
          {trails.map((style, index) => {
            const order = currentOrders[index]
            if (!order || !order.userId) return null // Skip rows with invalid data

            return (
              <animated.tr key={order._id} style={style}>
                <td>{startIndex + index + 1}</td>
                <td className='user'>{order.userId || 'N/A'}</td>
                <td>
                  {order.orderDetails.map(item => (
                    <div key={item.itemId} className='order'>
                      <img
                        src={item.selectedImage}
                        alt={item.itemName}
                        className='order-image'
                      />
                      <span>{truncateText(item.itemName)}</span>
                      <span>(x{item.quantity})</span>
                    </div>
                  ))}
                </td>
                <td>
                  {order.orderDetails.map(item => (
                    <div className='item-price'>{formatPrice(item.price)}</div>
                  ))}
                </td>
                <td>{order.totalQuantity}</td>
                <td>{formatPrice(order.total)}</td>
                <td className='orderStatus'>
                  {/* Order status dropdown */}
                  <select
                    className='updateStatus'
                    value={order.orderStatus}
                    onChange={e =>
                      handleStatusChange(order._id, e.target.value)
                    }
                  >
                    <option value='order placed'>Order Placed</option>
                    <option value='shipped'>Shipped</option>
                    <option value='out for delivery'>Out for Delivery</option>
                    <option value='delivered'>Delivered</option>
                    <option value='canceled'>Canceled</option>
                    <option value='returned'>Returned</option>
                  </select>
                </td>
                <td>{formatDate(order.deliveryDate)}</td>
              </animated.tr>
            )
          })}
        </tbody>
      </table>

      {/* Pagination */}
      <div className='pagination'>
        <button
          className='prev-page'
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span className='page-number'>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className='next-page'
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default OrderPlacedOrders
