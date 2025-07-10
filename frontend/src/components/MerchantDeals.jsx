import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { dealAPI } from '../utils/api'

const MerchantDeals = () => {
  const [deals, setDeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [deletingDeal, setDeletingDeal] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedDeal, setSelectedDeal] = useState(null)

  useEffect(() => {
    fetchMerchantDeals()
  }, [])

  const fetchMerchantDeals = async () => {
    try {
      const userId = localStorage.getItem('userId')
      const response = await dealAPI.getForMerchant(userId)

      if (response.ok) {
        const data = await response.json()
        setDeals(data.deals || [])
      } else {
        setError('Failed to fetch deals')
      }
    } catch (err) {
      setError('Error loading deals')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteDeal = async () => {
    if (!selectedDeal) return

    setDeletingDeal(selectedDeal._id)
    try {
      const response = await dealAPI.delete(selectedDeal._id)
      
      if (response.ok) {
        setShowDeleteModal(false)
        setSelectedDeal(null)
        fetchMerchantDeals() // Refresh deals
        alert('Deal deleted successfully!')
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to delete deal')
      }
    } catch (err) {
      alert('Error deleting deal')
    } finally {
      setDeletingDeal(null)
    }
  }

  const openDeleteModal = (deal) => {
    setSelectedDeal(deal)
    setShowDeleteModal(true)
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return '⏳'
      case 'approved':
        return '✅'
      case 'rejected':
        return '❌'
      default:
        return '📋'
    }
  }

  const getStatusMessage = (status) => {
    switch (status) {
      case 'pending':
        return 'Waiting for farmer response'
      case 'approved':
        return 'Deal completed successfully'
      case 'rejected':
        return 'Deal declined by farmer'
      default:
        return 'Unknown status'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your deals...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            📊 My Deals
          </h1>
          <p className="text-gray-600 text-lg">
            Track and manage your created deals
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Quick Stats */}
        {deals.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
              <div className="text-2xl font-bold">{deals.length}</div>
              <div className="text-blue-100">Total Deals</div>
            </div>
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-6 text-white">
              <div className="text-2xl font-bold">{deals.filter(d => d.status === 'pending').length}</div>
              <div className="text-yellow-100">Pending</div>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white">
              <div className="text-2xl font-bold">{deals.filter(d => d.status === 'approved').length}</div>
              <div className="text-green-100">Approved</div>
            </div>
            <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl p-6 text-white">
              <div className="text-2xl font-bold">{deals.filter(d => d.status === 'rejected').length}</div>
              <div className="text-red-100">Rejected</div>
            </div>
          </div>
        )}

        {deals.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-6">📦</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No Deals Created Yet</h2>
            <p className="text-gray-600 mb-8">You haven't created any deals yet. Start by creating your first deal!</p>
            <Link to="/dealcreate">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl font-semibold hover:from-blue-400 hover:to-cyan-400 transition-all duration-300 shadow-lg shadow-blue-500/50">
                Create Your First Deal
              </button>
            </Link>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Your Deals</h2>
              <Link to="/dealcreate">
                <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold hover:from-blue-400 hover:to-cyan-400 transition-all duration-300">
                  + Create New Deal
                </button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {deals.map((deal) => (
                <div key={deal._id} className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 hover:bg-white/20 transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-800">{deal.commodity}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      deal.status === 'approved' ? 'bg-green-100 text-green-800' :
                      deal.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {getStatusIcon(deal.status)} {deal.status}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-gray-600 mb-4">
                    <p><strong>Quantity:</strong> {deal.quantity} kg</p>
                    <p><strong>Price:</strong> ₹{deal.pricePerKg}/kg</p>
                    <p><strong>Total Value:</strong> ₹{(deal.quantity * deal.pricePerKg).toLocaleString()}</p>
                    {deal.farmerId && (
                      <p><strong>Farmer:</strong> {deal.farmerId?.name || 'Unknown'}</p>
                    )}
                    <p><strong>Created:</strong> {new Date(deal.createdAt).toLocaleDateString()}</p>
                    {deal.status === 'approved' && deal.approvedAt && (
                      <p className="text-green-600"><strong>Approved:</strong> {new Date(deal.approvedAt).toLocaleDateString()}</p>
                    )}
                    {deal.status === 'rejected' && deal.rejectionReason && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-2">
                        <p className="text-red-600 text-sm"><strong>Rejection Reason:</strong></p>
                        <p className="text-red-700 text-sm">{deal.rejectionReason}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      {getStatusMessage(deal.status)}
                    </div>
                    
                    {deal.status === 'pending' && (
                      <button
                        onClick={() => openDeleteModal(deal)}
                        disabled={deletingDeal === deal._id}
                        className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg text-sm font-medium hover:from-red-400 hover:to-pink-400 transition-all duration-300 disabled:opacity-50"
                      >
                        {deletingDeal === deal._id ? 'Deleting...' : '🗑️ Delete'}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4">
              <h3 className="text-2xl font-bold mb-4">Delete Deal</h3>
              <div className="mb-6">
                <p className="text-gray-600 mb-4">
                  Are you sure you want to delete this deal? This action cannot be undone.
                </p>
                <div className="bg-gray-50 rounded-2xl p-4">
                  <p><strong>Commodity:</strong> {selectedDeal?.commodity}</p>
                  <p><strong>Quantity:</strong> {selectedDeal?.quantity} kg</p>
                  <p><strong>Price:</strong> ₹{selectedDeal?.pricePerKg}/kg</p>
                  <p><strong>Total:</strong> ₹{selectedDeal?.quantity * selectedDeal?.pricePerKg}</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false)
                    setSelectedDeal(null)
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteDeal}
                  disabled={deletingDeal}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-medium hover:from-red-400 hover:to-pink-400 transition-all duration-300 disabled:opacity-50"
                >
                  {deletingDeal ? 'Deleting...' : 'Delete Deal'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MerchantDeals