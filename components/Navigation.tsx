'use client'

interface NavigationProps {
  onStartQuiz: () => void
  onGoHome: () => void
}

export default function Navigation({ onStartQuiz, onGoHome }: NavigationProps) {
  return (
    <nav className="fixed top-0 w-full z-50" style={{
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid #DEE2E6'
    }}>
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
        <button onClick={onGoHome} className="flex items-center gap-3 no-underline bg-transparent border-0 cursor-pointer p-0">
          <svg className="w-11 h-11" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="logoGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#0D47A1' }}/>
                <stop offset="100%" style={{ stopColor: '#1976D2' }}/>
              </linearGradient>
            </defs>
            <path d="M 20 75 L 50 25 L 80 75 Z" fill="url(#logoGrad)"/>
            <path d="M 42 38 L 50 25 L 58 38 Z" fill="white" opacity="0.9"/>
            <line x1="35" y1="70" x2="58" y2="32" stroke="#FF6B35" strokeWidth="4" strokeLinecap="round"/>
            <line x1="42" y1="70" x2="65" y2="32" stroke="#FF6B35" strokeWidth="4" strokeLinecap="round"/>
            <circle cx="58" cy="32" r="2.5" fill="#FF6B35"/>
            <circle cx="65" cy="32" r="2.5" fill="#FF6B35"/>
          </svg>
          <span className="font-black text-2xl" style={{ 
            fontFamily: "'Archivo Black', sans-serif",
            color: '#0D47A1',
            letterSpacing: '-0.5px'
          }}>PowderMatch</span>
        </button>
        <ul className="hidden md:flex gap-8 list-none m-0">
          <li><a href="#about" className="no-underline font-medium transition-colors" style={{ color: '#1A1A1A' }} onMouseEnter={(e) => e.currentTarget.style.color = '#0D47A1'} onMouseLeave={(e) => e.currentTarget.style.color = '#1A1A1A'}>Chi Siamo</a></li>
          <li><a href="#partnership" className="no-underline font-medium transition-colors" style={{ color: '#1A1A1A' }} onMouseEnter={(e) => e.currentTarget.style.color = '#0D47A1'} onMouseLeave={(e) => e.currentTarget.style.color = '#1A1A1A'}>Partnership</a></li>
          <li><button onClick={onStartQuiz} className="no-underline font-medium transition-colors bg-transparent border-0 cursor-pointer" style={{ color: '#1A1A1A' }} onMouseEnter={(e) => e.currentTarget.style.color = '#0D47A1'} onMouseLeave={(e) => e.currentTarget.style.color = '#1A1A1A'}>Inizia Test</button></li>
        </ul>
      </div>
    </nav>
  )
}
