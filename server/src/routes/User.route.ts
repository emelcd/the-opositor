import { Router, Request, Response } from 'express'
import { User } from '../models/User.model'
import jwt from 'jsonwebtoken'
import CryptoJS from 'crypto-js'

const userRouter = Router()

userRouter.post('/register', async (req: Request, res: Response) => {
  try {
    const user = new User({
      ...req.body,
      password: CryptoJS.SHA256(req.body.password).toString()
    })
    await user.save()
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET!, { expiresIn: '24h' })
    res.status(201).send({ token })
  } catch (error) {
    res.status(400).send(error)
  }
})

userRouter.post('/login', async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
      return res.status(401).send({ error: 'Email or password is incorrect' })
    }
    const password = CryptoJS.SHA256(req.body.password).toString()
    if (user.password !== password) {
      return res.status(401).send({ error: 'Email or password is incorrect' })
    }
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET!, { expiresIn: '24h' })
    res.send({ token })
  } catch (error) {
    res.status(400).send(error)
  }
})

export default userRouter

// userRouter.post('/login', async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body
//     const user = await User.findOne({ email })
//     if (!user) {
//       return res.status(401).send({ error: 'Email not found' })
//     }
//     if (!user.comparePassword(password)) {
//       return res.status(401).send({ error: 'Password is incorrect' })
//     }
//     const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET!, { expiresIn: '24h' })
//     res.send({ token })
//   }
