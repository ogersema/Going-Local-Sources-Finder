import React, { useState, useEffect } from 'react'

// PASSWORT HIER ÄNDERN:
const APP_PASSWORD = 'GoingLocal2024!'

const CATEGORIES = [
  'Public Authority',
  'Local Media',
  'National Media',
  'Sports',
  'Religion & Community',
  'Care & Elderly Services',
  'NGO',
  'Weather',
  'Culture & Arts',
  'Education',
  'Political',
  'Corporate',
  'Social Media'
]

const SEARCH_PROMPT = (city) => `Du bist ein Experte für deutsche Lokalmedien und Informationsquellen. Finde alle relevanten Nachrichtenquellen für "${city}" in Deutschland.

WICHTIG: Suche nach ECHTEN, EXISTIERENDEN URLs. Erfinde keine URLs.

Kategorisiere die Quellen in diese Kategorien:
- Public Authority: Stadtverwaltung, Landkreis, Polizei, Feuerwehr, THW, Ordnungsamt
- Local Media: Lokalzeitungen, Regionalradio, lokale Online-Portale
- National Media: Überregionale Medien mit Regionalsektion
- Sports: Lokale Sportvereine, Fußballvereine, Sportverbände
- Religion & Community: Kirchen, Kirchenkreise, religiöse Gemeinden
- Care & Elderly Services: Krankenhäuser, Pflegedienste, Johanniter, DRK
- NGO: Lions Club, Rotary, Tierschutzvereine, gemeinnützige Organisationen
- Weather: Wetterdienste mit lokalem Bezug
- Culture & Arts: Theater, Museen, Kulturveranstaltungen
- Education: Schulen, Hochschulen, Volkshochschulen
- Political: Lokale Parteigliederungen (CDU, SPD, Grüne, FDP, Linke, AfD, BSW, Freie Wähler etc.)
- Corporate: Wichtige lokale Unternehmen, Verkehrsbetriebe
- Social Media: Facebook-Gruppen, Instagram-Accounts, YouTube-Kanäle mit lokalem Bezug

Für jede Quelle gib an:
- name: Kurzname der Quelle
- category: Eine der obigen Kategorien
- url: Die vollständige URL (muss existieren!)
- trust: Vertrauenswürdigkeit von 0.0 bis 1.0 (1.0 = offizielle Behörden/etablierte Medien, 0.5 = Social Media/kleinere Quellen)

Antworte NUR mit einem validen JSON-Array. Keine Erklärungen, kein Markdown, nur JSON.
Beispiel-Format:
[
  {"name": "Stadtverwaltung", "category": "Public Authority", "url": "https://www.stadt.de", "trust": 1.0},
  {"name": "Lokalzeitung", "category": "Local Media", "url": "https://www.zeitung.de", "trust": 1.0}
]

Finde mindestens 40-60 Quellen für "${city}". Sei gründlich und suche in allen Kategorien.`

// Login-Komponente
function LoginScreen({ onLogin }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const handleLogin = () => {
    if (password === APP_PASSWORD) {
      if (rememberMe) {
        localStorage.setItem('glsf_auth', 'true')
      } else {
        sessionStorage.setItem('glsf_auth', 'true')
      }
      onLogin()
    } else {
      setError('Falsches Passwort')
      setPassword('')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-gray-800">Going Local Sources Finder</h1>
          <p className="text-gray-500 mt-2">Bitte melde dich an</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Passwort</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError('')
              }}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              placeholder="Passwort eingeben"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
              ⚠️ {error}
            </div>
          )}

          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
              Angemeldet bleiben
            </label>
          </div>

          <button
            onClick={handleLogin}
            className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
          >
            Anmelden
          </button>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          Zugang nur für autorisierte Nutzer
        </p>
      </div>
    </div>
  )
}

function ApiKeyModal({ onSave, savedKey }) {
  const [key, setKey] = useState(savedKey || '')
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl">
        <h2 className="text-xl font-bold text-gray-800 mb-4">🔑 API-Key eingeben</h2>
        <p className="text-gray-600 mb-4 text-sm">
          Um die KI-Suche zu nutzen, benötigst du einen Anthropic API-Key. 
          Der Key wird nur lokal in deinem Browser gespeichert.
        </p>
        <input
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="sk-ant-..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex gap-3">
          <button
            onClick={() => onSave(key)}
            disabled={!key.startsWith('sk-')}
            className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 font-medium"
          >
            Speichern
          </button>
        </div>
        <p className="mt-4 text-xs text-gray-500">
          Noch keinen Key? → <a href="https://console.anthropic.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">console.anthropic.com</a>
        </p>
      </div>
    </div>
  )
}

