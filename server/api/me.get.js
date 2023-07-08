import { getServerSession } from '#auth'

import User from '../models/user.js'

export default eventHandler(async event => {
  const session = await getServerSession(event)

  if(!session) return {
    status: 'unauthenticated'
  }

  const { email } = session.user

  const user = await User.findOne({ email })

  return { user } 
})