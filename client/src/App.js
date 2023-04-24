import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Broadcast from './components/Broadcast';
import { Dashboard } from './components/Dashboard';
import { Navbar } from './components/Navbar';
import StreamLibrary from './components/StreamLibrary';
import VideoPlayer from './components/VideoPlayer';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
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
          <Route path="/signUp" element={<SignUp />} />
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
