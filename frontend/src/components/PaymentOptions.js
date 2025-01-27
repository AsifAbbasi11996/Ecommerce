import React from 'react'
import phonepe from '../assets/images/phonepe.webp'
import gpay from '../assets/images/gpay.webp'
import paytm from '../assets/images/paytm.webp'
import amazonpay from '../assets/images/amazonpay.png'

const PaymentOptions = ({ paymentMethod, setPaymentMethod }) => {
  return (
    <div className='payment-options'>
      <div className='payment-method'>
        <label>
          <input
            type='radio'
            value='COD'
            checked={paymentMethod === 'COD'}
            onChange={e => setPaymentMethod(e.target.value)}
          />
          Cash on Delivery (COD)
        </label>
      </div>
      <div className='payment-method upi'>
        <label>
          <input
            type='radio'
            value='UPI'
            checked={paymentMethod === 'UPI'}
            onChange={e => setPaymentMethod(e.target.value)}
          />
          UPI
        </label>
        <div className='multiple_upi'>
          <img src={phonepe} />
          <img src={gpay} />
          <img src={paytm} />
          <img src={amazonpay} className='amazonpay' />
        </div>
      </div>
      {/* Place Order Button */}
      <button onClick={handlePlaceOrder} className='place-order-btn'>
        Place Order
      </button>

      {/* RazorPay Component */}
      <RazorPay
        cartItems={cartItems}
        total={total}
        orderDetails={orderDetails}
      />
    </div>
  )
}

export default PaymentOptions
