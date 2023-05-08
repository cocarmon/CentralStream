import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Broadcast from './components/Broadcast';
import { Dashboard } from './components/Dashboard';
import { Navbar } from './components/Navbar';
import StreamLibrary from './components/StreamLibrary';
import VideoPlayer from './components/VideoPlayer';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
function App() {
  const [color, setColor] = useState('#141415');
  useEffect(() => {
    window.location.pathname === '/login' ||
    window.location.pathname === '/signup'
      ? setColor('#FFFFFF')
      : setColor('#141415');
    console.log(window.location.pathname);
  }, []);
  return (
    <div className="App" style={{ backgroundColor: color }}>
      <BrowserRouter>
        {window.location.pathname === '/login' ||
        window.location.pathname === '/signup' ? null : (
          <Navbar />
        )}

        <Routes>
          <Route path="/login" element={<Login />} />

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
          <Route path="/streamLibrary" element={<StreamLibrary />} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
