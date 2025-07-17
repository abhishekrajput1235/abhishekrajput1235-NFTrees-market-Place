import Logo from './Logo'

const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-white via-golden/5 to-deepGreen/10 dark:from-trueBlack dark:via-deepGreen-dark/20 dark:to-golden-dark/10 flex flex-col items-center justify-center z-50">
      {/* Tech grid background */}
      <div className="absolute inset-0 bg-tech-grid opacity-20"></div>
      
      {/* Animated data streams */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="data-stream top-10 left-10"></div>
        <div className="data-stream top-20 right-20" style={{ animationDelay: '1s' }}></div>
        <div className="data-stream bottom-16 left-32" style={{ animationDelay: '2s' }}></div>
        <div className="data-stream top-32 right-1/3" style={{ animationDelay: '3s' }}></div>
      </div>
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="floating-element glow-effect">
          <Logo className="h-20 w-20 sm:h-24 sm:w-24" />
        </div>
        <div className="mt-6 text-gradient-green font-bold text-xl sm:text-2xl animate-hologram">
          NFTrees
        </div>
        <div className="mt-8 w-40 sm:w-48 h-1 bg-gray-200 dark:bg-charcoal rounded-full overflow-hidden relative">
          <div className="h-full bg-gradient-to-r from-golden via-primary to-deepGreen animate-shimmer-light" style={{ 
            backgroundSize: '200% 100%',
            width: '80%'
          }}></div>
          {/* Scanline effect */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="w-1 h-full bg-neon-blue animate-scanline opacity-70"></div>
          </div>
        </div>
        <div className="mt-4 text-gray-500 dark:text-gray-400 text-sm sm:text-base animate-tech-pulse">
          Loading amazing NFTs...
        </div>
      </div>
    </div>
  )
}

export default LoadingOverlay