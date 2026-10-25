import '@fontsource-variable/newsreader/opsz.css'
import '@fontsource-variable/hanken-grotesk'
import './styles/tokens.css'
import './styles/base.css'
import './styles/typography.css'
import './styles/motion.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
