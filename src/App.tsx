import { useState, useEffect } from 'react'

function App() {
  const [urls, setUrls] = useState(() => {
    const saved = localStorage.getItem('urls')
    return saved ? JSON.parse(saved) : [
      { id: 1, url: 'https://www.google.com', name: 'Google' }
    ]
  })
  const [newUrl, setNewUrl] = useState('')
  const [newName, setNewName] = useState('')

  useEffect(() => {
    localStorage.setItem('urls', JSON.stringify(urls))
  }, [urls])

  const addUrl = () => {
    if (newUrl && newName) {
      const newItem = {
        id: Date.now(),
        url: newUrl,
        name: newName
      }
      setUrls([...urls, newItem])
      setNewUrl('')
      setNewName('')
    }
  }

  const deleteUrl = (id: number) => {
    setUrls(urls.filter((item: any) => item.id !== id))
  }

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '20px', 
      fontFamily: 'system-ui, sans-serif',
      minHeight: '100vh'
    }}>
      <h1 style={{ 
        fontSize: 'clamp(24px, 5vw, 32px)', 
        marginBottom: '20px', 
        color: '#333' 
      }}>
        URL整理アプリ
      </h1>
      
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        gap: '10px', 
        marginBottom: '30px',
        padding: '15px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px'
      }}>
        <input 
          type="text" 
          placeholder="URL名（例: Google）"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 15px',
            fontSize: '16px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            boxSizing: 'border-box'
          }}
        />
        <input 
          type="text" 
          placeholder="URL（例: https://google.com）"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 15px',
            fontSize: '16px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            boxSizing: 'border-box'
          }}
        />
        <button 
          onClick={addUrl}
          style={{
            width: '100%',
            padding: '12px 25px',
            fontSize: '16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          追加
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {urls.map((item: any) => (
          <div 
            key={item.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              padding: '15px',
              backgroundColor: 'white',
              border: '1px solid #e0e0e0',
              borderRadius: '6px'
            }}
          >
            <a 
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '16px',
                color: '#007bff',
                textDecoration: 'none',
                wordBreak: 'break-all'
              }}
            >
              {item.name}
            </a>
            <button 
              onClick={() => deleteUrl(item.id)}
              style={{
                padding: '8px 15px',
                fontSize: '14px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                alignSelf: 'flex-start'
              }}
            >
              削除
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App