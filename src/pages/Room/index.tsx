import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { ReactComponent as LogoImage } from '../../assets/images/logo.svg'
import { ReactComponent as IllustrationImage } from '../../assets/images/illustration-no-questions.svg'
import Button from '../../components/Button'

import { database, RoomQuestionType, firebase } from '../../services/firebase'
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
  const { handleSubmit, register, reset, setFocus } = useForm<RoomFormData>()
  const [questions, setQuestions] = useState<RoomQuestionType[]>([])
  const [title, setTitle] = useState('')

  useEffect(() => {
    try {
      const roomRef = database.ref(`rooms/${roomID}`)

      const onValue = (room: firebase.database.DataSnapshot) => {
        const roomData = room.val()
        if (!roomData.questions) roomData.questions = {}
        const questions: RoomQuestionType[] = []

        for (const key in roomData.questions) {
          if (Object.prototype.hasOwnProperty.call(roomData.questions, key)) {
            questions.push({ ...roomData.questions[key], key })
          }
        }

        setQuestions(questions)
        setTitle(roomData.title)
      }

      roomRef.on('value', onValue)
      return () => roomRef.off('value', onValue)
    } catch (e) {
      toast.error(e.message || 'Ocorreu um erro ao carregar a sala')
    }
  }, [history, roomID])

  async function handleSendQuestion(data: RoomFormData) {
    try {
      if (data.question.trim() === '') {
        toast('Digite sua pergunta!', { type: 'info', onClick: () => setFocus('question') })
        return
      }
      if (!auth.user) {
        toast('Você não está logado', { type: 'error', onClick: () => auth.signInWithGoogle() })
        return
      }
      const question = {
        content: data.question.trim(),
        author: {
          name: auth.user.name,
          photoURL: auth.user.photoURL,
        },
        isHighlighted: false,
        isAnswered: false
      }

      await database.ref(`rooms/${roomID}/questions`).push(question)
      reset()
    } catch (e) {
      toast.error(e.message || 'Ocorreu um erro ao enviar sua pergunta')
    }
  }

  return (
    <div>
      <header className={styles.header}>
        <div className="content">
          <LogoImage onClick={() => history.push('/')} />

          <RoomCode code={roomID} />
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles['room-title']}>
          <h1>Sala {title}</h1>
          <span>{questions.length || 0} pergunta{formatPlural(questions.length || 0)}</span>
        </div>

        <form onSubmit={handleSubmit(handleSendQuestion)}>
          <textarea
            placeholder="Oque você deseja perguntar?"
            {...register('question')}
          />
          <div className={styles.form_footer}>
            {!!auth.user && (
              <div className="styles.userInfo">
                <img src={auth.user.photoURL} alt={auth.user.name} />
                <span>{auth.user.name}</span>
              </div>
            )}
            {!auth.user && (
              <span>
                Para enviar uma pergunta,{' '}
                <button onClick={auth.signInWithGoogle}>
                  faça seu login
                </button>
              </span>
            )}
            <Button type="submit" disabled={!auth.user}>
              Enviar pergunta
            </Button>
          </div>
        </form>
        {!questions.length && (
          <div className={styles.noQuestions}>
            <IllustrationImage />
            <h2>Nenhuma pergunta por aqui...</h2>
            <p>Faça o seu login e seja a primeira pessoa a fazer uma pergunta!</p>
          </div>
        )}
        {questions.map(question => {
          return <p key={question.key}>{question.content}</p>
        })}
      </main>
    </div>
  )
}
