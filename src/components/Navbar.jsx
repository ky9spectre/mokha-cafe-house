import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
