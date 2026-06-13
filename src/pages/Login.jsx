import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, ArrowLeft } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/')
    }
  }, [navigate])

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Login failed')
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      navigate('/')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-xl shadow-lg border border-coffee-100 max-w-md w-full">
        <Link to="/" className="inline-flex items-center gap-1 text-coffee-600 hover:text-gold mb-6"><ArrowLeft className="w-4 h-4" /> Back</Link>
        <h2 className="text-2xl font-bold text-coffee-800 mb-6 text-center">Login</h2>
        {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-coffee-700 mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-coffee-400" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-coffee-200 focus:outline-none focus:ring-2 focus:ring-coffee-400"
                placeholder="you@example.com"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-coffee-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-coffee-400" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-coffee-200 focus:outline-none focus:ring-2 focus:ring-coffee-400"
                placeholder="••••••••"
              />
            </div>
          </div>
          <button type="submit" className="w-full bg-coffee-700 text-white font-semibold py-2 rounded-lg hover:bg-coffee-600 transition-colors">Sign In</button>
        </form>
        <p className="mt-4 text-center text-sm text-coffee-600">
          Don't have an account? <Link to="/register" className="text-gold hover:underline">Register</Link>
        </p>
      </motion.div>
    </div>
  )
}
