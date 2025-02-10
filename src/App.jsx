import { useState } from 'react'
import './App.css'
import LandingPage from './components/LandingPage'
import Nav from './components/Nav'
import AboutPage from './components/AboutPage'
import MissionPage  from './components/MissionPage'
import ArchivementCol  from './components/ArchivementCol'
import ContactPage  from './components/ContactPage'
import MedicalHomePage from './components/medical/MedicalHomePage'
import FooterPage from './components/FooterPage'

function App() {
  return (
    <div >
      <Nav />
      <LandingPage />
      <AboutPage />
      <MissionPage />
      <ArchivementCol />
      <ContactPage />
      <FooterPage />

      {/* s<MedicalHomePage /> */}
    </div>
  )
}

export default App
