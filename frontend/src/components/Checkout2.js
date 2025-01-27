import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { createOrder } from '../api/orderApi'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import BillingDetails from './BillingDetails'
import OrderSummary from './OrderSummary'
import PaymentOptions from './PaymentOptions'
import RazorPay from './RazorPay'

const Checkout = () => {
  const location = useLocation()
  const cartItems = location.state?.cartItems || []
  const product = location.state?.product || []
  const quantity = location.state?.quantity || 1
  const userId = localStorage.getItem('userId')

  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [apartment, setApartment] = useState('')
  const [city, setCity] = useState('')
  const [pincode, setPincode] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('COD')
  const [addressId, setAddressId] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const data = await getAddressByUserId(userId)
        if (data.length > 0) {
          const userAddress = data[0]
          setAddressId(userAddress._id)
          setName(userAddress.fullName)
          setAddress(userAddress.street)
          setApartment(userAddress.apartment)
          setCity(userAddress.city)
          setPincode(userAddress.pincode)
          setPhone(userAddress.phone)
          setEmail(userAddress.email)
        }
      } catch (error) {
        console.error('Error fetching address:', error)
      }
    }

    fetchAddress()
  }, [userId])

  const handlePlaceOrder = async () => {
    try {
      // Calculate the order total (this may include item price, shipping, discounts, etc.)
      const subtotal = cartItems.reduce(
        (acc, item) => acc + item.item.sp * item.quantity,
        0
      )
      const shipping = 50 // Assume a fixed shipping fee, can be dynamic based on location
      const discountAmount = 0 // Or apply some logic to apply discounts
      const total = subtotal + shipping - discountAmount // Final order total

      // Prepare the order data object
      const orderData = {
        userId,
        name,
        address,
        apartment,
        city,
        pincode,
        phone,
        email,
        cartItems,
        total,
        shipping,
        discountAmount,
        paymentMethod, // 'COD' or 'UPI' or other payment methods
        addressId, // The address ID if you want to store that as well
        status: 'pending' // Can be 'pending', 'completed', or other statuses
      }

      // If the payment method is UPI or RazorPay, process the payment
      if (paymentMethod === 'UPI' || paymentMethod === 'RazorPay') {
        const paymentResponse = await initiatePayment(orderData, total)

        if (paymentResponse.success) {
          // After successful payment, update the order status
          await saveOrderToBackend(orderData)
          toast.success('Order placed successfully and payment successful!')
        } else {
          toast.error('Payment failed. Please try again.')
        }
      } else {
        // If COD, proceed without payment integration
        await saveOrderToBackend(orderData)
        toast.success('Order placed successfully with Cash on Delivery!')
      }

      // Reset checkout form or redirect to a confirmation page after placing the order
      // You can use React Router's `useHistory` to redirect to another page
      // history.push('/order-confirmation')
    } catch (error) {
      console.error('Error placing order:', error)
      toast.error(
        'There was an error while placing your order. Please try again.'
      )
    }
  }

  // Helper function to simulate backend order saving (you would replace this with an actual API call)
  const saveOrderToBackend = async orderData => {
    try {
      const response = await axios.post('/api/v1/orders', orderData)
      return response.data
    } catch (error) {
      throw new Error('Failed to save order to backend')
    }
  }

  // Helper function to handle payment via RazorPay (simulated here)
  const initiatePayment = async (orderData, totalAmount) => {
    try {
      // Call your backend to initiate RazorPay or UPI payment
      const response = await axios.post('/api/v1/payment/initiate', {
        orderData,
        totalAmount
      })
      return response.data // Assuming this contains the success status of payment initiation
    } catch (error) {
      throw new Error('Payment initiation failed')
    }
  }

  return (
    <div className='checkout-container'>
      <BillingDetails
        address={address}
        name={name}
        apartment={apartment}
        city={city}
        pincode={pincode}
        phone={phone}
        email={email}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        handleAddressSubmit={handleAddressSubmit}
        setName={setName}
        setAddress={setAddress}
        setApartment={setApartment}
        setCity={setCity}
        setPincode={setPincode}
        setPhone={setPhone}
        setEmail={setEmail}
      />
      <OrderSummary
        cartItems={cartItems}
        product={product}
        total={total}
        subtotal={subtotal}
        shipping={shipping}
        discountAmount={discountAmount}
      />
      <PaymentOptions
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
      />
      <RazorPay total={total} orderDetails={orderDetails} />
      <ToastContainer />
    </div>
  )
}

export default Checkout
