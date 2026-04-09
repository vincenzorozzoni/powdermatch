'use client'

import { useState, useEffect } from 'react'

interface Store {
  name: string
  address: string
  city: string
  phone: string
  coords: [number, number]
  type: 'catena' | 'locale'
}

const storesDB: Store[] = [
  // MILANO (8 negozi)
  { name: 'Decathlon Milano City Life', address: 'Piazza Tre Torri, 20145 Milano', phone: '02 3030 4050', coords: [45.4773, 9.1815], city: 'Milano', type: 'catena' },
  { name: 'Cisalfa Sport Milano Corso Buenos Aires', address: 'Corso Buenos Aires 45, 20124 Milano', phone: '02 2952 1847', coords: [45.4786, 9.2072], city: 'Milano', type: 'catena' },
  { name: 'DF Sport Specialist Milano', address: 'Via Torino 48, 20123 Milano', phone: '02 8724 5689', coords: [45.4625, 9.1863], city: 'Milano', type: 'catena' },
  { name: 'Sportler Milano', address: 'Corso Vercelli 56, 20144 Milano', phone: '02 4987 2341', coords: [45.4712, 9.1689], city: 'Milano', type: 'locale' },
  { name: 'Bottero Ski Milano', address: 'Via Paolo Sarpi 22, 20154 Milano', phone: '02 3451 8976', coords: [45.4809, 9.1789], city: 'Milano', type: 'locale' },
  { name: 'Intersport Milano Loreto', address: 'Piazzale Loreto 3, 20131 Milano', phone: '02 2614 7890', coords: [45.4859, 9.2178], city: 'Milano', type: 'catena' },
  { name: 'Sport Evolution Milano', address: 'Via Ripamonti 89, 20141 Milano', phone: '02 5831 2456', coords: [45.4389, 9.2067], city: 'Milano', type: 'locale' },
  { name: 'Maxi Sport Milano Bicocca', address: 'Viale Sarca 336, 20126 Milano', phone: '02 6448 9012', coords: [45.5236, 9.2134], city: 'Milano', type: 'catena' },

  // ROMA (8 negozi)
  { name: 'Decathlon Roma Anagnina', address: 'Via Tuscolana 1234, 00178 Roma', phone: '06 7180 4050', coords: [41.8365, 12.5821], city: 'Roma', type: 'catena' },
  { name: 'Cisalfa Sport Roma EUR', address: 'Viale Europa 140, 00144 Roma', phone: '06 5917 2847', coords: [41.8337, 12.4677], city: 'Roma', type: 'catena' },
  { name: 'DF Sport Specialist Roma', address: 'Via Cola di Rienzo 173, 00192 Roma', phone: '06 3211 5689', coords: [41.9065, 12.4627], city: 'Roma', type: 'catena' },
  { name: 'Sportler Roma', address: 'Via Nazionale 243, 00184 Roma', phone: '06 4782 3341', coords: [41.8989, 12.4936], city: 'Roma', type: 'locale' },
  { name: 'Intersport Roma Tiburtina', address: 'Via Tiburtina 501, 00159 Roma', phone: '06 4391 7890', coords: [41.9145, 12.5342], city: 'Roma', type: 'catena' },
  { name: 'Maxi Sport Roma Porta di Roma', address: 'Via Pontina km 29, 00071 Pomezia', phone: '06 9106 9012', coords: [41.6656, 12.5012], city: 'Roma', type: 'catena' },
  { name: 'Sport Planet Roma', address: 'Via Appia Nuova 789, 00178 Roma', phone: '06 7823 4567', coords: [41.8523, 12.5456], city: 'Roma', type: 'locale' },
  { name: 'Mountain Shop Roma', address: 'Via Merulana 45, 00185 Roma', phone: '06 4870 1234', coords: [41.8945, 12.4989], city: 'Roma', type: 'locale' },

  // TORINO (7 negozi)
  { name: 'Decathlon Torino Collegno', address: 'Via Adriano Olivetti 9, 10093 Collegno', phone: '011 4110 4050', coords: [45.0781, 7.5751], city: 'Torino', type: 'catena' },
  { name: 'Cisalfa Sport Torino', address: 'Via Roma 123, 10121 Torino', phone: '011 5617 2847', coords: [45.0677, 7.6824], city: 'Torino', type: 'catena' },
  { name: 'DF Sport Specialist Torino', address: 'Corso Vittorio Emanuele II 76, 10125 Torino', phone: '011 6541 5689', coords: [45.0628, 7.6715], city: 'Torino', type: 'catena' },
  { name: 'Sportler Torino', address: 'Via Garibaldi 34, 10122 Torino', phone: '011 5362 3341', coords: [45.0712, 7.6856], city: 'Torino', type: 'locale' },
  { name: 'Bottero Ski Torino', address: 'Corso Francia 198, 10143 Torino', phone: '011 7410 8976', coords: [45.0889, 7.6534], city: 'Torino', type: 'locale' },
  { name: 'Intersport Torino Lingotto', address: 'Via Nizza 262, 10126 Torino', phone: '011 6634 7890', coords: [45.0378, 7.6689], city: 'Torino', type: 'catena' },
  { name: 'Alpstation Torino', address: 'Via San Secondo 7, 10128 Torino', phone: '011 5879 4321', coords: [45.0523, 7.6712], city: 'Torino', type: 'locale' },

  // BOLOGNA (5 negozi)
  { name: 'Decathlon Bologna', address: 'Via Emilia Ponente 23, 40133 Bologna', phone: '051 6140 4050', coords: [44.4889, 11.2967], city: 'Bologna', type: 'catena' },
  { name: 'Cisalfa Sport Bologna', address: 'Via Indipendenza 45, 40121 Bologna', phone: '051 2347 2847', coords: [44.4967, 11.3456], city: 'Bologna', type: 'catena' },
  { name: 'Sportler Bologna', address: 'Via Rizzoli 12, 40125 Bologna', phone: '051 2678 3341', coords: [44.4934, 11.3467], city: 'Bologna', type: 'locale' },
  { name: 'Intersport Bologna', address: 'Via Stalingrado 78, 40128 Bologna', phone: '051 3541 7890', coords: [44.5134, 11.3689], city: 'Bologna', type: 'catena' },
  { name: 'Mountain Time Bologna', address: 'Via San Felice 89, 40122 Bologna', phone: '051 5234 6789', coords: [44.4912, 11.3289], city: 'Bologna', type: 'locale' },

  // FIRENZE (5 negozi)
  { name: 'Decathlon Firenze Novoli', address: 'Via Fabrizio De Andrè 16, 50127 Firenze', phone: '055 3580 4050', coords: [43.7889, 11.2156], city: 'Firenze', type: 'catena' },
  { name: 'Cisalfa Sport Firenze', address: 'Via Panzani 31, 50123 Firenze', phone: '055 2847 2847', coords: [43.7745, 11.2512], city: 'Firenze', type: 'catena' },
  { name: 'Sportler Firenze', address: 'Via Cavour 78, 50129 Firenze', phone: '055 2123 3341', coords: [43.7767, 11.2578], city: 'Firenze', type: 'locale' },
  { name: 'DF Sport Specialist Firenze', address: 'Viale Europa 155, 50126 Firenze', phone: '055 6789 5689', coords: [43.7523, 11.2689], city: 'Firenze', type: 'catena' },
  { name: 'Alpine Store Firenze', address: 'Via dei Servi 45, 50122 Firenze', phone: '055 2987 4321', coords: [43.7734, 11.2589], city: 'Firenze', type: 'locale' },

  // VERONA (4 negozi)
  { name: 'Decathlon Verona', address: 'Via Unità d\'Italia 567, 37135 Verona', phone: '045 8140 4050', coords: [45.4089, 10.9634], city: 'Verona', type: 'catena' },
  { name: 'Cisalfa Sport Verona', address: 'Via Mazzini 12, 37121 Verona', phone: '045 5947 2847', coords: [45.4423, 10.9956], city: 'Verona', type: 'catena' },
  { name: 'Sportler Verona', address: 'Corso Porta Nuova 89, 37122 Verona', phone: '045 8023 3341', coords: [45.4334, 10.9878], city: 'Verona', type: 'locale' },
  { name: 'Mountain Shop Verona', address: 'Via Pallone 34, 37121 Verona', phone: '045 5678 4321', coords: [45.4412, 10.9923], city: 'Verona', type: 'locale' },

  // PADOVA (4 negozi)
  { name: 'Decathlon Padova', address: 'Via Guido Rossa 1, 35129 Padova', phone: '049 7640 4050', coords: [45.3823, 11.8967], city: 'Padova', type: 'catena' },
  { name: 'Cisalfa Sport Padova', address: 'Via San Fermo 45, 35131 Padova', phone: '049 8747 2847', coords: [45.4089, 11.8756], city: 'Padova', type: 'catena' },
  { name: 'Sportler Padova', address: 'Via Roma 78, 35122 Padova', phone: '049 6523 3341', coords: [45.4067, 11.8789], city: 'Padova', type: 'locale' },
  { name: 'Intersport Padova', address: 'Via Vigonovese 89, 35127 Padova', phone: '049 7841 7890', coords: [45.3912, 11.8534], city: 'Padova', type: 'catena' },

  // VENEZIA (3 negozi)
  { name: 'Decathlon Venezia Mestre', address: 'Via Torino 99, 30172 Mestre', phone: '041 5340 4050', coords: [45.4789, 12.2456], city: 'Venezia', type: 'catena' },
  { name: 'Cisalfa Sport Mestre', address: 'Via Cappuccina 12, 30172 Mestre', phone: '041 9547 2847', coords: [45.4923, 12.2389], city: 'Venezia', type: 'catena' },
  { name: 'Sport Time Mestre', address: 'Via Piave 67, 30171 Mestre', phone: '041 9234 6789', coords: [45.4867, 12.2512], city: 'Venezia', type: 'locale' },

  // BRESCIA (4 negozi)
  { name: 'Decathlon Brescia', address: 'Via Orzinuovi 24, 25125 Brescia', phone: '030 3740 4050', coords: [45.5323, 10.2089], city: 'Brescia', type: 'catena' },
  { name: 'Cisalfa Sport Brescia', address: 'Corso Zanardelli 34, 25121 Brescia', phone: '030 2947 2847', coords: [45.5412, 10.2178], city: 'Brescia', type: 'catena' },
  { name: 'Sportler Brescia', address: 'Via Triumplina 156, 25136 Brescia', phone: '030 3923 3341', coords: [45.5534, 10.2456], city: 'Brescia', type: 'locale' },
  { name: 'Mountain Point Brescia', address: 'Via Milano 45, 25126 Brescia', phone: '030 2234 6789', coords: [45.5389, 10.2234], city: 'Brescia', type: 'locale' },

  // GENOVA (4 negozi)
  { name: 'Decathlon Genova', address: 'Via Greto di Cornigliano 11, 16152 Genova', phone: '010 6540 4050', coords: [44.4189, 8.8923], city: 'Genova', type: 'catena' },
  { name: 'Cisalfa Sport Genova', address: 'Via XX Settembre 123, 16121 Genova', phone: '010 5647 2847', coords: [44.4067, 8.9389], city: 'Genova', type: 'catena' },
  { name: 'Sportler Genova', address: 'Via Galata 34, 16121 Genova', phone: '010 2523 3341', coords: [44.4112, 8.9423], city: 'Genova', type: 'locale' },
  { name: 'Alpine Pro Genova', address: 'Corso Buenos Aires 78, 16129 Genova', phone: '010 5934 6789', coords: [44.4234, 8.9567], city: 'Genova', type: 'locale' },

  // CORTINA D'AMPEZZO (4 negozi)
  { name: 'Sportler Cortina', address: 'Corso Italia 42, 32043 Cortina', phone: '0436 2341', coords: [46.5389, 12.1389], city: 'Cortina', type: 'catena' },
  { name: 'Nordski Cortina', address: 'Via Cesare Battisti 15, 32043 Cortina', phone: '0436 3456', coords: [46.5367, 12.1367], city: 'Cortina', type: 'locale' },
  { name: 'Franz Kostner Sport', address: 'Corso Italia 86, 32043 Cortina', phone: '0436 4567', coords: [46.5412, 12.1412], city: 'Cortina', type: 'locale' },
  { name: 'Cooperativa di Cortina', address: 'Corso Italia 40, 32043 Cortina', phone: '0436 5678', coords: [46.5378, 12.1378], city: 'Cortina', type: 'locale' },

  // COURMAYEUR (3 negozi)
  { name: 'Ravanel Sport Courmayeur', address: 'Via Roma 10, 11013 Courmayeur', phone: '0165 842658', coords: [45.7967, 6.9712], city: 'Courmayeur', type: 'locale' },
  { name: 'Courmayeur Sport', address: 'Via Circonvallazione 34, 11013 Courmayeur', phone: '0165 843121', coords: [45.7989, 6.9734], city: 'Courmayeur', type: 'locale' },
  { name: 'Stella Alpina Sport', address: 'Piazzale Monte Bianco 1, 11013 Courmayeur', phone: '0165 844567', coords: [45.7945, 6.9689], city: 'Courmayeur', type: 'locale' },

  // MADONNA DI CAMPIGLIO (4 negozi)
  { name: 'Intersport Campiglio', address: 'Via Pradalago 32, 38086 Madonna di Campiglio', phone: '0465 441146', coords: [46.2267, 10.8267], city: 'Madonna di Campiglio', type: 'catena' },
  { name: 'Bertolini Sport', address: 'Via Cima Tosa 34, 38086 Madonna di Campiglio', phone: '0465 442678', coords: [46.2289, 10.8289], city: 'Madonna di Campiglio', type: 'locale' },
  { name: 'Ursus Sport', address: 'Via Vallesinella 22, 38086 Madonna di Campiglio', phone: '0465 443234', coords: [46.2234, 10.8234], city: 'Madonna di Campiglio', type: 'locale' },
  { name: 'Sport Millennium', address: 'Piazza Righi 1, 38086 Madonna di Campiglio', phone: '0465 444789', coords: [46.2256, 10.8256], city: 'Madonna di Campiglio', type: 'locale' },

  // LIVIGNO (4 negozi)
  { name: 'Centrale Sport Livigno', address: 'Via Saroch 556, 23030 Livigno', phone: '0342 996216', coords: [46.5378, 10.1378], city: 'Livigno', type: 'locale' },
  { name: 'Intersport Livigno', address: 'Via Plan 212, 23030 Livigno', phone: '0342 996789', coords: [46.5389, 10.1389], city: 'Livigno', type: 'catena' },
  { name: 'Raggio Sport', address: 'Via Ostaria 45, 23030 Livigno', phone: '0342 997234', coords: [46.5412, 10.1412], city: 'Livigno', type: 'locale' },
  { name: 'Ski Top Livigno', address: 'Via Dala Gesa 234, 23030 Livigno', phone: '0342 997678', coords: [46.5423, 10.1423], city: 'Livigno', type: 'locale' },

  // SESTRIERE (3 negozi)
  { name: 'Sportinia Sestriere', address: 'Via Louset 14, 10058 Sestriere', phone: '0122 755226', coords: [44.9578, 6.8789], city: 'Sestriere', type: 'locale' },
  { name: 'Borghi Sport', address: 'Piazza Agnelli 4, 10058 Sestriere', phone: '0122 755678', coords: [44.9589, 6.8812], city: 'Sestriere', type: 'locale' },
  { name: 'Ski Set Sestriere', address: 'Via Pinerolo 23, 10058 Sestriere', phone: '0122 756234', coords: [44.9567, 6.8767], city: 'Sestriere', type: 'locale' },

  // LA THUILE (3 negozi)
  { name: 'Sport Himalaya La Thuile', address: 'Frazione Entrèves 2, 11016 La Thuile', phone: '0165 884342', coords: [45.7145, 6.9512], city: 'La Thuile', type: 'locale' },
  { name: 'Maison Sport La Thuile', address: 'Via Collomb 12, 11016 La Thuile', phone: '0165 884789', coords: [45.7167, 6.9534], city: 'La Thuile', type: 'locale' },
  { name: 'Gran San Bernardo Sport', address: 'Via Roma 34, 11016 La Thuile', phone: '0165 885123', coords: [45.7134, 6.9489], city: 'La Thuile', type: 'locale' },

  // CERVINIA (4 negozi)
  { name: 'Bontadini Sport Cervinia', address: 'Via Carrel 29, 11021 Breuil-Cervinia', phone: '0166 949119', coords: [45.9334, 7.6289], city: 'Cervinia', type: 'locale' },
  { name: 'Perrucca Sport', address: 'Piazza Jumeaux 8, 11021 Breuil-Cervinia', phone: '0166 949234', coords: [45.9356, 7.6312], city: 'Cervinia', type: 'locale' },
  { name: 'Blue Lake Sport', address: 'Via Guido Rey 14, 11021 Breuil-Cervinia', phone: '0166 949567', coords: [45.9323, 7.6267], city: 'Cervinia', type: 'locale' },
  { name: 'Matterhorn Sport', address: 'Strada Cristallo 2, 11021 Breuil-Cervinia', phone: '0166 949789', coords: [45.9367, 7.6334], city: 'Cervinia', type: 'locale' },

  // GRESSONEY (3 negozi)
  { name: 'Jolie Gressoney Sport', address: 'Via Mons. Tache 1, 11025 Gressoney-Saint-Jean', phone: '0125 355134', coords: [45.7634, 7.8234], city: 'Gressoney', type: 'locale' },
  { name: 'Sport Village Gressoney', address: 'Località Tschawald 4, 11025 Gressoney-La-Trinité', phone: '0125 366234', coords: [45.8567, 7.8123], city: 'Gressoney', type: 'locale' },
  { name: 'Monterosa Sport', address: 'Via Roma 56, 11025 Gressoney-Saint-Jean', phone: '0125 355678', coords: [45.7612, 7.8212], city: 'Gressoney', type: 'locale' },
]

