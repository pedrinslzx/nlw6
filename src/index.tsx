import React from 'react'
import ReactDOM from 'react-dom'
import ReactModal from 'react-modal'
import App from './App'
import { ModalProvider } from './contexts/ModalContext'
import reportWebVitals from './reportWebVitals'
import { analytics } from './services/firebase'

const modal = document.createElement('div')

ReactModal.setAppElement(modal)


ReactDOM.render(
  <React.StrictMode>
    <ModalProvider mainAppEl={modal}>
      <App />
    </ModalProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

document.body.appendChild(modal)
reportWebVitals(e => {
  analytics.logEvent(e.name, { ...e })
})
