import { useState, useEffect } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

export function useAuth() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!isSupabaseConfigured()) { setLoading(false); return }
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null)
            setLoading(false)
        })
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => setUser(session?.user ?? null)
        )
        return () => subscription.unsubscribe()
    }, [])

    const signIn = async (email, password) => {
        if (!isSupabaseConfigured()) return { error: { message: 'Supabase not configured. Add credentials to .env.local' } }
        return await supabase.auth.signInWithPassword({ email, password })
    }

    const signUp = async (email, password) => {
        if (!isSupabaseConfigured()) return { error: { message: 'Supabase not configured. Add credentials to .env.local' } }
        return await supabase.auth.signUp({ email, password })
    }

    const signOut = async () => {
        if (!isSupabaseConfigured()) return
        await supabase.auth.signOut()
        setUser(null)
    }

    return { user, loading, signIn, signUp, signOut, isConfigured: isSupabaseConfigured() }
}
