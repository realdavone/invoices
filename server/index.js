import mongoose from 'mongoose'

const { databaseUri } = useRuntimeConfig()

export default async (_nitroApp) => {
  await mongoose.connect(databaseUri)
}