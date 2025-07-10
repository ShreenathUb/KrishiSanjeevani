// frontend/src/App.jsx
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom'
import FarmerRegister from './components/FarmerRegister'
import OTPVerify from './components/OTPVerify'
import MerchantRegister from './components/MerchantRegister'
import DealCreate from './components/DealCreate'
import DealApprove from './components/DealApprove'
import PublicPrices from './components/PublicPrices'
import FarmerDashboard from './components/FarmerDashboard'
import MerchantDashboard from './components/MerchantDashboard'
import Login from './components/Login'
import FarmerDeals from './components/FarmerDeals'
import MerchantDeals from './components/MerchantDeals'



// Animated background component
const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50"></div>
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-3xl animate-pulse delay-500"></div>
    </div>
  )
}

// Floating particles component
const FloatingParticles = () => {
  return (
    <div className="fixed inset-0 -z-5 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-emerald-400/30 rounded-full animate-bounce"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  )
}

// Modern glass card component
const GlassCard = ({ children, className = "", hover = true }) => {
  return (
    <div className={`
      backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl 
      shadow-2xl shadow-black/10 
      ${hover ? 'hover:bg-white/20 hover:border-white/30 hover:shadow-3xl hover:shadow-black/20 hover:scale-105' : ''}
      transition-all duration-500 ease-out
      ${className}
    `}>
      {children}
    </div>
  )
}

// Neon button component
const NeonButton = ({ children, variant = "primary", className = "", ...props }) => {
  const variants = {
    primary: "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white shadow-lg shadow-emerald-500/50 hover:shadow-emerald-400/60",
    secondary: "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white shadow-lg shadow-cyan-500/50 hover:shadow-cyan-400/60",
    outline: "border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white shadow-lg shadow-emerald-500/30"
  }
  
  return (
    <button
      className={`
        px-8 py-4 rounded-2xl font-bold text-lg
        transform transition-all duration-300 ease-out
        hover:scale-105 hover:shadow-2xl
        active:scale-95
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}

const Home = () => {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    setIsVisible(true)
  }, [])

  const features = [
    {
      title: "AI-Powered Price Forecasting",
      desc: "Predicts tomorrow’s crop prices using recent market trends and ML models",
      icon: "📈",
      color: "from-purple-500 to-pink-500"
    },
    {
  title: "Easy Farmer-Merchant Deals",
  desc: "Merchants create offers, farmers approve deals securely via OTP",
  icon: "🤝",
  color: "from-green-500 to-lime-500"
},
    {
  title: "No Login Needed for Market Rates",
  desc: "Anyone can view current and predicted prices fully public",
  icon: "🌾",
  color: "from-blue-500 to-cyan-500"
}
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <h1 className="text-8xl font-black bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-8 leading-tight">
              Krishi-Sanjeevani
            </h1>
            <p className="text-3xl text-gray-600 font-light mb-4">
              The Future of Agricultural Trading
            </p>
            <p className="text-xl text-gray-500 mb-16 max-w-3xl mx-auto">
              Empowering the future of agriculture with AI-powered price insights, transparent deals, and a seamless experience for farmers and merchants.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/farmer-register">
                <NeonButton variant="primary" className="w-64">
                  🌾 Join as Farmer
                </NeonButton>
              </Link>
              <Link to="/merchant-register">
                <NeonButton variant="secondary" className="w-64">
                  🏢 Join as Merchant
                </NeonButton>
              </Link>
              <Link to="/login">
                <NeonButton variant="outline" className="w-64">
                  🔐 Login
                </NeonButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-5xl font-black text-center mb-16 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Revolutionary Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <GlassCard className="p-8 h-full text-center">
                  <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-lg mb-6">
                    {feature.desc}
                  </p>
                  <div className={`w-full h-1 rounded-full bg-gradient-to-r ${feature.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-8 text-center">
          <GlassCard className="p-16">
            <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Ready to Transform Agriculture?
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Join thousands of farmers and merchants who are already revolutionizing their agricultural business with our platform.
            </p>
            <Link to="/prices">
              <NeonButton variant="primary" className="text-xl px-12 py-6">
                🚀 Explore Market Prices
              </NeonButton>
            </Link>
          </GlassCard>
        </div>
      </section>
    </div>
  )
}

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <GlassCard className="p-16 text-center max-w-md">
        <div className="text-8xl mb-8">🌾</div>
        <h1 className="text-6xl font-black text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Oops! This field is empty</p>
        <Link to="/">
          <NeonButton variant="primary">
            🏠 Return Home
          </NeonButton>
        </Link>
      </GlassCard>
    </div>
  )
}

