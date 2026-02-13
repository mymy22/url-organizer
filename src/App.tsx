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
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '30px', color: '#333' }}>URL整理アプリ</h1>
      
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px'
      }}>
        <input 
          type="text" 
          placeholder="URL名（例: Google）"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          style={{
            flex: 1,
            padding: '10px 15px',
            fontSize: '16px',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}
        />
        <input 
          type="text" 
          placeholder="URL（例: https://google.com）"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          style={{
            flex: 2,
            padding: '10px 15px',
            fontSize: '16px',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}
        />
        <button 
          onClick={addUrl}
          style={{
            padding: '10px 25px',
            fontSize: '16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
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
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '15px 20px',
              backgroundColor: 'white',
              border: '1px solid #e0e0e0',
              borderRadius: '6px',
              transition: 'box-shadow 0.2s'
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
                flex: 1
              }}
            >
              {item.name}
            </a>
            <button 
              onClick={() => deleteUrl(item.id)}
              style={{
                padding: '6px 15px',
                fontSize: '14px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
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