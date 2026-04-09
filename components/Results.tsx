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
      
      // Map quiz levels to database keys
      // esperto + avanzato → entrambi usano "avanzato" nel DB
      const dbLevel = (level === 'esperto' || level === 'avanzato') ? 'avanzato' : level
      key = `pista_${dbLevel}_${budget}`
      
      if (level === 'principiante') {
        title = 'Sci da Pista per Principianti'
        subtitle = 'Facili, tolleranti e perfetti per imparare'
        reason = `Come principiante su pista, hai bisogno di sci con costruzione leggera e flex morbido per un controllo semplice. ${turn === 'corte' ? 'Il raggio corto (~13m)' : turn === 'medie' ? 'Il raggio medio (~15m)' : 'Il raggio moderato'} che hai scelto permette curve ${turn === 'corte' ? 'rapide e controllate' : 'fluide e versatili'}, mentre la lunghezza più corta (10-15cm sotto altezza) facilita la manovrabilità. Il camber tradizionale offre buona presa per imparare la tecnica corretta.`
      } else if (level === 'intermedio') {
        title = 'Sci da Pista Intermedi'
        subtitle = 'Equilibrio tra performance e tolleranza'
        reason = `Come sciatore intermedio, ti servono sci con flex medio che bilanciano stabilità e reattività. ${turn === 'corte' ? 'Il raggio corto (~13m)' : turn === 'medie' ? 'Il raggio medio (~15-17m)' : 'Il raggio lungo (~19m+)'} che preferisci offre ${turn === 'corte' ? 'curve dinamiche e rapide' : turn === 'medie' ? 'versatilità in diverse condizioni' : 'stabilità ad alta velocità'}. Waist 73-78mm garantisce transizioni rapide, mentre tecnologie come ERA 3.0 o LCT migliorano presa e controllo.`
      } else {
        title = 'Sci da Pista Performance'
        subtitle = 'Precisione e potenza per sciatori esperti'
        reason = `Come sciatore avanzato/esperto, necessiti di sci con costruzioni premium (titanal, carbonio) per massima potenza e stabilità. ${turn === 'corte' ? 'Il raggio corto' : turn === 'lunghe' ? 'Il raggio lungo' : 'Il raggio medio'} offre ${turn === 'corte' ? 'agilità in curve strette' : turn === 'lunghe' ? 'velocità e fluidità in archi ampi' : 'versatilità race-like'}. Tecnologie come EMC, Servotec o IQ Control garantiscono presa di spigolo precisa anche su neve dura.`
      }
    } else if (terrain === 'allmountain') {
      level = answers.allmountain_level
      const ratio = answers.allmountain_ratio
      
      // CRITICAL FIX: Use RATIO not budget for allmountain!
      // 70_pista → waist 85-88mm
      // 50_50 → waist 88-92mm  
      // 30_pista → waist 92-96mm
      key = `allmountain_${level}_${ratio}`
      
      title = 'Sci All-Mountain Versatili'
      subtitle = 'Perfetti per pista e fuoripista'
      
      if (ratio === '70_pista') {
        reason = `Passando il 70% del tempo su pista, ti servono sci all-mountain con waist 85-88mm per buone transizioni ma capaci fuori pista. Profilo rocker/camber (rocker punta + camber centrale) offre presa su battuto e facilità in neve variabile. ${level === 'intermedio' ? 'Flex medio per progressione' : 'Costruzioni titanal per potenza'}.`
      } else if (ratio === '50_50') {
        reason = `Con split 50/50 pista/fuori, necessiti di veri all-mountain con waist 88-94mm. Equilibrio perfetto tra agilità su battuto e galleggiamento in fresca. ${level === 'intermedio' ? 'Tecnologie C/FX o Basalt per versatilità' : 'HRZN Tech o FluxForm per performance top'}.`
      } else {
        reason = `Passando il 70% fuoripista, ti servono all-mountain orientati freeride con waist 92-96mm. Maggiore galleggiamento in neve fresca mantenendo gestibilità su pista. ${level === 'intermedio' ? 'Cork damping e profili playful' : 'Carbon e costruzioni premium per terreni impegnativi'}.`
      }
    } else if (terrain === 'freeride') {
      level = answers.freeride_level
      const freerrain = answers.freeride_terrain
      
      // Fix: map intermediate correctly!
      let dbLevel = level
      if (level === 'principiante') dbLevel = 'principiante'
      else if (level === 'intermedio') dbLevel = 'intermedio'
      else if (level === 'esperto') dbLevel = 'esperto'
      
      // CRITICAL FIX: Map budget to available database keys
      // Freeride database only has: principiante_medio, intermedio_alto, esperto_alto, esperto_premium
      let dbBudget = budget
      if (dbLevel === 'principiante') {
        // Principiante only has 'medio'
        dbBudget = 'medio'
      } else if (dbLevel === 'intermedio') {
        // Intermedio only has 'alto'
        dbBudget = 'alto'
      } else if (dbLevel === 'esperto') {
        // Esperto has 'alto' and 'premium'
        dbBudget = (budget === 'premium') ? 'premium' : 'alto'
      }
      
      key = `freeride_${dbLevel}_${dbBudget}`
      
      title = `Sci Freeride ${level === 'esperto' ? 'Expert' : level === 'intermedio' ? 'Intermedi' : 'Entry Level'}`
      subtitle = 'Per neve fresca e fuoripista'
      
      if (level === 'principiante') {
        reason = `Come principiante freeride su ${freerrain === 'dolce' ? 'pendii dolci' : 'terreni misti'}, ti servono sci con waist 98-102mm per galleggiamento senza essere troppo impegnativi. Rocker in punta + camber facilita manovre mantenendo presa. Costruzione leggera e playful per imparare con sicurezza.`
      } else if (level === 'intermedio') {
        reason = `Come freerider intermedio su ${freerrain === 'dolce' ? 'boschi e pendii moderati' : freerrain === 'misto' ? 'terreni vari' : 'linee impegnative'}, necessiti waist 100-110mm. Doppio rocker per maneggevolezza, ${freerrain === 'ripido' ? 'costruzioni rigide per controllo' : 'profili versatili'}. Cork damping o tecnologie Air Carbon per smorzamento.`
      } else {
        reason = `Come esperto freeride su ${freerrain === 'ripido' ? 'linee esposte e ripide' : 'terreni estremi'}, servono sci waist 108-120mm con costruzioni premium. ${freerrain === 'ripido' ? 'Camber per presa su neve dura' : 'Full rocker per powder profondo'}. Carbon, titanal, HRZN Tech per potenza massima. Lunghezza vicina o superiore ad altezza per stabilità ad alta velocità.`
      }
    } else if (terrain === 'park') {
      const parkstyle = answers.park_style
      key = `park_${budget}`
      title = 'Sci Freestyle per Park'
      subtitle = 'Twin-tip per tricks e creatività'
      reason = `Per ${parkstyle === 'rail' ? 'rail e jib' : parkstyle === 'jump' ? 'salti e kicker' : 'park completo'}, ti servono twin-tip con ${parkstyle === 'rail' ? 'flex morbido per presse e butter' : parkstyle === 'jump' ? 'flex medio per pop su kicker' : 'flex versatile'}. Design simmetrico, rocker pronunciato, costruzione leggera. ${parkstyle === 'rail' ? 'Butter zones e profili playful' : parkstyle === 'jump' ? 'Pop e stabilità in atterraggio' : 'AR Freestyle o Symmetric Flex'}.`
    }

    console.log('Generated key:', key, 'from answers:', answers) // Debug log
    return { key, title, subtitle, reason }
  }

  function getProducts(key: string): Product[] {
    // Use matchSkis function
    const result = matchSkis(answers)
    
    // Convert from matchSkis format to Results format
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
    
    // Fallback to empty array if no match
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
  const budgetRange = answers.budget === 'economico' ? '€200-400' : answers.budget === 'medio' ? '€400-600' : answers.budget === 'alto' ? '€600-900' : '€900+'

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
          
          {/* Scroll hint */}
          <div className="mt-6">
            <p className="text-sm font-semibold opacity-90">
              ↓ I tuoi 3 sci perfetti ↓
            </p>
          </div>
        </div>

        {/* Main product recommendations - FIRST! */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {products.map((p, i) => (
            <div key={i} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-full h-56 p-4" style={{ backgroundColor: '#F8F9FA' }}>
                <BrandLogo brand={p.brand} className="w-full h-full" />
              </div>
              <div className="p-6">
                <div className="text-xs font-bold mb-2" style={{ 
                  color: '#FF6B35',
                  letterSpacing: '1px'
                }}>{p.brand}</div>
                <h4 className="text-xl font-bold mb-3" style={{ color: '#1A1A1A' }}>{p.name}</h4>
                <p className="text-sm mb-6" style={{ color: '#6C757D' }}>{p.specs}</p>
                
                {/* Three Buttons */}
                <div className="flex flex-col gap-2">
                  {/* Official Site */}
                  <a 
                    href={p.officialLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full text-white font-semibold py-3 rounded-lg transition-all"
                    style={{ backgroundColor: '#0D47A1' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#0A3A87'
                      e.currentTarget.style.transform = 'translateX(4px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#0D47A1'
                      e.currentTarget.style.transform = 'translateX(0)'
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                      <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18c-4.52 0-8-3.48-8-8V8.3l8-4.62 8 4.62V12c0 4.52-3.48 8-8 8z"/>
                    </svg>
                    Sito Ufficiale
                  </a>
                  
                  {/* Amazon */}
                  <a 
                    href={p.amazonLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full text-white font-semibold py-3 rounded-lg transition-all"
                    style={{ backgroundColor: '#FF6B35' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#E85A28'
                      e.currentTarget.style.transform = 'translateX(4px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#FF6B35'
                      e.currentTarget.style.transform = 'translateX(0)'
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                      <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                    </svg>
                    Compra Nuovo
                  </a>
                  
                  {/* Used */}
                  <a 
                    href={p.usedLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full text-white font-semibold py-3 rounded-lg transition-all"
                    style={{ backgroundColor: '#4CAF50' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#45A049'
                      e.currentTarget.style.transform = 'translateX(4px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#4CAF50'
                      e.currentTarget.style.transform = 'translateX(0)'
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                      <path d="M19 1H5c-1.1 0-1.99.9-1.99 2L3 15.93c0 .69.35 1.3.88 1.66L12 23l8.11-5.41c.53-.36.88-.97.88-1.66L21 3c0-1.1-.9-2-2-2zm-7 19.6l-7-4.66V3h14v12.93l-7 4.67zm-2.01-7.42l-2.58-2.59L6 12l4 4 8-8-1.42-1.42z"/>
                    </svg>
                    Cerca Usato
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Related products - compact section */}
        <RelatedProducts terrain={answers.terrain} level={answers.pista_level || answers.allmountain_level || answers.freeride_level || 'intermedio'} />

        {/* Social share */}
        <SocialShare productNames={productNames} budgetRange={budgetRange} />

        {/* Store locator */}
        <StoreLocator />

        <div className="text-center mt-12">
          <button
            onClick={onRestart}
            className="px-8 py-4 rounded-lg text-white font-bold text-lg transition-all hover:-translate-y-1 flex items-center gap-3 mx-auto"
            style={{ backgroundColor: '#FF6B35' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#E85A28'
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(255, 107, 53, 0.3)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#FF6B35'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 12C4 7.58172 7.58172 4 12 4C14.5264 4 16.7792 5.17108 18.2454 7M20 12C20 16.4183 16.4183 20 12 20C9.47362 20 7.22075 18.8289 5.75463 17" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <path d="M18 3V7H14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 21V17H10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Ricomincia il Test
          </button>
        </div>
      </div>
    </section>
  )
}
