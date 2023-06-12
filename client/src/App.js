import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Broadcast from './components/stream/Broadcast';
import { Dashboard } from './components/dashboard/Dashboard';
import { Navbar } from './components/Sidebar';
import StreamLibrary from './components/StreamLibrary';
import VideoPlayer from './components/stream/VideoPlayer';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { PageNotFound } from './components/PageNotFound';

// Global css
import './styles/global.css';

function App() {
  return (
    <div className="App" style={{ background: '#18191A' }}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <Routes>
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
                  <Route path="/404" element={<PageNotFound />} />
                  <Route path="*" element={<Navigate to="/404" />} />
                </Routes>
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
