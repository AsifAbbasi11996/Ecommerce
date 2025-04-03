import React, { useState } from 'react'
import toast from 'react-hot-toast' // Assuming you are using react-hot-toast for notifications

const Razorpay = ({
  orderDetails,
  total,
  userId,
  addressId,
  totalQuantity,
  discountAmount,
  shipping,
  subtotal,
  createOrder
}) => {
  const [isPaymentInProgress, setIsPaymentInProgress] = useState(false)

  const handlePayment = async () => {
    // Set payment in progress to true
    setIsPaymentInProgress(true)

    const options = {
      key: 'rzp_test_zzI1QfN449T6xf', // Your Razorpay key
      amount: total * 100, // Amount in smallest currency unit (e.g., 1000 paise = 10 INR)
      currency: 'INR', // Currency code
      name: 'Ecommerce Website',
      description: 'Order Payment',
      image: 'https://example.com/your-logo.jpg', // Optional logo
      handler: async function (response) {
        // Payment successful, now store order data

        // After successful payment, set payment status to false
        setIsPaymentInProgress(false)

        // Prepare the order details
        const orderPayload = {
          userId,
          addressId,
          orderDetails,
          totalQuantity,
          discountAmount,
          shippingFee: shipping,
          subtotal,
          total,
          paymentMethod: 'Razorpay', // Update payment method to Razorpay
          orderplacedDate: new Date(),
          deliveryDate: new Date(), // Add appropriate delivery date logic
          razorpayPaymentId: response.razorpay_payment_id // Store the Razorpay payment ID
        }

        // Now create the order in the backend (only after successful payment)
        try {
          const orderResponse = await createOrder(orderPayload)
          if (orderResponse?.data) {
            toast.success('Order Placed Successfully')
            console.log('Order placed:', orderResponse.data)
          }
        } catch (error) {
          console.error('Failed to place order:', error)
          toast.error('Error placing order')
        }
      },
      prefill: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone_number: '9999999999'
      },
      notes: {
        address: 'Hello World'
      },
      theme: {
        color: '#F37254'
      }
    }

    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
  }

  return (
    <div>
      <button
        onClick={handlePayment}
        className='pay-now-btn'
        disabled={isPaymentInProgress}
      >
        Pay Now
      </button>
    </div>
  )
}

export default Razorpay
