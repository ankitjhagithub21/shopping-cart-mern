import React, { useState } from 'react'
import { Eye, EyeOff, ShoppingCart, Mail, Lock, User } from 'lucide-react'
import toast from "react-hot-toast"
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const initialData = {
    name: "",
    email: "",
    password: ""
  }

  const [formData, setFormData] = useState(initialData)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    

    try {
      setLoading(true)
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (data.success) {
        setFormData(initialData)
        toast.success(data.message)
        navigate("/login")
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error("Something went wrong.")
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen pt-32 pb-10 flex items-center justify-center px-4'>
      <div className='relative z-10 w-full max-w-md'>
        <div className='bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20'>
          {/* Header */}
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-4 shadow-lg'>
              <ShoppingCart className='w-8 h-8 ' />
            </div>
            <h1 className='text-3xl font-bold mb-2'>Create Account</h1>
            <p>Join our shopping community</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className='space-y-6'>

            {/* Name Field */}
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <User className='h-5 w-5' />
              </div>
              <input
                type="text"
                placeholder='Enter your name'
                name='name'
                className='w-full pl-10 pr-4 py-3 bg-white/10 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300'
                value={formData.name}
                onChange={handleChange}
                required
                autoComplete='off'
              />
            </div>

            {/* Email Field */}
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <Mail className='h-5 w-5' />
              </div>
              <input
                type="email"
                placeholder='Enter your email'
                name='email'
                className='w-full pl-10 pr-4 py-3 bg-white/10 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300'
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete='off'
              />
            </div>

            {/* Password Field */}
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <Lock className='h-5 w-5' />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder='Enter your password'
                name='password'
                className='w-full pl-10 pr-12 py-3 bg-white/10 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300'
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete='off'
              />
              <button
                type="button"
                className='absolute inset-y-0 right-0 pr-3 flex items-center hover:text-purple-500 transition-colors'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className='h-5 w-5' /> : <Eye className='h-5 w-5' />}
              </button>
            </div>

            {/* Register Button */}
            <button
              type='submit'
              className='w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-blue-500 font-semibold rounded-xl shadow-lg hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 transform text-white hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
            >
              {loading ? (
                <div className='flex items-center justify-center'>
                  <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2'></div>
                  Creating account...
                </div>
              ) : (
                <div className='flex items-center justify-center'>
                  <User className='w-5 h-5 mr-2' />
                  Register
                </div>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className='my-6 flex items-center'>
            <div className='flex-1 border-t border-white/20'></div>
            <span className='px-4 text-sm'>or</span>
            <div className='flex-1 border-t border-white/20'></div>
          </div>

          {/* Login Link */}
          <div className='text-center'>
            <p>
              Already have an account?{' '}
              <button
                className='text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-300 hover:underline'
                onClick={() => navigate("/login")}
              >
                Sign In
              </button>
            </p>
          </div>

        
        </div>
      </div>
    </div>
  )
}

export default Register
