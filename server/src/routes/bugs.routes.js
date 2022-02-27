import express from 'express'

const bugsRouter = express.Router()

bugsRouter
  .get('/', (req, res) => {
    res.status(200).json({ message: '[GET] @ /bugs' })
  })
  .get('/:bugId', (req, res) => {
    res.status(200).json({ message: '[GET] @ /bugs/:bugId' })
  })
  .post('/', (req, res) => {
    res.status(200).json({ message: '[POST] @ /bugs' })
  })
  .put('/:bugId', (req, res) => {
    res.status(200).json({ message: '[PUT] @ /bugs/:bugId' })
  })
  .delete('/:bugId', (req, res) => {
    res.status(200).json({ message: '[DELETE] @ /bugs/:bugId' })
  })

export default bugsRouter
