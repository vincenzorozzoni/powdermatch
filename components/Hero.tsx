'use client'

export default function Hero({ onStartQuiz }: { onStartQuiz: () => void }) {
  return (
    <section className="h-screen flex items-center justify-center text-center text-white relative" style={{
      background: 'linear-gradient(rgba(13, 71, 161, 0.7), rgba(13, 71, 161, 0.7)), url(https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1920&h=1080&fit=crop&q=80) center/cover',
      backgroundAttachment: 'fixed'
    }}>
      <div className="max-w-4xl px-8" style={{ animation: 'fadeInUp 1s ease-out' }}>
        <h1 className="text-6xl font-bold mb-6 leading-tight">Trova il Tuo Sci Perfetto</h1>
        <p className="text-2xl mb-10 opacity-95">L'intelligenza artificiale che analizza il tuo profilo per consigliarti gli sci ideali tra migliaia di modelli</p>
        <button 
          onClick={onStartQuiz}
          className="px-10 py-4 text-lg font-bold rounded-lg border-0 cursor-pointer transition-all"
          style={{ backgroundColor: '#FF6B35', color: 'white' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#E85A28'
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(255, 107, 53, 0.3)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#FF6B35'
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          Inizia il Questionario →
        </button>
        
        {/* Trust Bar */}
        <div className="flex justify-center gap-12 mt-12 flex-wrap" style={{ opacity: 0.95 }}>
          <div className="text-center">
            <img src="/icons/zap.svg" alt="Fast" className="w-12 h-12 mx-auto mb-2" />
            <div className="text-xl font-bold mb-1">2 min</div>
            <div className="text-sm opacity-90">Quiz rapido</div>
          </div>
          <div className="text-center">
            <img src="/icons/star.svg" alt="Perfect Match" className="w-12 h-12 mx-auto mb-2" />
            <div className="text-xl font-bold mb-1">Match</div>
            <div className="text-sm opacity-90">Perfetto</div>
          </div>
          <div className="text-center">
            <img src="/icons/check.svg" alt="Free" className="w-12 h-12 mx-auto mb-2" />
            <div className="text-xl font-bold mb-1">100%</div>
            <div className="text-sm opacity-90">Gratis</div>
          </div>
        </div>
      </div>
    </section>
  )
}
