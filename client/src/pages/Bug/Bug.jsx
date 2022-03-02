import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import moment from 'moment'
import './Bug.css'

const Bug = () => {
  const navigate = useNavigate()
  const { bugId } = useParams()

  const [bugInfo, setBugInfo] = useState({
    _id: '',
    name: '',
    title: '',
    description: '',
    assignee: '',
    createdAt: '',
    expirationDate: ''
  })

  useEffect(() => {
    fetch(`http://localhost:5000/bugs/${bugId}`)
      .then(res => res.json())
      .then(data => {
        setBugInfo(data.bug)
      })
  }, [])

  const handleDelete = bugId => {
    fetch(`http://localhost:5000/bugs/${bugId}`, { method: 'DELETE' }).then(() => {
      navigate('/')
    })
  }

  return (
    <div className='bug-container'>
      <div className='bug-header'>
        <h2>{bugInfo.title}</h2>
        <div className='bug-action-btns'>
          <span className='bug-edit-btn'>
            <svg fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
              <path d='M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z' />
              <path
                fillRule='evenodd'
                d='M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z'
                clipRule='evenodd'
              />
            </svg>
          </span>
          <span className='bug-delete-btn' onClick={() => handleDelete(bugInfo._id)}>
            <svg fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
              <path
                fillRule='evenodd'
                d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
                clipRule='evenodd'
              />
            </svg>
          </span>
        </div>
      </div>
      <hr />
      <p>{bugInfo.description}</p>
      <hr />
      <p>
        Created On: {moment(bugInfo.createdAt).local().format('YYYY/MM/DD @ HH:MM A')}
        <br />
        Expires On: {moment(bugInfo.expirationDate).local().format('YYYY/MM/DD @ HH:MM A')}
        <br />
        Assigned to: <code>{bugInfo.assignee}</code>
      </p>
    </div>
  )
}

export default Bug
