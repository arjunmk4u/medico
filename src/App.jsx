import { useState } from 'react'
import './App.css'
import LandingPage from './components/LandingPage'
import Nav from './components/Nav'
import AboutPage from './components/AboutPage'
import MedicalHomePage from './components/medical/MedicalHomePage'

function App() {
  return (
    <div >
      <Nav />
      <LandingPage />
      <AboutPage />
      {/* s<MedicalHomePage /> */}
    </div>
  )
}

export default App
