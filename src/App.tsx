import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'

import { ToastContainer } from 'react-toastify'

import './styles/global.scss'
import 'react-toastify/dist/ReactToastify.css'

import { Home } from './pages/Home'
import { NewRoom } from './pages/NewRoom'
import { Room } from './pages/Room'

import { Analytics } from './services/Analytics'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Analytics>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/rooms/new">
              <NewRoom />
            </Route>
            <Route path="/rooms/:id">
              <Room />
            </Route>
          </Switch>
          <ToastContainer newestOnTop draggable />
        </Analytics>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
