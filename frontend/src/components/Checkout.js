import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { formatPrice } from '../utils/formatPrice'
import '../assets/styles/Checkout.css'
import { formatImageUrl } from '../utils/formatImage'

const Checkout = () => {
  const location = useLocation()
  const navigate = useNavigate()

  // Get the product details from location state
  const product = location.state?.product || {}
  const selectedImage = location.state?.selectedImage || product.images[0]
  const [quantity, setQuantity] = useState(location.state?.quantity || 1)
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [apartment, setApartment] = useState('')
  const [city, setCity] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('COD') // Default to COD
  const [discount, setDiscount] = useState('')

  const subtotal = product.sp * quantity
  const shipping = 50 // Flat shipping fee (can be dynamic)
  const discountAmount = discount ? subtotal * 0.1 : 0 // 10% discount
  const total = subtotal + shipping - discountAmount

  // Handle form submission
  const handlePlaceOrder = () => {
    const orderDetails = {
      name,
      address,
      apartment,
      city,
      phone,
      email,
      product,
      quantity,
      paymentMethod,
      subtotal,
      shipping,
      discountAmount,
      total
    }
    console.log('Order placed:', orderDetails)
    navigate('/order-confirmation') // Navigate to order confirmation page after placing the order
  }

  return (
    <div className='checkout-container'>
      <div className='nav'>
        <Link to='/'>Home</Link>
        <p>/</p>
        <Link to='/v'>Product</Link>
        <p>/</p>
        <Link to='/v/:id'>View Product</Link>
        <p>/</p>
        <Link>Checkout</Link>
      </div>

      <div className='checkout'>
        <h2>Billing Details</h2>
        <div className='checkout-row'>
          <div className='billing-details'>
            <form>
              <label>Full Name*</label>
              <input
                type='text'
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
              <label>Street Address*</label>
              <input
                type='text'
                value={address}
                onChange={e => setAddress(e.target.value)}
                required
              />
              <label>Apartment, Floor, etc. (optional)</label>
              <input
                type='text'
                value={apartment}
                onChange={e => setApartment(e.target.value)}
                required
              />
              <label>Town/City*</label>
              <input
                type='text'
                value={city}
                onChange={e => setCity(e.target.value)}
                required
              />
              <label>Phone Number*</label>
              <input
                type='text'
                value={phone}
                onChange={e => setPhone(e.target.value)}
                required
              />
              <label>Email Address*</label>
              <input
                type='text'
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </form>
          </div>

          <div className='order-summary'>
            <div className='product-details'>
              <div className='product-info'>
                <img src={formatImageUrl(selectedImage)} />
                <p>{product.itemName}</p>
                <p>x({quantity})</p>
              </div>
              <p>{formatPrice(product.sp)}</p>
            </div>
            {/* <p>Qty: {quantity}</p> */}
            <div className='totals'>
              <p>
                <span>Subtotal:</span>
                <span>{formatPrice(subtotal)}</span>
              </p>
              <hr />
              <p>
                <span>Shipping:</span>
                <span>{formatPrice(shipping)}</span>
              </p>
              <hr />
              <p>
                <span>Discount:</span>
                {formatPrice(discountAmount)}
              </p>
              <hr />
              <p>
                <span>Total:</span>
                <span>{formatPrice(total)}</span>
              </p>
            </div>

            {/* Payment Options */}
            <div className='payment-options'>
              <label>
                <input
                  type='radio'
                  value='COD'
                  checked={paymentMethod === 'COD'}
                  onChange={e => setPaymentMethod(e.target.value)}
                />
                Cash on Delivery (COD)
              </label>
              <label>
                <input
                  type='radio'
                  value='UPI'
                  checked={paymentMethod === 'UPI'}
                  onChange={e => setPaymentMethod(e.target.value)}
                />
                UPI
              </label>
            </div>

            {/* Discount */}
            <div className='discount'>
              <label>Enter Discount Code (optional):</label>
              <input
                type='text'
                value={discount}
                onChange={e => setDiscount(e.target.value)}
                placeholder='Enter code'
              />
              <button type='button' onClick={() => setDiscount('DISCOUNT10')}>
                Apply
              </button>
            </div>

            {/* Place Order Button */}
            <button onClick={handlePlaceOrder} className='place-order-btn'>
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
