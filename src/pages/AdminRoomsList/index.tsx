import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ReactComponent as LogoImage } from '../../assets/images/logo.svg'
import { database } from '../../services/firebase';

import './styles.scss'
import Button from '../../components/Button';
import { formatPlural } from '../../services/utils';

interface AdminRoom {
  key: string;
  title: string;
  createdIn: Date;
  closedAt: Date | null;
}


export function AdminRoomsList() {
  const [rooms, setRooms] = useState<AdminRoom[]>([])
  const auth = useAuth()
  const history = useHistory()

  useEffect(() => {
    const userRoomRef = database.ref(`user_rooms/${auth.user?.uid}`)
    userRoomRef.on('value', value => {
      if (!value.exists()) {
        toast.error('Você ainda não tem salas criadas, crie uma para começar!')
        history.push('/rooms/new')
      }

      const rooms = Object
        .entries<Omit<AdminRoom, 'key'>>(value.val())
        .map(([key, value]) => ({ key, title: value?.title, createdIn: new Date(value.createdIn), closedAt: value.closedAt ? new Date(value.closedAt) : null }))

      setRooms(rooms)
    })
    return () => userRoomRef.off('value')
  }, [auth.user?.uid, history])

  return (
    <div id="admin-room-list">
      <header className='header'>
        <div className="content">
          <LogoImage onClick={() => history.push('/my-rooms/')} />

          <div>
            <Button onClick={() => history.push('/rooms/new')}>Criar Sala</Button>
          </div>
        </div>
      </header>
      <main>
        <div className='room-title'>
          <h1>Suas Salas</h1>
          <span>{rooms.length || 0} salas{formatPlural(rooms.length || 0)}</span>
        </div>
        {rooms.map(room => {
          return (
            <div className="room" onClick={() => history.push(`/rooms/${room.key}`)}>
              <p><span>{room.title}</span><code>{room.key}</code></p>
              <footer>
                <span>Criada em: <time dateTime={room.createdIn.toISOString()}>{room.createdIn.toLocaleString()}</time></span>
                {room.closedAt && <span>Encerrada em: <time dateTime={room.closedAt.toISOString()}>{room.closedAt.toLocaleString()}</time></span>}
              </footer>
            </div>
          )
        })}
      </main>
    </div>
  );
};
