import Keycloak from 'keycloak-js'
import { env } from '@/enviroment'

export const keycloakConfig = new Keycloak({
  url: env.KEYCLOAK_URL as string,
  realm: env.KEYClOAK_REALM as string,
  clientId: env.KEYCLOAK_CLIENT as string
})
