import React from 'react'
import Header from './components/Header'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import About from './Pages/About'
import Dashboard from './Pages/Dashboard'
import Home from './Pages/Home'
import Project from './Pages/Project'
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'
import Footercomp from './components/Footer'

const App = () => {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home />}>     </Route>
      <Route path="/About" element={<About />}>     </Route>
      <Route path="/signup" element={<Signup />}>     </Route>
      <Route path="/signin" element={<Signin />}>     </Route>
      <Route path="/" element={<Home />}>     </Route>
    </Routes>
    <Footercomp/>
    </BrowserRouter>

  )
}

export default App

