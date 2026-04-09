'use client'

import { useState, useEffect } from 'react'
import StoreLocator from './StoreLocator'
import SocialShare from './SocialShare'
import BrandLogo from './BrandLogo'
import RelatedProducts from './RelatedProducts'
import matchSkis from './matchSkis'

interface Product {
  brand: string
  name: string
  specs: string
  price: string
  officialLink: string
  amazonLink: string
  usedLink: string
}

interface ResultsProps {
  answers: Record<string, string>
  onRestart: () => void
}

export default function Results({ answers, onRestart }: ResultsProps) {
  const [loading, setLoading] = useState(true)
  const [recommendation, setRecommendation] = useState({ key: '', title: '', subtitle: '', reason: '' })
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    setTimeout(() => {
      const rec = generateRecommendation()
      setRecommendation(rec)
      setProducts(getProducts(rec.key))
      setLoading(false)
    }, 2500)
  }, [])

  function generateRecommendation() {
    const terrain = answers.terrain
    const budget = answers.budget
    let level = ''
    let key = ''
    let title = ''
    let subtitle = ''
    let reason = ''

    if (terrain === 'pista') {
      level = answers.pista_level
      const turn = answers.pista_turn
      
      const dbLevel = (level === 'esperto' || level === 'avanzato') ? 'avanzato' : level
      key = `pista_${dbLevel}_${budget}`
      
      if (level === 'principiante') {
        title = 'Sci da Pista per Principianti'
        subtitle = 'Facili, tolleranti e perfetti per imparare'
        reason = `Come principiante su pista, hai bisogno di sci con costruzione leggera e flex morbido per un controllo semplice. ${turn === 'corte' ? 'Il raggio corto (~13m)' : turn === 'medie' ? 'Il raggio medio (~15m)' : 'Il raggio moderato'} che hai scelto permette curve ${turn === 'corte' ? 'rapide e controllate' : 'fluide e versatili'}, mentre la lunghezza più corta (10-15cm sotto altezza) facilita la manovrabilità.`
      } else if (level === 'intermedio') {
        title = 'Sci da Pista Intermedi'
        subtitle = 'Equilibrio tra performance e tolleranza'
        reason = `Come sciatore intermedio, ti servono sci con flex medio che bilanciano stabilità e reattività. ${turn === 'corte' ? 'Il raggio corto (~13m)' : turn === 'medie' ? 'Il raggio medio (~15-17m)' : 'Il raggio lungo (~19m+)'} che preferisci offre ${turn === 'corte' ? 'curve dinamiche e rapide' : turn === 'medie' ? 'versatilità in diverse condizioni' : 'stabilità ad alta velocità'}.`
      } else {
        title = 'Sci da Pista Performance'
        subtitle = 'Precisione e potenza per sciatori esperti'
        reason = `Come sciatore avanzato/esperto, necessiti di sci con costruzioni premium (titanal, carbonio) per massima potenza e stabilità. Tecnologie come EMC, Servotec o IQ Control garantiscono presa di spigolo precisa anche su neve dura.`
      }
    } else if (terrain === 'allmountain') {
      level = answers.allmountain_level
      const ratio = answers.allmountain_ratio
      
      key = `allmountain_${level}_${ratio}`
      
      title = 'Sci All-Mountain Versatili'
      subtitle = 'Perfetti per pista e fuoripista'
      
      if (ratio === '70_pista') {
        reason = `Passando il 70% del tempo su pista, ti servono sci all-mountain con waist 85-88mm per buone transizioni ma capaci fuori pista.`
      } else if (ratio === '50_50') {
        reason = `Con split 50/50 pista/fuori, necessiti di veri all-mountain con waist 88-94mm. Equilibrio perfetto tra agilità su battuto e galleggiamento in fresca.`
      } else {
        reason = `Passando il 70% fuoripista, ti servono all-mountain orientati freeride con waist 92-96mm. Maggiore galleggiamento in neve fresca mantenendo gestibilità su pista.`
      }
    } else if (terrain === 'freeride') {
      level = answers.freeride_level
      
      let dbLevel = level
      let dbBudget = budget
      if (dbLevel === 'principiante') {
        dbBudget = 'medio'
      } else if (dbLevel === 'intermedio') {
        dbBudget = 'alto'
      } else if (dbLevel === 'esperto') {
        dbBudget = (budget === 'premium') ? 'premium' : 'alto'
      }
      
      key = `freeride_${dbLevel}_${dbBudget}`
      
      title = `Sci Freeride ${level === 'esperto' ? 'Expert' : level === 'intermedio' ? 'Intermedi' : 'Entry Level'}`
      subtitle = 'Per neve fresca e fuoripista'
      reason = `Sci freeride con waist 100-120mm per galleggiamento ottimale in powder e versatilità su terreni vari.`
    } else if (terrain === 'park') {
      key = `park_${budget}`
      title = 'Sci Freestyle per Park'
      subtitle = 'Twin-tip per tricks e creatività'
      reason = `Twin-tip con design simmetrico, rocker pronunciato e costruzione leggera per park e freestyle.`
    }

    return { key, title, subtitle, reason }
  }

  function getProducts(key: string): Product[] {
    const result = matchSkis(answers)
    
    if (result.success && result.skis) {
      return result.skis.map(ski => ({
        brand: ski.brand,
        name: ski.name,
        specs: ski.specs,
        price: `€${ski.price_min}-${ski.price_max}`,
        officialLink: ski.officialLink,
        amazonLink: ski.amazonLink,
        usedLink: ski.usedLink
      }))
    }
    
    return []
  }

  if (loading) {
    return (
      <section className="min-h-screen pt-24 pb-12" style={{ backgroundColor: 'white' }}>
        <div className="max-w-6xl mx-auto px-8 text-center py-16">
          <div className="w-12 h-12 border-4 rounded-full mx-auto mb-6 animate-spin" style={{ 
            borderColor: '#F8F9FA',
            borderTopColor: '#0D47A1'
          }} />
          <h3 className="text-2xl font-bold mb-4" style={{ color: '#1A1A1A' }}>Analizzando il tuo profilo...</h3>
          <p style={{ color: '#6C757D' }}>Stiamo confrontando le tue risposte con migliaia di modelli di sci</p>
        </div>
      </section>
    )
  }

  const productNames = products.map(p => `${p.brand} ${p.name}`)

  return (
    <section className="min-h-screen pt-24 pb-12" style={{ backgroundColor: 'white' }}>
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-white p-12 rounded-2xl text-center mb-12" style={{
          background: 'linear-gradient(135deg, #0D47A1 0%, #1565C0 100%)'
        }}>
          <h2 className="text-4xl font-bold mb-4">{recommendation.title}</h2>
          <p className="text-xl mb-8 opacity-95">{recommendation.subtitle}</p>
          <div className="p-8 rounded-xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
            <h3 className="text-2xl font-bold mb-4">Perché questi sci?</h3>
            <p className="text-lg leading-relaxed">{recommendation.reason}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {products.map((product, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow" style={{ 
              border: '1px solid #E0E0E0'
            }}>
              <div className="flex items-center justify-between mb-4">
                <BrandLogo brand={product.brand} />
                <span className="text-2xl font-bold" style={{ color: '#0D47A1' }}>{product.price}</span>
              </div>
              
              <h3 className="text-xl font-bold mb-2" style={{ color: '#1A1A1A' }}>
                {product.brand} {product.name}
              </h3>
              <p className="mb-6" style={{ color: '#6C757D' }}>{product.specs}</p>
              
              <div className="space-y-3">
                <a href={product.officialLink} target="_blank" rel="noopener noreferrer" 
                   className="block w-full py-3 px-4 rounded-lg text-center font-semibold transition-all text-white"
                   style={{ backgroundColor: '#0D47A1' }}>
                  Sito Ufficiale
                </a>
                <a href={product.amazonLink} target="_blank" rel="noopener noreferrer"
                   className="block w-full py-3 px-4 rounded-lg text-center font-semibold transition-all"
                   style={{ backgroundColor: '#FFC107', color: '#1A1A1A' }}>
                  Cerca su Amazon
                </a>
                <a href={product.usedLink} target="_blank" rel="noopener noreferrer"
                   className="block w-full py-3 px-4 rounded-lg text-center font-semibold transition-all"
                   style={{ backgroundColor: '#4CAF50', color: 'white' }}>
                  Trova Usato
                </a>
              </div>
            </div>
          ))}
        </div>

        <SocialShare products={productNames} />
        <StoreLocator />
        <RelatedProducts />

        <div className="text-center mt-12">
          <button
            onClick={onRestart}
            className="px-8 py-4 rounded-lg text-white font-semibold text-lg transition-all hover:opacity-90"
            style={{ backgroundColor: '#0D47A1' }}
          >
            🔄 Rifai il Test
          </button>
        </div>
      </div>
    </section>
  )
}
