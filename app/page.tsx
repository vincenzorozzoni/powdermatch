'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import BookRecommendations from '@/components/BookRecommendations'
import About from '@/components/About'
import Partnership from '@/components/Partnership'
import Privacy from '@/components/Privacy'
import Footer from '@/components/Footer'
import Quiz from '@/components/Quiz'
import Results from '@/components/Results'

export default function Home() {
  const [view, setView] = useState<'home' | 'quiz' | 'results'>('home')
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({})

  const startQuiz = () => {
    setView('quiz')
    window.scrollTo(0, 0)
  }

  const goHome = () => {
    setView('home')
    window.scrollTo(0, 0)
  }

  const handleQuizComplete = (answers: Record<string, string>) => {
    setQuizAnswers(answers)
    setView('results')
    window.scrollTo(0, 0)
  }

  const restartQuiz = () => {
    setQuizAnswers({})
    setView('home')
    window.scrollTo(0, 0)
  }

  return (
    <>
      <Navigation onStartQuiz={startQuiz} onGoHome={goHome} />
      
      {view === 'home' && (
        <>
          <Hero onStartQuiz={startQuiz} />
          <BookRecommendations />
          <About />
          <Partnership />
          <Privacy />
        </>
      )}

      {view === 'quiz' && (
        <Quiz onComplete={handleQuizComplete} />
      )}

      {view === 'results' && (
        <Results answers={quizAnswers} onRestart={restartQuiz} />
      )}

      <Footer />
    </>
  )
}
