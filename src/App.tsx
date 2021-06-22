import { useEffect } from 'react'
import { BrowserRouter, Switch, Route, useHistory } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'

import { Home } from './pages/Home'
import { NewRoom } from './pages/NewRoom'
import { analytics } from './services/firebase'

function App() {
  const history = useHistory()

  useEffect(() => {
    const unsubscribe = history.listen((location) => {
      analytics.setCurrentScreen(location.pathname)
    })
    return () => unsubscribe()
  })

  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" component={NewRoom} />
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
