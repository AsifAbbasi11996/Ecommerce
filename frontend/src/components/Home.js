import React from 'react'
import '../assets/styles/Home.css'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { IoArrowForward } from 'react-icons/io5'
import apple from '../assets/images/applelogo.png'
import iphone from '../assets/images/iphone.jpeg'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
      <div className='container'>
        <ul className='lists'>
          <li>
            Men's Fashion <MdKeyboardArrowRight />
          </li>
          <li>
            Women's Fashion <MdKeyboardArrowRight />
          </li>
          <li>
            Electronics <MdKeyboardArrowRight />
          </li>
          <li>Home & Lifestyle</li>
          <li>Medicine</li>
          <li>Sports & Outdoor</li>
          <li>Health & Beauty</li>
        </ul>

        <div className='slider_container'>
          <div className='slider'>
            <div className='slider_content'>
              <div className='slider_text'>
                <p>
                  <img src={apple} alt='Apple Logo' />
                  <span>iPhone 14 series</span>
                </p>
                <h2>Up to 10% off Voucher</h2>
                <Link to='#'>
                  Shop Now <IoArrowForward />
                </Link>
              </div>
              <div className='slider_image'>
                <img src={iphone} alt='iPhone' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
