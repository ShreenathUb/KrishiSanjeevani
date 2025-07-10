// frontend/src/components/DealApprove.jsx
import React, { useState, useEffect } from 'react'
import { dealAPI } from '../utils/api'

const DealApprove = () => {
  const [deals, setDeals] = useState([])
  const [loading, setLoading] = useState(false)
  const [approving, setApproving] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchDeals()
  }, [])

  const fetchDeals = async () => {
    setLoading(true)
    try {
      const response = await dealAPI.getAll()
      setDeals(response.data.deals || [])
    } catch (error) {
      setMessage('Failed to fetch deals')
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (dealId) => {
    const farmer = JSON.parse(localStorage.getItem('farmer') || '{}')
    if (!farmer.id) {
      setMessage('Please register as farmer first')
      return
    }

    setApproving(dealId)
    setMessage('')

    try {
      const response = await dealAPI.approve(dealId, {
        farmerId: farmer.id,
        otp: '123456' // For demo purposes
      })
      
      if (response.data.success) {
        setMessage('Deal approved successfully!')
        fetchDeals() // Refresh deals
      }
    } catch (error) {
      setMessage(error.response?.data?.error || 'Failed to approve deal')
    } finally {
      setApproving(null)
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-8">Loading deals...</div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-600">Available Deals</h2>
      
      {message && (
        <div className={`mb-4 p-3 rounded-md ${message.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message}
        </div>
      )}
      
      {deals.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No pending deals available
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {deals.map(deal => (
            <div key={deal._id} className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-green-600">{deal.commodity}</h3>
                <p className="text-sm text-gray-600">by {deal.merchantId.name}</p>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Quantity:</span>
                  <span className="font-medium">{deal.quantity} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Price per kg:</span>
                  <span className="font-medium">₹{deal.pricePerKg}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Value:</span>
                  <span className="font-bold text-green-600">₹{(deal.quantity * deal.pricePerKg).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="text-sm">{deal.merchantId.location}</span>
                </div>
              </div>
              
              <button
                onClick={() => handleApprove(deal._id)}
                disabled={approving === deal._id}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50"
              >
                {approving === deal._id ? 'Approving...' : 'Approve Deal'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DealApprove