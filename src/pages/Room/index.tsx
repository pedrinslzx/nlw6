import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { ReactComponent as LogoImage } from '../../assets/images/logo.svg'
import { ReactComponent as IllustrationImage } from '../../assets/images/illustration-no-questions.svg'
import Button from '../../components/Button'

import { database } from '../../services/firebase'
import styles from './styles.module.scss'
import RoomCode from '../../components/RoomCode'
import { useAuth } from '../../hooks/useAuth'
import { toast } from 'react-toastify'

interface RoomParams {
  id: string
}

interface RoomFormData {
  question: string
}

function formatPlural(amount: number): 's' | '' | null {
  if (typeof amount !== 'number') return null
  if (amount > 1 || amount === 0) return 's'
  return ''
}

export function Room() {
  const params = useParams<RoomParams>()
  const roomID = params.id.trim()
  const history = useHistory()
  const auth = useAuth()
  const { handleSubmit, register } = useForm<RoomFormData>()
  const [roomTitle, setRoomTitle] = useState('')

  useEffect(() => {
    async function getRoom() {
      if (roomID === '') return

      const room = await database.ref(`rooms/${roomID}`).get()

      if (!room.exists()) {
        history.push('/')
        toast('Esta sala não existe', { type: 'error' })
        return
      }
      setRoomTitle(room.val().title)
    }
    getRoom()
  }, [history, roomID])

  async function handleSendQuestion(data: RoomFormData) {
    if (!auth.loggedIn) {
      toast('Você não está logado', { type: 'error' })
      return
    }

    console.log(data)
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className="content">
          <LogoImage onClick={() => history.push('/')} />

          <RoomCode code={roomID} />
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles['room-title']}>
          <h1>Sala {roomTitle}</h1>
          <span>4 pergunta{formatPlural(4 || 0)}</span>
        </div>

        <form onSubmit={handleSubmit(handleSendQuestion)}>
          <textarea
            placeholder="Oque você deseja perguntar?"
            {...register('question')}
          />
          <div className={styles.form_footer}>
            <span>
              {!auth.loggedIn && (
                <>
                  Para enviar uma pergunta,{' '}
                  <button onClick={auth.signInWithGoogle}>
                    faça seu login
                  </button>
                </>
              )}
            </span>
            <Button type="submit" disabled={!auth.loggedIn}>
              Enviar pergunta
            </Button>
          </div>
        </form>
        <div className={styles.noQuestions}>
          <IllustrationImage />
          <h2>Nenhuma pergunta por aqui...</h2>
          <p>Faça o seu login e seja a primeira pessoa a fazer uma pergunta!</p>
        </div>
      </main>
    </div>
  )
}
