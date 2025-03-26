import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./Login";
import Register from './Register';
import ProtectedRoute from "./ProtectedRoute";
import Home from './Home';
import MoodTracker from './MoodTracker';
import Kitchen from './Kitchen';
import Suggest from './Suggest';
import Recipe from './Recipe';
import HelpAssistant from "./HelpAssistant";
function App() {

  return (
    <>
        <HelpAssistant />
        <Router>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }/>
        <Route path="/mtrace" element={
          <ProtectedRoute>
            <MoodTracker />
          </ProtectedRoute>
        }/>
        <Route path="/witk" element={
          <ProtectedRoute>
            <Kitchen />
          </ProtectedRoute>
        }/>
        <Route path="/Suggest" element={
          <ProtectedRoute>
            <Suggest />
          </ProtectedRoute>
        }/>
        <Route path="/Recipe" element={
          <ProtectedRoute>
            <Recipe />
          </ProtectedRoute>
        }/>
      </Routes>
    </Router>
    </>
  )
}

export default App;
