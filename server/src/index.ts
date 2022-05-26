import express, { Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
// import session from 'express-session'
import 'dotenv/config'
import jwt from 'jsonwebtoken'
import jwtMiddleware from './middleware/jwt.middleware'
import setRouter from './routes/Set.route'
import userRouter from './routes/User.route'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI!, (err) => {
  if (err) { console.log(err) } else {
    console.log('Connected to MongoDB')
  }
})

const app = express()

app.use(helmet())
app.use(cors())
app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// app.use(session({
//   secret: process.env.SESSION_SECRET!,
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: false }
// }))

app.get('/auth', (req: Request, res: Response) => {
  const email = req.query.email
  const token = jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: '24h' })
  res.json({ token })
})

app.post('/verify-token', (req: Request, res: Response) => {
  const token = req.body.token as string
  try {
    const decoded = jwt.verify(token!, process.env.JWT_SECRET!)
    res.json({ decoded })
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' })
  }
})

app.use('/set', setRouter)
app.use('/user', userRouter)

app.get('/', jwtMiddleware, (req: Request, res: Response) => {
  res.json({ message: 'Hello World' })
})

app.listen(4000, () => {
  console.log('Server is running on port http://localhost:3000')
})
