'use client'

import { useState } from 'react'

export default function Privacy() {
  const [open, setOpen] = useState(false)

  return (
    <div className="max-w-7xl mx-auto px-8 my-12">
      <div 
        className="p-4 rounded-lg border cursor-pointer"
        style={{ backgroundColor: '#F8F9FA', borderColor: '#DEE2E6' }}
        onClick={() => setOpen(!open)}
      >
        <h4 className="flex justify-between items-center m-0 text-base">
          <span className="flex items-center">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L3 7V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V7L12 2Z" stroke="#0D47A1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 12L11 14L15 10" stroke="#0D47A1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Informativa Privacy
          </span>
          <span>{open ? '▲' : '▼'}</span>
        </h4>
        {open && (
          <div className="mt-4 text-sm leading-relaxed" style={{ color: '#6C757D' }}>
            <p className="mb-4"><strong>Protezione dei dati:</strong> PowderMatch non raccoglie, memorizza o trasmette dati personali identificativi. Le risposte al questionario vengono elaborate localmente nel browser e non inviate a server esterni.</p>
            <p className="mb-4"><strong>Cookie:</strong> Non utilizziamo cookie di profilazione o sistemi di tracciamento di terze parti.</p>
            <p className="mb-4"><strong>Link esterni:</strong> I link ai brand partner reindirizzano a siti esterni con proprie politiche privacy.</p>
            <p className="mb-4"><strong>Google Maps:</strong> La funzione ricerca negozi utilizza Google Maps, soggetto alle policy Google.</p>
            <p><strong>Disclaimer:</strong> Le raccomandazioni sono generate da algoritmi AI e non sostituiscono la consulenza di esperti. Consigliamo sempre di consultare personale specializzato prima dell'acquisto finale.</p>
          </div>
        )}
      </div>
    </div>
  )
}
