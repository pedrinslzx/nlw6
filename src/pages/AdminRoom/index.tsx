import { useHistory, useParams } from 'react-router-dom'

import { ReactComponent as LogoImage } from '../../assets/images/logo.svg'
import { ReactComponent as IllustrationImage } from '../../assets/images/empty-questions.svg'
import { ReactComponent as CloseIcon } from '../../assets/images/close.svg'
import { ReactComponent as DeleteIcon } from '../../assets/images/delete.svg'
import { ReactComponent as DeleteModalIcon } from '../../assets/images/delete-modal.svg'
import Button from '../../components/Button'

import styles from './styles.module.scss'
import RoomCode from '../../components/RoomCode'
import { Question } from '../../components/Question'
import { useRoom } from '../../hooks/useRoom'

import { useModal } from '../../hooks/useModal'
import { database } from '../../services/firebase'
import { toast } from 'react-hot-toast'
import { useAuth } from '../../hooks/useAuth'
import { LikeIcon } from '../../components/LikeIcon'
import { formatPlural } from '../../services/utils'

interface RoomParams {
  id: string
}


export function AdminRoom() {
  const modal = useModal()
  const auth = useAuth()
  const params = useParams<RoomParams>()
  const roomID = params.id.trim()
  const history = useHistory()
  const { title, questions, handleLikeQuestion, closedAt } = useRoom({ roomID, isAdmin: true })

  async function handleCloseOrOpenRoom() {
    if (!closedAt) {
      if (await modal.open({
        icon: CloseIcon,
        title: 'Encerrar sala',
        description: 'Tem certeza que você deseja encerrar esta sala?',
        buttons: [
          { key: 'cancel', color: 'cancel', text: 'Cancelar', value: false },
          { key: 'close', color: 'danger', text: 'Sim, encerrar', value: true },
        ]
      })) {
        const userRoomRef = database.ref(`user_rooms/${auth.user?.uid}/${roomID}`)

        await toast.promise(database.ref(`/rooms/${roomID}`).update({ closedAt: new Date() }), {
          loading: 'Encerrando sala ...',
          error: 'Erro ao encerrar a sala',
          success: 'A sala foi encerrada'
        })
        await userRoomRef.update({ closedAt: new Date().toISOString() })
      }
    } else {
      if (await modal.open({
        title: 'Abrir sala',
        description: 'Tem certeza que você deseja abrir novamente esta sala?',
        buttons: [
          { key: 'cancel', color: 'cancel', text: 'Cancelar', value: false },
          { key: 'close', color: 'danger', text: 'Sim, abrir', value: true },
        ]
      })) {
        const userRoomRef = database.ref(`user_rooms/${auth.user?.uid}/${roomID}`)

        await toast.promise(database.ref(`/rooms/${roomID}`).update({ closedAt: null }), {
          loading: 'Abrindo sala ...',
          error: 'Erro ao abrir a sala',
          success: 'A sala foi aberta'
        })
        await userRoomRef.update({ closedAt: null })
      }
    }
  }

  async function handleDeleteQuestion(questionID: string) {
    if (!!closedAt) return toast.error('Você está no modo de leitura')
    const deleteQuestion = await modal.open({
      icon: DeleteModalIcon,
      title: 'Excluir pergunta',
      description: 'Tem certeza que você deseja excluir esta pergunta?',
      buttons: [
        { key: 'cancel', color: 'cancel', text: 'Cancelar', value: false },
        { key: 'close', color: 'danger', text: 'Sim, excluir', value: true },
      ]
    })

    if (deleteQuestion) {
      const questionRef = database.ref(`/rooms/${roomID}/questions/${questionID}`)
      toast.promise(questionRef.remove(), {
        loading: 'Deletando pergunta ...',
        error: 'Erro ao deletar a questão',
        success: 'A pergunta foi deletada'
      })
    } else {
      toast('Ok')
    }
  }

  return (
    <div>
      <header className={styles.header}>
        <div className="content">
          <LogoImage onClick={() => history.push('/my-rooms')} />

          <div>
            <RoomCode code={roomID} />
            <Button isOutlined onClick={handleCloseOrOpenRoom}>{!!closedAt ? 'Abrir' : 'Encerrar'} Sala</Button>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles['room-title']}>
          <h1>Sala {title}</h1>
          <span>{questions.length || 0} pergunta{formatPlural(questions.length || 0)}</span>
        </div>
        {!questions.length && (
          <div className={styles.noQuestions}>
            <IllustrationImage />
            <h2>Nenhuma pergunta por aqui...</h2>
            <p>Faça o seu login e seja a primeira pessoa a fazer uma pergunta!</p>
          </div>
        )}
        {questions.length && (
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
          </div>
        )}
      </main>
    </div>
  )
}
