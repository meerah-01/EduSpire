 import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaRegUser } from "react-icons/fa"
import { HiOutlineLockClosed } from "react-icons/hi"
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('https://eduspire-backend.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await response.json()
      console.log("LOGIN RESPONSE:", data)

      if (!response.ok) {
        setError(data.message || 'Login failed. Please check your credentials.')
        return
      }

      // Handle different backend response shapes
      const token = data.token || data.data?.token || data.accessToken || data.data?.accessToken
      const student = data.student || data.data?.student || data.user || data.data?.user

      if (!token) {
        setError('Login succeeded but no token returned. Contact support.')
        console.error('No token in:', data)
        return
      }

      localStorage.setItem('token', token)
      localStorage.setItem('student', JSON.stringify(student || {}))
      
      navigate('/dashboard')

    } catch (err) {
      console.error('Login error:', err)
      setError('Unable to connect to server. Please check if backend is awake and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='w-full min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8'>
      <div className='w-full max-w-md p-8 rounded-2xl bg-white shadow-lg'>
        <div className='text-center mb-8'>
          <div className='inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-4'>
            <FaRegUser className='text-xl' />
          </div>
          <h2 className='text-2xl font-bold text-gray-900'>Welcome Back</h2>
          <p className='text-sm text-gray-500 mt-1'>Sign in to your EduSpire account</p>
        </div>

        {error && (
          <div className='mb-4 p-3 rounded-lg bg-red-50 text-red-600 text-sm text-center'>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='relative'>
            <FaRegUser className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='Email Address'
              required
              className='w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm'
            />
          </div>

          <div className='relative'>
            <HiOutlineLockClosed className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              placeholder='Password'
              required
              className='w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm'
            />
          </div>

          <button
            type='submit'
            disabled={isLoading}
            className='w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className='text-center text-sm text-gray-500 mt-6'>
          Don't have an account? <Link to='/signup' className='text-blue-600 font-medium hover:underline'>Sign Up</Link>
        </p>
      </div>
    </div>
  )
}

export default Login