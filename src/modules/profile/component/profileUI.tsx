import useAuth from '@/hooks/useAuth'
import { keycloakConfig } from '@/utils/keycloakConfig'
import { FC, useEffect } from 'react'

const ProfileUI: FC = () => {
  const [isLogin, token] = useAuth()

  const fetchProfile = async () => {
    try {
      const profile = await keycloakConfig.loadUserProfile()
      console.log('Retrieved user profile:', profile)
    } catch (error) {
      console.error('Failed to load user profile:', error)
    }
  }

  useEffect(() => {
    // make sure the token is avaiable before calling api
    if (token) {
      fetchProfile()
    }
  }, [])

  return (
    <>
      <div>Profile</div>
    </>
  )
}

export default ProfileUI
