import { keycloakConfig } from '@/utils/keycloakConfig'
import setAuthHeader from '@/utils/setAuthHeader'
import { create } from 'zustand'

interface UserInfo {
  lastName: string
  firstName: string
  email: string
  id: string
}

interface AuthStore {
  userInfo: UserInfo

  authenticateUser: () => Promise<void>
  logoutUser: () => void
  getUserInfo: () => void
}

const useAuthStore = create<AuthStore>((set) => ({
  userInfo: {
    lastName: '',
    firstName: '',
    email: '',
    id: ''
  },

  getUserInfo: async () => {
    try {
      const res = await keycloakConfig.loadUserProfile()
      set({
        userInfo: {
          lastName: res.lastName as string,
          firstName: res.firstName as string,
          email: res.email as string,
          id: res.id as string
        }
      })
    } catch (error) {
      console.error('Keycloak authentication failed:', error)
    }
  },

  authenticateUser: async () => {
    try {
      await keycloakConfig
        .init({
          onLoad: 'login-required'
        })
        .then(() => {
          setAuthHeader(keycloakConfig.token as string)
        })
    } catch (error) {
      console.error('Keycloak authentication failed:', error)
    }
  },

  logoutUser: () => {
    keycloakConfig.logout().then(() => {
      set({
        userInfo: {
          lastName: '',
          firstName: '',
          email: '',
          id: ''
        }
      })
    })
  }
}))

export default useAuthStore
