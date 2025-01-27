import React from 'react'
import axios from 'axios'

const RazorPay = ({ total, orderDetails }) => {
  const payNow = async () => {
    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/v1/payment/process',
        {
          total,
          orderDetails
        }
      )
      console.log(data)
    } catch (error) {
      console.error('Payment error:', error)
    }
  }
  return (
    <div>
      <button onClick={payNow}>Pay Now</button>
    </div>
  )
}

export default RazorPay
