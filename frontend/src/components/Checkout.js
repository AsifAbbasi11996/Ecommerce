import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { formatPrice } from '../utils/formatPrice'
import '../assets/styles/Checkout.css'
import { formatImageUrl } from '../utils/formatImage'
import phonepe from '../assets/images/phonepe.webp'
import gpay from '../assets/images/gpay.webp'
import paytm from '../assets/images/paytm.webp'
import amazonpay from '../assets/images/amazonpay.png'

const Checkout = () => {
  const location = useLocation()
  const navigate = useNavigate()

  // Retrieve data passed from either Cart.js or ViewProduct.js
  const cartItems = location.state?.cartItems || []
  const product = location.state?.product || {}
  const selectedImage = location.state?.selectedImage || ''
  const selectedColor = location.state?.selectedColor || ''
  const quantity = location.state?.quantity || 1
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [apartment, setApartment] = useState('')
  const [city, setCity] = useState('')
  const [pincode, setPincode] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('COD') // Default to COD
  const [discount, setDiscount] = useState('')

  const subtotal =
    cartItems.length > 0
      ? cartItems.reduce(
          (total, item) => total + item.item.sp * item.quantity,
          0
        )
      : product.sp * quantity // Calculate subtotal for the single product if cartItems is empty
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
      pincode,
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
        <Link>Product</Link>
        <p>/</p>
        <Link>View Product</Link>
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
              <label>Pincode*</label>
              <input
                type='text'
                value={pincode}
                onChange={e => setPincode(e.target.value)}
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
            {cartItems.length > 0 ? (
              <div className='product-details'>
                {cartItems.map((item, index) => (
                  <div className='product-info' key={index}>
                    <div className='flex1'>
                      <img
                        src={formatImageUrl(item.selectedImage)}
                        alt={item.item.itemName}
                      />
                      <p className='name'>{item.item.itemName}</p>
                      <p>x({item.quantity})</p>
                    </div>
                    <div className='flex2'>
                      <p>{item.selectedColor}</p>
                    </div>
                    <div className='flex3'>
                      <p>{formatPrice(item.item.sp)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className='product-details'>
                <div className='product-info'>
                  <div className='flex1'>
                    <img
                      src={formatImageUrl(selectedImage)}
                      alt={product.itemName}
                    />
                    <p className='name'>{product.itemName}</p>
                    <p>x({quantity})</p>
                  </div>
                  <div className='flex2'>
                    <p>{selectedColor}</p>
                  </div>
                  <div className='flex3'>
                    <p>{formatPrice(product.sp)}</p>
                  </div>
                </div>
              </div>
            )}
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
