import React from 'react'

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

export default GlassCard
