const NeonButton = ({
  children,
  variant = 'primary',
  className = '',
  ...props
}) => {
  const variants = {
    primary:
      'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white shadow-lg shadow-emerald-500/50 hover:shadow-emerald-400/60',
    secondary:
      'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white shadow-lg shadow-cyan-500/50 hover:shadow-cyan-400/60',
    outline:
      'border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white shadow-lg shadow-emerald-500/30',
  };

  return (
    <button
      className={`px-8 py-4 rounded-2xl font-bold text-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default NeonButton;