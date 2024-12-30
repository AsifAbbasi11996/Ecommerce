import React, { useEffect } from 'react'
import Category from '../components/Category'
import '../assets/styles/Homepage.css'
import BestSellingProducts from '../components/BestSellingProducts'
import Policy from '../components/Policy'
import ImageSlider from '../components/ImageSlider'

const Homepage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className='main'>
      <ImageSlider />
      <hr />
      <div className='component'>
        <Category />
      </div>
      <hr />
      <div className='component'>
        <BestSellingProducts />
      </div>
      <hr />
      <div className='component'>
        <Policy />
      </div>
    </div>
  )
}

export default Homepage
