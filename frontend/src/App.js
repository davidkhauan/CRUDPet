import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React from 'react'

/* components */
import Navbar from './components/Layout/Navbar/Navbar'
import Footer from './components/Layout/Footer/Footer'
import Message from './components/Layout/Message/Message'
import Container from './components/Layout/Container/Container'

/* pages */
import Home from './components/Pages/Home'
import Login from './components/Pages/Auth/Login'
import Register from './components/Pages/Auth/Register'
import Profile from './components/Pages/User/Profile'
import AddPet from './components/Pages/Pet/AddPet/AddPet'
import MyPets from './components/Pages/Pet/MyPets'
import EditPet from './components/Pages/Pet/EditPet'
import PetDetails from './components/Pages/Pet/PetDetails/PetDetails'
import MyAdoptions from './components/Pages/Pet/MyAdoption'

/* contexts */
import { UserProvider } from './context/UserContext'

function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar />
        <Message />
        <Container>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/pet/add" element={<AddPet />} />
            <Route path="/pet/edit/:id" element={<EditPet />} />
            <Route path="/pet/mypets" element={<MyPets />} />
            <Route path="/pet/myadoptions" element={<MyAdoptions />} />
            <Route path="/pet/:id" element={<PetDetails />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Container>
        <Footer />
      </UserProvider>
    </Router>
  )
}

export default App
