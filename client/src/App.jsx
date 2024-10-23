import React from 'react'
import Header from './components/Header'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import About from './Pages/About'
import Dashboard from './Pages/Dashboard'
import Home from './Pages/Home'
import Project from './Pages/Project'
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'

const App = () => {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home />}>     </Route>
      <Route path="/About" element={<About />}>     </Route>
      <Route path="/signup" element={<Signup />}>     </Route>
      <Route path="/" element={<Home />}>     </Route>
      <Route path="/" element={<Home />}>     </Route>
    </Routes>
    </BrowserRouter>

  )
}

export default App

