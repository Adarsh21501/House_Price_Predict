import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Nav from './components/Nav'
import Home from './components/Home'
import Predict from './components/Predict'
import Prise from './components/Prise'
import Recents from './components/Recents'
import Edit from './components/Edit'

function App() {
  return (
    <div>
      <Nav/>
      <Routes>

       <Route path="/" element={<Home />} />
       <Route path='/predict' element={<Predict/>} />
       <Route path='/result' element={<Prise/>} />
       <Route path='/recents' element={<Recents/>} />
       <Route path='/edit' element={<Edit/>}  />
      

      </Routes>
    </div>
  )
}

export default App
