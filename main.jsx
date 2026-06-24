import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import '../css/style.css'

const mountPoint = document.getElementById('react-root') || (() => {
  const el = document.createElement('div')
  el.id = 'react-root'
  document.body.appendChild(el)
  return el
})()

createRoot(mountPoint).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
