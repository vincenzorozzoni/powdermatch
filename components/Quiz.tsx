'use client'

import { useState, useEffect } from 'react'

interface QuizProps {
  onComplete: (answers: Record<string, string>) => void
}

interface Question {
  id: string
  title: string
  desc: string
  options: { value: string; text: string; icon: string }[]
}

export default function Quiz({ onComplete }: QuizProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [questionPath, setQuestionPath] = useState<Question[]>([])

  // Base questions - EXACTLY from HTML
  const baseQuestions: Question[] = [
    {
      id: 'gender',
      title: 'Per chi stai cercando?',
      desc: 'Gli sci hanno costruzioni diverse per uomo e donna',
      options: [
        { value: 'uomo', text: 'Uomo', icon: '<svg viewBox="0 0 24 24" fill="#0D47A1"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>' },
        { value: 'donna', text: 'Donna', icon: '<svg viewBox="0 0 24 24" fill="#FF6B35"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>' }
      ]
    },
    {
      id: 'terrain',
      title: 'Dove scii principalmente?',
      desc: 'Il terreno determina la tipologia di sci',
      options: [
        { value: 'pista', text: 'Piste preparate', icon: '<svg viewBox="0 0 24 24" fill="#0D47A1"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>' },
        { value: 'allmountain', text: 'Mix pista e fuoripista', icon: '<svg viewBox="0 0 24 24" fill="#FF6B35"><path d="M14 6l-3.75 5 2.85 3.8-1.6 1.2C9.81 13.75 7 10 7 10l-6 8h22L14 6z"/></svg>' },
        { value: 'freeride', text: 'Fuoripista e neve fresca', icon: '<svg viewBox="0 0 24 24" fill="#1976D2"><path d="M22 11h-4.17l3.24-3.24-1.41-1.42L15 11h-2V9l4.66-4.66-1.42-1.41L13 6.17V2h-2v4.17L7.76 2.93 6.34 4.34 11 9v2H9L4.34 6.34 2.93 7.76 6.17 11H2v2h4.17l-3.24 3.24 1.41 1.42L9 13h2v2l-4.66 4.66 1.42 1.41L11 17.83V22h2v-4.17l3.24 3.24 1.42-1.41L13 15v-2h2l4.66 4.66 1.41-1.42L17.83 13H22v-2z"/></svg>' },
        { value: 'park', text: 'Park e freestyle', icon: '<svg viewBox="0 0 24 24" fill="#FF9800"><path d="M2 20l10-16 10 16H2z"/><circle cx="12" cy="18" r="1.5" fill="white"/></svg>' }
      ]
    }
  ]

  // ALL pista questions from HTML
  const pistaQuestions: Question[] = [
    {
      id: 'pista_level',
      title: 'Qual è il tuo livello su pista?',
      desc: 'Il flex e la costruzione dello sci dipendono dal livello',
      options: [
        { value: 'principiante', text: 'Principiante - Sto imparando', icon: '<svg viewBox="0 0 24 24" fill="#4CAF50"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>' },
        { value: 'intermedio', text: 'Intermedio - Piste blu/rosse', icon: '<svg viewBox="0 0 24 24" fill="#2196F3"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>' },
        { value: 'avanzato', text: 'Avanzato - Tutte le piste', icon: '<svg viewBox="0 0 24 24" fill="#F44336"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>' },
        { value: 'esperto', text: 'Esperto - Velocità e precisione', icon: '<svg viewBox="0 0 24 24" fill="#9C27B0"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/></svg>' }
      ]
    },
    {
      id: 'pista_turn',
      title: 'Che tipo di curve preferisci?',
      desc: 'Il raggio di sciancratura determina lo stile',
      options: [
        { value: 'corte', text: 'Curve corte e rapide (~13m)', icon: '<svg viewBox="0 0 24 24" fill="#FF6B35"><path d="M4 20c0-4.4 3.6-8 8-8v8H4z"/><circle cx="12" cy="12" r="2" fill="#FF6B35"/></svg>' },
        { value: 'medie', text: 'Curve medie versatili (~15-17m)', icon: '<svg viewBox="0 0 24 24" fill="#0D47A1"><path d="M4 20c0-6.6 5.4-12 12-12v12H4z"/><circle cx="16" cy="8" r="2" fill="#0D47A1"/></svg>' },
        { value: 'lunghe', text: 'Curve lunghe e veloci (~19m+)', icon: '<svg viewBox="0 0 24 24" fill="#4CAF50"><path d="M4 20c0-8.8 7.2-16 16-16v16H4z"/><circle cx="20" cy="4" r="2" fill="#4CAF50"/></svg>' }
      ]
    }
  ]

  // ALL allmountain questions
  const allmountainQuestions: Question[] = [
    {
      id: 'allmountain_level',
      title: 'Qual è il tuo livello generale?',
      desc: 'Il flex e le tecnologie variano per livello',
      options: [
        { value: 'intermedio', text: 'Intermedio - Scio regolarmente', icon: '<svg viewBox="0 0 24 24" fill="#2196F3"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>' },
        { value: 'avanzato', text: 'Avanzato - Controllo e versatilità', icon: '<svg viewBox="0 0 24 24" fill="#F44336"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>' }
      ]
    },
    {
      id: 'allmountain_ratio',
      title: 'Dove passi più tempo?',
      desc: 'Determina la larghezza ideale (waist)',
      options: [
        { value: '70_pista', text: '70% pista / 30% fuori', icon: '<svg viewBox="0 0 24 24" fill="#0D47A1"><circle cx="9" cy="12" r="8" fill="#0D47A1"/><circle cx="15" cy="12" r="4" fill="#1976D2"/></svg>' },
        { value: '50_50', text: '50% pista / 50% fuori', icon: '<svg viewBox="0 0 24 24" fill="#FF6B35"><circle cx="8" cy="12" r="6" fill="#FF6B35"/><circle cx="16" cy="12" r="6" fill="#FFA726"/></svg>' },
        { value: '30_pista', text: '30% pista / 70% fuori', icon: '<svg viewBox="0 0 24 24" fill="#4CAF50"><circle cx="9" cy="12" r="4" fill="#4CAF50"/><circle cx="15" cy="12" r="8" fill="#66BB6A"/></svg>' }
      ]
    }
  ]

  // ALL freeride questions
  const freerideQuestions: Question[] = [
    {
      id: 'freeride_level',
      title: 'Qual è il tuo livello fuoripista?',
      desc: 'Esperienza in neve fresca e terreno non battuto',
      options: [
        { value: 'principiante', text: 'Principiante - Prime uscite fuori', icon: '<svg viewBox="0 0 24 24" fill="#4CAF50"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>' },
        { value: 'intermedio', text: 'Intermedio - Scio regolarmente in fresca', icon: '<svg viewBox="0 0 24 24" fill="#2196F3"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>' },
        { value: 'esperto', text: 'Esperto - Affronto ogni condizione', icon: '<svg viewBox="0 0 24 24" fill="#F44336"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>' }
      ]
    },
    {
      id: 'freeride_terrain',
      title: 'Che terreno affronti?',
      desc: 'Determina waist e profilo rocker',
      options: [
        { value: 'dolce', text: 'Pendii dolci e boschi', icon: '<svg viewBox="0 0 24 24" fill="#4CAF50"><path d="M2 20h20L16 12 2 20z"/><path d="M4 18l10-6 6 6H4z" fill="#66BB6A"/></svg>' },
        { value: 'misto', text: 'Misto tra ripidi e dolci', icon: '<svg viewBox="0 0 24 24" fill="#FF9800"><path d="M2 20h20L14 8 2 20z"/><path d="M4 18l8-8 10 8H4z" fill="#FFA726"/></svg>' },
        { value: 'ripido', text: 'Linee ripide e esposte', icon: '<svg viewBox="0 0 24 24" fill="#F44336"><path d="M2 20h20L12 4 2 20z"/><path d="M4 18L12 6l8 12H4z" fill="#EF5350"/></svg>' }
      ]
    }
  ]

  // ALL park questions
  const parkQuestions: Question[] = [
    {
      id: 'park_style',
      title: 'Cosa ti piace nel park?',
      desc: 'Determina flex e profilo',
      options: [
        { value: 'rail', text: 'Rail e jib', icon: '<svg viewBox="0 0 24 24" fill="#FF6B35"><rect x="2" y="10" width="20" height="4" rx="2" fill="#FF6B35"/><circle cx="6" cy="12" r="1.5" fill="white"/><circle cx="18" cy="12" r="1.5" fill="white"/></svg>' },
        { value: 'jump', text: 'Salti e kicker', icon: '<svg viewBox="0 0 24 24" fill="#2196F3"><path d="M12 4l-8 8h5v8h6v-8h5l-8-8z"/></svg>' },
        { value: 'mixed', text: 'Mix rail e jump', icon: '<svg viewBox="0 0 24 24" fill="#9C27B0"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>' }
      ]
    }
  ]

  // ALL final questions from HTML
  const finalQuestions: Question[] = [
    {
      id: 'days',
      title: 'Quanti giorni scii all\'anno?',
      desc: 'La frequenza influenza l\'investimento',
      options: [
        { value: 'occasionale', text: '1-5 giorni', icon: '<svg viewBox="0 0 24 24" fill="#9E9E9E"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/></svg>' },
        { value: 'regolare', text: '6-15 giorni', icon: '<svg viewBox="0 0 24 24" fill="#2196F3"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/></svg>' },
        { value: 'frequente', text: '16-30 giorni', icon: '<svg viewBox="0 0 24 24" fill="#4CAF50"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/></svg>' },
        { value: 'intensivo', text: '30+ giorni', icon: '<svg viewBox="0 0 24 24" fill="#FF6B35"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/></svg>' }
      ]
    },
    {
      id: 'height',
      title: 'Qual è la tua altezza?',
      desc: 'Fondamentale per la lunghezza sci',
      options: [
        { value: '<160', text: 'Meno di 160 cm', icon: '<svg viewBox="0 0 24 24" fill="#9E9E9E"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>' },
        { value: '160-170', text: '160-170 cm', icon: '<svg viewBox="0 0 24 24" fill="#2196F3"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>' },
        { value: '171-180', text: '171-180 cm', icon: '<svg viewBox="0 0 24 24" fill="#4CAF50"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>' },
        { value: '>180', text: 'Più di 180 cm', icon: '<svg viewBox="0 0 24 24" fill="#FF6B35"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>' }
      ]
    },
    {
      id: 'budget',
      title: 'Qual è il tuo budget?',
      desc: 'Ti mostreremo opzioni nella tua fascia',
      options: [
        { value: 'economico', text: '€200-400', icon: '<svg viewBox="0 0 24 24" fill="#4CAF50"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>' },
        { value: 'medio', text: '€400-600', icon: '<svg viewBox="0 0 24 24" fill="#2196F3"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>' },
        { value: 'alto', text: '€600-900', icon: '<svg viewBox="0 0 24 24" fill="#FF9800"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.10h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>' },
        { value: 'premium', text: '€900+', icon: '<svg viewBox="0 0 24 24" fill="#9C27B0"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.10h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>' }
      ]
    }
  ]

  // Initialize on mount
  useEffect(() => {
    if (questionPath.length === 0) {
      setQuestionPath([...baseQuestions])
    }
  }, [])

  const buildQuestionPath = (terrain: string) => {
    let newPath = [...baseQuestions]
    
    if (terrain === 'pista') {
      newPath.push(...pistaQuestions)
    } else if (terrain === 'allmountain') {
      newPath.push(...allmountainQuestions)
    } else if (terrain === 'freeride') {
      newPath.push(...freerideQuestions)
    } else if (terrain === 'park') {
      newPath.push(...parkQuestions)
    }
    
    newPath.push(...finalQuestions)
    return newPath
  }

  const selectAnswer = (questionId: string, value: string) => {
    const newAnswers = { ...answers, [questionId]: value }
    setAnswers(newAnswers)

    // If terrain question, build new path FIRST
    let pathToUse = questionPath
    if (questionId === 'terrain') {
      const newPath = buildQuestionPath(value)
      setQuestionPath(newPath)
      pathToUse = newPath // Use the new path immediately
    }

    setTimeout(() => {
      if (currentQuestion < pathToUse.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
      } else {
        onComplete(newAnswers)
      }
    }, 300)
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const progress = questionPath.length > 0 ? ((currentQuestion + 1) / questionPath.length) * 100 : 0

  if (questionPath.length === 0) return null

  const question = questionPath[currentQuestion]

  return (
    <section className="min-h-screen pt-24 pb-12" style={{
      background: 'linear-gradient(rgba(13, 71, 161, 0.85), rgba(13, 71, 161, 0.85)), url(https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1920&h=1080&fit=crop&q=80) center/cover fixed'
    }}>
      <div className="max-w-4xl mx-auto px-8">
        <div className="rounded-2xl p-8 shadow-2xl" style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(10px)'
        }}>
          {/* Progress */}
          <div className="flex justify-between text-sm font-semibold mb-4" style={{ color: '#6C757D' }}>
            <span>Domanda {currentQuestion + 1} di {questionPath.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 rounded-full mb-8" style={{ backgroundColor: '#DEE2E6' }}>
            <div className="h-full rounded-full transition-all duration-300" style={{ width: `${progress}%`, backgroundColor: '#0D47A1' }} />
          </div>

          {/* Question */}
          <h2 className="text-3xl font-bold mb-2" style={{ color: '#1A1A1A' }}>{question.title}</h2>
          <p className="mb-8" style={{ color: '#6C757D' }}>{question.desc}</p>

          {/* Options */}
          <div className="space-y-4 mb-8">
            {question.options.map((opt) => (
              <div
                key={opt.value}
                onClick={() => selectAnswer(question.id, opt.value)}
                className="border-2 p-5 rounded-xl cursor-pointer hover:translate-x-2 transition-all flex items-center gap-4"
                style={{
                  backgroundColor: '#F8F9FA',
                  borderColor: '#DEE2E6'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#0D47A1'
                  e.currentTarget.style.backgroundColor = 'white'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#DEE2E6'
                  e.currentTarget.style.backgroundColor = '#F8F9FA'
                }}
              >
                <div className="w-10 h-10 flex-shrink-0" dangerouslySetInnerHTML={{ __html: opt.icon }} />
                <span className="font-semibold" style={{ color: '#1A1A1A' }}>{opt.text}</span>
              </div>
            ))}
          </div>

          {/* Back button */}
          {currentQuestion > 0 && (
            <button
              onClick={prevQuestion}
              className="px-6 py-3 rounded-lg font-semibold transition"
              style={{
                backgroundColor: '#F8F9FA',
                color: '#1A1A1A'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#DEE2E6'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#F8F9FA'
              }}
            >
              ← Indietro
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
