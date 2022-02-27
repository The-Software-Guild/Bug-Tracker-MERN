import express from 'express'
import Bug from '../models/Bug.js'

const bugsRouter = express.Router()

bugsRouter
  .get('/', async (req, res) => {
    const bugs = await Bug.find({})
    res.status(200).json({ message: 'Found all bugs!', bugs })
  })
  .get('/:bugId', async ({ params: { bugId } }, res) => {
    const bug = await Bug.findById(bugId)
    if (bug) return res.status(200).json({ message: 'Bug found!', bug })
    return res.status(404).json({ message: 'Bug not found' })
  })
  .post('/', async (req, res) => {
    try {
      const bug = await Bug.create(req.body)
      return res.status(200).json({ message: 'New bug created succesfully!', bug })
    } catch (error) {
      return res.status(301).json({ message: error.message })
    }
  })
  .put('/:bugId', async ({ params: { bugId }, body }, res) => {
    try {
      const bug = await Bug.findByIdAndUpdate(bugId, body, { new: true })
      if (bug) return res.status(200).json({ message: 'Bug updated!', bug })
      return res.status(404).json({ message: `Could not find bug with id ${bugId}` })
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  })
  .delete('/:bugId', async ({ params: { bugId } }, res) => {
    const bug = await Bug.findByIdAndDelete(bugId)
    if (bug) return res.status(200).json({ message: 'Bug was removed.', bug })

    return res.status(404).json({ message: `No bug found with id ${bugId}` })
  })

export default bugsRouter
