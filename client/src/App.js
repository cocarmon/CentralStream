import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Broadcast from './components/stream/Broadcast';
import { Dashboard } from './components/dashboard/Dashboard';
import { Navbar } from './components/Sidebar';
import StreamLibrary from './components/StreamLibrary';
import VideoPlayer from './components/stream/VideoPlayer';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
function App() {
  return (
    <div className="App" style={{ background: '#18191A' }}>
      <BrowserRouter>
        {window.location.pathname === '/' ||
        window.location.pathname === '/signup' ? null : (
          <Navbar />
        )}

        <Routes>
          <Route path="/" element={<Login />} />

          <Route
            path="/stream"
            element={
              <ProtectedRoute>
                <Broadcast />
              </ProtectedRoute>
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/view" element={<VideoPlayer />} />
          <Route path="/library" element={<StreamLibrary />} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
