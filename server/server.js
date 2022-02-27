import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import usersRouter from './src/routes/users.routes.js'
import bugsRouter from './src/routes/bugs.routes.js'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).send('Bugs Tracker API!')
})

app.use('/users', usersRouter)
app.use('/bugs', bugsRouter)

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB instance')
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
  })
  .catch(err => console.error('An error occurred.', err))
