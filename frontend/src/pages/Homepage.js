import React, { useEffect } from 'react'
// import Home from '../components/Home'
// import FlashSales from '../components/FlashSales'
import Category from '../components/Category'
import '../assets/styles/Homepage.css'
import BestSellingProducts from '../components/BestSellingProducts'
// import Banner from '../components/Banner'
// import OurProducts from '../components/OurProducts'
// import NewArrival from '../components/NewArrival'
import Policy from '../components/Policy'
import ImageSlider from '../components/ImageSlider'

const Homepage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className='main'>
      {/* <Home /> */}
      <ImageSlider />
      {/* <FlashSales /> */}
      <hr />
      <Category />
      <hr />
      <BestSellingProducts />
      {/* <hr /> */}
      {/* <Banner /> */}
      {/* <hr /> */}
      {/* <OurProducts /> */}
      <hr />
      {/* <NewArrival /> */}
      <Policy />
    </div>
  )
}

export default Homepage
