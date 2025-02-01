import { keycloakConfig } from '@/utils/keycloakConfig'
import { useEffect, useRef, useState } from 'react'

/**
 * this hookh handle keycloack login, if user not login, it will redirect to login form
 * of keycloak by default
 *
 * @returns [isLogin: boolean, token: string]
 */
const useAuth = () => {
  const isRun = useRef(false)
  const [token, setToken] = useState('')
  const [isLogin, setLogin] = useState(false)

  useEffect(() => {
    if (isRun.current) return

    isRun.current = true

    keycloakConfig
      .init({
        onLoad: 'login-required'
      })
      .then(async (res) => {
        // if login success it will return true, else false
        setLogin(res)

        // TODO: store in cookies intead of localStorage
        localStorage.setItem('token', keycloakConfig.token as string)

        // store token in-memory
        setToken(keycloakConfig.token as string)
      })
      .catch((err) => console.log(err))
  }, [])

  return [isLogin, token]
}

export default useAuth
