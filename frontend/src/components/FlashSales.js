import React from 'react'
import joystick from '../assets/images/joystick.png'
import { CiHeart } from 'react-icons/ci'
import { BsEye } from 'react-icons/bs'
import { FaStar } from 'react-icons/fa6'
import '../assets/styles/FlashSales.css'
import { Link } from 'react-router-dom'

const FlashSales = () => {
  return (
    <>
      <div className='flashsales_container'>
        <div className='flashsales_header'>
          <p>Today's </p>
          <h2>Flash Sales</h2>
        </div>

        <div className='flashsales_products'>
          <div className='card'>
            <div className='card-product'>
              <p className='discount'>-40%</p>
              <div className='card-image'>
                <img src={joystick} />
              </div>
              <div className='icons'>
                <div className='icon'>
                  <CiHeart />
                </div>
                <div className='icon'>
                  <BsEye />
                </div>
              </div>
            </div>
            <div className='card-content'>
              <p>HAVIT HV-G92 Gamepad</p>
              <p className='price'>
                <span className='sp'>$120</span>
                <span className='mrp'>$160</span>
              </p>
              <p className='rating'>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </p>
            </div>
          </div>
          <div className='card'>
            <div className='card-product'>
              <p className='discount'>-40%</p>
              <div className='card-image'>
                <img src={joystick} />
              </div>
              <div className='icons'>
                <div className='icon'>
                  <CiHeart />
                </div>
                <div className='icon'>
                  <BsEye />
                </div>
              </div>
            </div>
            <div className='card-content'>
              <p>HAVIT HV-G92 Gamepad</p>
              <p className='price'>
                <span className='sp'>$120</span>
                <span className='mrp'>$160</span>
              </p>
              <p className='rating'>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </p>
            </div>
          </div>
          <div className='card'>
            <div className='card-product'>
              <p className='discount'>-40%</p>
              <div className='card-image'>
                <img src={joystick} />
              </div>
              <div className='icons'>
                <div className='icon'>
                  <CiHeart />
                </div>
                <div className='icon'>
                  <BsEye />
                </div>
              </div>
            </div>
            <div className='card-content'>
              <p>HAVIT HV-G92 Gamepad</p>
              <p className='price'>
                <span className='sp'>$120</span>
                <span className='mrp'>$160</span>
              </p>
              <p className='rating'>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </p>
            </div>
          </div>
          <div className='card'>
            <div className='card-product'>
              <p className='discount'>-40%</p>
              <div className='card-image'>
                <img src={joystick} />
              </div>
              <div className='icons'>
                <div className='icon'>
                  <CiHeart />
                </div>
                <div className='icon'>
                  <BsEye />
                </div>
              </div>
            </div>
            <div className='card-content'>
              <p>HAVIT HV-G92 Gamepad</p>
              <p className='price'>
                <span className='sp'>$120</span>
                <span className='mrp'>$160</span>
              </p>
              <p className='rating'>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </p>
            </div>
          </div>
          <div className='card'>
            <div className='card-product'>
              <p className='discount'>-40%</p>
              <div className='card-image'>
                <img src={joystick} />
              </div>
              <div className='icons'>
                <div className='icon'>
                  <CiHeart />
                </div>
                <div className='icon'>
                  <BsEye />
                </div>
              </div>
            </div>
            <div className='card-content'>
              <p>HAVIT HV-G92 Gamepad</p>
              <p className='price'>
                <span className='sp'>$120</span>
                <span className='mrp'>$160</span>
              </p>
              <p className='rating'>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </p>
            </div>
          </div>
          <div className='card'>
            <div className='card-product'>
              <p className='discount'>-40%</p>
              <div className='card-image'>
                <img src={joystick} />
              </div>
              <div className='icons'>
                <div className='icon'>
                  <CiHeart />
                </div>
                <div className='icon'>
                  <BsEye />
                </div>
              </div>
            </div>
            <div className='card-content'>
              <p>HAVIT HV-G92 Gamepad</p>
              <p className='price'>
                <span className='sp'>$120</span>
                <span className='mrp'>$160</span>
              </p>
              <p className='rating'>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </p>
            </div>
          </div>
          <div className='card'>
            <div className='card-product'>
              <p className='discount'>-40%</p>
              <div className='card-image'>
                <img src={joystick} />
              </div>
              <div className='icons'>
                <div className='icon'>
                  <CiHeart />
                </div>
                <div className='icon'>
                  <BsEye />
                </div>
              </div>
            </div>
            <div className='card-content'>
              <p>HAVIT HV-G92 Gamepad</p>
              <p className='price'>
                <span className='sp'>$120</span>
                <span className='mrp'>$160</span>
              </p>
              <p className='rating'>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </p>
            </div>
          </div>
        </div>

        <Link className='btn'>
          <button>View Products</button>
        </Link>
      </div>
    </>
  )
}

export default FlashSales
