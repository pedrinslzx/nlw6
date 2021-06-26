import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useHistory } from 'react-router-dom'

import { Button } from '../../components/Button'
import {
  GoogleImage,
  IllustrationImage,
  LoginIcon,
  LogoImageSrc
} from '../../components/Icons'
import { useAuth } from '../../hooks/useAuth'
import { database } from '../../services/firebase'
import {
  Container,
  Form,
  Main,
  MainContent,
  SideBar,
  Separator
} from './styles'

interface HomeForm {
  room_id: string
}

export function Home() {
  const history = useHistory()
  const auth = useAuth()
  const { handleSubmit, register, reset } = useForm<HomeForm>()

  const handleCreateRoom = useCallback(
    async function handleCreateRoom() {
      try {
        if (!auth.user) await auth.signInWithGoogle()
        history.push('/my-rooms')
      } catch (err) {
        toast.error(err.message || 'Erro ao criar a sala')
      }
    },
    [auth, history]
  )

  const handleJoinRoom = useCallback(
    async function handleJoinRoom({ room_id }: HomeForm) {
      if (room_id.trim() === '') return

      const room = await database.ref(`rooms/${room_id.trim()}`).get()
      if (!room.exists()) {
        toast.error('Essa sala não existe')
        return reset()
      }

      history.push(`/rooms/${room.key}`)
    },
    [history, reset]
  )

  return (
    <Container>
      <SideBar>
        <IllustrationImage />
        <strong>Toda pergunta tem uma resposta.</strong>
        <p>Aprenda e compartilhe conhecimento com outras pessoas</p>
      </SideBar>
      <Main>
        <MainContent>
          <img src={LogoImageSrc} alt="LetMeAsk" />
          <Button color="google" icon={GoogleImage} onClick={handleCreateRoom}>
            Entrar com o Google
          </Button>
          <Separator>Ou entre em uma sala</Separator>

          <Form onSubmit={handleSubmit(handleJoinRoom)}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              autoCapitalize="off"
              autoComplete="on"
              autoCorrect="off"
              {...register('room_id', {
                validate: a => a.trim() !== '',
                required: true
              })}
            />
            <Button type="submit" alt="Entrar" icon={LoginIcon}>
              Entrar na sala
            </Button>
          </Form>
        </MainContent>
      </Main>
    </Container>
  )
}
