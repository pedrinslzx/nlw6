import { Link, useHistory } from 'react-router-dom'

import IllustrationImage from '../../assets/images/illustration.svg'
import LogoImage from '../../assets/images/logo.svg'
import LoginIcon from '../../assets/images/log-in.svg'

import styles from './styles.module.scss'
import Button from '../../components/Button'
import { useAuth } from '../../hooks/useAuth'

export function NewRoom() {
  const history = useHistory()
  const auth = useAuth()

  if (!auth.loggedIn) {
    history.push('/')
    return null
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
          <h2 className={styles.title}>Criar uma nova sala</h2>

          <form onSubmit={e => e.preventDefault()}>
            <input type="text" placeholder="Nome da sala" />
            <Button type="submit" alt="Criar" icon={LoginIcon}>
              Criar sala
            </Button>
          </form>
          <p className={styles.text}>
            Quer entrar em uma sala já existente?{' '}
            <Link to="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  )
}
