// frontend/src/components/FarmerRegister.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { farmerAPI } from '../utils/api'

const FarmerRegister = () => {
  const [formData, setFormData] = useState({ name: '', phone: '' })
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState(1) // 1 = registration, 2 = OTP verification
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [cooldown, setCooldown] = useState(0)
  const navigate = useNavigate()

  const startCooldown = () => {
    setCooldown(30)
    const interval = setInterval(() => {
      setCooldown((c) => {
        if (c > 1) return c - 1
        clearInterval(interval)
        return 0
      })
    }, 1000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    
    try {
      const response = await farmerAPI.register(formData)
      if (response.data.success) {
        setMessage('OTP sent successfully!')
        setStep(2)
        startCooldown()
      }
    } catch (error) {
      setMessage(error.response?.data?.error || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    if (otp.length !== 6) {
      setMessage('Please enter a valid 6-digit OTP')
      return
    }

    setLoading(true)
    setMessage('Verifying OTP...')
    
    try {
      const response = await farmerAPI.verify({ phone: formData.phone, otp })
      
      if (response.data.success) {
        const farmer = response.data.farmer
        
        // Store authentication data
        localStorage.setItem('userType', 'farmer')
        localStorage.setItem('userName', farmer.name)
        localStorage.setItem('userId', farmer.id)
        localStorage.setItem('userPhone', farmer.phone)
        
        setMessage('Registration successful! Redirecting...')
        
        setTimeout(() => {
          navigate('/dashboard') // Redirect to dashboard
        }, 1500)
      }
    } catch (error) {
      setMessage(error.response?.data?.error || 'OTP verification failed')
    } finally {
      setLoading(false)
    }
  }

  const handleResendOtp = async () => {
    setLoading(true)
    setMessage('Resending OTP...')
    
    try {
      await farmerAPI.register(formData)
      setMessage('OTP resent successfully!')
      startCooldown()
    } catch (error) {
      setMessage(error.response?.data?.error || 'Failed to resend OTP')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-600">
        {step === 1 ? 'Farmer Registration' : 'Verify OTP'}
      </h2>
      
      {step === 1 && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Enter your full name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              placeholder="Enter 10-digit phone number"
              pattern="[0-9]{10}"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter OTP sent to {formData.phone}
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-center"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="123456"
              maxLength={6}
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>

          <button
            type="button"
            onClick={handleResendOtp}
            disabled={cooldown > 0 || loading}
            className="w-full text-green-600 hover:text-green-800 disabled:text-gray-400 text-sm"
          >
            {cooldown > 0 ? `Resend OTP in ${cooldown}s` : 'Resend OTP'}
          </button>
        </form>
      )}
      
      {message && (
        <div className={`mt-4 p-3 rounded-md ${message.includes('success') || message.includes('Redirecting') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message}
        </div>
      )}
    </div>
  )
}

export default FarmerRegister