import React from 'react'
import '../assets/styles/NewArrival.css'
import ps5 from '../assets/images/ps5.png'
import women from '../assets/images/women.jpeg'
import alexa from '../assets/images/alexa.png'
import gucci from '../assets/images/gucci.png'
import { Link } from 'react-router-dom'

const NewArrival = () => {
  return (
    <>
      <div className='newarrival_container'>
        <div className='newarrival_header'>
          <p>Featured </p>
          <h2>New Arrival</h2>
        </div>
        <div className='newarrival_images'>
          <div className='big_image_content'>
            <div className='big_image_text'>
              <h3>PlayStation 5</h3>
              <p>Black and White version of the PS5 coming out on sale.</p>
              <Link>Shop Now</Link>
            </div>
            <div className='big_image'>
              <img src={ps5} />
            </div>
          </div>
          <div className='three_image'>
            <div className='image-top'>
              <div className='image-top-text'>
                <h3>Women's Collections</h3>
                <p>Featured woman collections that give you another vibe.</p>
                <Link>Shop Now</Link>
              </div>
              <img src={women} className='first' />
            </div>
            <div className='image-bottom'>
              <div className='content-1'>
                <div className='image-bottom-text'>
                  <h3>Speakers</h3>
                  <p>Amazon Wireless Speakers.</p>
                  <Link>Shop Now</Link>
                </div>
                <img src={alexa} className='second' />
              </div>
              <div className='content-2'>
                <div className='image-bottom-text'>
                  <h3>Perfume</h3>
                  <p>GUCCI INTENSE OUD EDP.</p>
                  <Link>Shop Now</Link>
                </div>
                <img src={gucci} className='third' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NewArrival
