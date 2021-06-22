import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState
} from 'react'
import { auth, firebase } from '../services/firebase'

interface AuthUser {
  uid: string
  name: string
  email: string
  photoURL: string
}

interface AuthContextType {
  loggedIn: boolean
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
    photoURL: user.photoURL
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(
    formatUserInfo(auth.currentUser)
  )
  const loggedIn = !!user

  useEffect(() => {
    auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (!user) return
      if (!user.displayName || !user.email) {
        throw new Error('Missing information from Google account')
      }
      setUser(formatUserInfo(user))
    })

    return () => unsubscribe()
  }, [])

  const signInWithGoogle = useCallback(
    async function signInWithGoogle() {
      const GoogleAuthProvider = new firebase.auth.GoogleAuthProvider()
      const userCredentials = await auth.signInWithPopup(GoogleAuthProvider)
      if (!userCredentials.user) return
      if (!userCredentials.user.displayName || !userCredentials.user.email) {
        throw new Error('Missing information from Google account')
      }
      setUser(formatUserInfo(userCredentials.user))
    },
    [setUser]
  )

  async function logout() {
    await auth.signOut()
  }

  return (
    <AuthContext.Provider value={{ loggedIn, user, signInWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
