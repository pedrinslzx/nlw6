import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { Link, useHistory } from 'react-router-dom'

import { Button } from '../../components/Button'
import {
  HomeIllustration,
  LoginIcon,
  Logo
} from '../../components/Icons'
import { useAuth } from '../../hooks/useAuth'
import { database } from '../../services/firebase'
import {
  Container,
  Form,
  Main,
  MainContent,
  Title,
  Text,
  SideBar,
  Logo as LogoContainer
} from './styles'

interface EnterRoomForm {
  room_code: string
}

export function EnterRoom() {
  const history = useHistory()
  const auth = useAuth()

  const { handleSubmit, register, reset } = useForm<EnterRoomForm>()

  async function handleEnterRoom({ room_code }: EnterRoomForm) {
    try {
      if (room_code.trim() === '') return

      const room = await database.ref(`rooms/${room_code.trim()}`).get()
      if (!room.exists()) {
        toast.error('Essa sala não existe')
        return reset()
      }

      history.push(`/rooms/${room.key}`)
    } catch (e) {
      toast.error(e.message || 'Ocorreu um erro ao entrar na sala')
    }
  }

  const handleLogin = useCallback(
    async function handleLogin() {
      try {
        if (!auth.user) await auth.signInWithGoogle()
        history.push('/rooms/new')
      } catch (err) {
        toast.error(err.message || 'Erro ao criar a sala')
      }
    },
    [auth, history]
  )

  return (
    <Container>
      <SideBar>
        <HomeIllustration />
        <strong>Toda pergunta tem uma resposta.</strong>
        <p>Aprenda e compartilhe conhecimento com outras pessoas</p>
      </SideBar>
      <Main>
        <MainContent>
          <LogoContainer>
            <Logo />
          </LogoContainer>
          <Title>Entrar em uma sala</Title>

          <Form onSubmit={handleSubmit(handleEnterRoom)}>
            <input
              type="text"
              placeholder="Código da sala"
              autoComplete="off"
              {...register('room_code', {
                required: true,
                validate: data => data.trim() !== ''
              })}
            />
            <Button type="submit" alt="Criar" icon={LoginIcon}>
              Entrar na sala
            </Button>
          </Form>
          <Text>
            Quer criar uma sala?{' '}
            {!!auth.user
              ? <Link to="/rooms/new">Clique aqui</Link>
              : <Link to="/rooms/new" onClick={e => { e.preventDefault(); handleLogin() }}>Fazer Login</Link>
            }
          </Text>
        </MainContent>
      </Main>
    </Container>
  )
}
