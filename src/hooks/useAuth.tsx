import { env } from '@/enviroment'
import axiosInstance from '@/utils/axiosInstance'
import Keycloak from 'keycloak-js'
import { useEffect, useRef, useState } from 'react'

const keycloak = new Keycloak({
  url: env.KEYCLOAK_URL,
  realm: env.KEYClOAK_REALM,
  clientId: env.KEYCLOAK_CLIENT
})

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
        setLogin(res)
        console.log(keycloak.token)
        axiosInstance.defaults.headers.common['Authorization'] =
          `Bearer ${keycloak.token}`
        setToken(keycloak.token as string)
      })
      .catch((err) => console.log(err))
  }, [])

  return [isLogin, token]
}

export default useAuth
