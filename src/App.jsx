import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, createContext, useContext } from 'react'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import SignupStep2 from './pages/SignupStep2'
import AppLayout from './layouts/AppLayout'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Notes from './pages/Notes'
import AIAssist from './pages/AIAssist'
import Chat from './pages/Chat'
import Leaderboard from './pages/Leaderboard'
import Rooms from './pages/Rooms'
import RoomDetail from './pages/RoomDetail'
import StudyTools from './pages/StudyTools'
import SavedFiles from './pages/SavedFiles'
import Achievements from './pages/Achievements'

export const AuthContext = createContext(null)

export function useAuth() { return useContext(AuthContext) }

export default function App() {
  const [user, setUser] = useState(null)

  const login = (u) => setUser(u || { name: 'Abdullah Malik', email: 'abdullah@ucp.edu.pk', username: 'AbdullahMalik', avatar: 'AM', university: 'University of Central Punjab', xp: 4250, rank: 3, streak: 12, level: 8 })
  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup/step2" element={<SignupStep2 />} />
        <Route path="/app" element={user ? <AppLayout /> : <Navigate to="/login" />}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="notes" element={<Notes />} />
          <Route path="ai" element={<AIAssist />} />
          <Route path="chat" element={<Chat />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="rooms/:id" element={<RoomDetail />} />
          <Route path="study-tools" element={<StudyTools />} />
          <Route path="files" element={<SavedFiles />} />
          <Route path="achievements" element={<Achievements />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthContext.Provider>
  )
}
