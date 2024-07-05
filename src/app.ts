import express, { Request, Response, NextFunction } from 'express'
import dotenv from "dotenv"

dotenv.config({ path: 'config.env' });

import './db/init'
// import User from './db/User';
import router from './routes/router';

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Temp middleware for creating users
// app.use('/user', async (_req, res) => {
//   await User.create({ user_name: 'Zuhaib' })
//   res.status(201).json({
//     message: 'user created'
//   })
// })

app.use('/api/v1', router)


// Global erorr handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  res.status(400).send({ error: true, message: err.message });
});

app.listen(3000, () => {
  console.log('Server running on port 3000')
})

export default app
