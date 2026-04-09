'use client'

export default function Partnership() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Grazie per l\'interesse! La tua richiesta è stata inviata. Ti contatteremo presto.\n\n(Funzione placeholder - nella versione live invia email)')
    const form = e.target as HTMLFormElement
    form.reset()
  }

  return (
    <section id="partnership" className="py-20 px-8" style={{ backgroundColor: 'white' }}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-4" style={{ color: '#0D47A1' }}>Diventa Partner</h2>
        <p className="text-center text-xl mb-12 max-w-3xl mx-auto" style={{ color: '#6C757D' }}>Sei un brand o un negozio di attrezzatura sci? Collabora con noi</p>
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block font-semibold mb-2" style={{ color: '#1A1A1A' }}>Nome Azienda *</label>
              <input 
                type="text" 
                required
                className="w-full p-3 rounded-lg border-2 text-base"
                style={{ borderColor: '#DEE2E6', fontFamily: "'DM Sans', sans-serif" }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#0D47A1'}
                onBlur={(e) => e.currentTarget.style.borderColor = '#DEE2E6'}
              />
            </div>
            <div className="mb-6">
              <label className="block font-semibold mb-2" style={{ color: '#1A1A1A' }}>Nome Referente *</label>
              <input 
                type="text" 
                required
                className="w-full p-3 rounded-lg border-2 text-base"
                style={{ borderColor: '#DEE2E6', fontFamily: "'DM Sans', sans-serif" }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#0D47A1'}
                onBlur={(e) => e.currentTarget.style.borderColor = '#DEE2E6'}
              />
            </div>
            <div className="mb-6">
              <label className="block font-semibold mb-2" style={{ color: '#1A1A1A' }}>Email *</label>
              <input 
                type="email" 
                required
                className="w-full p-3 rounded-lg border-2 text-base"
                style={{ borderColor: '#DEE2E6', fontFamily: "'DM Sans', sans-serif" }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#0D47A1'}
                onBlur={(e) => e.currentTarget.style.borderColor = '#DEE2E6'}
              />
            </div>
            <div className="mb-6">
              <label className="block font-semibold mb-2" style={{ color: '#1A1A1A' }}>Telefono</label>
              <input 
                type="tel"
                className="w-full p-3 rounded-lg border-2 text-base"
                style={{ borderColor: '#DEE2E6', fontFamily: "'DM Sans', sans-serif" }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#0D47A1'}
                onBlur={(e) => e.currentTarget.style.borderColor = '#DEE2E6'}
              />
            </div>
            <div className="mb-6">
              <label className="block font-semibold mb-2" style={{ color: '#1A1A1A' }}>Messaggio</label>
              <textarea 
                className="w-full p-3 rounded-lg border-2 text-base resize-y"
                style={{ 
                  borderColor: '#DEE2E6', 
                  fontFamily: "'DM Sans', sans-serif",
                  minHeight: '120px'
                }}
                placeholder="Raccontaci della tua azienda e del tipo di collaborazione che ti interessa..."
                onFocus={(e) => e.currentTarget.style.borderColor = '#0D47A1'}
                onBlur={(e) => e.currentTarget.style.borderColor = '#DEE2E6'}
              />
            </div>
            <button 
              type="submit"
              className="w-full px-10 py-4 text-lg font-bold rounded-lg border-0 cursor-pointer transition-all"
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
              Invia Richiesta
            </button>
          </form>
          <p className="text-center mt-8 text-sm" style={{ color: '#6C757D' }}>
            Oppure contattaci a: <strong>partnership@powdermatch.com</strong><br />
            Tel: <strong>+39 02 1234 5678</strong>
          </p>
        </div>
      </div>
    </section>
  )
}
