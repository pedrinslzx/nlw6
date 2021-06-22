import IllustrationImage from '../../assets/images/illustration.svg'
import LogoImage from '../../assets/images/logo.svg'
import GoogleImage from '../../assets/images/google-icon.svg'
import LoginIcon from '../../assets/images/log-in.svg'

import styles from './styles.module.scss'
import Button from '../../components/Button'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export function Home() {
  const history = useHistory()
  const auth = useAuth()

  async function handleCreateRoom() {
    try {
      if (!auth.loggedIn) {
        await auth.signInWithGoogle()
      }
      history.push('/rooms/new')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className={styles.container}>
      <aside className={styles.aside}>
        <img src={IllustrationImage} alt="Ilustração" />
        <strong>Toda pergunta tem uma resposta.</strong>
        <p>Aprenda e compartilhe conhecimento com outras pessoas</p>
      </aside>
      <main className={styles.main}>
        <div className={styles.main_content}>
          <img src={LogoImage} alt="LetMeAsk" />
          <button className={styles.button} onClick={handleCreateRoom}>
            <img src={GoogleImage} alt="Google" />
            {auth.loggedIn && 'Criar sua sala'}
            {!auth.loggedIn && 'Crie sua sala com o Google'}
          </button>
          <div className={styles.separator}>Ou entre em uma sala</div>

          <form onSubmit={e => e.preventDefault()}>
            <input type="text" placeholder="Digite o código da sala" />
            <Button type="submit" alt="Entrar" icon={LoginIcon}>
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}
