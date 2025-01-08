import mongoose from 'mongoose'
import Order from '../models/order.models.js'
import Item from '../models/item.models.js'

// Create order
const createOrder = async (req, res) => {
  try {
    const {
      userId,
      addressId,
      orderDetails,
      totalQuantity,
      subtotal,
      discountAmount,
      paymentMethod,
      shippingFee,
      total,
      orderplacedDate,
      deliveryDate
    } = req.body

    // Ensure deliveryDate is at least 7 days from the current date
    let adjustedDeliveryDate = new Date(deliveryDate)
    const currentDate = new Date()
    const minDeliveryDate = new Date(
      currentDate.setDate(currentDate.getDate() + 7)
    ) // 7 days from now

    // If deliveryDate is earlier than 7 days from now, adjust it
    if (adjustedDeliveryDate < minDeliveryDate) {
      adjustedDeliveryDate = minDeliveryDate
    }

    // Loop through orderDetails to update items
    await Promise.all(
      orderDetails.map(async item => {
        // Find the item by its ID
        const foundItem = await Item.findById(item.itemId)
        if (!foundItem) {
          throw new Error(`Item with ID ${item.itemId} not found.`)
        }

        // Update stock and orderCount
        foundItem.stock -= item.quantity // Decrease stock based on ordered quantity
        foundItem.orderCount += item.quantity // Increase order count

        // Calculate and update sales
        foundItem.sales += foundItem.sp * item.quantity // Increase sales based on quantity and price

        // Save the updated item to the database
        await foundItem.save()
      })
    )

    // Create the new order
    const newOrder = await Order.create({
      userId,
      addressId,
      orderDetails,
      totalQuantity,
      subtotal,
      discountAmount,
      paymentMethod,
      shippingFee,
      total,
      orderplacedDate,
      deliveryDate: adjustedDeliveryDate // Use the adjusted shipping date
    })

    newOrder.save() // Save the new order

    // Return success response
    res.status(201).json({ message: 'Order created successfully', newOrder })
  } catch (error) {
    console.error('Error creating order:', error)
    res.status(500).json({ message: error.message })
  }
}

//get all order
const getAllOrder = async (req, res) => {
  try {
    const order = await Order.find().sort({ createdAt: -1 })
    res.status(200).json(order)
  } catch (error) {
    console.error('Error getting all orders:', error)
  }
}

// getByUserId controller
const getByUserId = async (req, res) => {
  try {
    const { userId } = req.params // Extract userId from the request params

    // Ensure the userId is a valid ObjectId (in case it's passed as a string)
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid userId' })
    }

    // Query the database using userId
    const order = await Order.find({
      userId,
      orderStatus: { $nin: ['returned', 'canceled'] } // Exclude 'returned' and 'canceled' statuses
    }).sort({ createdAt: -1 })

    if (!order.length) {
      return res.status(404).json({ message: 'No orders found for this user.' })
    }

    res.status(200).json(order)
  } catch (error) {
    console.error('Error fetching orders by userId:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// Update Order Status by orderId
const updateOrderStatus = async (req, res) => {
  try {
    const { newStatus, cancellationReason, returnReason } = req.body // Get newStatus, cancellationReason, and returnReason from the request body
    const { orderId } = req.params // Get orderId from the URL parameter

    // Validate newStatus input
    const validStatuses = [
      'order placed',
      'shipped',
      'out for delivery',
      'delivered',
      'canceled',
      'returned'
    ]
    if (!validStatuses.includes(newStatus)) {
      return res.status(400).json({ message: 'Invalid order status' })
    }

    // Find the order by its ID
    const order = await Order.findById(orderId)
    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    // If the current status is "delivered", you cannot change it anymore
    if (order.orderStatus === 'delivered' && newStatus !== 'delivered') {
      return res.status(400).json({
        message: 'Order has already been delivered and cannot be changed'
      })
    }

    // Handle cancellation and return logic
    if (newStatus === 'canceled') {
      // Ensure the order can only be canceled if it's not already shipped or delivered
      if (
        ['shipped', 'out for delivery', 'delivered'].includes(order.orderStatus)
      ) {
        return res.status(400).json({
          message: 'Cannot cancel an order that is shipped or delivered'
        })
      }
      order.orderStatus = 'canceled'
      order.canceledDate = new Date() // Set canceled date
      if (cancellationReason) {
        order.cancellationReason = cancellationReason // Set cancellation reason if provided
      }
    } else if (newStatus === 'returned') {
      // Ensure the order can only be returned if it's already delivered
      if (order.orderStatus !== 'delivered') {
        return res
          .status(400)
          .json({ message: 'Can only return delivered orders' })
      }
      order.orderStatus = 'returned'
      order.returnDate = new Date() // Set return date
      if (returnReason) {
        order.returnReason = returnReason // Set return reason if provided
      }
    } else {
      // For other statuses like "order placed", "shipped", "out for delivery", "delivered"
      order.orderStatus = newStatus
      // Setting the date fields based on the order status
      if (newStatus === 'order placed') {
        order.orderplacedDate = new Date() // Set order placed date
      } else if (newStatus === 'shipped') {
        order.shippedDate = new Date() // Set shipped date
      } else if (newStatus === 'out for delivery') {
        order.outfordeliveryDate = new Date() // Set out for delivery date
      } else if (newStatus === 'delivered') {
        order.deliveredDate = new Date() // Set delivered date
      }
    }

    // Save the updated order
    await order.save()

    // Return the updated order in the response
    res
      .status(200)
      .json({ message: 'Order status updated successfully', order })
  } catch (error) {
    console.error('Error updating order status:', error)
    res.status(500).json({ message: error.message })
  }
}

// Cancel order
const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params // Order ID to be canceled

    const order = await Order.findById(orderId)
    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    // If the order has already been shipped or delivered, prevent cancellation
    if (
      ['shipped', 'out for delivery', 'delivered'].includes(order.orderStatus)
    ) {
      return res
        .status(400)
        .json({ message: 'Cannot cancel a shipped or delivered order' })
    }

    // Update the order status to 'canceled' and set the canceled date
    order.orderStatus = 'canceled'
    order.canceledDate = new Date() // Set canceled date
    await order.save()

    res.status(200).json({ message: 'Order canceled successfully', order })
  } catch (error) {
    console.error('Error canceling order:', error)
    res.status(500).json({ message: error.message })
  }
}

