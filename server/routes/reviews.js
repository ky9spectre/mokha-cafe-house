import express from 'express'
import pool from '../db.js'
import { authenticate } from '../middleware/auth.js'

const router = express.Router()

// GET all reviews (public)
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM reviews ORDER BY created_at DESC'
    )
    res.json(result.rows)
  } catch (err) {
    console.error('Fetch reviews error:', err)
    res.status(500).json({ error: 'Failed to fetch reviews' })
  }
})

// POST a new review (requires authentication)
router.post('/', authenticate, async (req, res) => {
  const { author_name, rating, text, date, image } = req.body
  if (!author_name || !rating || !text || !date) {
    return res.status(400).json({ error: 'Missing required fields' })
  }
  try {
    const result = await pool.query(
      `INSERT INTO reviews (author_name, rating, text, date, image, user_id)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [author_name, rating, text, date, image || null, req.user.id]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error('Submit review error:', err)
    res.status(500).json({ error: 'Failed to submit review' })
  }
})

export default router
