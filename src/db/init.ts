import mongoose from 'mongoose'

const url = process.env.DB_URL as string as string

mongoose.connect(url).then(() => {
  console.log('DB connected')
})
