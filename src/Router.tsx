import { Route, Switch } from 'react-router-dom'

import { AdminRoom } from './pages/AdminRoom'
import { AdminRoomsList } from './pages/AdminRoomsList'
import { Home } from './pages/Home'
import { NewRoom } from './pages/NewRoom'
import { Room } from './pages/Room'

export function Routes() {
  return (
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
  )
}
