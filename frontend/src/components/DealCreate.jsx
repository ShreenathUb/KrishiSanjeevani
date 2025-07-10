// frontend/src/components/DealCreate.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { dealAPI } from '../utils/api'

const merchantId = '686e28494725e0d4cc952534' // hardcoded valid ObjectId

const DealCreate = () => {
  const [formData, setFormData] = useState({
    commodity: '',
    quantity: '',
    pricePerKg: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const commodities = [
    'rice', 'wheat', 'corn', 'tomato', 'potato', 'onion', 
    'cotton', 'sugarcane', 'banana', 'apple', 'mango', 'orange'
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    console.log("merchantId:", merchantId) // debug log


    try {
      if (!merchantId) {
        setMessage('Please login first')
        return
      }

      const dealData = {
        ...formData,
        merchantId,
        quantity: parseFloat(formData.quantity),
        pricePerKg: parseFloat(formData.pricePerKg)
      }

      const response = await dealAPI.create(dealData)
      if (response.data.success) {
        setMessage('✅ Deal created successfully!')
        setFormData({ commodity: '', quantity: '', pricePerKg: '' })

        setTimeout(() => {
          navigate('/dashboard')
        }, 2000)
      }
    } catch (error) {
      setMessage(error.response?.data?.error || '❌ Failed to create deal')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-green-600 mb-6">
            📦 Create New Deal
          </h2>

          {message && (
            <div className={`mb-4 p-3 rounded-md text-center ${message.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-medium text-gray-700 mb-1">Commodity</label>
              <select
                required
                value={formData.commodity}
                onChange={(e) => setFormData({ ...formData, commodity: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400"
              >
                <option value="">-- Select Commodity --</option>
                {commodities.map((item) => (
                  <option key={item} value={item} className="capitalize">
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">Quantity (kg)</label>
              <input
                type="number"
                min="1"
                step="0.1"
                required
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                placeholder="e.g. 500"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">Price per kg (₹)</label>
              <input
                type="number"
                min="0.01"
                step="0.01"
                required
                value={formData.pricePerKg}
                onChange={(e) => setFormData({ ...formData, pricePerKg: e.target.value })}
                placeholder="e.g. 35.50"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 font-semibold rounded-xl transition-all duration-300 ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-500 to-teal-500 text-white hover:from-green-400 hover:to-teal-400'
              }`}
            >
              {loading ? 'Creating Deal...' : '🚀 Create Deal'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default DealCreate
