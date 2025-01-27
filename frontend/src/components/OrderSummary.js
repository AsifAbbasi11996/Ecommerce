import React from 'react'
import { formatPrice } from '../utils/formatPrice'
import { formatImageUrl } from '../utils/formatImage'
import { truncateText } from '../utils/formatText'

const OrderSummary = ({
  cartItems,
  product,
  total,
  subtotal,
  shipping,
  discountAmount
}) => {
  return (
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
                src={formatImageUrl(product.selectedImage)}
                alt={product.itemName}
              />
              <p className='name'>{product.itemName}</p>
              <p>x({product.quantity})</p>
            </div>
            <div className='flex2'>
              <p>{product.selectedColor}</p>
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
    </div>
  )
}

export default OrderSummary
