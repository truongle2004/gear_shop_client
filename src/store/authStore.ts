import { keycloakConfig } from '@/utils/keycloakConfig'
import setAuthHeader from '@/utils/setAuthHeader'
import { create } from 'zustand'
import { shallow } from 'zustand/shallow'

interface UserInfo {
  lastName: string
  firstName: string
  email: string
  id: string
}

interface AuthStore {
  userInfo: UserInfo
  // authenticateUser: () => Promise<void>
  logoutUser: () => void
  getUserInfo: () => Promise<UserInfo | undefined | null>
  isLoggedIn: () => boolean
  initLogin: () => Promise<void>
  isAuthenticated: () => boolean
  getUserId: () => Promise<void>
}

const initialUserInfo: UserInfo = {
  lastName: '',
  firstName: '',
  email: '',
  id: ''
}

const setupKeycloakListeners = () => {
  keycloakConfig.onAuthSuccess = keycloakConfig.onAuthRefreshSuccess = () => {
    setAuthHeader(keycloakConfig.token as string)
  }

  keycloakConfig.onTokenExpired = () => {
    keycloakConfig.updateToken(300).then(() => {
      setAuthHeader(keycloakConfig.token as string)
    })
  }

  keycloakConfig.onAuthRefreshError =
    keycloakConfig.onAuthError =
    keycloakConfig.onAuthLogout =
      () => {
        keycloakConfig.clearToken()
      }
}

// automatically setup keycloak listeners
setupKeycloakListeners()

const initializeAuth = async () => {
  return await keycloakConfig.init({
    onLoad: 'login-required'
    // silentCheckSsoRedirectUri: `${location.origin}/silent-check-sso.html`
  })
}

let authenticated = false

initializeAuth().then((auth) => {
  authenticated = auth
})

const useAuthStore = create<AuthStore>((set, get) => ({
  userInfo: initialUserInfo,

  getUserId: async () => {
    const { userInfo } = get()

    return new Promise(() => {
      const checkToken = setInterval(() => {
        if (keycloakConfig.tokenParsed?.sub) {
          clearInterval(checkToken)
          const id = keycloakConfig.tokenParsed.sub
          set({ userInfo: { ...userInfo, id } })
        }
      }, 100) // Check every 100ms
    })
  },

  isLoggedIn: () => {
    return authenticated
  },

  isAuthenticated: () => {
    return keycloakConfig.authenticated as boolean
  },

  initLogin: async () => {
    await keycloakConfig.login()
  },

  getUserInfo: async () => {
    const { userInfo } = get()
    if (userInfo.id) return userInfo

    const res = await keycloakConfig.loadUserProfile()
    set(
      {
        userInfo: {
          lastName: res?.lastName ?? '',
          firstName: res?.firstName ?? '',
          email: res?.email ?? '',
          id: res?.id ?? ''
        }
      },
      shallow as any
    )
    return res as UserInfo
  },

  logoutUser: async () => {
    try {
      if (!authenticated) return

      await keycloakConfig.logout()
      keycloakConfig.clearToken()

      set({ userInfo: initialUserInfo }, shallow as any)
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }
}))

export default useAuthStore
