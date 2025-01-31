import { env } from '@/enviroment'
import axiosInstance from '@/utils/axiosInstance'
import Keycloak from 'keycloak-js'
import { useEffect, useRef, useState } from 'react'

const keycloak = new Keycloak({
  url: env.KEYCLOAK_URL,
  realm: env.KEYClOAK_REALM,
  clientId: env.KEYCLOAK_CLIENT
})

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

    keycloak
      .init({
        onLoad: 'login-required'
      })
      .then(async (res) => {
        // if login success it will return true, else false
        setLogin(res)

        localStorage.setItem('token', keycloak.token as string)

        // store token in-memory
        setToken(keycloak.token as string)
      })
      .catch((err) => console.log(err))
  }, [])

  return [isLogin, token]
}

export default useAuth
