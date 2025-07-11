    // // Fixed FarmerDeals.jsx
    // import React, { useState, useEffect } from 'react'
    // import { Link } from 'react-router-dom'
    // import { dealAPI } from '../utils/api'

    // const FarmerDeals = () => {
    // const [myDeals, setMyDeals] = useState([])
    // const [pendingDeals, setPendingDeals] = useState([])
    // const [activeTab, setActiveTab] = useState('pending')
    // const [loading, setLoading] = useState(true)
    // const [error, setError] = useState('')
    // const [processingDeal, setProcessingDeal] = useState(null)
    // const [showApprovalModal, setShowApprovalModal] = useState(false)
    // const [showRejectionModal, setShowRejectionModal] = useState(false)
    // const [selectedDeal, setSelectedDeal] = useState(null)
    // const [otp, setOtp] = useState('')
    // const [rejectionReason, setRejectionReason] = useState('')

    // useEffect(() => {
    //     fetchDeals()
    // }, [])

    // const fetchDeals = async () => {
    //     try {
    //     // Check if farmer is logged in and has valid ID
    //     const farmerData = localStorage.getItem('farmer')
    //     if (!farmerData) {
    //         setError('Please login as a farmer first')
    //         setLoading(false)
    //         return
    //     }

    //     const farmer = JSON.parse(farmerData)
    //     const farmerId = farmer.id || farmer._id
        
    //     if (!farmerId) {
    //         setError('Invalid farmer session. Please login again.')
    //         setLoading(false)
    //         return
    //     }

    //     // Fetch farmer's deals
    //     const myDealsResponse = await dealAPI.getForFarmer(farmerId)
    //     if (myDealsResponse.ok) {
    //         const myDealsData = await myDealsResponse.json()
    //         setMyDeals(myDealsData.deals || [])
    //     }
        
    //     // Fetch pending deals
    //     const pendingDealsResponse = await dealAPI.getPending()
    //     if (pendingDealsResponse.ok) {
    //         const pendingDealsData = await pendingDealsResponse.json()
    //         setPendingDeals(pendingDealsData.deals || [])
    //     }
        
    //     } catch (err) {
    //     setError('Error loading deals: ' + err.message)
    //     } finally {
    //     setLoading(false)
    //     }
    // }

    // const handleApprove = async () => {
    //     if (!selectedDeal || !otp) return
        
    //     setProcessingDeal(selectedDeal._id)
    //     try {
    //     // Get farmer ID from localStorage
    //     const farmerData = localStorage.getItem('farmer')
    //     if (!farmerData) {
    //         alert('Please login as a farmer first')
    //         return
    //     }

    //     const farmer = JSON.parse(farmerData)
    //     const farmerId = farmer.id || farmer._id
        
    //     if (!farmerId) {
    //         alert('Invalid farmer session. Please login again.')
    //         return
    //     }

    //     const response = await dealAPI.approve(selectedDeal._id, farmerId, otp)
        
    //     if (response.ok) {
    //         setShowApprovalModal(false)
    //         setOtp('')
    //         setSelectedDeal(null)
    //         fetchDeals() // Refresh deals
    //         alert('Deal approved successfully!')
    //     } else {
    //         const error = await response.json()
    //         alert(error.error || 'Failed to approve deal')
    //     }
    //     } catch (err) {
    //     alert('Error approving deal: ' + err.message)
    //     } finally {
    //     setProcessingDeal(null)
    //     }
    // }

    // const handleReject = async () => {
    //     if (!selectedDeal || !rejectionReason) return
        
    //     setProcessingDeal(selectedDeal._id)
    //     try {
    //     // Get farmer ID from localStorage
    //     const farmerData = localStorage.getItem('farmer')
    //     if (!farmerData) {
    //         alert('Please login as a farmer first')
    //         return
    //     }

    //     const farmer = JSON.parse(farmerData)
    //     const farmerId = farmer.id || farmer._id
        
    //     if (!farmerId) {
    //         alert('Invalid farmer session. Please login again.')
    //         return
    //     }

    //     const response = await dealAPI.reject(selectedDeal._id, farmerId, rejectionReason)
        
    //     if (response.ok) {
    //         setShowRejectionModal(false)
    //         setRejectionReason('')
    //         setSelectedDeal(null)
    //         fetchDeals() // Refresh deals
    //         alert('Deal rejected successfully!')
    //     } else {
    //         const error = await response.json()
    //         alert(error.error || 'Failed to reject deal')
    //     }
    //     } catch (err) {
    //     alert('Error rejecting deal: ' + err.message)
    //     } finally {
    //     setProcessingDeal(null)
    //     }
    // }

    // const openApprovalModal = (deal) => {
    //     setSelectedDeal(deal)
    //     setShowApprovalModal(true)
    // }

    // const openRejectionModal = (deal) => {
    //     setSelectedDeal(deal)
    //     setShowRejectionModal(true)
    // }

    // // Check if farmer is logged in
    // const farmerData = localStorage.getItem('farmer')
    // if (!farmerData) {
    //     return (
    //     <div className="min-h-screen flex items-center justify-center">
    //         <div className="text-center">
    //         <div className="text-6xl mb-6">🚫</div>
    //         <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h2>
    //         <p className="text-gray-600 mb-8">Please login as a farmer to access deals.</p>
    //         <Link to="/farmer/login">
    //             <button className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl font-semibold hover:from-emerald-400 hover:to-teal-400 transition-all duration-300">
    //             Login as Farmer
    //             </button>
    //         </Link>
    //         </div>
    //     </div>
    //     )
    // }

    // if (loading) {
    //     return (
    //     <div className="min-h-screen flex items-center justify-center">
    //         <div className="text-center">
    //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
    //         <p className="text-gray-600">Loading your deals...</p>
    //         </div>
    //     </div>
    //     )
    // }

    // return (
    //     <div className="min-h-screen py-12">
    //     <div className="max-w-7xl mx-auto px-8">
    //         <div className="mb-8">
    //         <h1 className="text-4xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
    //             🤝 Deal Management
    //         </h1>
    //         <p className="text-gray-600 text-lg">
    //             Manage your agricultural deals and explore new opportunities
    //         </p>
    //         </div>

    //         {error && (
    //         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
    //             {error}
    //         </div>
    //         )}

    //         {/* Tab Navigation */}
    //         <div className="flex mb-8 space-x-4">
    //         <button
    //             onClick={() => setActiveTab('pending')}
    //             className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
    //             activeTab === 'pending'
    //                 ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/50'
    //                 : 'text-gray-700 hover:text-orange-600 hover:bg-white/20'
    //             }`}
    //         >
    //             🔥 Available Deals ({pendingDeals.length})
    //         </button>
    //         <button
    //             onClick={() => setActiveTab('my')}
    //             className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
    //             activeTab === 'my'
    //                 ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/50'
    //                 : 'text-gray-700 hover:text-emerald-600 hover:bg-white/20'
    //             }`}
    //         >
    //             📋 My Deals ({myDeals.length})
    //         </button>
    //         </div>

    //         {/* Pending Deals Tab */}
    //         {activeTab === 'pending' && (
    //         <div>
    //             {pendingDeals.length === 0 ? (
    //             <div className="text-center py-12">
    //                 <div className="text-6xl mb-6">🔍</div>
    //                 <h2 className="text-2xl font-bold text-gray-800 mb-4">No Pending Deals</h2>
    //                 <p className="text-gray-600 mb-8">There are no deals available at the moment.</p>
    //                 <Link to="/prices">
    //                 <button className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl font-semibold hover:from-emerald-400 hover:to-teal-400 transition-all duration-300">
    //                     Browse Market Prices
    //                 </button>
    //                 </Link>
    //             </div>
    //             ) : (
    //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    //                 {pendingDeals.map((deal) => (
    //                 <div key={deal._id} className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 hover:bg-white/20 transition-all duration-300">
    //                     <div className="flex justify-between items-start mb-4">
    //                     <h3 className="text-xl font-bold text-gray-800">{deal.commodity}</h3>
    //                     <span className="px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
    //                         Available
    //                     </span>
    //                     </div>
                        
    //                     <div className="space-y-2 text-gray-600 mb-4">
    //                     <p><strong>Quantity:</strong> {deal.quantity} kg</p>
    //                     <p><strong>Price:</strong> ₹{deal.pricePerKg}/kg</p>
    //                     <p><strong>Total:</strong> ₹{deal.quantity * deal.pricePerKg}</p>
    //                     <p><strong>Merchant:</strong> {deal.merchantId?.name || 'Unknown'}</p>
    //                     <p><strong>Location:</strong> {deal.merchantId?.location || 'Unknown'}</p>
    //                     <p><strong>Posted:</strong> {new Date(deal.createdAt).toLocaleDateString()}</p>
    //                     </div>
                        
    //                     <div className="flex gap-2">
    //                     <button
    //                         onClick={() => openApprovalModal(deal)}
    //                         disabled={processingDeal === deal._id}
    //                         className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-medium hover:from-green-400 hover:to-emerald-400 transition-all duration-300 disabled:opacity-50"
    //                     >
    //                         {processingDeal === deal._id ? 'Processing...' : '✅ Accept'}
    //                     </button>
    //                     <button
    //                         onClick={() => openRejectionModal(deal)}
    //                         disabled={processingDeal === deal._id}
    //                         className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-medium hover:from-red-400 hover:to-pink-400 transition-all duration-300 disabled:opacity-50"
    //                     >
    //                         ❌ Decline
    //                     </button>
    //                     </div>
    //                 </div>
    //                 ))}
    //             </div>
    //             )}
    //         </div>
    //         )}

    //         {/* My Deals Tab */}
    //         {activeTab === 'my' && (
    //         <div>
    //             {myDeals.length === 0 ? (
    //             <div className="text-center py-12">
    //                 <div className="text-6xl mb-6">📦</div>
    //                 <h2 className="text-2xl font-bold text-gray-800 mb-4">No Deals Yet</h2>
    //                 <p className="text-gray-600 mb-8">You haven't participated in any deals yet.</p>
    //                 <button
    //                 onClick={() => setActiveTab('pending')}
    //                 className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl font-semibold hover:from-orange-400 hover:to-red-400 transition-all duration-300"
    //                 >
    //                 Browse Available Deals
    //                 </button>
    //             </div>
    //             ) : (
    //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    //                 {myDeals.map((deal) => (
    //                 <div key={deal._id} className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 hover:bg-white/20 transition-all duration-300">
    //                     <div className="flex justify-between items-start mb-4">
    //                     <h3 className="text-xl font-bold text-gray-800">{deal.commodity}</h3>
    //                     <span className={`px-3 py-1 rounded-full text-sm font-medium ${
    //                         deal.status === 'approved' ? 'bg-green-100 text-green-800' :
    //                         deal.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
    //                         'bg-red-100 text-red-800'
    //                     }`}>
    //                         {deal.status}
    //                     </span>
    //                     </div>
                        
    //                     <div className="space-y-2 text-gray-600">
    //                     <p><strong>Quantity:</strong> {deal.quantity} kg</p>
    //                     <p><strong>Price:</strong> ₹{deal.pricePerKg}/kg</p>
    //                     <p><strong>Total:</strong> ₹{deal.quantity * deal.pricePerKg}</p>
    //                     <p><strong>Merchant:</strong> {deal.merchantId?.name || 'Unknown'}</p>
    //                     <p><strong>Date:</strong> {new Date(deal.createdAt).toLocaleDateString()}</p>
    //                     </div>
    //                 </div>
    //                 ))}
    //             </div>
    //             )}
    //         </div>
    //         )}

    //         {/* Approval Modal */}
    //         {showApprovalModal && (
    //         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    //             <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4">
    //             <h3 className="text-2xl font-bold mb-4">Confirm Deal Approval</h3>
    //             <div className="mb-6">
    //                 <p className="text-gray-600 mb-4">
    //                 You are about to approve this deal for <strong>{selectedDeal?.commodity}</strong>
    //                 </p>
    //                 <div className="bg-gray-50 rounded-2xl p-4">
    //                 <p><strong>Quantity:</strong> {selectedDeal?.quantity} kg</p>
    //                 <p><strong>Price:</strong> ₹{selectedDeal?.pricePerKg}/kg</p>
    //                 <p><strong>Total:</strong> ₹{selectedDeal?.quantity * selectedDeal?.pricePerKg}</p>
    //                 </div>
    //             </div>
                
    //             <div className="mb-6">
    //                 <label className="block text-sm font-medium text-gray-700 mb-2">
    //                 Enter OTP (Use 123456 for demo)
    //                 </label>
    //                 <input
    //                 type="text"
    //                 value={otp}
    //                 onChange={(e) => setOtp(e.target.value)}
    //                 className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
    //                 placeholder="Enter OTP"
    //                 />
    //             </div>
                
    //             <div className="flex gap-3">
    //                 <button
    //                 onClick={() => {
    //                     setShowApprovalModal(false)
    //                     setOtp('')
    //                     setSelectedDeal(null)
    //                 }}
    //                 className="flex-1 px-4 py-2 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-all duration-300"
    //                 >
    //                 Cancel
    //                 </button>
    //                 <button
    //                 onClick={handleApprove}
    //                 disabled={!otp || processingDeal}
    //                 className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-medium hover:from-green-400 hover:to-emerald-400 transition-all duration-300 disabled:opacity-50"
    //                 >
    //                 {processingDeal ? 'Processing...' : 'Approve Deal'}
    //                 </button>
    //             </div>
    //             </div>
    //         </div>
    //         )}

    //         {/* Rejection Modal */}
    //         {showRejectionModal && (
    //         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    //             <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4">
    //             <h3 className="text-2xl font-bold mb-4">Decline Deal</h3>
    //             <div className="mb-6">
    //                 <p className="text-gray-600 mb-4">
    //                 Please provide a reason for declining this deal:
    //                 </p>
    //                 <textarea
    //                 value={rejectionReason}
    //                 onChange={(e) => setRejectionReason(e.target.value)}
    //                 className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 h-24"
    //                 placeholder="Enter reason for declining..."
    //                 />
    //             </div>
                
    //             <div className="flex gap-3">
    //                 <button
    //                 onClick={() => {
    //                     setShowRejectionModal(false)
    //                     setRejectionReason('')
    //                     setSelectedDeal(null)
    //                 }}
    //                 className="flex-1 px-4 py-2 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-all duration-300"
    //                 >
    //                 Cancel
    //                 </button>
    //                 <button
    //                 onClick={handleReject}
    //                 disabled={!rejectionReason || processingDeal}
    //                 className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-medium hover:from-red-400 hover:to-pink-400 transition-all duration-300 disabled:opacity-50"
    //                 >
    //                 {processingDeal ? 'Processing...' : 'Decline Deal'}
    //                 </button>
    //             </div>
    //             </div>
    //         </div>
    //         )}
    //     </div>
    //     </div>
    // )
    // }

    // export default FarmerDeals
    // Fixed FarmerDeals.jsx
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { dealAPI } from '../utils/api'

