import { useCallback } from 'react'
import { toast } from 'react-hot-toast'
import { useParams } from 'react-router-dom'

import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import {
  AnswerIcon,
  DeleteModalIcon,
  CheckIcon,
  EmptyQuestions,
  DeleteIcon
} from '../../components/Icons'
import { LikeIcon } from '../../components/LikeIcon'
import { Question } from '../../components/Question'
import { RoomCode } from '../../components/RoomCode'
import { useAuth } from '../../hooks/useAuth'
import { useModal } from '../../hooks/useModal'
import { useRoom } from '../../hooks/useRoom'
import { database } from '../../services/firebase'
import { cx } from '../../services/utils'
import { formatPlural } from '../../services/utils'
import { Main, RoomContent, RoomTitle, NoQuestions } from './styles'

interface RoomParams {
  id: string
}

export function AdminRoom() {
  const modal = useModal()
  const auth = useAuth()
  const params = useParams<RoomParams>()
  const roomID = params.id.trim()
  const { title, questions, handleLikeQuestion, closedAt } = useRoom({
    roomID,
    isAdmin: true
  })

  const handleCloseOrOpenRoom = useCallback(
    async function handleCloseOrOpenRoom() {
      if (!closedAt) {
        if (
          await modal.open({
            title: 'Encerrar sala',
            description: 'Tem certeza que você deseja encerrar esta sala?',
            buttons: [
              {
                key: 'cancel',
                color: 'cancel',
                text: 'Cancelar',
                value: false
              },
              {
                key: 'close',
                color: 'danger',
                text: 'Sim, encerrar',
                value: true
              }
            ]
          })
        ) {
          const userRoomRef = database.ref(
            `/user/${auth.user?.uid}/rooms/${roomID}`
          )

          await toast.promise(
            Promise.all([
              database.ref(`/rooms/${roomID}`).update({ closedAt: new Date() }),
              userRoomRef.update({ closedAt: new Date() })
            ]),
            {
              loading: 'Encerrando sala ...',
              error: 'Erro ao encerrar a sala',
              success: 'A sala foi encerrada'
            }
          )
        }
      } else {
        if (
          await modal.open({
            title: 'Abrir sala',
            description:
              'Tem certeza que você deseja abrir novamente esta sala?',
            buttons: [
              {
                key: 'cancel',
                color: 'cancel',
                text: 'Cancelar',
                value: false
              },
              { key: 'close', color: 'danger', text: 'Sim, abrir', value: true }
            ]
          })
        ) {
          const userRoomRef = database.ref(
            `/user/${auth.user?.uid}/rooms/${roomID}`
          )

          await toast.promise(
            Promise.all([
              database.ref(`/rooms/${roomID}`).update({ closedAt: null }),
              userRoomRef.update({ closedAt: null })
            ]),
            {
              loading: 'Abrindo sala ...',
              error: 'Erro ao abrir a sala',
              success: 'A sala foi aberta'
            }
          )
        }
      }
    },
    [auth.user?.uid, closedAt, modal, roomID]
  )

  const handleDeleteQuestion = useCallback(
    async function handleDeleteQuestion(questionID: string) {
      if (!!closedAt) return toast.error('Você está no modo de leitura')
      const deleteQuestion = await modal.open({
        icon: DeleteModalIcon,
        title: 'Excluir pergunta',
        description: 'Tem certeza que você deseja excluir esta pergunta?',
        buttons: [
          { key: 'cancel', color: 'cancel', text: 'Cancelar', value: false },
          { key: 'close', color: 'danger', text: 'Sim, excluir', value: true }
        ]
      })

      if (deleteQuestion) {
        const questionRef = database.ref(
          `/rooms/${roomID}/questions/${questionID}`
        )
        toast.promise(questionRef.remove(), {
          loading: 'Deletando pergunta ...',
          error: 'Erro ao deletar a questão',
          success: 'A pergunta foi deletada'
        })
      } else {
        toast('Ok')
      }
    },
    [closedAt, modal, roomID]
  )

  const handleHighlightQuestion = useCallback(
    async function handleHighlightQuestion(
      questionID: string,
      isHighlighted: boolean
    ) {
      await toast.promise(
        database
          .ref(`/rooms/${roomID}/questions/${questionID}`)
          .update({ isHighlighted: !isHighlighted }),
        {
          loading: isHighlighted
            ? 'Retirando o destaque da pergunta'
            : 'Destacando pergunta',
          success: isHighlighted
            ? 'Destaque retirado'
            : 'Pergunta está em destaque',
          error: isHighlighted
            ? 'Error ao tirar o destaque da pergunta'
            : 'Erro ao destacar a pergunta'
        }
      )
    },
    [roomID]
  )

  const handleCheckQuestionAsAnswered = useCallback(
    async function handleCheckQuestionAsAnswered(
      questionID: string,
      isAnswered: boolean
    ) {
      if (isAnswered) {
        const deleteQuestion = await modal.open({
          title: 'Desmarcar como respondida',
          description:
            'Tem certeza que você deseja marcar esta pergunta como não-respondida?',
          buttons: [
            { key: 'cancel', color: 'cancel', text: 'Não', value: false },
            { key: 'close', color: 'danger', text: 'Sim', value: true }
          ]
        })
        if (!deleteQuestion) return
      }
      await toast.promise(
        database
          .ref(`/rooms/${roomID}/questions/${questionID}`)
          .update({ isAnswered: !isAnswered }),
        {
          loading: isAnswered
            ? 'Marcando como não-respondida'
            : 'Marcando como respondida',
          success: isAnswered
            ? 'Marcada como não-respondida'
            : 'Marcada como respondida',
          error: isAnswered
            ? 'Erro ao marcar como não-respondida'
            : 'Erro ao marcar como respondida'
        }
      )
    },
    [modal, roomID]
  )

  return (
    <div>
      <Header>
        <RoomCode code={roomID} />
        <Button isOutlined onClick={handleCloseOrOpenRoom}>
          {!!closedAt ? 'Abrir' : 'Encerrar'} Sala
        </Button>
        {navigator.share && (
          <Button
            onClick={() =>
              toast.promise(
                navigator.share({
                  url: window.location.href,
                  title: 'LetMeAsk ' + title,
                  text: 'Entre na minha sala de perguntas.'
                }),
                {
                  loading: 'Abrindo share...',
                  success: 'Compartilhado',
                  error: 'Error ao compartilhar'
                }
              )
            }
          >
            Share
          </Button>
        )}
      </Header>

      <Main>
        <RoomTitle>
          <h1>Sala {title}</h1>
          <span>
            {questions.length || 0} pergunta
            {formatPlural(questions.length || 0)}
          </span>
        </RoomTitle>

        {questions.length > 0 ? (
          <RoomContent>
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

                  <button
                    type="button"
                    aria-label={`Marcar pergunta como ${question.isAnswered ? 'não' : ''
                      }respondida`}
                    className={cx({ on: !!question.isAnswered })}
                    onClick={() =>
                      handleCheckQuestionAsAnswered(
                        question.key,
                        question.isAnswered
                      )
                    }
                  >
                    <CheckIcon />
                  </button>

                  {!question.isAnswered && (
                    <button
                      type="button"
                      aria-label="Destacar pergunta"
                      className={cx({ on: !!question.isHighlighted })}
                      onClick={() =>
                        handleHighlightQuestion(
                          question.key,
                          question.isHighlighted
                        )
                      }
                    >
                      <AnswerIcon />
                    </button>
                  )}

                  <button
                    type="button"
                    aria-label="Deletar pergunta"
                    onClick={() => handleDeleteQuestion(question.key)}
                  >
                    <DeleteIcon />
                  </button>
                </Question>
              )
            })}
          </RoomContent>
        ) : (
          <NoQuestions>
            <EmptyQuestions />
            <h2>Nenhuma pergunta por aqui...</h2>
            <p>
              Compartilhe o código desta sala para seus amigos e comece a responder perguntas!
            </p>
          </NoQuestions>
        )}
      </Main>
    </div>
  )
}
