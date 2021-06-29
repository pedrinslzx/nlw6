import { useCallback } from 'react'
import { toast } from 'react-hot-toast'
import { useHistory } from 'react-router-dom'

import { Button } from '../../components/Button'
import {
  GoogleIcon,
  HomeIllustration,
  LoginIcon,
  Logo
} from '../../components/Icons'
import { useAuth } from '../../hooks/useAuth'
import {
  Container,
  Main,
  MainContent,
  SideBar,
  Separator,
  Logo as LogoContainer
} from './styles'

export function Home() {
  const history = useHistory()
  const auth = useAuth()

  const handleLogin = useCallback(
    async function handleLogin() {
      try {
        if (!auth.user) await auth.signInWithGoogle()
        history.push('/my-rooms')
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
          <Button color="google" icon={GoogleIcon} onClick={handleLogin}>
            Entrar com o Google
          </Button>
          <Separator>Ou</Separator>
          <Button
            alt="Entrar"
            onClick={() => history.push('/rooms/enter')}
            icon={LoginIcon}
          >
            Entrar em uma sala
          </Button>
        </MainContent>
      </Main>
    </Container>
  )
}
