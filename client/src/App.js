import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Broadcast from './components/stream/Broadcast';
import { Dashboard } from './components/dashboard/Dashboard';
import { Navbar } from './components/Sidebar';
import StreamLibrary from './components/StreamLibrary';
import VideoPlayer from './components/stream/VideoPlayer';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

// Global css
import './styles/global.css';

function App() {
  return (
    <div className="App" style={{ background: '#18191A' }}>
      <BrowserRouter>
        <Navbar />

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
