import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import AboutPage from "./components/AboutPage";
import MissionPage from "./components/MissionPage";
import ArchivementCol from "./components/ArchivementCol";
import ContactPage from "./components/ContactPage";
import FooterPage from "./components/FooterPage";
import Vission from "./components/Vission";
import HomeLayout from "./components/HomeLayout";
import  LogIn  from "./components/Login";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<HomeLayout />}/>
        <Route path="/login" element={<LogIn />}/>
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

      </Routes>
    </Router>
  );
}

export default App;