export default function StoreLocator() {
  const [searchCity, setSearchCity] = useState('')
  const [filteredStores, setFilteredStores] = useState<Store[]>(storesDB.slice(0, 10))
  const [mapCenter, setMapCenter] = useState<[number, number]>([45.4642, 9.1900]) // Default: Milano
  const [userCity, setUserCity] = useState('Milano')

  useEffect(() => {
    // Try geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude
          const userLon = position.coords.longitude
          findNearestCity(userLat, userLon)
        },
        () => {
          // Geolocation failed, use Milano default
          searchStores('Milano')
        }
      )
    } else {
      searchStores('Milano')
    }
  }, [])

  const findNearestCity = (lat: number, lon: number) => {
    const cities = Array.from(new Set(storesDB.map(s => s.city)))
    let nearestCity = 'Milano'
    let minDist = Infinity

    cities.forEach(city => {
      const cityStores = storesDB.filter(s => s.city === city)
      if (cityStores.length > 0) {
        const [cityLat, cityLon] = cityStores[0].coords
        const dist = Math.sqrt(Math.pow(lat - cityLat, 2) + Math.pow(lon - cityLon, 2))
        if (dist < minDist) {
          minDist = dist
          nearestCity = city
        }
      }
    })

    setUserCity(nearestCity)
    searchStores(nearestCity)
  }

  const searchStores = (city: string = searchCity) => {
    if (!city.trim()) {
      setFilteredStores(storesDB.slice(0, 10))
      return
    }

    const cityLower = city.toLowerCase().trim()
    const results = storesDB.filter(s => 
      s.city.toLowerCase().includes(cityLower) ||
      s.name.toLowerCase().includes(cityLower)
      // Removed address filter to avoid false positives like "Via Milano" in Brescia
    )

    if (results.length > 0) {
      setFilteredStores(results)
      setMapCenter(results[0].coords)
    } else {
      setFilteredStores([])
    }
  }

  const handleSearch = () => {
    searchStores()
  }

  const openInGoogleMaps = (store: Store) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.name + ' ' + store.address)}`
    window.open(url, '_blank')
  }

  // Generate Google Maps markers
  const markers = filteredStores.slice(0, 10).map((s, i) => 
    `markers=color:red%7Clabel:${i+1}%7C${s.coords[0]},${s.coords[1]}`
  ).join('&')

  const mapSrc = `https://maps.google.com/maps?q=${mapCenter[0]},${mapCenter[1]}&z=12&output=embed&${markers}`

  return (
    <div className="py-12 px-8 rounded-2xl" style={{ backgroundColor: 'white' }}>
      <h3 className="text-4xl font-bold mb-4 text-center" style={{ color: '#0D47A1' }}>Trova il Negozio Più Vicino</h3>
      <p className="text-center mb-8 text-lg" style={{ color: '#6C757D' }}>
        Prova gli sci di persona prima di acquistare • {filteredStores.length > 0 ? `${filteredStores.length} negozi specializzati` : 'Cerca nella tua città'}
      </p>

      {/* Search */}
      <div className="flex gap-4 mb-8 max-w-2xl mx-auto">
        <input
          type="text"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          placeholder={`Cerca negozi (es: ${userCity}, Cortina, Roma...)`}
          className="flex-1 p-4 rounded-lg border-2 text-lg"
          style={{ borderColor: '#DEE2E6', fontFamily: "'DM Sans', sans-serif" }}
          onFocus={(e) => e.currentTarget.style.borderColor = '#0D47A1'}
          onBlur={(e) => e.currentTarget.style.borderColor = '#DEE2E6'}
        />
        <button
          onClick={handleSearch}
          className="px-8 py-4 rounded-lg text-white font-bold text-lg transition-all"
          style={{ backgroundColor: '#FF6B35' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#E85A28'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#FF6B35'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          Cerca
        </button>
      </div>

      {/* Map */}
      <iframe
        src={mapSrc}
        className="w-full rounded-xl mb-8 border-0"
        style={{ height: '400px' }}
        loading="lazy"
      />

      {/* Stores Grid */}
      {filteredStores.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStores.map((store, i) => (
            <div
              key={i}
              className="p-6 rounded-xl border-l-4 cursor-pointer transition-all hover:shadow-lg"
              style={{ 
                backgroundColor: '#F8F9FA',
                borderColor: store.type === 'catena' ? '#0D47A1' : '#FF6B35'
              }}
              onClick={() => openInGoogleMaps(store)}
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-lg" style={{ color: '#1A1A1A' }}>{store.name}</h4>
                <span className="text-xs px-2 py-1 rounded" style={{ 
                  backgroundColor: store.type === 'catena' ? '#0D47A1' : '#FF6B35',
                  color: 'white'
                }}>
                  {store.type === 'catena' ? 'Catena' : 'Locale'}
                </span>
              </div>
              <p className="text-sm mb-1" style={{ color: '#6C757D' }}>📍 {store.address}</p>
              <p className="text-sm mb-3" style={{ color: '#6C757D' }}>📞 {store.phone}</p>
              <button
                className="text-sm font-semibold"
                style={{ color: '#0D47A1' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#FF6B35'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#0D47A1'}
              >
                Apri in Maps →
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl" style={{ color: '#6C757D' }}>
            Nessun negozio trovato. Prova con: Milano, Roma, Torino, Cortina, Courmayeur...
          </p>
        </div>
      )}
    </div>
  )
}
