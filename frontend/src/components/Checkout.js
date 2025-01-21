import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { formatPrice } from '../utils/formatPrice'
import '../assets/styles/Checkout.css'
import { formatImageUrl } from '../utils/formatImage'
import phonepe from '../assets/images/phonepe.webp'
import gpay from '../assets/images/gpay.webp'
import paytm from '../assets/images/paytm.webp'
import amazonpay from '../assets/images/amazonpay.png'
import {
  addAddress,
  getAddressByUserId,
  updateAddress
} from '../api/addressApi'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css' // Import toast styles
import { BsPencilFill } from 'react-icons/bs'
import { createOrder } from '../api/orderApi'
import { truncateText } from '../utils/formatText'

const Checkout = () => {
  const location = useLocation()
  const navigate = useNavigate()

  // Retrieve data passed from either Cart.js or ViewProduct.js
  const cartItems = location.state?.cartItems || []
  const product = location.state?.product || []
  const selectedImage = location.state?.selectedImage || ''
  const selectedColor = location.state?.selectedColor || ''
  const quantity = location.state?.quantity || 1
  const userId = localStorage.getItem('userId')

  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [apartment, setApartment] = useState('')
  const [city, setCity] = useState('')
  const [pincode, setPincode] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('COD') // Default to COD
  const [addressId, setAddressId] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

  // Function to calculate discount for each product based on its discount
  const calculateDiscount = (sp, discountPercentage) => {
    if (discountPercentage) {
      return (sp * discountPercentage) / 100
    }
    return 0
  }

  // Calculate subtotal, discount amount, and total
  const subtotal =
    cartItems.length > 0
      ? cartItems.reduce(
          (total, item) => total + item.item.sp * item.quantity,
          0
        )
      : product.sp * quantity // Single product case

  const discountAmount =
    cartItems.length > 0
      ? cartItems.reduce(
          (totalDiscount, item) =>
            totalDiscount +
            calculateDiscount(item.item.sp, item.item.discount?.percentage) *
              item.quantity,
          0
        )
      : calculateDiscount(product.sp, product.discount?.percentage) * quantity // For single product

  const shipping = 80 // Flat shipping fee (can be dynamic)
  const total = subtotal + shipping

  // Fetch the user's address when the component mounts
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

  // Handle address update or add
  const handleAddressSubmit = async e => {
    e.preventDefault()

    const addressData = {
      userId: userId,
      fullName: name,
      street: address,
      apartment,
      city,
      pincode,
      phone,
      email
    }

    try {
      if (addressId) {
        // Update address
        await updateAddress(addressId, addressData)
        toast.success('Address updated Successfully', {
          position: 'top-right', // Position at the top-right
          autoClose: 3000, // Duration of 3 seconds
          hideProgressBar: false, // Hide the progress bar
          draggable: false // Non-draggable
        })
      } else {
        // Add new address
        await addAddress(addressData)
        toast.success('Address added Successfully', {
          position: 'top-right', // Position at the top-right
          autoClose: 3000, // Duration of 3 seconds
          hideProgressBar: false, // Hide the progress bar
          draggable: false // Non-draggable
        })
      }
      setIsEditing(false)
    } catch (error) {
      console.error('Error saving address:', error)
    }
  }

  // Handle form submission
  const handlePlaceOrder = async () => {
    // Calculate totalQuantity
    const totalQuantity =
      cartItems.length > 0
        ? cartItems.reduce((total, item) => total + item.quantity, 0) // Sum up the quantity of each item in the cart
        : quantity // Single product case, just use the quantity

    // Prepare order details
    const orderDetails =
      cartItems.length > 0
        ? cartItems.map(item => ({
            itemId: item.item._id, // Product ID
            itemName: item.item.itemName,
            price: item.item.sp,
            quantity: item.quantity,
            selectedColor: item.selectedColor,
            selectedImage: formatImageUrl(item.selectedImage)
          }))
        : [
            {
              itemId: product._id, // Single product ID
              itemName: product.itemName,
              price: product.sp,
              quantity,
              selectedColor,
              selectedImage: formatImageUrl(selectedImage)
            }
          ]

    const orderPayload = {
      userId,
      addressId,
      orderDetails,
      totalQuantity,
      discountAmount,
      shippingFee: shipping,
      subtotal,
      total,
      paymentMethod,
      orderplacedDate: new Date(),
      deliveryDate: new Date()
    }

    try {
      const response = await createOrder(orderPayload)
      if (response?.data) {
        toast.success('Order Placed Successfully')
        console.log('Order placed:', response.data)
        // navigate('/order-confirmation') // Navigate to order confirmation page
      }
    } catch (error) {
      console.error('Failed to place order:', error)
      toast.error('Error placing order')
    }
  }

  return (
    <div className='checkout-container'>
      <div className='nav'>
        <Link to='/'>Home</Link>
        <p>/</p>
        <Link>Checkout</Link>
      </div>

      <div className='checkout'>
        <div className='checkout-row'>
          <div className='billing-details'>
            <div className='header'>
              <h2>Billing Details</h2>
              <button
                className='edit-btn'
                type='button'
                onClick={() => setIsEditing(true)}
              >
                <BsPencilFill /> Edit Address
              </button>
            </div>

            {/* Show address or form */}
            {address ? (
              !isEditing ? (
                <div className='address-details'>
                  <p className='name'>{name}</p>
                  <p>{address}</p>
                  <p>{apartment}</p>
                  <p>{city}</p>
                  <p>{pincode}</p>
                  <p>{phone}</p>
                  <p>{email}</p>
                </div>
              ) : (
                <form onSubmit={handleAddressSubmit}>
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
                  <div className='btns'>
                    <button
                      className='cancel-btn'
                      type='button'
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </button>
                    <button className='save_address' type='submit'>
                      Save Address
                    </button>
                  </div>
                </form>
              )
            ) : (
              // If no address is found, show the form directly
              <form onSubmit={handleAddressSubmit}>
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
                <div className='btns'>
                  <button
                    className='cancel-btn'
                    type='button'
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                  <button className='save_address' type='submit'>
                    Save Address
                  </button>
                </div>
              </form>
            )}
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
                      <p className='name'>{truncateText(item.item.itemName)}</p>
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
                <span>Shipping Fee:</span>
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

            {/* Place Order Button */}
            <button onClick={handlePlaceOrder} className='place-order-btn'>
              Place Order
            </button>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  )
}

export default Checkout
