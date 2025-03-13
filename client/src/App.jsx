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
import PrivateRoute from './components/PrivateRoute'
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute'
import CreatePost from './Pages/CreatePost'
import UpdatePost from './Pages/UpdatePost'

const App = () => {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home />}>     </Route>
      <Route path="/About" element={<About />}>     </Route>
      <Route path="/signup" element={<Signup />}>     </Route>
      <Route path="/signin" element={<Signin />}>     </Route>
      <Route element={<PrivateRoute />}>
      <Route path="/dashboard" element={<Dashboard />}>     </Route>
      </Route>
      <Route element={<OnlyAdminPrivateRoute/>}>
      <Route path="/create-post" element={<CreatePost />}>     </Route>
      <Route path="/update-post/:postId" element={<UpdatePost />}>     </Route>
      </Route>
      
    </Routes>
    <Footercomp/>
    </BrowserRouter>

  )
}

export default App

