import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {
  return (
    <div className='header'>
      <Link to='/' className='logo'>
        Bug Tracker
      </Link>
      <div className='header-create-btns'>
        <Link to='/add/user'>
          <button>Add New User</button>
        </Link>
        <Link to='/add/bug'>
          <button>Add New Bug</button>
        </Link>
      </div>
    </div>
  )
}

export default Header
