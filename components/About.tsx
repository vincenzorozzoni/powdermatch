export default function About() {
  return (
    <section id="about" className="py-20 px-8" style={{ backgroundColor: '#F8F9FA' }}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-4" style={{ color: '#0D47A1' }}>Chi Siamo</h2>
        <p className="text-center text-xl mb-12 max-w-3xl mx-auto" style={{ color: '#6C757D' }}>La missione dietro PowderMatch</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="text-4xl font-bold mb-6" style={{ color: '#0D47A1' }}>Scegliere lo sci giusto non dovrebbe essere complicato</h3>
            <p className="mb-6 leading-relaxed" style={{ color: '#6C757D' }}>Ogni anno, migliaia di sciatori acquistano sci non adatti al loro livello o stile, compromettendo la loro esperienza in montagna. PowderMatch nasce per risolvere questo problema.</p>
            <p className="mb-6 leading-relaxed" style={{ color: '#6C757D' }}>Utilizziamo algoritmi avanzati di intelligenza artificiale, basati su decenni di conoscenze tecniche sugli sci alpini, per analizzare il tuo profilo e consigliarti i modelli perfetti tra migliaia di opzioni.</p>
            <p className="mb-6 leading-relaxed" style={{ color: '#6C757D' }}>Il nostro sistema considera oltre 20 parametri tecnici: dalla sciancratura al profilo di rocker, dal flex alla larghezza al centro, garantendoti raccomandazioni precise e personalizzate.</p>
            <p className="font-semibold" style={{ color: '#6C757D' }}><strong>La nostra promessa:</strong> sci adatti alle tue capacità = più divertimento in montagna, progressi più rapidi e maggiore sicurezza.</p>
          </div>
          <div>
            <img 
              src="https://images.pexels.com/photos/257961/pexels-photo-257961.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop" 
              alt="Sci colorati su legno" 
              className="w-full h-auto rounded-2xl shadow-2xl"
              style={{ maxHeight: '500px', objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
