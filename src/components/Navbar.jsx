import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

function getStoredUser() {
  const token = localStorage.getItem('token')
  const stored = localStorage.getItem('user')
  if (token && stored) {
    try {
      return JSON.parse(stored)
    } catch {
      return null
    }
  }
  return null
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState(getStoredUser)
  const location = useLocation()
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    navigate('/')
  }

  const links = [
    { to: '/', label: 'Home' },
    { to: '/menu', label: 'Menu' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/blog', label: 'Blog' },
    { to: '/reviews', label: 'Reviews' },
    { to: '/contact', label: 'Contact' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-coffee-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">☕</span>
            <span className="text-xl font-bold tracking-wide">Mokha</span>
          </Link>
          <div className="hidden md:flex gap-8">
            {links.map(l => (
              <Link
                key={l.to}
                to={l.to}
                className={`text-sm tracking-wide transition-colors hover:text-gold ${
                  location.pathname === l.to ? 'text-gold' : 'text-coffee-100'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          {user ? (
            <div className="hidden md:flex items-center gap-4">
              <span className="text-coffee-100 text-sm truncate max-w-[120px]">{user.email}</span>
              <button onClick={logout} className="text-sm text-coffee-100 hover:text-gold">Logout</button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-4">
              <Link to="/login" className="text-sm text-coffee-100 hover:text-gold">Login</Link>
              <Link to="/register" className="text-sm bg-gold text-coffee-900 px-3 py-1 rounded-full hover:bg-yellow-600 transition-colors">Sign Up</Link>
            </div>
          )}

          <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-coffee-700 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {links.map(l => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={`py-2 text-sm tracking-wide ${
                    location.pathname === l.to ? 'text-gold' : 'text-coffee-100'
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              <div className="border-t border-coffee-600 my-1" />
              {user ? (
                <>
                  <div className="py-2 text-sm text-coffee-100">{user.email}</div>
                  <button onClick={() => { setOpen(false); logout(); }} className="text-left py-2 text-sm text-coffee-100 hover:text-gold">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setOpen(false)} className="py-2 text-sm text-coffee-100 hover:text-gold">Login</Link>
                  <Link to="/register" onClick={() => setOpen(false)} className="py-2 text-sm text-coffee-100 hover:text-gold">Sign Up</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
