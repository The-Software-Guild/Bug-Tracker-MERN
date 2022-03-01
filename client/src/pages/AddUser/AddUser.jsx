import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Form from '../../components/Form/Form'

const AddUser = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()

    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      .then(res => {
        if (res.status === 200) navigate('/')
      })
      .catch(err => {
        console.err(err)
      })
  }

  const handleChange = ({ target: { name, value } }) => {
    setUserData({ ...userData, [name]: value })
  }

  return (
    <Form formTitle='Add a new user' handleSubmit={handleSubmit}>
      <label htmlFor='name'>
        Name
        <input type='text' name='name' id='name' minLength={3} onChange={handleChange} required />
      </label>

      <label htmlFor='email'>
        Email
        <input type='email' name='email' id='email' onChange={handleChange} required />
      </label>

      <label htmlFor='password'>
        Password
        <input
          type='password'
          name='password'
          id='password'
          minLength={5}
          onChange={handleChange}
          required
        />
      </label>

      <button type='submit'>Create User</button>
    </Form>
  )
}

export default AddUser
