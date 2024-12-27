import React, { useEffect } from 'react'
import '../assets/styles/Contact.css'
import { Link } from 'react-router-dom'
import { CiPhone, CiMail } from 'react-icons/ci'

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <div className='contact_container'>
        <div className='nav'>
          <Link to='/'>Home</Link>
          <p>/</p>
          <Link>Contact</Link>
        </div>

        <div className='contact_content'>
          <div className='first'>
            <div className='top'>
              <p>
                <CiPhone /> Call to us
              </p>
              <p>We are available 24/7, 7 days a week.</p>
              <p>Phone: +8801611112222</p>
            </div>
            <hr />
            <div className='bottom'>
              <p>
                <CiMail /> Write to us
              </p>
              <p>Fill out our form and we will contact you within 24 hours.</p>
              <p>Emails: customer@exclusive.com</p>
              <p>Emails: support@exclusive.com</p>
            </div>
          </div>
          <div className='second'>
            <form>
              <div className='form-group'>
                <input type='text' placeholder='Your Name*' />
                <input type='email' placeholder='Your Email*' />
                <input type='text' placeholder='Your Phone*' />
              </div>
              <div className='form-group'>
                <textarea placeholder='Your Message'></textarea>
              </div>
            </form>
            <Link className='btn'>
              <button>Send Message</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact
