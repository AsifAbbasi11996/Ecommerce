import React, { useState } from 'react'
import { createUser } from '../api/adminUserApi.js' // Import the createUser function from your API file
import { toast } from 'react-toastify' // Import toast for showing messages
import 'react-toastify/dist/ReactToastify.css'
import '../assets/styles/SignupAndLogin.css'

const Signup = () => {
  const [pending, setPending] = useState(false) // For the loading state
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: ''
  })

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setPending(true) // Set pending to true when submitting the form

    try {
      // Call createUser function to send the form data to the server
      const response = await createUser(formData)

      // If user creation is successful, show success toast
      toast.success('User created successfully!')
      console.log('User created:', response) // Handle successful user creation (e.g., redirect)
    } catch (error) {
      toast.error('Error registering user')
    } finally {
      setPending(false)
    }
  }

  return (
    <div className='signup-container'>
      <div id='signup-form'>
        <h2>Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            name='name'
            placeholder='Name'
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type='text'
            name='username'
            placeholder='Username'
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type='email'
            name='email'
            placeholder='Email'
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type='password'
            name='password'
            placeholder='Password'
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type='submit' disabled={pending}>
            {pending ? 'Creating...' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Signup
