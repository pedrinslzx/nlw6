import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

import { ReactComponent as IllustrationImage } from '../../assets/images/illustration.svg'
import LogoImage from '../../assets/images/logo.svg'
import { ReactComponent as GoogleImage } from '../../assets/images/google-icon.svg'
import { ReactComponent as LoginIcon } from '../../assets/images/login.svg'

import styles from './styles.module.scss'
import Button from '../../components/Button'
import { useAuth } from '../../hooks/useAuth'
import { database } from '../../services/firebase'

interface HomeForm {
  room_id: string
}

export function Home() {
  const history = useHistory()
  const auth = useAuth()
  const { handleSubmit, register } = useForm<HomeForm>()

  async function handleCreateRoom() {
    try {
      if (!auth.loggedIn) {
        await auth.signInWithGoogle()
      }
      history.push('/rooms/new')
    } catch (err) {
      console.error(err)
    }
  }

  async function handleJoinRoom({ room_id }: HomeForm) {
    if (room_id.trim() === '') return

    const room = await database.ref(`rooms/${room_id.trim()}`).get()

    if (!room.exists()) {
      alert('Essa sala não existe')
      return
    }

    history.push(`/rooms/${room.key}`)
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
          <button className={styles.button} onClick={handleCreateRoom}>
            <GoogleImage className="icon" />
            {auth.loggedIn && 'Criar sua sala'}
            {!auth.loggedIn && 'Crie sua sala com o Google'}
          </button>
          <div className={styles.separator}>Ou entre em uma sala</div>

          <form onSubmit={handleSubmit(handleJoinRoom)}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              {...register('room_id', {
                validate: a => a.trim() !== '',
                required: true
              })}
            />
            <Button type="submit" alt="Entrar" icon={LoginIcon}>
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}
