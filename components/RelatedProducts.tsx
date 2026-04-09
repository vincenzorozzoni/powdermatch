'use client'

import BrandLogo from './BrandLogo'

interface RelatedProduct {
  title: string
  category: string
  priceRange: string
  amazonLink: string
  brand: string
}

interface RelatedProductsProps {
  terrain: string
  level: string
}

export default function RelatedProducts({ terrain, level }: RelatedProductsProps) {
  // Mapping intelligente terrain → prodotti correlati
  const getRelatedProducts = (): RelatedProduct[] => {
    if (terrain === 'freeride') {
      return [
        {
          title: 'Giacca Powder Impermeabile',
          category: 'Abbigliamento',
          priceRange: 'Da €350',
          amazonLink: 'https://www.amazon.it/s?k=giacca+sci+freeride+impermeabile',
          brand: 'ARC\'TERYX'
        },
        {
          title: 'Zaino Airbag 30L',
          category: 'Sicurezza',
          priceRange: 'Da €850',
          amazonLink: 'https://www.amazon.it/s?k=zaino+airbag+sci+avalanche',
          brand: 'ABS'
        },
        {
          title: 'ARTVA Digitale',
          category: 'Sicurezza',
          priceRange: 'Da €280',
          amazonLink: 'https://www.amazon.it/s?k=artva+arva+sci+alpinismo',
          brand: 'MAMMUT'
        }
      ]
    } else if (terrain === 'pista') {
      return [
        {
          title: 'Casco Racing',
          category: 'Protezione',
          priceRange: 'Da €120',
          amazonLink: 'https://www.amazon.it/s?k=casco+sci+racing+alpino',
          brand: 'POC'
        },
        {
          title: 'Giacca Tecnica Slim',
          category: 'Abbigliamento',
          priceRange: 'Da €280',
          amazonLink: 'https://www.amazon.it/s?k=giacca+sci+racing+slim+fit',
          brand: 'KJUS'
        },
        {
          title: 'Bastoncini Carbonio',
          category: 'Accessori',
          priceRange: 'Da €90',
          amazonLink: 'https://www.amazon.it/s?k=bastoncini+sci+carbonio+racing',
          brand: 'LEKI'
        }
      ]
    } else if (terrain === 'park') {
      return [
        {
          title: 'Casco con Audio',
          category: 'Protezione',
          priceRange: 'Da €150',
          amazonLink: 'https://www.amazon.it/s?k=casco+sci+freestyle+audio',
          brand: 'SMITH'
        },
        {
          title: 'Paraschiena',
          category: 'Protezione',
          priceRange: 'Da €80',
          amazonLink: 'https://www.amazon.it/s?k=paraschiena+sci+freestyle',
          brand: 'DAINESE'
        },
        {
          title: 'Guanti Impact',
          category: 'Accessori',
          priceRange: 'Da €60',
          amazonLink: 'https://www.amazon.it/s?k=guanti+sci+park+rinforzati',
          brand: 'LEVEL'
        }
      ]
    } else { // allmountain
      return [
        {
          title: 'Giacca 3-Layer Versatile',
          category: 'Abbigliamento',
          priceRange: 'Da €320',
          amazonLink: 'https://www.amazon.it/s?k=giacca+sci+3+layer+goretex',
          brand: 'PATAGONIA'
        },
        {
          title: 'Zaino Ski-Touring 25L',
          category: 'Accessori',
          priceRange: 'Da €140',
          amazonLink: 'https://www.amazon.it/s?k=zaino+scialpinismo+25+litri',
          brand: 'ORTOVOX'
        },
        {
          title: 'Maschera Intercambiabile',
          category: 'Accessori',
          priceRange: 'Da €180',
          amazonLink: 'https://www.amazon.it/s?k=maschera+sci+lenti+intercambiabili',
          brand: 'OAKLEY'
        }
      ]
    }
  }

  const products = getRelatedProducts()

  return (
    <section className="mt-12 py-8 rounded-2xl" style={{ backgroundColor: '#F8F9FA' }}>
      <div className="mb-6 text-center">
        <h3 className="text-2xl font-bold mb-2" style={{ color: '#0D47A1' }}>
          Completa il Tuo Setup
        </h3>
        <p className="text-base" style={{ color: '#6C757D' }}>
          Altri {terrain === 'freeride' ? 'freerider' : terrain === 'park' ? 'freestyler' : 'sciatori'} hanno acquistato anche
        </p>
      </div>

      {/* Centered cards grid - max 3 */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product, idx) => (
            <a
              key={idx}
              href={product.amazonLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl overflow-hidden border-2 transition-all hover:shadow-lg"
              style={{ 
                borderColor: '#DEE2E6',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#FF6B35'
                e.currentTarget.style.transform = 'translateY(-4px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#DEE2E6'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {/* Logo like skis - using BrandLogo component */}
              <div 
                className="h-40 p-6 flex items-center justify-center"
                style={{ backgroundColor: 'white' }}
              >
                <BrandLogo brand={product.brand} className="w-full h-full" />
                <div 
                  className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold"
                  style={{ 
                    backgroundColor: terrain === 'freeride' ? '#F44336' : terrain === 'park' ? '#FF9800' : '#0D47A1',
                    color: 'white'
                  }}
                >
                  {product.category}
                </div>
              </div>

              {/* Product info */}
              <div className="p-4" style={{ backgroundColor: 'white' }}>
                <h4 className="font-bold text-base mb-1" style={{ color: '#1A1A1A' }}>
                  {product.title}
                </h4>
                <p className="text-xs mb-3" style={{ color: '#6C757D' }}>
                  {product.brand}
                </p>
                <span 
                  className="text-sm font-semibold"
                  style={{ color: '#FF6B35' }}
                >
                  Vedi su Amazon →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
