import { keycloakConfig } from '@/utils/keycloakConfig'
import { create } from 'zustand'

interface UserInfo {
  username: string
  lastName: string
  firstName: string
  email: string
  sub: string
}

interface AuthStore {
  userInfo: UserInfo

  authenticateUser: () => Promise<void>
  logoutUser: () => void
}

const useAuthStore = create<AuthStore>((_) => ({
  userInfo: {
    username: '',
    lastName: '',
    firstName: '',
    email: '',
    sub: ''
  },

  authenticateUser: async () => {
    try {
      await keycloakConfig.init({
        onLoad: 'login-required'
      })
    } catch (error) {
      console.error('Keycloak authentication failed:', error)
    }
  },

  logoutUser: () => {
    keycloakConfig.logout()
  }
}))

export default useAuthStore
