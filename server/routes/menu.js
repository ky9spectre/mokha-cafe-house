import express from 'express'
import pool from '../db.js'

const router = express.Router()

// GET /api/menu - optionally filter by category, dietary, priceMax, search
router.get('/', async (req, res) => {
  const { category, dietary, priceMax, search } = req.query
  try {
    let query = 'SELECT * FROM menu_items WHERE TRUE'
    const params = []
    let idx = 1

    if (category && category !== 'all') {
      query += ` AND category = $${idx}`
      params.push(category)
      idx++
    }

    if (dietary && dietary !== 'all') {
      query += ` AND dietary @> $${idx}::jsonb`
      params.push(JSON.stringify([dietary]))
      idx++
    }

    if (priceMax) {
      query += ` AND price <= $${idx}`
      params.push(priceMax)
      idx++
    }

    if (search) {
      query += ` AND (LOWER(name) LIKE LOWER($${idx}) OR LOWER(description) LIKE LOWER($${idx}))`
      params.push(`%${search}%`)
      idx++
    }

    query += ' ORDER BY id ASC'

    const result = await pool.query(query, params)
    res.json(result.rows)
  } catch (err) {
    console.error('Menu fetch error:', err)
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
