import React from 'react'
import jbl from '../assets/images/jbl_speaker.png'
import '../assets/styles/Banner.css'

const Banner = () => {
  return (
    <>
      <div className='banner_container'>
        <div className='banner_content'>
          <div className='banner_text'>
            <p>Categories</p>
            <h2>Enhance Your Music Experience</h2>
            <button>
              Buy Now!
            </button>
          </div>
          <div className='slider_image'>
            <img src={jbl} alt='iPhone' />
          </div>
        </div>
      </div>
    </>
  )
}

export default Banner
