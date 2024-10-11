import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RouterConf from './root/routers'
import ScreenProvider from './context/screen.context'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ScreenProvider>
      <RouterConf />
    </ScreenProvider>
  </StrictMode>,
)
