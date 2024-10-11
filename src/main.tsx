import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RouterConf from './root/routers'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterConf />
  </StrictMode>,
)
