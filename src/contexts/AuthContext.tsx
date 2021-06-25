import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState
} from 'react'
import { toast } from 'react-hot-toast'
import { useHistory } from 'react-router-dom'
import { auth, firebase } from '../services/firebase'

interface AuthUser {
  uid: string
  name: string
  email: string
  photoURL: string
}

interface AuthContextType {
  user: AuthUser | null
  signInWithGoogle: () => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)

export function formatUserInfo(user: firebase.User | null): AuthUser | null {
  if (!user) return null
  if (!user.displayName || !user.email || !user.photoURL) return null
  return {
    uid: user.uid,
    name: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const history = useHistory()
  const [user, setUser] = useState<AuthUser | null>(
    formatUserInfo(auth.currentUser)
  )

  useEffect(() => {
    auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (!user) return
      if (!user.displayName || !user.email) {
        toast.error('Estão faltando algumas infos da sua conta')
        return
      }
      toast.success(`Login feito como: ${user.displayName}`)
      setUser(formatUserInfo(user))
    })

    return () => unsubscribe()
  }, [])

  const signInWithGoogle = useCallback(
    async function signInWithGoogle() {
      const GoogleAuthProvider = new firebase.auth.GoogleAuthProvider()

      GoogleAuthProvider.addScope('https://www.googleapis.com/auth/userinfo.email')
      GoogleAuthProvider.addScope('https://www.googleapis.com/auth/userinfo.profile')

      const userCredentials = await auth.signInWithPopup(GoogleAuthProvider)
      if (!userCredentials.user) return
      if (!userCredentials.user.displayName || !userCredentials.user.email) {
        toast.error('Estão faltando algumas infos da sua conta')
        return
      }
      setUser(formatUserInfo(userCredentials.user))
    },
    [setUser]
  )

  async function logout() {
    await toast.promise(auth.signOut(), {
      loading: 'Saindo ...',
      error: 'Erro ao fazer o logout',
      success: 'Logout feito com sucesso'
    })
    history.push('/')
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
