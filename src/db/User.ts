import { Schema, model } from 'mongoose'

const User_Schema = new Schema({
  user_name: {
    type: String,
    require: [true, 'user_name is required']
  },
  balance: {
    type: Number
  }
}, { timestamps: true })

const User = model('user', User_Schema)

export default User
