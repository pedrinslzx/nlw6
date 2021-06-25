import { useCallback, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { toast } from "react-hot-toast"
import { database, RoomQuestionType, firebase } from "../services/firebase"
import { useAuth } from "./useAuth"

export function useRoom({ roomID, isAdmin = true }: { roomID: string, isAdmin?: boolean }) {
  const history = useHistory()
  const [questions, setQuestions] = useState<RoomQuestionType[]>([])
  const [title, setTitle] = useState('')
  const [closedAt, setClosedDate] = useState<Date | null>(null)
  const auth = useAuth()

  useEffect(() => {
    try {
      const roomRef = database.ref(`rooms/${roomID}`)

      const onValue = (room: firebase.database.DataSnapshot) => {
        const roomData = room.val()
        if (!roomData) {
          toast.error('Essa sala não existe')
          return history.push('/')
        }
        if (roomData.authorID === auth.user?.uid && !isAdmin) return history.push(`/my-rooms/${roomID}`)
        if (roomData.authorID !== auth.user?.uid && isAdmin) return history.push(`/rooms/${roomID}`)
        if (!roomData.questions) roomData.questions = {}
        const questions: RoomQuestionType[] = []

        for (const key in roomData.questions) {
          if (Object.prototype.hasOwnProperty.call(roomData.questions, key)) {
            const q = roomData.questions[key]
            questions.push({
              key,
              likeCount: Object.values(q.likes ?? {}).length,
              likeID: Object.entries<{ authorID: string }>(q.likes ?? {}).find(([, like]) => like.authorID === auth.user?.uid)?.[0] || null,
              author: q.author,
              content: q.content,
              isAnswered: q.isAnswered,
              isHighlighted: q.isHighlighted,
            })
          }
        }

        setQuestions(questions)
        setTitle(roomData.title)
        setClosedDate(roomData.closedAt)
      }

      roomRef.on('value', onValue)
      return () => roomRef.off('value')
    } catch (e) {
      toast.error(e.message || 'Ocorreu um erro ao carregar a sala')
    }
  }, [auth.user?.uid, history, roomID, isAdmin, setClosedDate])

  const handleLikeQuestion = useCallback(async function handleLikeQuestion(questionID: string, likeID: string | null) {
    if (!auth.user) return toast.error('Você não está logado')
    if (!!closedAt) return toast.error('Você está no modo de leitura!')
    try {
      const likesRef = database.ref(`/rooms/${roomID}/questions/${questionID}/likes`)
      if (likeID) {
        const likeRef = database.ref(`/rooms/${roomID}/questions/${questionID}/likes/${likeID}`)
        const userLike = await likeRef.get()
        if (!userLike.exists()) await likesRef.push({ authorID: auth.user?.uid })
        await likeRef.remove()
      } else {
        await likesRef.push({ authorID: auth.user?.uid })
      }

    } catch (error) {
      toast.error(error.message || 'Erro ao marcar/desmarcar a pergunta como gostei')
    }
  }, [auth.user, closedAt, roomID])

  return { questions, title, closedAt, handleLikeQuestion }
}
