import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useHistory, useParams } from 'react-router-dom'

import Button from '../../components/Button'
import { IllustrationImage, LikeIcon, LogoImage } from '../../components/Icons'
import { Question } from '../../components/Question'
import { RoomCode } from '../../components/RoomCode'
import { useAuth } from '../../hooks/useAuth'
import { useRoom } from '../../hooks/useRoom'
import { database } from '../../services/firebase'
import { cx, formatPlural } from '../../services/utils'
import {
  FormFooter,
  Header,
  RoomTitle,
  Main,
  Form,
  RoomContent
} from './styles'

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
  const { title, questions, closedAt, handleLikeQuestion } = useRoom({
    roomID,
    isAdmin: false
  })
  const form = useForm<RoomFormData>()

  const handleSendQuestion = useCallback(
    async function handleSendQuestion({ question: content }: RoomFormData) {
      try {
        if (!auth.user) {
          toast.error(t => (
            <span
              onClick={() => [toast.dismiss(t.id), auth.signInWithGoogle()]}
            >
              'Você não está logado
            </span>
          ))
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
            photoURL: auth.user.photoURL
          },
          isHighlighted: false,
          isAnswered: false
        }

        toast.promise(
          new Promise(resolve =>
            database
              .ref(`rooms/${roomID}/questions`)
              .push(question)
              .then(resolve)
          ),
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
    },
    [auth, form, roomID]
  )

  return (
    <div>
      <Header>
        <div className="content">
          <LogoImage onClick={() => history.push('/my-rooms')} />

          <RoomCode code={roomID} />
        </div>
      </Header>

      <Main>
        <RoomTitle>
          <h1>Sala {title}</h1>
          <span>
            {questions.length || 0} pergunta
            {formatPlural(questions.length || 0)}
          </span>
        </RoomTitle>

        <Form onSubmit={form.handleSubmit(handleSendQuestion)}>
          <textarea
            placeholder={
              !!closedAt
                ? `Esta sala foi encerrada em ${new Date(
                    closedAt
                  ).toLocaleString()}! Agora você está no modo leitura!`
                : 'Oque você deseja perguntar?'
            }
            disabled={!!closedAt}
            required
            {...form.register('question')}
          />
          <FormFooter>
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
          </FormFooter>
        </Form>
        <RoomContent className={cx({ 'no-question': questions.length <= 0 })}>
          {questions.length > 0 ? (
            <>
              {questions.map(question => {
                return (
                  <Question
                    key={question.key}
                    author={question.author}
                    content={question.content}
                    isAnswered={question.isAnswered}
                    isHighlighted={question.isHighlighted}
                  >
                    {!question.isAnswered && (
                      <button
                        className={cx('like-button', { on: !!question.likeID })}
                        type="button"
                        aria-label="Marcar como gostei"
                        onClick={() =>
                          handleLikeQuestion(question.key, question.likeID)
                        }
                      >
                        {question.likeCount > 0 && (
                          <span>{question.likeCount}</span>
                        )}
                        <LikeIcon />
                      </button>
                    )}
                  </Question>
                )
              })}
            </>
          ) : (
            <>
              <IllustrationImage />
              <h2>Nenhuma pergunta por aqui...</h2>
              <p>
                Faça o seu login e seja a primeira pessoa a fazer uma pergunta!
              </p>
            </>
          )}
        </RoomContent>
      </Main>
    </div>
  )
}
