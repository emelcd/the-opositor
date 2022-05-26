import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const jwtMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]
  console.log(req.headers.authorization)
  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }
  try {
    const decoded = jwt.verify(token!, process.env.JWT_SECRET!)
    res.locals.token = decoded
    next()
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' })
  }
}

export default jwtMiddleware
