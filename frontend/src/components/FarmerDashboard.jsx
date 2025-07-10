// frontend/src/components/FarmerDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import GlassCard from './ui/GlassCard';
import NeonButton from './ui/NeonButton';

const FarmerDashboard = () => {
  const userName = localStorage.getItem('userName');

  const features = [
    {
      icon: '📈',
      title: 'Market Prices',
      desc: 'Stay updated with real-time rates',
      link: '/prices'
    },
    {
      icon: '🤝',
      title: 'My Deals',
      desc: 'Check your submitted or ongoing deals',
      link: '/farmer-deals'
    },
    {
      icon: '📊',
      title: 'Analytics',
      desc: 'Track and analyze your earnings & crop trends',
      link: '/analytics'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-emerald-600 mb-2">Welcome, {userName}! 🌾</h1>
        <p className="text-lg text-gray-600">Here’s your farmer dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((f, idx) => (
          <Link to={f.link} key={idx}>
            <GlassCard className="p-8 text-center">
              <div className="text-6xl mb-4">{f.icon}</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{f.title}</h2>
              <p className="text-gray-600">{f.desc}</p>
            </GlassCard>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FarmerDashboard;