import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { EmptyQuestions } from '../../components/Icons'
import { useAuth } from '../../hooks/useAuth'
import { database } from '../../services/firebase'
import { formatPlural } from '../../services/utils'
import { Content, Main, Room } from './styles'

interface AdminRoom {
  key: string
  title: string
  createdIn: Date
  closedAt: Date | null
}

export function AdminRoomsList() {
  const [rooms, setRooms] = useState<AdminRoom[]>([])
  const auth = useAuth()
  const history = useHistory()

  useEffect(() => {
    const userRoomRef = database.ref(`user/${auth.user?.uid}/rooms`)
    userRoomRef.on('value', value => {
      if (!value.exists()) {
        setRooms([])
        return
      }
      const rooms = Object.entries<Omit<AdminRoom, 'key'>>(value.val()).map(
        ([key, value]) => ({
          key,
          title: value?.title,
          createdIn: new Date(value.createdIn),
          closedAt: value.closedAt ? new Date(value.closedAt) : null
        })
      )

      setRooms(rooms)
    })
    return () => userRoomRef.off('value')
  }, [auth.user?.uid, history])

  return (
    <div>
      <Header>
        <Button onClick={() => history.push('/rooms/new')}>
          Criar Sala
        </Button>
        <Button onClick={() => history.push('/rooms/enter')}>
          Entrar em uma Sala
        </Button>

        <Button color="danger" onClick={() => auth.logout()}>
          Sair
        </Button>
      </Header>
      <Main>
        <div className="room-title">
          <h1>Suas Salas</h1>
          <span>
            {rooms.length || 0} sala{formatPlural(rooms.length || 0)}
          </span>
        </div>
        {rooms.length > 0 ? rooms.map(room => {
          return (
            <Room
              onClick={() => history.push(`/my-rooms/${room.key}`)}
            >
              <p>
                <span>{room.title}</span>
                <code>{room.key}</code>
              </p>
              <footer>
                <span>
                  Criada em:{' '}
                  <time dateTime={room.createdIn.toISOString()}>
                    {room.createdIn.toLocaleString()}
                  </time>
                </span>
                {room.closedAt && (
                  <span>
                    Encerrada em:{' '}
                    <time dateTime={room.closedAt.toISOString()}>
                      {room.closedAt.toLocaleString()}
                    </time>
                  </span>
                )}
              </footer>
            </Room>
          )
        }) : (
          <Content>
            <EmptyQuestions />
            <h2>Nenhuma sala por aqui...</h2>
            <p>
              Crie uma sala de perguntas e ela irá aparecer aqui.
            </p>
          </Content>
        )}
      </Main>
    </div>
  )
}
