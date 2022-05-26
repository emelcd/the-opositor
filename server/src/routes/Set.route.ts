import { Router, Request, Response } from 'express'
import jwtMiddleware from '../middleware/jwt.middleware'
import { Set } from '../models/Set.model'
import { User } from '../models/User.model'

const setRouter = Router()

setRouter.use(jwtMiddleware)

setRouter.get('/list', async (req: Request, res: Response) => {
  try {
    const { token: { email } } = res.locals
    const user = await User.findOne({ email })
    const sets = await Set.find({ owner: user._id })
    res.json({ sets })
  } catch (error) {
    res.status(500).json({ message: error })
  }
})
setRouter.post('/insert', async (req: Request, res: Response) => {
  const { token: { email } } = res.locals
  const { name, description, isPublic } = req.body
  const owner = await User.findOne({ email })
  if (!owner) {
    return res.status(401).send({ error: 'User not found' })
  }
  try {
    const set = new Set({
      name,
      description,
      owner,
      isPublic: isPublic === 'true'
    })
    await set.save()
    res.json({ message: 'Set created' })
  } catch (err) {
    res.status(500).json({ message: err })
  }
})

setRouter.post('/update', async (req: Request, res: Response) => {
  const { token: { email } } = res.locals
  const set = await Set.findByIdAndUpdate(req.body._id, {
    ...req.body,
    owner: await User.findOne({ email })
  })
  const user = await User.findOne({ email })
  if (!set) {
    return res.status(401).send({ error: 'Set not found' })
  }
  if (set.owner.toString() !== user._id.toString()) {
    return res.status(401).send({ error: 'You are not the owner of this set' })
  }
  try {
    await set.save()
    res.json({ message: 'Set updated' })
  } catch (err) {
    res.status(500).json({ message: err })
  }
})

setRouter.post('/delete', async (req: Request, res: Response) => {
  try {
    const { token: { email } } = res.locals
    const set = await Set.findByIdAndDelete(req.body._id)
    const user = await User.findOne({ email })
    if (!set) {
      return res.status(401).send({ error: 'Set not found' })
    }
    if (set.owner.toString() !== user._id.toString()) {
      return res.status(401).send({ error: 'You are not the owner of this set' })
    }
    res.json({ message: 'Set deleted' })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err })
  }
})

export default setRouter

// POST https://localhost:3000/set/insert HTTP/1.1
// content-type: application/json
// authorization: beaerer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVjb0BlY28uY29tIiwiaWF0IjoxNjUzNTkxNTY5LCJleHAiOjE2NTM2Nzc5Njl9.-YZraQr5xVxNm5xEnDFCbab7uBMnzgk7i2M6eIH1IXQ

// {
//     "name": "Lost troncos locos",
//     "description": "Los super troncos",
//     "isPublic": true
// }
