// frontend/src/components/PublicPrices.jsx
import React, { useState, useEffect } from 'react'
import { publicAPI } from '../utils/api'

const PublicPrices = () => {
  const [prices, setPrices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchPrices()
  }, [])

  const fetchPrices = async () => {
    try {
      const response = await publicAPI.getPrices()
      if (response.data.success) {
        setPrices(response.data.prices)
      }
    } catch (err) {
      setError('Failed to fetch prices')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading market prices...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">❌</div>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Market Prices</h1>
          <p className="text-gray-600">Live agricultural commodity prices and predictions</p>
        </div>

        {prices.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📊</div>
            <p className="text-gray-600">No price data available at the moment</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prices.map((price, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 capitalize">
                    {price.commodity}
                  </h3>
                  <span className="text-2xl">🌾</span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Current Price:</span>
                    <span className="text-2xl font-bold text-green-600">
                      ₹{price.currentPrice}/kg
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Predicted Price:</span>
                    <span className="text-lg font-semibold text-blue-600">
                      ₹{price.predictedPrice}/kg
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Quantity:</span>
                    <span className="text-gray-900 font-medium">
                      {price.totalQuantity} kg
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Active Deals:</span>
                    <span className="text-gray-900 font-medium">
                      {price.dealCount}
                    </span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Price Trend:</span>
                    <span className={`text-sm font-medium ${
                      price.predictedPrice > price.currentPrice 
                        ? 'text-green-600' 
                        : price.predictedPrice < price.currentPrice 
                          ? 'text-red-600' 
                          : 'text-gray-600'
                    }`}>
                      {price.predictedPrice > price.currentPrice ? '↗ Rising' : 
                       price.predictedPrice < price.currentPrice ? '↘ Falling' : '→ Stable'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default PublicPrices