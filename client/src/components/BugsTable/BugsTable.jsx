import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import './BugsTable.css'

const BugsTable = () => {
  const [bugs, setBugs] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/bugs')
      .then(res => res.json())
      .then(data => setBugs(data.bugs))
      .catch(err => console.error(err))
  }, [])

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Created At</th>
            <th>Expiration Date</th>
            <th>Assignee</th>
          </tr>
        </thead>
        <tbody>
          {bugs.length ? (
            bugs.map(bug => (
              <tr
                key={bug._id}
                className={
                  moment(bug.expirationDate).isSameOrBefore(moment().local().format())
                    ? 'bug-expired'
                    : ''
                }>
                <td>
                  <Link to={`/bug/${bug._id}`}>{bug.title}</Link>
                </td>
                <td>
                  <i>{bug.description}</i>
                </td>
                <td>{moment(bug.createdAt).calendar()}</td>
                <td>{moment(bug.expirationDate).fromNow()}</td>
                <td>{bug.assignee}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>No bugs found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  )
}

export default BugsTable
