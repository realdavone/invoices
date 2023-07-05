import { NuxtAuthHandler } from '#auth'
import GoogleProvider from 'next-auth/providers/google'

const { googleCredentials, authSecret } = useRuntimeConfig()

export default NuxtAuthHandler({
  secret: authSecret,
  pages: {
    signIn: '/login'
  },
  providers: [
    GoogleProvider.default({
      clientId: googleCredentials.clientId,
      clientSecret: googleCredentials.clientSecret
    })
  ]
})