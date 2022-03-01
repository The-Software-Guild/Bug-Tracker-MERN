import { Routes, Route } from 'react-router-dom'

import Header from './components/Header/Header'
import BugsTable from './components/BugsTable/BugsTable'
import AddUser from './pages/AddUser/AddUser'
import AddBug from './pages/AddBug/AddBug'

import './App.css'

function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route exact path='/' element={<BugsTable />} />
        <Route path='/add/user' element={<AddUser />} />
        <Route path='/add/bug' element={<AddBug />} />
      </Routes>
    </div>
  )
}

export default App
