'use client'

interface BrandLogoProps {
  brand: string
  className?: string
}

export default function BrandLogo({ brand, className = '' }: BrandLogoProps) {
  // Map brands to their official domains for Clearbit
  const brandDomains: Record<string, string> = {
    ROSSIGNOL: 'rossignol.com',
    HEAD: 'head.com',
    SALOMON: 'salomon.com',
    ATOMIC: 'atomic.com',
    VOLKL: 'voelkl.com',
    FISCHER: 'fischersports.com',
    BLIZZARD: 'tecnicablizzard.com',
    K2: 'k2snow.com',
    ARMADA: 'armadaskis.com',
    LINE: 'lineskis.com',
    FACTION: 'factionskis.com',
    PATAGONIA: 'patagonia.com',
    ORTOVOX: 'ortovox.com',
    OAKLEY: 'oakley.com',
    "ARC'TERYX": 'arcteryx.com',
    ABS: 'abs-airbag.com',
    MAMMUT: 'mammut.com',
    POC: 'pocsports.com',
    KJUS: 'kjus.com',
    LEKI: 'leki.com',
    SMITH: 'smithoptics.com',
    DAINESE: 'dainese.com',
    LEVEL: 'levelgloves.com'
  }

  // Use local logo if available (for brands with Clearbit issues)
  const localLogos: Record<string, string> = {
    BLIZZARD: '/logos/blizzard.svg',
    PATAGONIA: '/logos/patagonia.svg',
    ORTOVOX: '/logos/ortovox.svg',
    OAKLEY: '/logos/oakley.svg',
    "ARC'TERYX": '/logos/arcteryx.svg',
    ABS: '/logos/abs.svg',
    MAMMUT: '/logos/mammut.svg',
    POC: '/logos/poc.svg',
    KJUS: '/logos/kjus.svg',
    LEKI: '/logos/leki.svg',
    SMITH: '/logos/smith.svg',
    DAINESE: '/logos/dainese.svg',
    LEVEL: '/logos/level.svg'
  }

  const localLogo = localLogos[brand]
  const domain = brandDomains[brand] || `${brand.toLowerCase()}.com`
  
  // Use local logo first, then Clearbit, then Google Favicon
  const primaryUrl = localLogo || `https://logo.clearbit.com/${domain}`
  const clearbitUrl = `https://logo.clearbit.com/${domain}`
  const fallbackUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=256`

  return (
    <div className={`flex items-center justify-center ${className}`} style={{ backgroundColor: '#F8F9FA' }}>
      <img
        src={primaryUrl}
        alt={`${brand} logo`}
        className="w-3/4 h-3/4 object-contain"
        onError={(e) => {
          const target = e.target as HTMLImageElement
          // If local logo fails, try Clearbit
          if (localLogo && target.src.includes('/logos/')) {
            target.src = clearbitUrl
          }
          // If Clearbit fails, try Google Favicon
          else if (target.src === clearbitUrl) {
            target.src = fallbackUrl
          } 
          // Final fallback: show brand name
          else {
            target.style.display = 'none'
            const parent = target.parentElement
            if (parent) {
              parent.innerHTML = `<div style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; font-family: Arial Black, sans-serif; font-size: 24px; color: #1A1A1A;">${brand}</div>`
            }
          }
        }}
      />
    </div>
  )
}
