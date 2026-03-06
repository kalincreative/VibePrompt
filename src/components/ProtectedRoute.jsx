import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

/**
 * ProtectedRoute — wraps any route that requires authentication.
 * Guests are redirected to /login. Shows nothing while auth is loading.
 */
export default function ProtectedRoute({ children }) {
    const { user, loading } = useAuth()

    // While Supabase resolves the session, render nothing (avoids flash)
    if (loading) return null

    // Not authenticated → send back to login
    if (!user) return <Navigate to="/login" replace />

    return children
}
