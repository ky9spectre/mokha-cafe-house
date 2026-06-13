import express from 'express'
import pool from '../db.js'
import { authenticate } from '../middleware/auth.js'
import sanitizeHtml from 'sanitize-html'

const router = express.Router()
const isDev = process.env.NODE_ENV !== 'production'

// GET all reviews (public)
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM reviews ORDER BY created_at DESC')
    res.json(result.rows)
  } catch (err) {
    console.error('Fetch reviews error:', err)
    if (isDev) res.status(500).json({ error: err.message })
    else res.status(500).json({ error: 'Failed to fetch reviews' })
  }
})

// GET single review by id
router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10)
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid review ID' })
  }
  try {
    const result = await pool.query('SELECT * FROM reviews WHERE id = $1', [id])
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Review not found' })
    }
    res.json(result.rows[0])
  } catch (err) {
    console.error('Fetch review error:', err)
    if (isDev) res.status(500).json({ error: err.message })
    else res.status(500).json({ error: 'Failed to fetch review' })
  }
})

// POST a new review (requires authentication)
router.post('/', authenticate, async (req, res) => {
  const { author_name, rating, text, date, image } = req.body
  if (!author_name || !rating || !text || !date) {
    return res.status(400).json({ error: 'Missing required fields' })
  }
  try {
    // Sanitize to prevent XSS
    const cleanText = sanitizeHtml(text, { allowedTags: [], allowedAttributes: {} })
    const result = await pool.query(
      `INSERT INTO reviews (author_name, rating, text, date, image, user_id)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [author_name, rating, cleanText, date, image || null, req.user.id]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error('Submit review error:', err)
    if (isDev) res.status(500).json({ error: err.message })
    else res.status(500).json({ error: 'Failed to submit review' })
  }
})

export default router
