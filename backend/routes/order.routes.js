import express from 'express'
import {
  cancelOrder,
  createOrder,
  deleteOrder,
  getAllOrder,
  getByUserId,
  getCanceledOrders,
  getOrderByOrderId,
  getReturnedOrders,
  returnOrder,
  updateOrderStatus
} from '../controllers/order.controller.js'

const router = express.Router()

// create order
router.post('/create', createOrder)

//get all order
router.get('/all', getAllOrder)

//get order by userid
router.get('/get/user/:userId', getByUserId)

// update order status
router.patch('/updateStatus/:orderId', updateOrderStatus)

// cancel order
router.patch('/cancel/:orderId', cancelOrder)

// get canceled orders
router.get('/cancelOrders/:userId', getCanceledOrders)

// return order
router.patch('/return/:orderId', returnOrder)

// get return order
router.get('/returnOrders/:userId', getReturnedOrders)

// get order by order id
router.get('/get/:id', getOrderByOrderId)

// delete order by order id
router.delete('/delete/:id', deleteOrder)

export default router
