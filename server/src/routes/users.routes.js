import express from 'express'
import User from '../models/User.js'

const usersRouter = express.Router()

usersRouter
  .get('/', async (req, res) => {
    const users = await User.find({})
    res.status(200).json({ message: 'Found all users!', users })
  })
  .get('/:userId', async ({ params: { userId } }, res) => {
    const user = await User.findById(userId)
    if (user) return res.status(200).json({ message: 'User found!', user })
    return res.status(404).json({ message: 'User not found' })
  })
  .post('/', async (req, res) => {
    try {
      const user = await User.create(req.body)
      return res.status(200).json({ message: 'New user created successfully!', user })
    } catch (error) {
      return res.status(301).json({ message: error.message })
    }
  })
  .put('/:userId', async ({ params: { userId }, body }, res) => {
    try {
      const user = await User.findByIdAndUpdate(userId, body, { new: true })
      if (user) return res.status(200).json({ message: 'User updated!', user })
      return res.status(404).json({ message: `Could not find user with id ${userId}` })
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  })
  .delete('/:userId', async ({ params: { userId } }, res) => {
    const user = await User.findByIdAndDelete(userId)
    if (user) return res.status(200).json({ message: 'User was deleted.', user })

    return res.status(404).json({ message: `No user found with id ${userId}` })
  })

export default usersRouter
