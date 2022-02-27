import express from 'express'

const usersRouter = express.Router()

usersRouter
  .get('/', (req, res) => {
    res.status(200).json({ message: '[GET] @ /users' })
  })
  .get('/:userId', (req, res) => {
    res.status(200).json({ message: '[GET] @ /users/:userId' })
  })
  .post('/', (req, res) => {
    res.status(200).json({ message: '[POST] @ /users' })
  })
  .put('/:userId', (req, res) => {
    res.status(200).json({ message: '[PUT] @ /users/:userId' })
  })
  .delete('/:userId', (req, res) => {
    res.status(200).json({ message: '[DELETE] @ /users/:userId' })
  })

export default usersRouter
