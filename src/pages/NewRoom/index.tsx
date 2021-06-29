import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { Link, useHistory } from 'react-router-dom'

import { Button } from '../../components/Button'
import { HomeIllustration, LoginIcon, Logo } from '../../components/Icons'
import { useAuth } from '../../hooks/useAuth'
import { database, firebase } from '../../services/firebase'
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

interface NewRoomForm {
  new_room: string
}

export function NewRoom() {
  const history = useHistory()
  const { user } = useAuth()

  const { handleSubmit, register } = useForm<NewRoomForm>()

  useEffect(() => {
    if (!user) {
      history.push('/')
      toast.error('Parece que você não está logado')
    }
  }, [history, user])

  async function handleCreateRoom({ new_room }: NewRoomForm) {
    try {
      if (new_room.trim() === '' || !user) return
      const newRoom = new_room.trim()

      const roomRef = database.ref('rooms')

      const room = await toast.promise(
        new Promise<firebase.database.Reference>(resolve =>
          roomRef
            .push({ title: newRoom, authorID: user.uid, isClosed: false })
            .then(resolve)
        ),
        {
          error: 'Erro ao criar a sala',
          loading: 'Criando sala ...',
          success: 'Sala criada com sucesso'
        }
      )
      const userRoomRef = database.ref(`user/${user.uid}/rooms/${room.key}`)
      await userRoomRef.set({
        title: newRoom,
        createdIn: new Date().toISOString()
      })
      history.push(`/my-rooms/${room?.key}`)
    } catch (e) {
      toast.error(e.message || 'Ocorreu um erro ao criar a sala')
    }
  }

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
          <Title>Criar uma nova sala</Title>

          <Form onSubmit={handleSubmit(handleCreateRoom)}>
            <input
              type="text"
              placeholder="Nome da sala"
              autoComplete="off"
              {...register('new_room', {
                required: true,
                validate: data => data.trim() !== ''
              })}
            />
            <Button type="submit" alt="Criar" icon={LoginIcon}>
              Criar sala
            </Button>
          </Form>
          <Text>
            Quer entrar em uma sala já existente?{' '}
            <Link to="/rooms/enter">Clique aqui</Link>
          </Text>
        </MainContent>
      </Main>
    </Container>
  )
}