const FarmerDeals = () => {
  const [myDeals, setMyDeals] = useState([])
  const [pendingDeals, setPendingDeals] = useState([])
  const [activeTab, setActiveTab] = useState('pending')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [processingDeal, setProcessingDeal] = useState(null)
  const [showApprovalModal, setShowApprovalModal] = useState(false)
  const [showRejectionModal, setShowRejectionModal] = useState(false)
  const [selectedDeal, setSelectedDeal] = useState(null)
  const [otp, setOtp] = useState('')
  const [rejectionReason, setRejectionReason] = useState('')

  useEffect(() => {
    fetchDeals()
  }, [])

  // const fetchDeals = async () => {
  //   try {
  //     // Check if farmer is logged in and has valid ID
  //     const farmerData = localStorage.getItem('farmer')
  //     // if (!farmerData) {
  //     //   setError('Please login as a farmer first')
  //     //   setLoading(false)
  //     //   return
  //     // }

  //     const farmer = JSON.parse(farmerData)
  //     const farmerId = farmer.id || farmer._id
      
  //     if (!farmerId) {
  //       setError('Invalid farmer session. Please login again.')
  //       setLoading(false)
  //       return
  //     }

  //     // Fetch farmer's deals
  //     const myDealsResponse = await dealAPI.getForFarmer(farmerId)
  //     setMyDeals(myDealsResponse.data.deals || [])
      
  //     // Fetch pending deals
  //     const pendingDealsResponse = await dealAPI.getPending()
  //    setPendingDeals(pendingDealsResponse.data.deals || [])

      
  //   } catch (err) {
  //     setError('Error loading deals: ' + err.message)
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  const fetchDeals = async () => {
  try {
    let farmerId = null;
    
    // Check for farmer data from OTP flow
    const farmerData = localStorage.getItem('farmer')
    if (farmerData) {
      const farmer = JSON.parse(farmerData)
      farmerId = farmer.id || farmer._id
    }
    
    // If no farmer data, check for demo login data
    if (!farmerId) {
      const userType = localStorage.getItem('userType')
      const userId = localStorage.getItem('userId')
      
      if (userType === 'farmer' && userId) {
        farmerId = userId
      }
    }
    
    if (!farmerId) {
      setError('Please login as a farmer first')
      setLoading(false)
      return
    }
    
    // Fetch farmer's deals
    const myDealsResponse = await dealAPI.getForFarmer(farmerId)
    setMyDeals(myDealsResponse.data.deals || [])
   
    // Fetch pending deals
    const pendingDealsResponse = await dealAPI.getPending()
    setPendingDeals(pendingDealsResponse.data.deals || [])
   
  } catch (err) {
    setError('Error loading deals: ' + err.message)
  } finally {
    setLoading(false)
  }
}

  const handleApprove = async () => {
  if (!selectedDeal || !otp) return

  if (processingDeal) return

  setProcessingDeal(selectedDeal._id)

  try {
    const farmerData = localStorage.getItem('farmer')
    if (!farmerData) {
      alert('Please login as a farmer first')
      return
    }

    const farmer = JSON.parse(farmerData)
    const farmerId = farmer._id || farmer.id

    if (!farmerId) {
      alert('Invalid farmer session. Please login again.')
      return
    }

    const response = await dealAPI.approve(selectedDeal._id, farmerId, otp)

    if (response.data?.success) {
      setShowApprovalModal(false)
      setOtp('')
      setSelectedDeal(null)
      fetchDeals()
      alert('Deal approved successfully!')
    } else {
      alert(response.data?.error || 'Failed to approve deal')
    }
  } catch (err) {
    alert('Error approving deal: ' + (err.response?.data?.error || err.message))
  } finally {
    setProcessingDeal(null)
  }
}
  const handleReject = async () => {
    if (!selectedDeal || !rejectionReason) return
    
    setProcessingDeal(selectedDeal._id)
    try {
      // Get farmer ID from localStorage
      const farmerData = localStorage.getItem('farmer')
      if (!farmerData) {
        alert('Please login as a farmer first')
        return
      }

      const farmer = JSON.parse(farmerData)
      const farmerId = farmer.id || farmer._id
      
      if (!farmerId) {
        alert('Invalid farmer session. Please login again.')
        return
      }

      const response = await dealAPI.reject(selectedDeal._id, farmerId, rejectionReason)
      
      if (response.ok) {
        setShowRejectionModal(false)
        setRejectionReason('')
        setSelectedDeal(null)
        fetchDeals() // Refresh deals
        alert('Deal rejected successfully!')
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to reject deal')
      }
    } catch (err) {
      alert('Error rejecting deal: ' + err.message)
    } finally {
      setProcessingDeal(null)
    }
  }

  const openApprovalModal = (deal) => {
    setSelectedDeal(deal)
    setShowApprovalModal(true)
  }

  const openRejectionModal = (deal) => {
    setSelectedDeal(deal)
    setShowRejectionModal(true)
  }

  // Check if farmer is logged in
  // const farmerData = localStorage.getItem('farmer')
  // if (!farmerData) 
  const userType = localStorage.getItem('userType')
  const farmerId = localStorage.getItem('userId')     // saved at login
  if (userType !== 'farmer' || !farmerId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-6">🚫</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-8">Please login as a farmer to access deals.</p>
          <Link to="/farmer/login">
            <button className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl font-semibold hover:from-emerald-400 hover:to-teal-400 transition-all duration-300">
              Login as Farmer
            </button>
          </Link>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your deals...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
            🤝 Deal Management
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your agricultural deals and explore new opportunities
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex mb-8 space-x-4">
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
              activeTab === 'pending'
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/50'
                : 'text-gray-700 hover:text-orange-600 hover:bg-white/20'
            }`}
          >
            🔥 Available Deals ({pendingDeals.length})
          </button>
          <button
            onClick={() => setActiveTab('my')}
            className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
              activeTab === 'my'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/50'
                : 'text-gray-700 hover:text-emerald-600 hover:bg-white/20'
            }`}
          >
            📋 My Deals ({myDeals.length})
          </button>
        </div>

        {/* Pending Deals Tab */}
        {activeTab === 'pending' && (
          <div>
            {pendingDeals.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-6">🔍</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">No Pending Deals</h2>
                <p className="text-gray-600 mb-8">There are no deals available at the moment.</p>
                <Link to="/prices">
                  <button className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl font-semibold hover:from-emerald-400 hover:to-teal-400 transition-all duration-300">
                    Browse Market Prices
                  </button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pendingDeals.map((deal) => (
                  <div key={deal._id} className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 hover:bg-white/20 transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-gray-800">{deal.commodity}</h3>
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                        Available
                      </span>
                    </div>
                    
                    <div className="space-y-2 text-gray-600 mb-4">
                      <p><strong>Quantity:</strong> {deal.quantity} kg</p>
                      <p><strong>Price:</strong> ₹{deal.pricePerKg}/kg</p>
                      <p><strong>Total:</strong> ₹{deal.quantity * deal.pricePerKg}</p>
                      <p><strong>Merchant:</strong> {deal.merchantId?.name || 'Unknown'}</p>
                      <p><strong>Location:</strong> {deal.merchantId?.location || 'Unknown'}</p>
                      <p><strong>Posted:</strong> {new Date(deal.createdAt).toLocaleDateString()}</p>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => openApprovalModal(deal)}
                        disabled={processingDeal === deal._id}
                        className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-medium hover:from-green-400 hover:to-emerald-400 transition-all duration-300 disabled:opacity-50"
                      >
                        {processingDeal === deal._id ? 'Processing...' : '✅ Accept'}
                      </button>
                      <button
                        onClick={() => openRejectionModal(deal)}
                        disabled={processingDeal === deal._id}
                        className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-medium hover:from-red-400 hover:to-pink-400 transition-all duration-300 disabled:opacity-50"
                      >
                        ❌ Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* My Deals Tab */}
        {activeTab === 'my' && (
          <div>
            {myDeals.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-6">📦</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">No Deals Yet</h2>
                <p className="text-gray-600 mb-8">You haven't participated in any deals yet.</p>
                <button
                  onClick={() => setActiveTab('pending')}
                  className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl font-semibold hover:from-orange-400 hover:to-red-400 transition-all duration-300"
                >
                  Browse Available Deals
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myDeals.map((deal) => (
                  <div key={deal._id} className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 hover:bg-white/20 transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-gray-800">{deal.commodity}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        deal.status === 'approved' ? 'bg-green-100 text-green-800' :
                        deal.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {deal.status}
                      </span>
                    </div>
                    
                    <div className="space-y-2 text-gray-600">
                      <p><strong>Quantity:</strong> {deal.quantity} kg</p>
                      <p><strong>Price:</strong> ₹{deal.pricePerKg}/kg</p>
                      <p><strong>Total:</strong> ₹{deal.quantity * deal.pricePerKg}</p>
                      <p><strong>Merchant:</strong> {deal.merchantId?.name || 'Unknown'}</p>
                      <p><strong>Date:</strong> {new Date(deal.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Approval Modal */}
        {showApprovalModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4">
              <h3 className="text-2xl font-bold mb-4">Confirm Deal Approval</h3>
              <div className="mb-6">
                <p className="text-gray-600 mb-4">
                  You are about to approve this deal for <strong>{selectedDeal?.commodity}</strong>
                </p>
                <div className="bg-gray-50 rounded-2xl p-4">
                  <p><strong>Quantity:</strong> {selectedDeal?.quantity} kg</p>
                  <p><strong>Price:</strong> ₹{selectedDeal?.pricePerKg}/kg</p>
                  <p><strong>Total:</strong> ₹{selectedDeal?.quantity * selectedDeal?.pricePerKg}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter OTP (Use 123456 for demo)
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Enter OTP"
                />
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowApprovalModal(false)
                    setOtp('')
                    setSelectedDeal(null)
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApprove}
                  disabled={!otp || processingDeal}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-medium hover:from-green-400 hover:to-emerald-400 transition-all duration-300 disabled:opacity-50"
                >
                  {processingDeal ? 'Processing...' : 'Approve Deal'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Rejection Modal */}
        {showRejectionModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4">
              <h3 className="text-2xl font-bold mb-4">Decline Deal</h3>
              <div className="mb-6">
                <p className="text-gray-600 mb-4">
                  Please provide a reason for declining this deal:
                </p>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 h-24"
                  placeholder="Enter reason for declining..."
                />
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowRejectionModal(false)
                    setRejectionReason('')
                    setSelectedDeal(null)
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReject}
                  disabled={!rejectionReason || processingDeal}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-medium hover:from-red-400 hover:to-pink-400 transition-all duration-300 disabled:opacity-50"
                >
                  {processingDeal ? 'Processing...' : 'Decline Deal'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FarmerDeals