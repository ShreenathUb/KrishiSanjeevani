// frontend/src/components/MerchantDashboard.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import GlassCard from './ui/GlassCard' // adjust if needed

const MerchantDashboard = () => {
  const userName = localStorage.getItem('userName')

  const dashboardCards = [
    {
      title: "Market Prices",
      desc: "Real-time crop prices",
      icon: "📈",
      link: "/prices",
      color: "from-emerald-500 to-teal-500"
    },
    {
      title: "Create Deal",
      desc: "Initiate new trade offers",
      icon: "✨",
      link: "/merchant-deal",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Analytics",
      desc: "Performance insights",
      icon: "📊",
      link: "/analytics",
      color: "from-blue-500 to-cyan-500"
    }
  ]

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="text-center mb-16">
        <h1 className="text-6xl font-black bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-6">
          Welcome Back, {userName}! 🏢
        </h1>
        <p className="text-2xl text-gray-600 font-light">
          Your trading command center
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {dashboardCards.map((card, index) => (
          <Link key={index} to={card.link} className="group">
            <GlassCard className="p-8 h-full">
              <div className="text-center">
                <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {card.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{card.title}</h3>
                <p className="text-gray-600 text-lg mb-6">{card.desc}</p>
                <div className={`w-full h-2 rounded-full bg-gradient-to-r ${card.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
              </div>
            </GlassCard>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default MerchantDashboard
