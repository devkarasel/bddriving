import { MongoClient } from 'mongodb'

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

if (!global._mongoClientPromise) {
  const uri = process.env.MONGODB_URI
  if (uri) {
    const client = new MongoClient(uri, { serverSelectionTimeoutMS: 10000 })
    global._mongoClientPromise = client.connect()
  }
}

export async function getDb() {
  if (!global._mongoClientPromise) throw new Error('MONGODB_URI not set')
  const client = await global._mongoClientPromise
  return client.db('bddriving')
}

export async function getCollection(name: string) {
  const db = await getDb()
  return db.collection(name)
}
