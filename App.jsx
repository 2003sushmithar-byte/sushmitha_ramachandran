import React, { useEffect } from 'react'
import Header from './components/Header'

export default function App() {
  useEffect(() => {
    // mark the body so we can hide the original static header via CSS
    document.body.classList.add('react-mounted')
    return () => document.body.classList.remove('react-mounted')
  }, [])

  return (
    <>
      <Header />
      <div className="react-app" style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1200 }}>
        <div style={{ background: 'var(--white)', padding: '0.6rem 0.9rem', borderRadius: 10, boxShadow: 'var(--shadow-md)', fontFamily: 'var(--font-body)', color: 'var(--dark-neutral)' }}>
          <strong>React Frame Active</strong>
          <div style={{ fontSize: '0.9rem' }}>Run <code>npm install</code> then <code>npm run dev</code></div>
        </div>
      </div>
    </>
  )
}
