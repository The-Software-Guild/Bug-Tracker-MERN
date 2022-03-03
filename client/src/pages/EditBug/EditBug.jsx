import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import moment from 'moment'
import Form from '../../components/Form/Form'

const EditBug = () => {
  const navigate = useNavigate()
  const { bugId } = useParams()

  const [bugData, setBugData] = useState({
    title: '',
    description: '',
    createdAt: moment(),
    expirationDate: moment().add(3, 'days'),
    assignee: ''
  })
  const [assignees, setAssignees] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => {
        const assigneeList = data.users.map(user => ({ id: user._id, name: user.name }))
        setAssignees(assigneeList)
      })

    fetch(`http://localhost:5000/bugs/${bugId}`)
      .then(res => res.json())
      .then(data => setBugData(data.bug))
  }, [])

  const handleSubmit = e => {
    e.preventDefault()

    fetch(`http://localhost:5000/bugs/${bugId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bugData)
    })
      .then(res => {
        if (res.status === 200) navigate('/')
      })
      .catch(err => {
        console.err(err)
      })
  }

  const handleChange = ({ target: { name, value } }) => {
    if (['expirationDate', 'createdAt'].includes(name)) {
      setBugData({ ...bugData, [name]: moment(value).utc().format() })
    } else {
      setBugData({ ...bugData, [name]: value })
    }
  }

  return (
    <Form formTitle={`Edit: ${bugData.title}`} handleSubmit={handleSubmit}>
      <label htmlFor='title'>
        Title
        <input
          type='text'
          name='title'
          id='bug-title'
          minLength={2}
          defaultValue={bugData.title}
          onChange={handleChange}
          required
        />
      </label>

      <label htmlFor='description'>
        Description
        <textarea
          name='description'
          id='bug-description'
          rows={3}
          defaultValue={bugData.description}
          onChange={handleChange}
          required></textarea>
      </label>

      <label htmlFor='assignee'>Assignee</label>
      <select
        name='assignee'
        id='bug-assignee'
        defaultValue={bugData.assignee}
        onChange={handleChange}
        required>
        {assignees.map(assignee => (
          <option key={assignee.id} value={assignee.id} selected={assignee.id === bugData.assignee}>
            {assignee.name}
          </option>
        ))}
      </select>

      <label htmlFor='createdAt'>
        Creation Date
        <input
          type='datetime-local'
          name='createdAt'
          id='bug-created-date'
          min={moment().local().format('YYYY-MM-DDThh:mm')}
          defaultValue={moment(bugData.createdAt).local().format('YYYY-MM-DDThh:mm')}
          onChange={handleChange}
          required
        />
      </label>

      <label htmlFor='expirationDate'>
        Expiration Date
        <input
          type='datetime-local'
          name='expirationDate'
          id='bug-expire-date'
          min={moment(bugData.createdAt).local().add(3, 'days').format('YYYY-MM-DDThh:mm')}
          defaultValue={moment(bugData.expirationDate).local().format('YYYY-MM-DDThh:mm')}
          onChange={handleChange}
          required
        />
      </label>

      <button type='submit'>Submit Edit</button>
    </Form>
  )
}

export default EditBug
