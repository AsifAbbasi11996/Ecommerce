import React from 'react'
import '../assets/styles/Policy.css'
import { BsHeadphones, BsTruck } from 'react-icons/bs'
import { RiSecurePaymentFill } from 'react-icons/ri'

const Policy = () => {
  return (
    <>
      <div className='policy_container'>
        <div className='services'>
          <div className='icon'>
            <BsTruck />
          </div>
          <p>FREE AND FAST DELIVERY</p>
          <p>Free delivery for all orders over $140</p>
        </div>
        <div className='services'>
          <div className='icon'>
            <BsHeadphones />
          </div>
          <p>24/7 CUSTOMER SERVICE</p>
          <p>Friendly 24/7 customer support</p>
        </div>
        <div className='services'>
          <div className='icon'>
            <RiSecurePaymentFill />
          </div>
          <p>MONEY BACK GUARANTEE</p>
          <p>We return money within 7 days</p>
        </div>
      </div>
    </>
  )
}

export default Policy
