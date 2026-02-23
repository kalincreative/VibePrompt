import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import GeneratorPage from './pages/GeneratorPage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'

export default function App() {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#FFFFFF' }}>
            <Navbar />
            <main style={{ flex: 1 }}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/generate" element={<GeneratorPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="*" element={
                        <div style={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            minHeight: '60vh', padding: '2rem', textAlign: 'center',
                        }}>
                            <h1 style={{ fontSize: '3rem', fontWeight: 900, color: '#0F172A', marginBottom: '0.5rem' }}>404</h1>
                            <p style={{ color: '#64748B', fontSize: '0.9375rem' }}>Page not found.</p>
                        </div>
                    } />
                </Routes>
            </main>
        </div>
    )
}
