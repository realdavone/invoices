import { getServerSession } from '#auth'

import User from '../models/user.js'

export default eventHandler(async event => {
  const session = await getServerSession(event)

  if(!session) return {
    status: 'unauthenticated'
  }

  const { email } = session.user
  const body = await readBody(event)

  try {
    const user = await User.create({ email, ...body })

    return {
      message: 'Užívateľ vytvorený', 
      user
    } 
  } catch (error) {
    return createError({ statusCode: 500, statusMessage: 'Niečo sa pokazilo' })
  }
})