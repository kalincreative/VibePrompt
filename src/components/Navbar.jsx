import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../hooks/useAuth'

export default function Navbar() {
    const { user, signOut, isConfigured } = useAuth()
    const location = useLocation()

    const getLinkClass = (path) => {
        return location.pathname === path ? 'nav-link active-link' : 'nav-link inactive-link';
    }

    return (
        <>
            <style>{`
            .navbar-container {
                position: sticky;
                top: 0;
                z-index: 50;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0.75rem 1rem;
                background: rgba(255,255,255,0.85);
                backdrop-filter: blur(12px);
                border-bottom: 1px solid #F1F5F9;
                max-width: 100vw;
            }
            .logo-text {
                font-size: 1.125rem;
                font-weight: 800;
                background: linear-gradient(135deg, #F43F6F, #E11D55);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                white-space: nowrap;
                letter-spacing: -0.02em;
            }
            .nav-right {
                display: flex;
                align-items: center;
                gap: 0.25rem;
            }
            .nav-link {
                text-decoration: none;
                font-size: 0.75rem;
                font-weight: 600;
                padding: 0.375rem 0.4rem;
                border-radius: 0.5rem;
                transition: all 0.2s;
                white-space: nowrap;
            }
            .active-link {
                color: #F43F6F;
                background: #FFF1F3;
            }
            .inactive-link {
                color: #64748B;
                background: transparent;
            }
            .inactive-link:hover {
                color: #E11D55;
                background: #FFF1F3;
            }
            .btn-signin {
                text-decoration: none;
                font-size: 0.75rem;
                font-weight: 600;
                color: #FFFFFF;
                padding: 0.375rem 0.625rem;
                border-radius: 0.5rem;
                background: linear-gradient(135deg, #F43F6F, #E11D55);
                display: inline-flex;
                align-items: center;
                gap: 0.375rem;
                white-space: nowrap;
            }
            .btn-logout {
                display: flex;
                align-items: center;
                gap: 0.375rem;
                background: #F8FAFC;
                border: 1px solid #E2E8F0;
                border-radius: 0.5rem;
                padding: 0.375rem 0.4rem;
                color: #64748B;
                font-size: 0.75rem;
                font-weight: 600;
                cursor: pointer;
                font-family: inherit;
                white-space: nowrap;
            }
            .user-avatar {
                width: 18px;
                height: 18px;
                border-radius: 50%;
                background: linear-gradient(135deg, #F43F6F, #E11D55);
                color: #fff;
                font-size: 0.625rem;
                font-weight: 700;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            @media (min-width: 380px) {
                .nav-link {
                    font-size: 0.8125rem;
                    padding: 0.375rem 0.5rem;
                }
                .btn-signin {
                    font-size: 0.8125rem;
                    padding: 0.375rem 0.75rem;
                }
                .nav-right {
                    gap: 0.375rem;
                }
            }
            @media (min-width: 640px) {
                .navbar-container {
                    padding: 0.75rem 1.5rem;
                }
                .logo-text {
                    font-size: 1.25rem;
                }
                .nav-right {
                    gap: 0.5rem;
                }
                .nav-link {
                    font-size: 0.875rem;
                    padding: 0.375rem 0.75rem;
                }
                .btn-signin {
                    font-size: 0.875rem;
                    padding: 0.375rem 0.875rem;
                }
                .btn-logout {
                    padding: 0.375rem 0.75rem;
                    font-size: 0.8125rem;
                }
                .user-avatar {
                    width: 22px;
                    height: 22px;
                    font-size: 0.6875rem;
                }
            }
        `}</style>
            <motion.nav
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="navbar-container"
            >
                <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span className="logo-text">
                        ✦ VibePrompt
                    </span>
                </Link>

                <div className="nav-right">
                    <a href="/#pricing" className="nav-link inactive-link">Pricing</a>
                    <Link to="/generate" className={getLinkClass('/generate')}>Generator</Link>

                    {user ? (
                        <>
                            <Link to="/dashboard" className={getLinkClass('/dashboard')}>My Prompts</Link>
                            <button
                                onClick={signOut}
                                className="btn-logout"
                            >
                                <span className="user-avatar">
                                    {user.email?.[0]?.toUpperCase() || '?'}
                                </span>
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className="btn-signin">
                            Sign In
                        </Link>
                    )}
                </div>
            </motion.nav>
        </>
    )
}
