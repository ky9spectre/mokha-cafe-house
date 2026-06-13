import jwt from 'jsonwebtoken'
import pool from '../db.js'

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access denied. No token provided.' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret')
    // Attach user info to request
    const result = await pool.query('SELECT id, email FROM users WHERE id = $1', [verified.id])
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'User not found' })
    }
    req.user = result.rows[0]
    next()
   } catch (err) {
     console.error('Auth error:', err)
     res.status(400).json({ error: 'Invalid token' })
   }
}
