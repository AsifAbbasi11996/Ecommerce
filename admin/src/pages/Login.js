import React, { useState } from 'react'
import { loginUser } from '../api/adminUserApi.js' // Import the login function from your API file
import { toast } from 'react-toastify' // Import toast for showing messages
import 'react-toastify/dist/ReactToastify.css'
import '../assets/styles/SignupAndLogin.css'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const [pending, setPending] = useState(false) // For the loading state
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
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
      // Call the loginUser function and pass the user input data
      const response = await loginUser(formData)

      // If login is successful, show success toast
      toast.success('Login successful!')
      console.log('User logged in:', response) // Handle successful login response (e.g., store token)
      navigate('/dashboard')

      // You can store the token and user data in localStorage or state as needed
      localStorage.setItem('token', response.token)
    } catch (error) {
      toast.error('Invalid credentials or server error')
    } finally {
      setPending(false)
    }
  }

  return (
    <div id='login-form'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='usernameOrEmail'
          placeholder='Username or Email'
          value={formData.usernameOrEmail}
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
          {pending ? 'Logging...' : 'Login'}
        </button>
      </form>
    </div>
  )
}

export default Login
