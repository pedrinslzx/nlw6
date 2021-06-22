import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'

import { Home } from './pages/Home'
import { NewRoom } from './pages/NewRoom'

import { Analytics } from './services/Analytics'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Analytics>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/rooms/new" component={NewRoom} />
          </Switch>
        </Analytics>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
