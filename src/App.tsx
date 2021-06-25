import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'

import { Toaster } from 'react-hot-toast'

import './styles/global.scss'

import { Home } from './pages/Home'
import { NewRoom } from './pages/NewRoom'
import { AdminRoom } from './pages/AdminRoom'
import { Room } from './pages/Room'

import { Analytics } from './services/Analytics'

import './styles/modal.scss'
import { AdminRoomsList } from './pages/AdminRoomsList'

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
            <Route path="/my-rooms/:id">
              <AdminRoom />
            </Route>
            <Route path="/my-rooms/">
              <AdminRoomsList />
            </Route>
          </Switch>
          <Toaster
            position="top-right"
            reverseOrder={true}
            toastOptions={{ duration: 3000 }}
          />
        </Analytics>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