const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userType, setUserType] = useState('')
  const [userName, setUserName] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const userTypeStored = localStorage.getItem('userType')
    const name = localStorage.getItem('userName')
    
    setIsLoggedIn(!!userTypeStored)
    setUserType(userTypeStored || '')
    setUserName(name || '')
  }, [location])

  const handleLogout = () => {
    localStorage.removeItem('userType')
    localStorage.removeItem('userName')
    localStorage.removeItem('userId')
    localStorage.removeItem('userPhone')
    localStorage.removeItem('userLocation')
    setIsLoggedIn(false)
    setUserType('')
    setUserName('')
  }

  return (
    <nav className="fixed w-full top-0 z-50 backdrop-blur-2xl bg-white/10 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="text-2xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent hover:from-emerald-500 hover:to-teal-500 transition-all duration-300">
            🌱 Krishi-Sanjeevani
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/prices" 
              className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                location.pathname === '/prices' 
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/50' 
                  : 'text-gray-700 hover:text-emerald-600 hover:bg-white/20'
              }`}
            >
              📈 Market Prices
            </Link>
            
            {isLoggedIn ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                    location.pathname === '/dashboard' 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50' 
                      : 'text-gray-700 hover:text-purple-600 hover:bg-white/20'
                  }`}
                >
                  🎯 Dashboard
                </Link>
                
                {userType === 'merchant' && (
                  <Link 
                    to="/dealcreate" 
                    className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                      location.pathname === '/dealcreate' 
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/50' 
                        : 'text-gray-700 hover:text-blue-600 hover:bg-white/20'
                    }`}
                  >
                    ✨ Create Deal
                  </Link>
                )}
                
                {userType === 'farmer' && (
                  <Link 
                    to="/farmer-deals" 
                    className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                      location.pathname === '/farmer-deals' 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/50' 
                        : 'text-gray-700 hover:text-green-600 hover:bg-white/20'
                    }`}
                  >
                    🤝 My Deals
                  </Link>
                )}

                
                
                <GlassCard className="px-6 py-3" hover={false}>
                  <span className="text-gray-700 font-medium">
                    {userType === 'farmer' ? '🌾' : '🏢'} {userName}
                  </span>
                </GlassCard>
                
                <button 
                  onClick={handleLogout}
                  className="px-6 py-3 rounded-2xl font-semibold bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-400 hover:to-pink-400 transition-all duration-300 shadow-lg shadow-red-500/50 hover:shadow-red-400/60 transform hover:scale-105"
                >
                  🚪 Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="px-6 py-3 rounded-2xl font-semibold text-gray-700 hover:text-emerald-600 hover:bg-white/20 transition-all duration-300"
                >
                  🔐 Login
                </Link>
                <Link 
                  to="/farmer-register" 
                  className="px-6 py-3 rounded-2xl font-semibold text-gray-700 hover:text-emerald-600 hover:bg-white/20 transition-all duration-300"
                >
                  🌾 Farmer
                </Link>
                <Link 
                  to="/merchant-register" 
                  className="px-6 py-3 rounded-2xl font-semibold text-gray-700 hover:text-blue-600 hover:bg-white/20 transition-all duration-300"
                >
                  🏢 Merchant
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-2xl hover:bg-white/20 transition-all duration-300"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'my-1'}`}></span>
              <span className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden backdrop-blur-2xl bg-white/10 border-t border-white/20">
          <div className="px-8 py-6 space-y-4">
            <Link 
              to="/prices" 
              className="block px-6 py-3 rounded-2xl font-semibold text-gray-700 hover:text-emerald-600 hover:bg-white/20 transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              📈 Market Prices
            </Link>
            
            {isLoggedIn ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="block px-6 py-3 rounded-2xl font-semibold text-gray-700 hover:text-purple-600 hover:bg-white/20 transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  🎯 Dashboard
                </Link>
                
                {userType === 'merchant' && (
                  <Link 
                    to="/dealcreate" 
                    className="block px-6 py-3 rounded-2xl font-semibold text-gray-700 hover:text-blue-600 hover:bg-white/20 transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    ✨ Create Deal
                  </Link>
                )}
                
                {userType === 'farmer' && (
                  <Link 
                    to="/farmer-deals" 
                    className="block px-6 py-3 rounded-2xl font-semibold text-gray-700 hover:text-green-600 hover:bg-white/20 transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    🤝 My Deals
                  </Link>
                )}
                
                <button 
                  onClick={() => {
                    handleLogout()
                    setIsMenuOpen(false)
                  }}
                  className="block w-full text-left px-6 py-3 rounded-2xl font-semibold text-gray-700 hover:text-red-600 hover:bg-white/20 transition-all duration-300"
                >
                  🚪 Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="block px-6 py-3 rounded-2xl font-semibold text-gray-700 hover:text-emerald-600 hover:bg-white/20 transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  🔐 Login
                </Link>
                <Link 
                  to="/farmer-register" 
                  className="block px-6 py-3 rounded-2xl font-semibold text-gray-700 hover:text-emerald-600 hover:bg-white/20 transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  🌾 Farmer
                </Link>
                <Link 
                  to="/merchant-register" 
                  className="block px-6 py-3 rounded-2xl font-semibold text-gray-700 hover:text-blue-600 hover:bg-white/20 transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  🏢 Merchant
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

// Protected Route Component
const ProtectedRoute = ({ children, requiredUserType = null }) => {
  const userType = localStorage.getItem('userType')
  
  if (!userType) {
    return <Navigate to="/login" replace />
  }
  
  if (requiredUserType && userType !== requiredUserType) {
    return <Navigate to="/dashboard" replace />
  }
  
  return children
}

const App = () => {
  return (
    <Router>
      <div className="min-h-screen relative">
        <AnimatedBackground />
        <FloatingParticles />
        <Navigation />
        
        <main className="pt-20">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/prices" element={<PublicPrices />} />
            <Route path="/login" element={<Login />} />
            <Route path="/farmer-register" element={<FarmerRegister />} />
            <Route path="/merchant-register" element={<MerchantRegister />} />
            <Route path="/farmer-verify" element={<OTPVerify />} />
            
            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  {localStorage.getItem('userType') === 'merchant' ? (
                    <MerchantDashboard />
                  ) : (
                    <FarmerDashboard />
                  )}
                </ProtectedRoute>
              } 
            />

            <Route
              path="/merchant-deals"
              element={
                <ProtectedRoute requiredUserType="merchant">
                  <MerchantDeals />
                </ProtectedRoute>
              }
            />
            
            <Route 
              path="/farmer-approve/:id" 
              element={
                <ProtectedRoute requiredUserType="farmer">
                  <DealApprove />
                </ProtectedRoute>
              } 
            />
            
            <Route
              path="/farmer-deals"
              element={
                <ProtectedRoute requiredUserType="farmer">
                  <FarmerDeals />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dealcreate"
              element={
                <ProtectedRoute requiredUserType="merchant">
                  <DealCreate />
                </ProtectedRoute>
              }
            />
            
            <Route 
              path="/merchant-deal" 
              element={
                <ProtectedRoute requiredUserType="merchant">
                  <div className="min-h-screen flex items-center justify-center">
                    <GlassCard className="p-16 text-center max-w-md">
                      <div className="text-6xl mb-6">📊</div>
                      <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                        My Deals
                      </h2>
                      <p className="text-gray-600 mb-8">
                        Your deals component will be implemented here
                      </p>
                      <Link to="/dashboard">
                        <NeonButton variant="secondary">Back to Dashboard</NeonButton>
                      </Link>
                    </GlassCard>
                  </div>
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/analytics" 
              element={
                <ProtectedRoute>
                  <div className="min-h-screen flex items-center justify-center">
                    <GlassCard className="p-16 text-center max-w-md">
                      <div className="text-6xl mb-6">📈</div>
                      <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Analytics
                      </h2>
                      <p className="text-gray-600 mb-8">
                        Analytics component will be implemented here
                      </p>
                      <Link to="/dashboard">
                        <NeonButton variant="primary">Back to Dashboard</NeonButton>
                      </Link>
                    </GlassCard>
                  </div>
                </ProtectedRoute>
              } 
            />
            
            {/* Catch all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        {/* Modern Footer */}
        <footer className="mt-24 backdrop-blur-xl bg-black/10 border-t border-white/20">
          <div className="max-w-7xl mx-auto px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <h3 className="text-3xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
                  🌱 Krishi-Sanjeevani
                </h3>
                <p className="text-gray-600 text-lg mb-6 max-w-md">
                  Revolutionizing agricultural trade with cutting-edge technology, AI insights and Price Stability.
                </p>
               
                
              </div>
              
              <div>
                <h4 className="text-xl font-bold text-gray-800 mb-6">Quick Links</h4>
                <ul className="space-y-3">
                  <li><Link to="/prices" className="text-gray-600 hover:text-emerald-600 transition-colors duration-300">📈 Market Prices</Link></li>
                  <li><Link to="/farmer-register" className="text-gray-600 hover:text-emerald-600 transition-colors duration-300">🌾 Farmer Registration</Link></li>
                  <li><Link to="/merchant-register" className="text-gray-600 hover:text-emerald-600 transition-colors duration-300">🏢 Merchant Registration</Link></li>
                  <li><Link to="/login" className="text-gray-600 hover:text-emerald-600 transition-colors duration-300">🔐 Login</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-xl font-bold text-gray-800 mb-6">Contact</h4>
                <div className="space-y-3 text-gray-600">
                  <p>📧 shreenath.ubale22@vit.edu</p>
                  <p>📞 +91 7498604635</p>
                  <p>🏢 Pune, Maharashtra</p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-white/20 mt-12 pt-8 text-center">
              <p className="text-gray-600">
                © 2025 Shreenath Ubale. All rights reserved. | Made with 💚 for farmers
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App