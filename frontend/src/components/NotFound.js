import React from 'react'
import { Link } from 'react-router-dom'
import '../assets/styles/NotFound.css'

const NotFound = () => {
  return (
    <>
      <div className='notfound_container'>
        <div className='nav'>
            <Link to='/'>Home</Link>
            <p>/</p>
            <Link>404 Error</Link>
        </div>
        <div className='notfound_content'>
          <h1>404 Not Found</h1>
          <p>Your visited page not found. You may go home page.</p>
          <Link className='btn'>
            <button>Back to Home Page</button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default NotFound
