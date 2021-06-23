import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { ReactComponent as IllustrationImage } from '../../assets/images/illustration.svg'
import { ReactComponent as LoginIcon } from '../../assets/images/login.svg'
import LogoImage from '../../assets/images/logo.svg'

import styles from './styles.module.scss'
import Button from '../../components/Button'
import { useAuth } from '../../hooks/useAuth'

import { database } from '../../services/firebase'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

interface NewRoomForm {
  new_room: string
}

export function NewRoom() {
  const history = useHistory()
  const { loggedIn, user } = useAuth()

  const { handleSubmit, register } = useForm<NewRoomForm>()

  useEffect(() => {
    if (!loggedIn || !user) {
      history.push('/')
      toast('Parece que você não está logado', { type: 'warning' })
    }
  }, [history, loggedIn, user])

  async function handleCreateRoom({ new_room }: NewRoomForm) {
    if (new_room.trim() === '') return
    const newRoom = new_room.trim()

    const roomRef = database.ref('rooms')

    const room = await roomRef.push({ title: newRoom, authorID: user?.uid })

    // console.log(room)
    history.push(`/rooms/${room?.key}`)
  }

  return (
    <div className={styles.container}>
      <aside className={styles.aside}>
        <IllustrationImage />
        <strong>Toda pergunta tem uma resposta.</strong>
        <p>Aprenda e compartilhe conhecimento com outras pessoas</p>
      </aside>
      <main className={styles.main}>
        <div className={styles.main_content}>
          <img src={LogoImage} alt="letmeask" />
          <h2 className={styles.title}>Criar uma nova sala</h2>

          <form onSubmit={handleSubmit(handleCreateRoom)}>
            <input
              type="text"
              placeholder="Nome da sala"
              autoComplete="off"
              {...register('new_room', {
                required: true,
                validate: data => data.trim() !== ''
              })}
            />
            <Button type="submit" alt="Criar" icon={LoginIcon}>
              Criar sala
            </Button>
          </form>
          <p className={styles.text}>
            Quer entrar em uma sala já existente?{' '}
            <Link to="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  )
}
