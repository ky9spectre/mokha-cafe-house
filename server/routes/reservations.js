import express from 'express'
import pool from '../db.js'

const router = express.Router()

router.post('/', async (req, res) => {
  const { name, email, phone, reservation_date, reservation_time, guests, special_requests } = req.body
  if (!name || !email || !reservation_date || !reservation_time || !guests) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    const result = await pool.query(
      `INSERT INTO reservations (name, email, phone, reservation_date, reservation_time, guests, special_requests)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [name, email, phone || null, reservation_date, reservation_time, guests, special_requests || null]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error('Reservation error:', err)
    res.status(500).json({ error: 'Failed to create reservation' })
  }
})

// Optional: fetch reservations by email
router.get('/', async (req, res) => {
  const { email } = req.query
  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }
  try {
    const result = await pool.query(
      'SELECT * FROM reservations WHERE email = $1 ORDER BY reservation_date, reservation_time',
      [email]
    )
    res.json(result.rows)
  } catch (err) {
    console.error('Fetch reservations error:', err)
    res.status(500).json({ error: 'Failed to fetch reservations' })
  }
})

export default router