// Get Canceled Orders by User ID
const getCanceledOrders = async (req, res) => {
  try {
    const { userId } = req.params // Get userId from the URL parameter

    // Fetch canceled orders for the given user
    const canceledOrders = await Order.find({
      userId,
      orderStatus: 'canceled'
    })

    if (!canceledOrders.length) {
      return res.status(404).json({ message: 'No canceled orders found.' })
    }

    res.status(200).json(canceledOrders)
  } catch (error) {
    console.error('Error fetching canceled orders:', error)
    res.status(500).json({ message: error.message })
  }
}

// Return order
const returnOrder = async (req, res) => {
  try {
    const { orderId } = req.params // Order ID to be returned

    const order = await Order.findById(orderId)
    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    // If the order has not been delivered, prevent return
    if (order.orderStatus !== 'delivered') {
      return res
        .status(400)
        .json({ message: 'Can only return delivered orders' })
    }

    // Update the order status to 'returned' and set the return date
    order.orderStatus = 'returned'
    order.returnDate = new Date() // Set return date
    await order.save()

    res.status(200).json({ message: 'Order returned successfully', order })
  } catch (error) {
    console.error('Error returning order:', error)
    res.status(500).json({ message: error.message })
  }
}

// Get Returned Orders by User ID
const getReturnedOrders = async (req, res) => {
  try {
    const { userId } = req.params // Get userId from the URL parameter

    // Fetch returned orders for the given user
    const returnedOrders = await Order.find({
      userId,
      orderStatus: 'returned'
    })

    if (!returnedOrders.length) {
      return res.status(404).json({ message: 'No returned orders found.' })
    }

    res.status(200).json(returnedOrders)
  } catch (error) {
    console.error('Error fetching returned orders:', error)
    res.status(500).json({ message: error.message })
  }
}

// get by order id
const getOrderByOrderId = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }
    res.status(200).json({ success: true, order })
  } catch (error) {
    console.error('Error fetching order:', error)
    res.status(500).json({ message: error.message })
  }
}

// delete order
const deleteOrder = async (req, res) => {
  try {
    // Find the order by its ID
    const order = await Order.findById(req.params.id)

    // If the order does not exist
    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    // Loop through orderDetails to update the corresponding items
    await Promise.all(
      order.orderDetails.map(async item => {
        // Find the item by its ID
        const foundItem = await Item.findById(item.itemId)
        if (!foundItem) {
          throw new Error(`Item with ID ${item.itemId} not found.`)
        }

        // Update the stock and order count of the item
        foundItem.stock += item.quantity // Revert stock based on the deleted order quantity
        foundItem.orderCount -= item.quantity // Decrease order count

        // Update sales
        foundItem.sales -= foundItem.sp * item.quantity // Decrease sales based on quantity and price

        // Save the updated item
        await foundItem.save()
      })
    )

    // Delete the specific order from the database using its ID
    await Order.deleteOne({ _id: req.params.id }) // Pass the correct condition to delete the specific order

    // Return success response
    res.status(200).json({ message: 'Order deleted successfully' })
  } catch (error) {
    console.error('Error deleting order:', error)
    res.status(500).json({ message: error.message })
  }
}

export {
  createOrder,
  getAllOrder,
  updateOrderStatus,
  getByUserId,
  cancelOrder,
  getCanceledOrders,
  returnOrder,
  getReturnedOrders,
  getOrderByOrderId,
  deleteOrder
}
