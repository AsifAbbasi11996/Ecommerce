import React, { useState, useEffect } from 'react'
import '../assets/styles/ImageSlider.css'
import { Link } from 'react-router-dom'
import { getAllSliders } from '../api/sliderApi.js'
import { formatImageUrl } from '../utils/formatImage.js'
import { IoArrowForward } from 'react-icons/io5'
import Loader from './Loader' // Import the loader component

const ImageSlider = () => {
  const [images, setImages] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true) // Loading state
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const response = await getAllSliders()
        setImages(response)
        setLoading(false) // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching sliders:', error)
        setLoading(false) // Set loading to false in case of error as well
      }
    }

    fetchSliders()
  }, [])

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      goToNext()
    }, 3000)

    return () => clearInterval(timer)
  }, [currentIndex])

  // Ensure that the data exists and is structured properly
  const currentImage = images[currentIndex]

  return (
    <div className='slider_container'>
      {loading ? (
        // Show the loader if the data is still loading
        <Loader />
      ) : (
        <>
          {images.length > 0 && currentImage ? (
            <>
              <div className='slider-arrow left' onClick={goToPrevious}>
                &#10094;
              </div>
              <div className='slider'>
                <div className='slider_content'>
                  {/* Slider Text */}
                  <div className='slider_text'>
                    <p>
                      {/* Ensure smallimage exists */}
                      {currentImage.smallimage && (
                        <img
                          src={formatImageUrl(currentImage.smallimage)}
                          alt='Small Icon'
                        />
                      )}
                      <span>{currentImage.smalltext}</span>
                    </p>
                    <h2>{currentImage.bigtext}</h2>
                    <Link to={currentImage.link}>
                      Shop Now <IoArrowForward />
                    </Link>
                  </div>

                  {/* Slider Image */}
                  <div className='slider_image'>
                    {/* Conditionally render based on window width */}
                    {windowWidth <= 530
                      ? // Use mobileImage if screen width is less than or equal to 530px
                        currentImage.mobileImage && (
                          <img
                            src={formatImageUrl(currentImage.mobileImage)}
                            alt={`Slide ${currentIndex}`}
                          />
                        )
                      : // Use regular image if screen width is greater than 530px
                        currentImage.image && (
                          <img
                            src={formatImageUrl(currentImage.image)}
                            alt={`Slide ${currentIndex}`}
                          />
                        )}
                  </div>
                </div>
              </div>
              <div className='slider-arrow right' onClick={goToNext}>
                &#10095;
              </div>
              <div className='slider-dots'>
                {images.map((_, index) => (
                  <span
                    key={index}
                    className={`dot ${index === currentIndex ? 'active' : ''}`}
                    onClick={() => setCurrentIndex(index)}
                  ></span>
                ))}
              </div>
            </>
          ) : (
            <p>No sliders available</p>
          )}
        </>
      )}
    </div>
  )
}

export default ImageSlider
