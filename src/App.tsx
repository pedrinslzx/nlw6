import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'

import { AuthProvider } from './contexts/AuthContext'
import { ModalProvider } from './contexts/ModalContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { Analytics } from './services/Analytics'
import { GlobalStyles } from './styles/global'

import { Routes } from './Router'

const modal = document.createElement('div')

function App() {
  useEffect(() => {
    document.body.appendChild(modal)
    return () => modal.remove()
  })
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ModalProvider mainAppEl={modal}>
          <AuthProvider>
            <Analytics>
              <Routes />
              <Toaster
                position="top-right"
                reverseOrder={true}
                toastOptions={{ duration: 2000 }}
              />
            </Analytics>
            <GlobalStyles />
          </AuthProvider>
        </ModalProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