function MainApp({ onLogout }) {
  const [apiKey, setApiKey] = useState('')
  const [showApiModal, setShowApiModal] = useState(false)
  const [city, setCity] = useState('')
  const [sources, setSources] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [editingIndex, setEditingIndex] = useState(null)
  const [searchProgress, setSearchProgress] = useState('')

  // Load API key from localStorage on mount
  useEffect(() => {
    const savedKey = localStorage.getItem('anthropic_api_key')
    if (savedKey) {
      setApiKey(savedKey)
    }
  }, [])

  const saveApiKey = (key) => {
    localStorage.setItem('anthropic_api_key', key)
    setApiKey(key)
    setShowApiModal(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('glsf_auth')
    sessionStorage.removeItem('glsf_auth')
    onLogout()
  }

  const searchSources = async () => {
    if (!city.trim()) {
      setError('Bitte gib einen Städtenamen ein.')
      return
    }

    if (!apiKey) {
      setShowApiModal(true)
      return
    }

    setLoading(true)
    setError('')
    setSources([])
    setSearchProgress('Suche läuft... Claude analysiert Quellen für ' + city)

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 8000,
          messages: [
            { role: 'user', content: SEARCH_PROMPT(city) }
          ]
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        if (response.status === 401) {
          setShowApiModal(true)
          throw new Error('Ungültiger API-Key. Bitte überprüfe deinen Key.')
        }
        throw new Error(errorData.error?.message || `API-Fehler: ${response.status}`)
      }

      const data = await response.json()
      let responseText = data.content[0].text

      // Clean up response
      responseText = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()

      const parsedSources = JSON.parse(responseText)

      // Add metadata
      const enrichedSources = parsedSources.map((source, index) => ({
        ...source,
        id: index,
        created: new Date().toLocaleDateString('de-DE'),
        verified: false
      }))

      setSources(enrichedSources)
      setSearchProgress('')
    } catch (err) {
      console.error('Fehler:', err)
      setError(`Fehler bei der Suche: ${err.message}`)
      setSearchProgress('')
    } finally {
      setLoading(false)
    }
  }

  const updateSource = (index, field, value) => {
    const updated = [...sources]
    updated[index] = { ...updated[index], [field]: value }
    setSources(updated)
  }

  const deleteSource = (index) => {
    setSources(sources.filter((_, i) => i !== index))
  }

  const addSource = () => {
    const newSource = {
      id: Date.now(),
      name: 'Neue Quelle',
      category: 'Public Authority',
      url: 'https://',
      trust: 0.5,
      created: new Date().toLocaleDateString('de-DE'),
      verified: false
    }
    setSources([...sources, newSource])
    setEditingIndex(sources.length)
  }

  const exportCSV = () => {
    const headers = ['Name', 'Kategorie', 'URL', 'Trust', 'Erstellt', 'Verifiziert']
    const rows = sources.map(s => [
      s.name,
      s.category,
      s.url,
      s.trust,
      s.created,
      s.verified ? 'Ja' : 'Nein'
    ])

    const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n')
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `quellen-${city.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  const exportJSON = () => {
    const data = {
      city: city,
      exportDate: new Date().toISOString(),
      sources: sources
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `quellen-${city.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.json`
    link.click()
  }

  const importJSON = (event) => {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result)
        if (data.sources && Array.isArray(data.sources)) {
          setSources(data.sources)
          if (data.city) setCity(data.city)
        }
      } catch (err) {
        setError('Fehler beim Importieren: Ungültige JSON-Datei')
      }
    }
    reader.readAsText(file)
  }

  const filteredSources = filterCategory === 'all'
    ? sources
    : sources.filter(s => s.category === filterCategory)

  const categoryStats = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = sources.filter(s => s.category === cat).length
    return acc
  }, {})

  return (
    <div className="min-h-screen bg-gray-50">
      {showApiModal && (
        <ApiKeyModal onSave={saveApiKey} savedKey={apiKey} />
      )}

      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">🔍 Going Local Sources Finder</h1>
              <p className="text-gray-600 mt-1">KI-gestützte Suche nach lokalen Nachrichtenquellen</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowApiModal(true)}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                🔑 API-Key {apiKey ? '✓' : ''}
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm text-red-600 hover:text-red-800 border border-red-300 rounded-lg hover:bg-red-50"
              >
                🚪 Logout
              </button>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && searchSources()}
              placeholder="Städtename eingeben (z.B. Stendal, Aurich, Berlin-Weißensee)"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            />
            <button
              onClick={searchSources}
              disabled={loading}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 font-medium text-lg transition-colors whitespace-nowrap"
            >
              {loading ? '⏳ Suche...' : '🔎 Quellen suchen'}
            </button>
          </div>

          {searchProgress && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg text-blue-700 flex items-center gap-3">
              <div className="animate-spin h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full"></div>
              {searchProgress}
            </div>
          )}

          {error && (
            <div className="mt-4 p-4 bg-red-50 rounded-lg text-red-700">
              ⚠️ {error}
            </div>
          )}
        </div>

        {/* Results */}
        {sources.length > 0 && (
          <>
            {/* Stats & Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  📊 {sources.length} Quellen für "{city}"
                </h2>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={addSource}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium"
                  >
                    + Hinzufügen
                  </button>
                  <button
                    onClick={exportCSV}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm font-medium"
                  >
                    📥 CSV
                  </button>
                  <button
                    onClick={exportJSON}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm font-medium"
                  >
                    📥 JSON
                  </button>
                  <label className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm font-medium cursor-pointer">
                    📤 Import
                    <input
                      type="file"
                      accept=".json"
                      onChange={importJSON}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Category chips */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilterCategory('all')}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    filterCategory === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Alle ({sources.length})
                </button>
                {CATEGORIES.filter(cat => categoryStats[cat] > 0).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      filterCategory === cat
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cat} ({categoryStats[cat]})
                  </button>
                ))}
              </div>
            </div>

            {/* Sources Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Kategorie</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">URL</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 w-20">Trust</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 w-12">✓</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 w-24">Aktionen</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredSources.map((source, displayIndex) => {
                      const actualIndex = sources.findIndex(s => s.id === source.id)
                      const isEditing = editingIndex === actualIndex

                      return (
                        <tr key={source.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3">
                            {isEditing ? (
                              <input
                                type="text"
                                value={source.name}
                                onChange={(e) => updateSource(actualIndex, 'name', e.target.value)}
                                className="w-full px-2 py-1 border rounded text-sm"
                              />
                            ) : (
                              <span className="font-medium text-gray-800">{source.name}</span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            {isEditing ? (
                              <select
                                value={source.category}
                                onChange={(e) => updateSource(actualIndex, 'category', e.target.value)}
                                className="w-full px-2 py-1 border rounded text-sm"
                              >
                                {CATEGORIES.map(cat => (
                                  <option key={cat} value={cat}>{cat}</option>
                                ))}
                              </select>
                            ) : (
                              <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">
                                {source.category}
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 max-w-xs">
                            {isEditing ? (
                              <input
                                type="text"
                                value={source.url}
                                onChange={(e) => updateSource(actualIndex, 'url', e.target.value)}
                                className="w-full px-2 py-1 border rounded text-sm"
                              />
                            ) : (
                              <a
                                href={source.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline text-sm truncate block"
                                title={source.url}
                              >
                                {source.url.replace(/^https?:\/\/(www\.)?/, '').slice(0, 40)}...
                              </a>
                            )}
                          </td>
                          <td className="px-4 py-3 text-center">
                            {isEditing ? (
                              <input
                                type="number"
                                min="0"
                                max="1"
                                step="0.1"
                                value={source.trust}
                                onChange={(e) => updateSource(actualIndex, 'trust', parseFloat(e.target.value))}
                                className="w-16 px-2 py-1 border rounded text-center text-sm"
                              />
                            ) : (
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                source.trust >= 0.8 ? 'bg-green-100 text-green-700' :
                                source.trust >= 0.5 ? 'bg-yellow-100 text-yellow-700' :
                                'bg-red-100 text-red-700'
                              }`}>
                                {source.trust.toFixed(1)}
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <input
                              type="checkbox"
                              checked={source.verified}
                              onChange={(e) => updateSource(actualIndex, 'verified', e.target.checked)}
                              className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                            />
                          </td>
                          <td className="px-4 py-3 text-center">
                            <div className="flex justify-center gap-1">
                              <button
                                onClick={() => setEditingIndex(isEditing ? null : actualIndex)}
                                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                                title={isEditing ? 'Speichern' : 'Bearbeiten'}
                              >
                                {isEditing ? '💾' : '✏️'}
                              </button>
                              <button
                                onClick={() => window.open(source.url, '_blank')}
                                className="p-1.5 text-gray-600 hover:bg-gray-100 rounded"
                                title="Öffnen"
                              >
                                🔗
                              </button>
                              <button
                                onClick={() => deleteSource(actualIndex)}
                                className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                                title="Löschen"
                              >
                                🗑️
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Empty state */}
        {!loading && sources.length === 0 && !error && (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="text-6xl mb-4">🏙️</div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">Gib einen Städtenamen ein</h3>
            <p className="text-gray-500 mb-6">Das Tool sucht automatisch relevante Quellen für lokale Nachrichten.</p>
            <div className="flex flex-wrap justify-center gap-2">
              {['Stendal', 'Aurich', 'Berlin-Weißensee', 'Freiburg', 'Rostock'].map(example => (
                <button
                  key={example}
                  onClick={() => setCity(example)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Going Local Sources Finder • Powered by Claude AI</p>
          <p className="mt-1">Die Ergebnisse sollten manuell überprüft werden</p>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Prüfe ob User bereits eingeloggt ist
    const authLocal = localStorage.getItem('glsf_auth')
    const authSession = sessionStorage.getItem('glsf_auth')
    if (authLocal === 'true' || authSession === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  if (!isAuthenticated) {
    return <LoginScreen onLogin={() => setIsAuthenticated(true)} />
  }

  return <MainApp onLogout={() => setIsAuthenticated(false)} />
}

export default App
