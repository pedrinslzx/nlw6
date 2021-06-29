import React from 'react'
import ReactDOM from 'react-dom'

import { analytics } from './services/firebase'

import App from './App'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(<App />, document.getElementById('root'))

reportWebVitals(e => {
  analytics.logEvent(e.name, { ...e })
})
