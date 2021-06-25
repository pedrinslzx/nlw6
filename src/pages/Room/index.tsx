import { useHistory, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { ReactComponent as LogoImage } from '../../assets/images/logo.svg'
import { ReactComponent as IllustrationImage } from '../../assets/images/empty-questions.svg'
import { ReactComponent as LikeIcon } from '../../assets/images/like.svg'
import Button from '../../components/Button'

import styles from './styles.module.scss'
import RoomCode from '../../components/RoomCode'
import { useAuth } from '../../hooks/useAuth'
import { Question } from '../../components/Question'
import { useRoom } from '../../hooks/useRoom'
import { useCallback } from 'react'
import { toast } from 'react-hot-toast'
import { database } from '../../services/firebase'
import { formatPlural } from '../../services/utils'

interface RoomParams {
  id: string
}

interface RoomFormData {
  question: string
}

export function Room() {
  const params = useParams<RoomParams>()
  const roomID = params.id.trim()
  const history = useHistory()
  const auth = useAuth()
  const { title, questions, closedAt, handleLikeQuestion } = useRoom({ roomID, isAdmin: false })
  const form = useForm<RoomFormData>()

  const handleSendQuestion = useCallback(async function handleSendQuestion({ question: content }: RoomFormData) {
    try {
      if (!auth.user) {
        toast.error(t => <span onClick={() => [toast.dismiss(t.id), auth.signInWithGoogle()]}>'Você não está logado</span>)
        return
      }
      if (content.trim() === '') {
        form.setFocus('question')
        toast.error('Digite sua pergunta!')
        return
      }
      const question = {
        content: content.trim(),
        author: {
          name: auth.user.name,
          photoURL: auth.user.photoURL,
        },
        isHighlighted: false,
        isAnswered: false
      }

      toast.promise(
        new Promise(resolve => database.ref(`rooms/${roomID}/questions`).push(question).then(resolve)),
        {
          loading: 'Enviando pergunta ...',
          error: 'Erro ao enviar a pergunta',
          success: 'Pergunta enviada'
        }
      )

      form.reset()
    } catch (e) {
      toast.error(e.message || 'Ocorreu um erro ao enviar sua pergunta')
    }
  }, [auth, form, roomID])

  return (
    <div>
      <header className={styles.header}>
        <div className="content">
          <LogoImage onClick={() => history.push('/my-rooms')} />

          <RoomCode code={roomID} />
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles['room-title']}>
          <h1>Sala {title}</h1>
          <span>{questions.length || 0} pergunta{formatPlural(questions.length || 0)}</span>
        </div>

        <form onSubmit={form.handleSubmit(handleSendQuestion)}>
          <textarea
            placeholder={!!closedAt ? `Esta sala foi encerrada em ${new Date(closedAt).toLocaleString()}! Agora você está no modo leitura!` : 'Oque você deseja perguntar?'}
            disabled={!!closedAt}
            required
            {...form.register('question')}
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
                <button onClick={auth.signInWithGoogle} type="button">
                  faça seu login
                </button>
              </span>
            )}
            <Button type="submit" disabled={!!closedAt || !auth.user}>
              Enviar pergunta
            </Button>
          </div>
        </form>
        {questions.length > 0 ? (
          <div className={styles.questions}>
            {questions.map(question => {
              return (
                <Question
                  key={question.key}
                  author={question.author}
                  content={question.content}
                >
                  <button
                    className={`like-button ${question.likeID ? 'liked' : ''}`}
                    type="button"
                    aria-label="Marcar como gostei"
                    onClick={() => handleLikeQuestion(question.key, question.likeID)}
                  >
                    {question.likeCount > 0 && <span>{question.likeCount}</span>}
                    <LikeIcon />
                  </button>
                </Question>
              )
            })}
          </div>
        ) : (
          <div className={styles.noQuestions}>
            <IllustrationImage />
            <h2>Nenhuma pergunta por aqui...</h2>
            <p>Faça o seu login e seja a primeira pessoa a fazer uma pergunta!</p>
          </div>
        )}
      </main>
    </div>
  )
}
