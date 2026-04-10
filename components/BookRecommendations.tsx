'use client'

export default function BookRecommendations() {
  const books = [
    {
      title: "Capire lo sci: La logica dei movimenti, dal principiante al campione",
      description: "La guida definitiva per comprendere la biomeccanica dello sci e migliorare la tua tecnica, dal livello principiante fino alle performance da gara.",
      amazonLink: "https://www.amazon.it/Capire-sci-movimenti-principiante-campione/dp/B09M5FPWD5/ref=sr_1_3?__mk_it_IT=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=32TXGUPGX1MCG&keywords=sci&qid=1775814346&s=books&sprefix=sci%2Cstripbooks%2C223&sr=1-3",
      highlights: ["Tecnica biomeccanica", "Progressione didattica", "Esercizi pratici"]
    },
    {
      title: "Sciare sicuro. Guida alla sicurezza sugli sci",
      description: "Impara a riconoscere i rischi in montagna, gestire le situazioni di emergenza e sciare sempre in sicurezza su qualsiasi tipo di terreno.",
      amazonLink: "https://www.amazon.it/Sciare-sicuro-Guida-sicurezza-sugli/dp/8833248542/ref=sr_1_1?__mk_it_IT=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=2QFK7ETWRSF9S&keywords=sciare&qid=1775814568&s=books&sprefix=sciare+in+italia%2Cstripbooks%2C221&sr=1-1",
      highlights: ["Prevenzione infortuni", "Gestione rischi", "Sicurezza avalanche"]
    }
  ]

  return (
    <section id="libri" className="py-20 px-8" style={{ backgroundColor: '#F8F9FA' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header - same style as About and Partnership */}
        <h2 className="text-5xl font-bold text-center mb-4 flex items-center justify-center gap-3" style={{ color: '#0D47A1' }}>
          <svg width="50" height="50" viewBox="0 0 512 512" fill="#0D47A1">
            <path d="M96,416h64V96H96V416z M224,416h64V96h-64V416z M0,416h64V96H0V416z M352,96v320h64V96H352z"/>
          </svg>
          Dalla Pista alla Libreria
        </h2>
        <p className="text-center text-xl mb-12 max-w-3xl mx-auto" style={{ color: '#6C757D' }}>
          Stai per scegliere gli sci giusti. Nel frattempo, perfeziona tecnica e sicurezza con le letture essenziali per ogni sciatore!
        </p>

        {/* Books Grid */}
        <div className="grid md:grid-cols-2 gap-12">
          {books.map((book, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-2xl flex flex-col h-full"
              style={{ border: '1px solid #DEE2E6' }}
            >
              {/* Title */}
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#0D47A1' }}>
                {book.title}
              </h3>

              {/* Description */}
              <p className="mb-6 leading-relaxed flex-grow" style={{ color: '#6C757D' }}>
                {book.description}
              </p>

              {/* Highlights */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {book.highlights.map((highlight, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 text-sm rounded-full font-medium"
                      style={{ backgroundColor: '#E3F2FD', color: '#0D47A1' }}
                    >
                      ✓ {highlight}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <a
                href={book.amazonLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center text-white font-semibold py-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                style={{ backgroundColor: '#0D47A1' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1565C0'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0D47A1'}
              >
                Scopri di più su Amazon
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
