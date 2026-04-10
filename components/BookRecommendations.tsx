'use client'

export default function BookRecommendations() {
  const books = [
    {
      title: "Capire lo Sci",
      subtitle: "Dai primi movimenti al campione",
      description: "La guida definitiva per comprendere la biomeccanica dello sci e migliorare la tua tecnica, dal livello principiante fino alle performance da gara.",
      amazonLink: "https://www.amazon.it/Capire-sci-movimenti-principiante-campione/dp/B09M5FPWD5/ref=sr_1_3?__mk_it_IT=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=32TXGUPGX1MCG&keywords=sci&qid=1775814346&s=books&sprefix=sci%2Cstripbooks%2C223&sr=1-3",
      highlights: ["Tecnica biomeccanica", "Progressione didattica", "Esercizi pratici"]
    },
    {
      title: "Sciare in Sicuro",
      subtitle: "Guida alla sicurezza sugli sci",
      description: "Impara a riconoscere i rischi in montagna, gestire le situazioni di emergenza e sciare sempre in sicurezza su qualsiasi tipo di terreno.",
      amazonLink: "https://www.amazon.it/Sciare-sicuro-Guida-sicurezza-sugli/dp/8833248542/ref=sr_1_1?__mk_it_IT=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=2QFK7ETWRSF9S&keywords=sciare&qid=1775814568&s=books&sprefix=sciare+in+italia%2Cstripbooks%2C221&sr=1-1",
      highlights: ["Prevenzione infortuni", "Gestione rischi", "Sicurezza avalanche"]
    }
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            📚 Dalla Pista alla Libreria
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hai scelto gli sci giusti. Ora perfeziona tecnica e sicurezza con le letture essenziali per ogni sciatore.
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {books.map((book, index) => (
            <div 
              key={index}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              {/* Card Content */}
              <div className="p-8">
                {/* Title */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-sm text-gray-500 italic">
                    {book.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {book.description}
                </p>

                {/* Highlights */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {book.highlights.map((highlight, i) => (
                      <span 
                        key={i}
                        className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full font-medium"
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
                  className="block w-full text-center bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-1"
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                      <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                    </svg>
                    Scopri di più su Amazon
                  </span>
                </a>
              </div>

              {/* Bottom accent */}
              <div className="h-2 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600"></div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 italic">
            💡 Letture consigliate per completare la tua preparazione tecnica e di sicurezza in montagna
          </p>
        </div>
      </div>
    </section>
  )
}
